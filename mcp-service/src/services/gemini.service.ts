/* import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

// --- 1. IMPORTA TU INTERFAZ Y DTO ---
import { MCPEducationalContext } from '../interfaces/mcp-educational-context.interface';
import { ChatMessageDto } from '../dto/chat-message.dto';
type EvaluationTaskDto = Extract<ChatMessageDto, { taskType: 'evaluate' }>;

// --- 2. IMPORTA TUS MCPs REALES ---
// (Asegúrate que los nombres de las variables exportadas sean correctos)
import { ecuacionesContext } from '../config/mcp-ecuaciones';
import { operacionesCombinadasContext } from '../config/mcp-ejercicioscombinados';
import { ortografiaContext } from '../config/mcp-ortografia-espaniol';
import { categoriasGramaticalesContext } from '../config/mcp-categorias-gramaticales';

// --- 3. DEFINE 'eduBotContext' AQUÍ ---
// (Ya que no se puede importar de 'mcp-context')
const eduBotContext = {
  projectInfo: {
    name: 'EduBot',
    botName: 'Profesor Virtual',
    description: 'Un asistente para ayudarte a aprender y practicar.',
    descriptionBotName: 'Asistente Educativo EduBot',
    mission: 'Proveer correcciones claras y pedagógicas.',
  },
  features: [
    { id: 'evaluacion', name: 'Evaluación de Ejercicios', description: 'Corrige tus ejercicios paso a paso.' },
    { id: 'chat', name: 'Chat de Consultas', description: 'Responde tus dudas sobre la teoría.' },
  ]
};
// -----------------------------------------------------

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;
  // Mapa para guardar TODOS los contextos educativos
  private allContexts = new Map<string, MCPEducationalContext>();

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('API key de Gemini no configurada.');
    }
    
    // --- CORRECCIÓN SDK: El SDK espera un objeto ---
    this.ai = new GoogleGenAI({ apiKey });
    
    // --- CORRECCIÓN CONSTRUCTOR: Carga los MCPs importados ---
    const contextsToLoad: MCPEducationalContext[] = [
        ecuacionesContext,
        operacionesCombinadasContext,
        ortografiaContext,
        categoriasGramaticalesContext
    ];
    
    contextsToLoad.forEach((ctx) => {
        this.allContexts.set(ctx.id, ctx);
    });
  }

  // --- LÓGICA DE BÚSQUEDA (Usa el mapa 'allContexts') ---
  private findRelevantEducationalContexts(message: string): MCPEducationalContext[] {
    const words = message.toLowerCase().split(/\s+/);
    return Array.from(this.allContexts.values()).filter(context => 
      context.keywords.some(keyword => 
        words.some(word => word.includes(keyword.toLowerCase()))
      )
    );
  }

  // --- LÓGICA DE PROMPT (Tu código original, sin cambios) ---
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

  // --- PROMPT PARA CHAT GENERAL (taskType: 'chat') ---
  private getChatSystemPrompt(message: string): string {
    const project = eduBotContext.projectInfo;
    const relevantContexts = this.findRelevantEducationalContexts(message);
    const contextInfo = this.getEducationalContextPrompt(relevantContexts);
    const hasRelevantContext = relevantContexts.length > 0;

    return `
Eres ${project.botName}, un asistente educativo amigable de ${project.name}.
Tu objetivo es responder preguntas generales sobre los temas educativos que conoces.

${hasRelevantContext ? contextInfo : 'Parece que el usuario pregunta sobre un tema general.'}

INSTRUCCIONES:
1. Responde la pregunta del usuario de forma clara y concisa.
2. Si la pregunta es sobre un tema del contexto, usa la información para responder.
3. Si la pregunta es una SOLICITUD DE CORRECCIÓN, indica amablemente que no puedes corregir en este chat, pero que debe usar la función de "evaluar" (enviando el 'taskType: "evaluate"').
4. Sé amigable y conversacional.

Usuario: ${message}
Respuesta:
`;
  }
  
  // --- PROMPT PARA CORRECCIÓN (taskType: 'evaluate') ---
  private getCorrectionSystemPrompt(dto: EvaluationTaskDto): string {
    const { exercise, userSolution, contextId } = dto;
    
    const context = this.allContexts.get(contextId);
    if (!context) {
        throw new NotFoundException(`Contexto educativo '${contextId}' no encontrado.`);
    }

    const contextInfo = this.getEducationalContextPrompt([context]);

    return `
Eres un tutor experto en "${context.name}". Tu única tarea es corregir el ejercicio de un estudiante.
Debes basar tu corrección ESTRICTA Y ÚNICAMENTE en las reglas y pasos definidos en este contexto:

--- CONTEXTO A USAR ---
${contextInfo}
-----------------------

TAREA:
1. Analiza el siguiente ejercicio y la solución del estudiante.
2. Compara la solución con las "REGLAS IMPORTANTES" del contexto.
3. Si la solución es correcta, felicita al estudiante.
4. Si es incorrecta, explica *exactamente en qué paso falló* (haciendo referencia a las reglas) y muestra la solución correcta paso a paso.
5. Sé amable y didáctico, usa el formato de respuesta solicitado.

FORMATO DE RESPUESTA:
- **Análisis**: Qué está bien y qué necesita mejora.
- **Corrección**: La respuesta correcta con explicación.
- **Consejos**: Sugerencias específicas para mejorar.

EJERCICIO A RESOLVER:
"${exercise}"

SOLUCIÓN DEL ESTUDIANTE:
"${userSolution}"

INICIA TU CORRECCIÓN:
`;
  }

  // =======================================================
  // --- MÉTODOS PÚBLICOS ---
  // =======================================================

  // --- FUNCIÓN DE CHAT GENERAL (taskType: 'chat') ---
  async generateResponse(userMessage: string): Promise<string> {
    try {
      const prompt = this.getChatSystemPrompt(userMessage);

      // --- CORRECCIÓN SDK: Usa tu sintaxis 'models.generateContent' ---
      const response = await this.ai.models.generateContent({
        model: "gemini-1.5-flash", // O el modelo que uses
        contents: [{ parts: [{ text: prompt }] }],
      });

      return response.text;
      
    } catch (error: any) {
      console.error('Error en generateResponse:', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // --- NUEVA FUNCIÓN DE EVALUACIÓN (taskType: 'evaluate') ---
  async evaluateExercise(dto: EvaluationTaskDto): Promise<string> {
    try {
      const prompt = this.getCorrectionSystemPrompt(dto);
      
      // --- CORRECCIÓN SDK: Usa tu sintaxis 'models.generateContent' ---
      const response = await this.ai.models.generateContent({
        model: "gemini-1.5-flash", // O el modelo que uses
        contents: [{ parts: [{ text: prompt }] }],
      });
      
      return response.text;

    } catch (error: any) {
      console.error('Error en evaluateExercise:', error);
      if (error instanceof NotFoundException) {
          throw error; // Lanza el error 404
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // --- FUNCIONES ADICIONALES (Corregido a 'eduBotContext') ---
  async getFeatureInfo(featureId: string): Promise<string> {
    const feature = eduBotContext.features.find(f => f.id === featureId);

    if (!feature) {
      return 'No encontré información sobre esa funcionalidad.';
    }
    const prompt = `Explica en detalle la funcionalidad "${feature.name}" de EduBot: ${feature.description}.`;
    
    // Esto llamará al CHAT general, lo cual es correcto.
    return this.generateResponse(prompt);
  }

  async testConnection(): Promise<string> {
    try {
      const result = await this.generateResponse('Hola, ¿cómo estás?');
      return `Conexión exitosa. Respuesta: ${result}`;
    } catch (error: any) {
      return `Error al conectar con Gemini: ${error.message || 'Desconocido'}`;
    }
  }
} */
/*import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { eduBotContext, educationalContexts } from '../config/mcp-context';
import { MCPEducationalContext } from '../interfaces/mcp-educational-context.interface';

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('API key de Gemini no configurada. Verifica tu archivo .env');
    }

    this.ai = new GoogleGenAI({ apiKey });
  }

  
  private findRelevantEducationalContexts(message: string): MCPEducationalContext[] {
    const words = message.toLowerCase().split(/\s+/);
    return educationalContexts.filter(context => 
      context.keywords.some(keyword => 
        words.some(word => word.includes(keyword.toLowerCase()))
      )
    );
  }

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

PASOS DE APRENDIZAJE:
${ctx.content.learningSteps?.map(step => `- ${step}`).join('\n') || ''}

RECOMENDACIONES:
${ctx.content.recommendations?.map(rec => `- ${rec}`).join('\n') || ''}
`).join('\n');
    }

    return contextInfo;
  }

  private getSystemPrompt(studentResponse: string, question?: string): string {
    const project = eduBotContext.projectInfo;
    const relevantContexts = this.findRelevantEducationalContexts(studentResponse);

    const projectInfo = `
Eres ${project.botName} (${project.descriptionBotName}), el asistente educativo de ${project.name}. Tu función principal es corregir y mejorar las respuestas de los estudiantes proporcionando retroalimentación constructiva.

INFORMACIÓN DEL PROYECTO:
- Nombre: ${project.name}
- Asistente: ${project.botName}
- Descripción: ${project.description}
- Misión: ${project.mission}

FUNCIONALIDADES PRINCIPALES:
${eduBotContext.features.map(f => `- ${f.name}: ${f.description}`).join('\n')}
`;

    const contextInfo = this.getEducationalContextPrompt(relevantContexts);
    const hasRelevantContext = relevantContexts.length > 0;

    return `
${projectInfo}

${hasRelevantContext ? contextInfo : ''}

INSTRUCCIONES PARA LA CORRECCIÓN:
1. Analiza la respuesta del estudiante de manera constructiva y empática.
2. ${hasRelevantContext ? 'He detectado términos relacionados con temas educativos específicos. Usa la información proporcionada arriba para dar una corrección precisa.' : 'Identifica el área de conocimiento y proporciona corrección apropiada.'}
3. Identifica tanto los aciertos como los errores en la respuesta.
4. Explica claramente por qué algo está correcto o incorrecto.
5. Proporciona la respuesta correcta con explicaciones detalladas.
6. Ofrece consejos específicos para mejorar el aprendizaje.
7. Sugiere recursos adicionales o ejercicios de práctica cuando sea apropiado.
8. Mantén un tono alentador y educativo, nunca crítico o desalentador.

FORMATO DE RESPUESTA:
- **Análisis**: Qué está bien y qué necesita mejora
- **Corrección**: La respuesta correcta con explicación
- **Consejos**: Sugerencias específicas para mejorar
- **Práctica**: Ejercicios o recursos adicionales (opcional)
`;
  }

  
  async generateResponse(userMessage: string): Promise<string> {
    try {
      // Combinar el prompt del sistema con el mensaje del usuario
      const systemPrompt = this.getSystemPrompt("");
      
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            parts: [
              { text: systemPrompt },
              { text: `\n\nUsuario: ${userMessage}` }
            ]
          }
        ],
      });

      return response.text;
      
    } catch (error: any) {
      console.error('Error al generar respuesta:', error);
      throw new Error(`Error al conectar con Gemini: ${error.message || 'Desconocido'}`);
    }
  }

  async getFeatureInfo(featureId: string): Promise<string> {
    const feature = saludMapContext.features.find(f => f.id === featureId);

    if (!feature) {
      return 'No encontré información sobre esa funcionalidad.';
    }

    const prompt = `Explica en detalle la funcionalidad "${feature.name}" de SaludMap: ${feature.description}. Incluye casos de uso y beneficios para el usuario.`;

    return this.generateResponse(prompt);
  }

  
  async testConnection(): Promise<string> {
    try {
      const result = await this.generateResponse('Hola');
      return ` Conexión exitosa. Respuesta: ${result}`;
    } catch (error: any) {
      return ` Error al conectar con Gemini: ${error.message || 'Desconocido'}`;
    }
  }
}
*/


