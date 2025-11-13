// src/controllers/chatbot.controller.ts

import { Controller, Post, Get, Body, HttpException, HttpStatus, Param } from '@nestjs/common';
import { GeminiService } from '../services/gemini.service';
import { ChatMessageDto, ChatResponseDto } from '../dto/chat-message.dto';

@Controller('assistant')
export class ChatbotController {
  constructor(
    private readonly geminiService: GeminiService,
  ) {}

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
      // El frontend envía en body.answer un JSON string con { exercise, answers }
      let payload: any = {};
      try {
        payload = typeof body.answer === 'string' ? JSON.parse(body.answer) : body.answer;
      } catch (e) {
        // Si no se puede parsear, tratar body.answer como texto simple
        payload = { exercise: body.exerciseContext || '', answers: [body.answer] };
      }

      const exerciseId = payload.exercise || body.exerciseContext || '';
      const answers: string[] = Array.isArray(payload.answers) ? payload.answers : [payload.answers || ''];

      const structured = await this.geminiService.evaluateExerciseStructured(
        exerciseId,
        answers,
        body.module,
        body.exerciseContext
      );

      // Ejercicios extras deshabilitados temporalmente
      let extras = [];

      return {
        response: structured,
        responseType: 'correction',
        moduleUsed: body.module,
        timestamp: new Date(),
        exercise: {
          question: exerciseId || '',
          type: 'student-submission',
        },
        feedback: {
          strengths: [],
          areasToImprove: structured?.perQuestion ? structured.perQuestion.filter((p: any) => !p.isCorrect).map((p: any) => p.theory || p.analysis) : [],
          recommendations: structured?.recommendations || []
        },
        extraExercises: extras
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
   * Endpoint para corregir respuestas específicas con IA
   * POST /assistant/correct-answer
   */
  @Post('correct-answer')
  async correctAnswerWithAI(
    @Body() body: { 
      question: string; 
      userAnswer: string; 
      correctAnswer: string; 
      contextId: string;
      exerciseId?: string;
    }
  ): Promise<ChatResponseDto> {
    try {
      const response = await this.geminiService.correctAnswerWithAI(
        body.question,
        body.userAnswer,
        body.correctAnswer,
        body.contextId,
        body.exerciseId
      );

      return {
        response,
        responseType: 'correction',
        moduleUsed: body.contextId,
        timestamp: new Date()
      };
    } catch (error) {
      throw new HttpException(
        {
          response: 'Error al corregir la respuesta.',
          responseType: 'correction',
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
   * Devuelve los ejercicios en JSON para un módulo (por id o alias)
   * GET /assistant/exercises/:module
   */
  @Get('exercises/:module')
  getExercises(@Param('module') module: string) {
    try {
      const exercises = this.geminiService.getExercisesByModule(module);
      return {
        module: module,
        exercises: exercises,
        success: true
      };
    } catch (error) {
      throw new HttpException({ 
        message: 'Error al obtener ejercicios', 
        error: error.message,
        success: false 
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Devuelve ejercicios específicos por sus IDs
   * GET /assistant/exercises-by-ids/:ids (ids separados por comas: MAT-1,MAT-2)
   */
  @Get('exercises-by-ids/:ids')
  getExercisesByIds(@Param('ids') ids: string) {
    try {
      const exerciseIds = ids.split(',').map(id => id.trim());
      const exercises = this.geminiService.getExercisesByIds(exerciseIds);
      return {
        ids: exerciseIds,
        exercises: exercises,
        success: true
      };
    } catch (error) {
      throw new HttpException({ 
        message: 'Error al obtener ejercicios por IDs', 
        error: error.message,
        success: false 
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Devuelve el HTML de la plantilla para el módulo solicitado (si existe o genera)
   * GET /assistant/template/:module
   */
  @Get('template/:module')
  getTemplate(@Param('module') module: string) {
    try {
      const moduleId = this.normalizeModuleId(module);
      // Plantillas deshabilitadas temporalmente
      return { module: moduleId, html: '<p>Plantilla no disponible</p>' };
    } catch (error) {
      throw new HttpException({ message: 'Error al obtener plantilla', error: error.message }, HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Escribe (despliega) las plantillas HTML en Front/template usando los MCP locales
   * POST /assistant/deploy-templates
   */
  @Post('deploy-templates')
  async deployTemplates() {
    try {
      // Despliegue de plantillas deshabilitado temporalmente
      return { success: true, result: 'Despliegue deshabilitado' };
    } catch (error) {
      throw new HttpException({ message: 'Error al desplegar plantillas', error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private normalizeModuleId(module: string) {
    const m = (module || '').toLowerCase();
    if (m.includes('lengua') || m.includes('espanol') || m.includes('lengua-espanol')) return 'lengua-espanol';
    if (m.includes('matemat') || m.includes('matematica') || m.includes('matematica-operaciones')) return 'matematica-operaciones';
    return module;
  }

  
  @Get('Edu')
  EduCheck() {
    return {
      status: 'ok',
      service: 'AURA - Asistente Educativo',
      timestamp: new Date(),
      version: '1.0.0'
    };
  }
}