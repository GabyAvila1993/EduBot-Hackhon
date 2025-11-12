// src/controllers/chatbot.controller.ts

import { Controller, Post, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { GeminiService } from '../services/gemini.service';
import { ChatMessageDto, ChatResponseDto } from '../dto/chat-message.dto';

@Controller('assistant')
export class ChatbotController {
  constructor(private readonly geminiService: GeminiService) {}

  /**
   * Endpoint principal para interactuar con el asistente AURA
   * POST /assistant/interact
   */
  @Post('interact')
  async interact(@Body() chatMessage: ChatMessageDto): Promise<ChatResponseDto> {
    try {
      const { message, interactionType, module, difficulty, context, conversationHistory } = chatMessage;

      let response: string;
      let responseType: ChatResponseDto['responseType'];

      switch (interactionType) {
        case 'correction':
          response = await this.geminiService.correctExercise(message, module, context);
          responseType = 'correction';
          break;

        case 'exercise_request':
          response = await this.geminiService.generateExercise(
            module || 'ortografia', 
            difficulty || 'basico',
            context
          );
          responseType = 'exercise';
          break;

        case 'explanation':
          response = await this.geminiService.explainTopic(message, module);
          responseType = 'explanation';
          break;

        case 'conversation':
        default:
          response = await this.geminiService.handleConversation(message, conversationHistory);
          responseType = 'feedback';
          break;
      }

      return {
        response,
        responseType,
        moduleUsed: module,
        timestamp: new Date()
      };

    } catch (error) {
      throw new HttpException(
        {
          response: 'Lo siento, ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.',
          responseType: 'feedback',
          error: error.message,
          timestamp: new Date()
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Endpoint para corregir ejercicios específicamente
   * POST /assistant/correct
   */
  @Post('correct')
  async correctExercise(
    @Body() body: { answer: string; module?: string; exerciseContext?: string }
  ): Promise<ChatResponseDto> {
    try {
      const response = await this.geminiService.correctExercise(
        body.answer,
        body.module,
        body.exerciseContext
      );

      return {
        response,
        responseType: 'correction',
        moduleUsed: body.module,
        timestamp: new Date()
      };
    } catch (error) {
      throw new HttpException(
        {
          response: 'Error al corregir el ejercicio.',
          responseType: 'correction',
          error: error.message,
          timestamp: new Date()
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Endpoint para solicitar ejercicios nuevos
   * POST /assistant/generate-exercise
   */
  @Post('generate-exercise')
  async generateExercise(
    @Body() body: { 
      module: string; 
      difficulty?: 'basico' | 'intermedio' | 'avanzado';
      topic?: string;
    }
  ): Promise<ChatResponseDto> {
    try {
      const response = await this.geminiService.generateExercise(
        body.module,
        body.difficulty || 'basico',
        body.topic
      );

      return {
        response,
        responseType: 'exercise',
        moduleUsed: body.module,
        timestamp: new Date()
      };
    } catch (error) {
      throw new HttpException(
        {
          response: 'Error al generar el ejercicio.',
          responseType: 'exercise',
          error: error.message,
          timestamp: new Date()
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Endpoint para obtener explicaciones de temas
   * POST /assistant/explain
   */
  @Post('explain')
  async explainTopic(
    @Body() body: { topic: string; module?: string }
  ): Promise<ChatResponseDto> {
    try {
      const response = await this.geminiService.explainTopic(body.topic, body.module);

      return {
        response,
        responseType: 'explanation',
        moduleUsed: body.module,
        timestamp: new Date()
      };
    } catch (error) {
      throw new HttpException(
        {
          response: 'Error al explicar el tema.',
          responseType: 'explanation',
          error: error.message,
          timestamp: new Date()
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Endpoint para obtener los módulos educativos disponibles
   * GET /assistant/modules
   */
  @Get('modules')
  getModules() {
    try {
      return this.geminiService.getAvailableModules();
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error al obtener los módulos disponibles.',
          error: error.message
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Endpoint de salud del servicio
   * GET /assistant/health
   */
  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      service: 'AURA - Asistente Educativo',
      timestamp: new Date(),
      version: '1.0.0'
    };
  }
}