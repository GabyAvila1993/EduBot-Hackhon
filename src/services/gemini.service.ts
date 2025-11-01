import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { saludMapContext } from '../config/mcp-context';

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

    private getSystemPrompt(): string {
        const context = saludMapContext;

        return `Eres ${context.projectInfo.botName} (${context.projectInfo.descriptionBotName}), el asistente virtual de ${context.projectInfo.name}.

INFORMACIÓN DEL PROYECTO:
- Nombre: ${context.projectInfo.name}
- Asistente: ${context.projectInfo.botName} - ${context.projectInfo.descriptionBotName}
- Descripción: ${context.projectInfo.description}
- Misión: ${context.projectInfo.mission}
- Visión: ${context.projectInfo.vision}

AUDIENCIA OBJETIVO:
${context.projectInfo.targetAudience.map(a => `- ${a}`).join('\n')}

FUNCIONALIDADES PRINCIPALES:
${context.features.map(f => `- ${f.name}: ${f.description}`).join('\n')}

INSTRUCCIONES:
1. Responde siempre en español de forma clara y amigable
2. Si te preguntan sobre funcionalidades, usa la información proporcionada
3. Si no sabes algo específico, sé honesto y sugiere contactar al equipo
4. Mantén un tono profesional pero cercano
5. Enfócate en ayudar al usuario a entender y usar SaludMap

¿En qué puedo ayudarte hoy?`;
    }

    async generateResponse(userMessage: string): Promise<string> {
        try {
            const response = await this.ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [{
                    role: 'user',
                    parts: [{ text: `${this.getSystemPrompt()}\n\nUsuario: ${userMessage}` }]
                }]
            });

            return response.text;
        } catch (error: any) {
            const errorMsg = error?.message || 'Error desconocido';
            const status = error?.status || 'Sin código';
            const details = error?.errorDetails || null;

            console.error('Error al generar respuesta:', {
                mensaje: errorMsg,
                status,
                detalles: details,
            });

            throw new Error(`No pude procesar tu mensaje. Detalle: ${errorMsg}`);
        }
    }

    async getFeatureInfo(featureId: string): Promise<string> {
        const feature = saludMapContext.features.find(f => f.id === featureId);

        if (!feature) {
            return 'No encontré información sobre esa funcionalidad.';
        }

        const prompt = `Explica en detalle la funcionalidad "${feature.name}" de SaludMap: ${feature.description}. Incluye casos de uso prácticos y beneficios para el usuario.`;

        return this.generateResponse(prompt);
    }

    async testConnection(): Promise<string> {
        try {
            const result = await this.generateResponse('Hola');
            return `Conexión exitosa. Respuesta: ${result}`;
        } catch (error: any) {
            return `Error al conectar con Gemini: ${error.message || 'Desconocido'}`;
        }
    }
}
