

// src/services/gemini.service.ts

import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';
import { eduBotContext, educationalContexts } from '../config/mcp-context';
import { MCPEducationalContext } from '../interfaces/mcp-educational-context.interface';

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;
 
  // Número máximo de intentos para llamadas a la API externa
  private readonly maxGenerateAttempts = Number(process.env.GEMINI_MAX_ATTEMPTS || '3');
  private readonly baseBackoffMs = Number(process.env.GEMINI_BASE_BACKOFF_MS || '500');
  // Caché simple en memoria para respuestas de la API (key -> { text, ts })
  private readonly cache = new Map<string, { text: string; ts: number }>();
  private readonly cacheTTL = Number(process.env.GEMINI_CACHE_TTL_MS || '86400000'); // 24h por defecto

  // Circuit breaker simple
  private circuitFailures = 0;
  private readonly circuitThreshold = Number(process.env.GEMINI_CIRCUIT_THRESHOLD || '5');
  private readonly circuitCooldownMs = Number(process.env.GEMINI_CIRCUIT_COOLDOWN_MS || '60000'); // 1 min
  private circuitOpenUntil = 0;
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY no está definida en las variables de entorno');
    }
    // Inicialización correcta según la nueva API
    this.ai = new GoogleGenAI({ apiKey });
  }

  /**
   * Wrapper para `this.ai.models.generateContent` con reintentos exponenciales y jitter.
   * Reintenta en errores transitorios como 503. Lanza un Error amigable si falla después
   * de agotar los intentos.
   */
  private async generateContentWithRetries(request: any): Promise<any> {
    const maxAttempts = Math.max(1, this.maxGenerateAttempts);
    const baseDelay = Math.max(100, this.baseBackoffMs);

    let lastError: any = null;

    // Generar key de caché a partir del modelo + contenido
    const contentsStr = Array.isArray(request.contents) ? request.contents.join('') : String(request.contents || '');
    const cacheKey = crypto.createHash('sha256').update(`${request.model}::${contentsStr}`).digest('hex');

    // Si el circuit breaker está abierto, devolver valor en caché si existe
    if (Date.now() < this.circuitOpenUntil) {
      const cached = this.cache.get(cacheKey);
      if (cached && (Date.now() - cached.ts) < this.cacheTTL) {
        console.warn('Circuito abierto: devolviendo respuesta cacheada');
        return { text: cached.text };
      }
      throw new Error('Servicio de IA en modo de recuperación temporal (circuito abierto)');
    }

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const res = await this.ai.models.generateContent(request);
        // Guardar en caché la respuesta y resetear contador de fallos del circuito
        try {
          const text = res?.text || '';
          this.cache.set(cacheKey, { text, ts: Date.now() });
          this.circuitFailures = 0;
        } catch (e) {
          // ignorar errores de caché
        }
        return res;
      } catch (err: any) {
        lastError = err;
        // Determinar si es un error transitorio (503 / overloaded)
        const isTransient = (
          err && (
            err.status === 503 ||
            err?.error?.code === 503 ||
            (typeof err?.error?.status === 'string' && err.error.status.toLowerCase().includes('unavail')) ||
            (err?.message && err.message.includes('overloaded'))
          )
        );

        console.warn(`Intento ${attempt} fallo en generateContent: ${err?.message || err}. Transitorio=${isTransient}`);

        if (!isTransient || attempt === maxAttempts) break;

        // Backoff exponencial con jitter
        const delay = Math.round(baseDelay * Math.pow(2, attempt - 1) + Math.random() * 100);
        await new Promise(res => setTimeout(res, delay));
      }
    }

    console.error('generateContentWithRetries: agotados los intentos, error:', lastError);

    // Incrementar contador de fallos y abrir circuito si aplica
    try {
      this.circuitFailures += 1;
      if (this.circuitFailures >= this.circuitThreshold) {
        this.circuitOpenUntil = Date.now() + this.circuitCooldownMs;
        console.warn(`Circuit breaker abierto por ${this.circuitCooldownMs}ms`);
      }
    } catch (e) {
      // no bloquear por errores en lógica de circuit
    }

    // Si hay caché, devolverlo en lugar de lanzar
    const cached = this.cache.get(cacheKey);
    if (cached && (Date.now() - cached.ts) < this.cacheTTL) {
      console.warn('generateContentWithRetries: devolviendo respuesta cacheada tras fallos');
      return { text: cached.text };
    }

    // Lanzar un error más legible para consumidores (frontend / servicios)
    throw new Error('El servicio de IA está temporalmente sobrecargado. Por favor intenta de nuevo en unos minutos.');
  }

  /**
   * Construye el prompt del sistema con el contexto MCP
   */
  private buildSystemPrompt(moduleContext?: MCPEducationalContext): string {
    const basePrompt = `
Eres ${eduBotContext.projectInfo.botName} (${eduBotContext.projectInfo.descriptionBotName}), 
un asistente educativo especializado en ${eduBotContext.projectInfo.description}

MISIÓN: ${eduBotContext.projectInfo.mission}
VISIÓN: ${eduBotContext.projectInfo.vision}

ÁREAS DE ESPECIALIZACIÓN:
${educationalContexts.map(ctx => ` ${ctx.name}: ${ctx.content?.description }`).join('\n')}

COMPORTAMIENTO:
- Siempre responde en español claro y pedagógico
- Adapta tu lenguaje al nivel del estudiante
- Cuando corrijas, explica el error siempre y cuando el estudiante envie una respuesta erronea, en caso contrario solo envia un mensaje felicitandolo y ofrece la respuesta correcta
- Cuando generes ejercicios, asegúrate de que sean progresivos y educativos
- Sé motivador y alienta el aprendizaje
- Proporciona ejemplos concretos
- Usa emojis ocasionalmente para hacer la interacción más amigable
- Evita poner respuestas con este tipos de simbolos ** p comillas invertias ya que dificulta la lectura del ejercicio 
- En caso de que el alumno se equivoque en una respuesta, no solo le digas que está mal, sino que expliques detalladamente el porqué y cómo mejorar obtendras el contexto dento de la carpeta config ahi estarán todos los contextos educativos necesarios
`;

    if (moduleContext) {
      return `${basePrompt}

CONTEXTO DEL MÓDULO ACTUAL: ${moduleContext.name}
Descripción: ${moduleContext.content?.description || ''}

TEMAS DISPONIBLES:
${moduleContext.content?.mainTopics?.map(t => `- ${t}`).join('\n') || 'No hay temas listados'}

EJERCICIOS DE REFERENCIA:
${moduleContext.content && (moduleContext as any).exercises ? JSON.stringify((moduleContext as any).exercises, null, 2) : 'No hay ejercicios de referencia'}

REGLAS ESPECÍFICAS DEL MÓDULO:
${moduleContext.content?.rules ? moduleContext.content.rules.map(r => `- ${r.title || r}`).join('\n') : 'No hay reglas específicas'}
`;
    }

    return basePrompt;
  }

  /**
   * Encuentra el contexto educativo apropiado según el módulo solicitado
   */
  private findModuleContext(moduleName?: string): MCPEducationalContext | undefined {
    if (!moduleName) return undefined;
    
    const normalizedModule = moduleName.toLowerCase().replace(/[_\s-]/g, '');
    return educationalContexts.find(ctx => {
      const base = (ctx.name || ctx.id || '').toLowerCase().replace(/[_\s-]/g, '');
      return base.includes(normalizedModule) || (ctx.id || '').toLowerCase().includes(normalizedModule);
    });
  }

  /**
   * Corrige un ejercicio realizado por el usuario
   */
  async correctExercise(userAnswer: string, module?: string, context?: string): Promise<string> {
    try {
      const moduleContext = this.findModuleContext(module);
      const systemPrompt = this.buildSystemPrompt(moduleContext);

      const prompt = `
${systemPrompt}

TAREA: Corregir el siguiente ejercicio del usuario

${context ? `CONTEXTO DEL EJERCICIO: ${context}` : ''}

RESPUESTA DEL USUARIO:
${userAnswer}

INSTRUCCIONES DE CORRECCIÓN:
1. Identifica si la respuesta es correcta o incorrecta
2. Si la respuesta es incorrecta, explica claramente el error
3. Proporciona la respuesta correcta con explicación paso a paso
4. Ofrece consejos para evitar ese error en el futuro
5. Muestra ejemplos similares si es necesario
6. Finaliza con un mensaje motivador

Formato de respuesta (IMPORTANTE):
- Si la respuesta del estudiante ES CORRECTA: responde únicamente con una línea corta y motivadora, por ejemplo: "✅ Correcto. ¡Muy bien!" o "✅ Correcto. ¡Excelente trabajo!". No agregues análisis, explicación ni símbolos de formato (no uses **, comillas invertidas, HTML, ni bloques adicionales).
- Si la respuesta del estudiante ES INCORRECTA: entrega un análisis detallado siguiendo este formato exacto (puedes usar varias líneas):
  Análisis: [qué falló o acierto]
  Explicación: [por qué está mal según las reglas]
  Respuesta Correcta: [la respuesta correcta con explicación paso a paso]
  Consejo: [sugerencia específica para mejorar]
  Mensaje motivador: [una frase breve y alentadora]
Solo el caso de respuestas incorrectas debe incluir el análisis y la explicación extensa.
`;

      // Nueva sintaxis de la API @google/genai con reintentos
      const response = await this.generateContentWithRetries({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      return response.text;
    } catch (error) {
      console.error('Error en correctExercise:', error);
      throw new Error(`Error al corregir ejercicio: ${error.message}`);
    }
  }

  /**
   * Evalúa la solución del usuario y retorna un objeto JSON estructurado:
   * { isCorrect, analysis, correction, theory, recommendations }
   */
  async evaluateExerciseStructured(
    exerciseId: string,
    answers: string[],
    module?: string,
    context?: string
  ): Promise<any> {
    try {
      const moduleContext = this.findModuleContext(module);
      const systemPrompt = this.buildSystemPrompt(moduleContext);
      // Intentar obtener el enunciado / preguntas del ejercicio desde el contexto del módulo
      let exerciseSpec: any = null;
      try {
        const exercisesList = (moduleContext as any)?.content?.exercises;
        if (Array.isArray(exercisesList) && exerciseId) {
          const normalizedId = String(exerciseId).toLowerCase();
          exerciseSpec = exercisesList.find((e: any) => String(e.id || '').toLowerCase() === normalizedId || String(e.id || '').toLowerCase().includes(normalizedId));
        }
      } catch (e) {
        // Ignorar si no hay lista de ejercicios
        exerciseSpec = null;
      }

      // Construir sección de preguntas/respuestas para el prompt
      const qaLines = answers.map((a, i) => `Respuesta ${i + 1}: "${String(a).replace(/\"/g, '\\"')}"`).join('\n');

      // Si contamos con el enunciado del ejercicio, lo incluimos para dar contexto a la IA
      let exerciseBlock = '';
      if (exerciseSpec) {
        const qtext = Array.isArray(exerciseSpec.questions) ? exerciseSpec.questions.map((q: any, idx: number) => `Pregunta ${idx + 1}: ${q}`).join('\n') : '';
        exerciseBlock = `EJERCICIO: ${exerciseSpec.title || exerciseSpec.id || ''}\n${exerciseSpec.instruction ? `Instrucciones: ${exerciseSpec.instruction}\n` : ''}\n${qtext}\n\n`;
      }

      const prompt = `
${systemPrompt}

TAREA: Evalúa la solución de un estudiante para un ejercicio específico y responde **SOLO** con un objeto JSON válido con la siguiente estructura:

{
  "isCorrect": boolean, // si todas las respuestas del ejercicio están correctas
  "perQuestion": [
    { "index": number, "isCorrect": boolean, "analysis": string, "correction": string, "theory": string }
  ],
  "recommendations": [ /* array de strings: sugerencias o nombres de ejercicios extra */ ]
}

INSTRUCCIONES:
1) Evalúa cada respuesta individualmente usando el contexto del módulo.
2) Para cada ítem en perQuestion, incluye index (0-based), isCorrect, analysis (qué falló o acierto), correction (pasos o respuesta correcta) y theory (breve explicación).
3) isCorrect al nivel del objeto indica si todas las preguntas del ejercicio están correctas.
4) Si sugieres ejercicios extra, incluye sus identificadores o descripciones en recommendations.
5) La salida debe ser únicamente JSON válido, sin texto adicional.

${exerciseBlock}
EJERCICIO-ID: ${exerciseId}
RESPUESTAS DEL ESTUDIANTE:
${qaLines}

RESPONDE AHORA EN JSON:
`;


      const response = await this.generateContentWithRetries({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const raw = response.text;

      // Intentar parsear JSON directamente; si falla, extraer substring entre la primera '{' y la última '}'
      try {
        return JSON.parse(raw);
      } catch (err) {
        const first = raw.indexOf('{');
        const last = raw.lastIndexOf('}');
        if (first !== -1 && last !== -1 && last > first) {
          const sub = raw.substring(first, last + 1);
          return JSON.parse(sub);
        }
        // Si no se pudo parsear, devolver el texto crudo en un campo
        return { isCorrect: null, raw: raw };
      }

    } catch (error: any) {
      console.error('Error en evaluateExerciseStructured:', error);
      throw new Error(`Error al evaluar ejercicio: ${error.message}`);
    }
  }

  /**
   * Genera un nuevo ejercicio basado en el módulo educativo
   */
  async generateExercise(
    module: string, 
    difficulty: 'basico' | 'intermedio' | 'avanzado' = 'basico',
    specificTopic?: string
  ): Promise<string> {
    try {
      const moduleContext = this.findModuleContext(module);
      
      if (!moduleContext) {
        return ` No encontré el módulo "${module}". Los módulos disponibles son: ${educationalContexts.map(c => c.name).join(', ')}`;
      }

      const systemPrompt = this.buildSystemPrompt(moduleContext);

      const prompt = `
${systemPrompt}

TAREA: Generar un ejercicio educativo

MÓDULO: ${moduleContext.name}
DIFICULTAD: ${difficulty}
${specificTopic ? `TEMA ESPECÍFICO: ${specificTopic}` : ''}

INSTRUCCIONES:
1. Crea un ejercicio original y educativo
2. El nivel de dificultad debe ser ${difficulty}
3. Basa el ejercicio en los ejemplos del módulo pero crea variaciones
4. Incluye instrucciones claras
5. Si es apropiado, incluye pistas sutiles
6. El ejercicio debe ser desafiante pero alcanzable

EJEMPLOS DE REFERENCIA (NO copies exactamente, crea variaciones):
${moduleContext && (moduleContext as any).exercises ? JSON.stringify(((moduleContext as any).exercises || []).slice(0, 3), null, 2) : 'No hay ejemplos de ejercicios disponibles.'}

Formato de respuesta:
EJERCICIO - ${moduleContext.name} (Nivel: ${difficulty})

[Instrucciones claras del ejercicio]

[Contenido del ejercicio]

Pista: [Una pista sutil si es apropiado]

---
Cuando termines, envía tu respuesta para que pueda corregirla.
`;

      // Nueva sintaxis de la API @google/genai
      const response = await this.generateContentWithRetries({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      return response.text;
    } catch (error) {
      console.error('Error en generateExercise:', error);
      throw new Error(`Error al generar ejercicio: ${error.message}`);
    }
  }

  /**
   * Proporciona una explicación educativa sobre un tema
   */
  async explainTopic(topic: string, module?: string): Promise<string> {
    try {
      const moduleContext = this.findModuleContext(module);
      const systemPrompt = this.buildSystemPrompt(moduleContext);

      const prompt = `
${systemPrompt}

TAREA: Generar una explicación educativa clara, estructurada y sin emojis

TEMA: ${topic}
${module ? `MÓDULO: ${module}` : ''}

INSTRUCCIONES IMPORTANTES:
1. NO USES EMOJIS en ningún lugar de la respuesta
2. Estructura la respuesta con secciones claras separadas por líneas en blanco
3. Usa un lenguaje simple pero académico
4. Incluye definiciones claras
5. Proporciona 2-3 ejemplos prácticos y cotidianos
6. Si hay pasos, enuméralos claramente con números
7. Termina con ejercicios o actividades sugeridas
8. Asegúrate de que el contenido sea fácil de leer en un modal

FORMATO EXACTO DE RESPUESTA (sigue este esquema):

DEFINICIÓN
[Explicación clara y breve de qué es el concepto, máximo 3 líneas]

CONCEPTOS CLAVE
[Enumera 3-4 conceptos principales con viñetas]

EJEMPLOS
Ejemplo 1: [Describe un ejemplo cotidiano con resolución paso a paso]
Ejemplo 2: [Otro ejemplo diferente y práctico]

PASOS IMPORTANTES
1. [Primer paso]
2. [Segundo paso]
3. [Tercer paso]
[Ajusta según sea necesario]

CASOS ESPECIALES O ERRORES COMUNES
[Menciona 1-2 cosas que los estudiantes suelen confundir]

EJERCICIOS PARA PRACTICAR
1. [Ejercicio simple]
2. [Ejercicio intermedio]
3. [Ejercicio para profundizar]

Asegúrate de que cada sección esté bien separada y sea fácil de leer.
`;

      // Nueva sintaxis de la API @google/genai
      const response = await this.generateContentWithRetries({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      return response.text;
    } catch (error) {
      console.error('Error en explainTopic:', error);
      throw new Error(`Error al explicar tema: ${error.message}`);
    }
  }

  /**
   * Maneja conversación general educativa
   */
  async handleConversation(
    message: string, 
    conversationHistory?: Array<{role: string; content: string}>
  ): Promise<string> {
    try {
      const systemPrompt = this.buildSystemPrompt();

      let historyText = '';
      if (conversationHistory && conversationHistory.length > 0) {
        historyText = '\nHISTORIAL DE CONVERSACIÓN:\n' + 
          conversationHistory.map(h => `${h.role === 'user' ? 'Usuario' : 'EduBot'}: ${h.content}`).join('\n');
      }

      const prompt = `
${systemPrompt}
${historyText}

MENSAJE DEL USUARIO: ${message}

Responde de forma natural, educativa y amigable. Si el usuario solicita ayuda específica, 
ofrece guiarlo hacia los módulos disponibles o generar ejercicios.
`;

      // Nueva sintaxis de la API @google/genai con reintentos
      const response = await this.generateContentWithRetries({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      return response.text;
    } catch (error) {
      console.error('Error en handleConversation:', error);
      throw new Error(`Error en conversación: ${error.message}`);
    }
  }

  /**
   * Lista los módulos y temas disponibles
   */
  getAvailableModules(): any {
    return {
      projectInfo: eduBotContext.projectInfo,
      modules: educationalContexts.map(ctx => ({
        name: ctx.name,
        description: ctx.content?.description || '',
        topics: (ctx.content?.mainTopics || []).map(t => ({ name: t })),
        totalExercises: (ctx as any).exercises ? (ctx as any).exercises.length : 0
      }))
    };
  }

  /**
   * Obtiene ejercicios específicos por su ID
   */
  getExercisesByIds(exerciseIds: string[]): any[] {
    try {
      const results: any[] = [];

      // Buscar cada ejercicio por ID en todos los contextos
      for (const exerciseId of exerciseIds) {
        for (const context of educationalContexts) {
          const exercises = (context.content as any)?.exercises || [];
          const exercise = exercises.find((ex: any) => ex.id === exerciseId);

          if (exercise) {
            results.push({
              id: exercise.id,
              title: exercise.title || `Ejercicio ${exerciseId}`,
              instruction: exercise.instruction || '',
              questions: exercise.questions || [],
              difficulty: this.inferDifficulty(exercise),
              type: this.inferType(exercise, context.id),
              contextId: context.id,
              module: context.name
            });
            break;
          }
        }
      }

      if (results.length === 0) {
        throw new Error(`No se encontraron ejercicios con IDs: ${exerciseIds.join(', ')}`);
      }

      return results;
    } catch (error) {
      console.error('Error en getExercisesByIds:', error);
      throw new Error(`Error al obtener ejercicios por IDs: ${error.message}`);
    }
  }

  /**
   * Obtiene la teoría de un tema específico
   */
  getTheoryByExerciseId(exerciseId: string): any {
    try {
      // Buscar el ejercicio en todos los contextos
      for (const context of educationalContexts) {
        const exercises = (context.content as any)?.exercises || [];
        const exercise = exercises.find((ex: any) => ex.id === exerciseId);

        if (exercise) {
          // Encontramos el ejercicio, ahora buscamos la teoría relacionada
          const title = exercise.title || exerciseId;
          
          // Retornar información teórica del contexto
          return {
            exerciseId: exerciseId,
            exerciseTitle: title,
            moduleId: context.id,
            moduleName: context.name,
            moduleDescription: context.content?.description,
            theory: {
              mainTopics: context.content?.mainTopics || [],
              rules: context.content?.rules || [],
              learningSteps: context.content?.learningSteps || [],
              recommendations: context.content?.recommendations || []
            }
          };
        }
      }

      throw new Error(`Ejercicio '${exerciseId}' no encontrado`);
    } catch (error) {
      console.error('Error en getTheoryByExerciseId:', error);
      throw new Error(`Error al obtener teoría del ejercicio ${exerciseId}: ${error.message}`);
    }
  }

  /**
   * Obtiene ejercicios específicos de un módulo desde los archivos MCP
   */
  getExercisesByModule(module: string): any[] {
    try {
      const normalizedModule = module.toLowerCase().replace(/[-_\s]/g, '');
      let targetContext: MCPEducationalContext | undefined;

      // Mapeo explícito de módulos del frontend a contextos educativos
      const moduleMapping: { [key: string]: string } = {
        // Matemática
        'matemat': 'matematica-operaciones',
        'ecuaciones': 'ecuaciones-primer-grado',
        'ejercicioscombinados': 'operaciones-combinadas-enteros',
        'operacionescombinadas': 'operaciones-combinadas-enteros',
        
        // Lengua
        'lengua': 'lengua-espanol',
        'ortografia': 'ortografia-espanol',
        'clasesdepalabras': 'categorias-gramaticales',
        'categoriasgramaticales': 'categorias-gramaticales',
      };

      // Buscar en el mapeo
      const mappedId = Object.keys(moduleMapping).find(key => 
        normalizedModule.includes(key)
      );

      if (mappedId) {
        targetContext = educationalContexts.find(ctx => ctx.id === moduleMapping[mappedId]);
      } else {
        // Fallback: buscar por ID o nombre
        targetContext = educationalContexts.find(ctx => 
          ctx.id.toLowerCase().replace(/[-_\s]/g, '').includes(normalizedModule) || 
          ctx.name.toLowerCase().replace(/[-_\s]/g, '').includes(normalizedModule)
        );
      }

      if (!targetContext) {
        throw new Error(`Módulo '${module}' no encontrado`);
      }

      // Extraer ejercicios del contexto
      const exercises = (targetContext.content as any)?.exercises || [];
      
      // Transformar ejercicios al formato esperado por el frontend
      return exercises.map((exercise: any, index: number) => ({
        id: exercise.id || `${targetContext.id}-${index}`,
        title: exercise.title || `Ejercicio ${index + 1}`,
        instruction: exercise.instruction || '',
        questions: exercise.questions || [],
        difficulty: this.inferDifficulty(exercise),
        type: this.inferType(exercise, targetContext.id),
        contextId: targetContext.id,
        module: targetContext.name
      }));

    } catch (error) {
      console.error('Error en getExercisesByModule:', error);
      throw new Error(`Error al obtener ejercicios del módulo ${module}: ${error.message}`);
    }
  }

  /**
   * Infiere la dificultad de un ejercicio basado en su contenido
   */
  private inferDifficulty(exercise: any): 'easy' | 'medium' | 'hard' {
    const questionCount = exercise.questions?.length || 0;
    if (questionCount <= 3) return 'easy';
    if (questionCount <= 7) return 'medium';
    return 'hard';
  }

  /**
   * Infiere el tipo de ejercicio basado en su contenido y contexto
   */
  private inferType(exercise: any, contextId: string): string {
    if (contextId.includes('lengua')) {
      if (exercise.title?.toLowerCase().includes('ortograf')) return 'grammar';
      if (exercise.title?.toLowerCase().includes('palabra')) return 'vocabulary';
      if (exercise.title?.toLowerCase().includes('comprens')) return 'reading';
      return 'grammar';
    } else if (contextId.includes('matemat')) {
      if (exercise.title?.toLowerCase().includes('operacion')) return 'operations';
      if (exercise.title?.toLowerCase().includes('ecuacion')) return 'equations';
      if (exercise.title?.toLowerCase().includes('simbolic')) return 'symbolic';
      return 'arithmetic';
    }
    return 'general';
  }

  /**
   * Genera el prompt de contexto educacional
   */
  private getEducationalContextPrompt(relevantContexts: MCPEducationalContext[]): string {
    let contextInfo = '';
    if (relevantContexts.length > 0) {
      contextInfo = relevantContexts.map(ctx => `
=== CONTEXTO EDUCACIONAL: ${ctx.name.toUpperCase()} ===
${ctx.content.description}
TEMAS PRINCIPALES:
${ctx.content.mainTopics?.map(topic => `- ${topic}`).join('\n') || ''}
REGLAS IMPORTANTES:
${ctx.content.rules?.map(rule => `
• ${rule.title}:
${rule.content.map(content => `  - ${content}`).join('\n')}
${rule.examples ? `  Ejemplos: ${rule.examples.join(', ')}` : ''}
`).join('\n') || ''}
`).join('\n');
    }
    return contextInfo;
  }

  /**
   * Corrige una respuesta específica usando IA y contexto educacional
   */
  async correctAnswerWithAI(
    question: string, 
    userAnswer: string, 
    correctAnswer: string, 
    contextId: string,
    exerciseId?: string
  ): Promise<string> {
    try {
      const context = educationalContexts.find(ctx => ctx.id === contextId);
      if (!context) {
        throw new Error(`Contexto educativo '${contextId}' no encontrado`);
      }

      const contextInfo = this.getEducationalContextPrompt([context]);
      // Normalizar respuestas para comparación básica (quita mayúsculas, espacios y tildes comunes)
      const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').trim().toLowerCase();
      if (normalize(userAnswer) === normalize(correctAnswer)) {
        return '✅ Correcto. ¡Muy bien!';
      }
      
      const prompt = `
Eres EduBot, un tutor experto en "${context.name}". 

CONTEXTO EDUCATIVO:
${contextInfo}

TAREA: Corregir la respuesta de un estudiante y proporcionar explicación educativa.

PREGUNTA: ${question}
RESPUESTA CORRECTA: ${correctAnswer}
RESPUESTA DEL ESTUDIANTE: ${userAnswer}

INSTRUCCIONES:
1. Determina si la respuesta del estudiante es correcta o incorrecta
2. Si es incorrecta, explica por qué está mal usando las reglas del contexto educativo
3. Proporciona la respuesta correcta con explicación paso a paso
4. Da consejos específicos para mejorar
5. Sé amable y motivador

- FORMATO DE RESPUESTA (IMPORTANTE):
- Si la respuesta del estudiante ES CORRECTA: responde únicamente con una línea corta y motivadora, por ejemplo: "✅ Correcto. ¡Muy bien!". No brindes análisis ni explicación adicional ni uses símbolos de formato como ** o comillas invertidas.
 - Si la respuesta del estudiante ES CORRECTA: responde únicamente con una línea corta y motivadora, por ejemplo: "✅ Correcto. ¡Muy bien!". No brindes análisis ni explicación adicional ni uses símbolos de formato como ** o comillas invertidas.
- Si la respuesta del estudiante ES INCORRECTA: proporciona un bloque con las secciones siguientes (puedes usar varias líneas):
  Análisis: [evaluación clara]
  Explicación: [por qué es incorrecta según las reglas del contexto]
  Respuesta Correcta: [la solución con explicación paso a paso]
  Consejo: [cómo mejorar]
Solo las respuestas incorrectas deben incluir el análisis y la explicación extensa.
`;

      const response = await this.generateContentWithRetries({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      return response.text;
    } catch (error) {
      console.error('Error en correctAnswerWithAI:', error);
      throw new Error(`Error al corregir respuesta: ${error.message}`);
    }
  }
}