// src/services/gemini.service.ts

// src/services/gemini.service.ts

import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { eduBotContext, educationalContexts } from '../config/mcp-context';
import { MCPEducationalContext } from '../interfaces/mcp-educational-context.interface';

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY no está definida en las variables de entorno');
    }
    // Inicialización correcta según la nueva API
    this.ai = new GoogleGenAI({ apiKey });
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
${educationalContexts.map(ctx => `- ${ctx.name}: ${ctx.content?.description || ''}`).join('\n')}

COMPORTAMIENTO:
- Siempre responde en español claro y pedagógico
- Adapta tu lenguaje al nivel del estudiante
- Cuando corrijas, explica el error y ofrece la respuesta correcta
- Cuando generes ejercicios, asegúrate de que sean progresivos y educativos
- Sé motivador y alienta el aprendizaje
- Proporciona ejemplos concretos
- Usa emojis ocasionalmente para hacer la interacción más amigable
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
2. Si es incorrecta, explica claramente el error
3. Proporciona la respuesta correcta con explicación paso a paso
4. Ofrece consejos para evitar ese error en el futuro
5. Muestra ejemplos similares si es necesario
6. Finaliza con un mensaje motivador

Formato de respuesta:
✅ o ❌ [Estado de la corrección]
[Explicación detallada]
[Solución correcta si aplica]
[Consejos y ejemplos]
[Mensaje motivador]
`;

      // Nueva sintaxis de la API @google/genai
      const response = await this.ai.models.generateContent({
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
**EJERCICIO - ${moduleContext.name}** (Nivel: ${difficulty})

[Instrucciones claras del ejercicio]

[Contenido del ejercicio]

Pista: [Una pista sutil si es apropiado]

---
Cuando termines, envía tu respuesta para que pueda corregirla.
`;

      // Nueva sintaxis de la API @google/genai
      const response = await this.ai.models.generateContent({
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

TAREA: Explicar el siguiente tema de forma educativa

TEMA: ${topic}
${module ? `MÓDULO: ${module}` : ''}

INSTRUCCIONES:
1. Proporciona una explicación clara y concisa
2. Usa ejemplos concretos y cotidianos
3. Estructura la explicación de lo simple a lo complejo
4. Incluye casos especiales si existen
5. Termina con ejercicios sugeridos

Formato de respuesta:
**EXPLICACIÓN: ${topic}**

[Definición clara]

**Ejemplos:**
[2-3 ejemplos concretos]

**Casos especiales:**
[Si aplica]

**Para practicar:**
[Sugerencias de ejercicios]
`;

      // Nueva sintaxis de la API @google/genai
      const response = await this.ai.models.generateContent({
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
          conversationHistory.map(h => `${h.role === 'user' ? 'Usuario' : 'AURA'}: ${h.content}`).join('\n');
      }

      const prompt = `
${systemPrompt}
${historyText}

MENSAJE DEL USUARIO: ${message}

Responde de forma natural, educativa y amigable. Si el usuario solicita ayuda específica, 
ofrece guiarlo hacia los módulos disponibles o generar ejercicios.
`;

      // Nueva sintaxis de la API @google/genai
      const response = await this.ai.models.generateContent({
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
}