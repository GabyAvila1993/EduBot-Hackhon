/* import { z } from 'zod';

// 1. Schema para Chat: taskType es REQUERIDO
const chatTaskSchema = z.object({
  taskType: z.literal('chat'),
  message: z.string().min(1, 'El mensaje es requerido'),
});

// 2. Schema para Evaluación: taskType es REQUERIDO
const evaluateTaskSchema = z.object({
  taskType: z.literal('evaluate'),
  contextId: z.string().min(1, 'El ID del contexto es requerido'),
  exercise: z.string().min(1, 'El ejercicio es requerido'),
  userSolution: z.string().min(1, 'La solución del usuario es requerida'),
});

// 3. La Unión Discriminada (la parte más importante)
export const chatMessageSchema = z.discriminatedUnion('taskType', [
  chatTaskSchema,
  evaluateTaskSchema,
]);

// 4. El Tipo inferido (ahora será una unión correcta)
export type ChatMessageDto = z.infer<typeof chatMessageSchema>;

// 5. La función de validación
export const validateChatMessage = (body: any): ChatMessageDto => {
  return chatMessageSchema.parse(body);
}; */

// src/dto/chat-message.dto.ts

/**
 * DTO para mensajes del asistente educativo AURA
 */
export class ChatMessageDto {
  /**
   * Mensaje del usuario (puede ser un ejercicio o una pregunta)
   */
  message: string;

  /**
   * Tipo de interacción solicitada
   */
  interactionType: 'correction' | 'exercise_request' | 'explanation' | 'conversation';

  /**
   * Módulo educativo específico (opcional)
   * Ejemplos: 'ortografia', 'categorias_gramaticales', 'ecuaciones', 'operaciones_combinadas'
   */
  module?: string;

  /**
   * Dificultad solicitada para ejercicios (opcional)
   */
  difficulty?: 'basico' | 'intermedio' | 'avanzado';

  /**
   * Contexto adicional (ej: tema específico dentro del módulo)
   */
  context?: string;

  /**
   * ID de usuario para personalización (opcional)
   */
  userId?: string;

  /**
   * Historial de conversación (opcional, para contexto)
   */
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp?: Date;
  }>;
}

/**
 * DTO para la respuesta del asistente
 */
export class ChatResponseDto {
  /**
   * Respuesta generada por AURA
   */
  response: string;

  /**
   * Tipo de respuesta
   */
  responseType: 'correction' | 'exercise' | 'explanation' | 'feedback';

  /**
   * Puntuación o evaluación (si aplica)
   */
  score?: {
    correct: number;
    total: number;
    percentage: number;
  };

  /**
   * Ejercicio generado (si aplica)
   */
  exercise?: {
    question: string;
    type: string;
    hints?: string[];
    expectedAnswer?: string; // Para uso interno, no mostrar al usuario
  };

  /**
   * Retroalimentación detallada
   */
  feedback?: {
    strengths: string[];
    areasToImprove: string[];
    recommendations: string[];
  };

  /**
   * Módulo utilizado
   */
  moduleUsed?: string;

  /**
   * Timestamp de la respuesta
   */
  timestamp: Date;

  /**
   * Indica si hubo algún error
   */
  error?: string;
}