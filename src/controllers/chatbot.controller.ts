import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { GeminiService } from '../services/gemini.service';
import { ChatMessageDto } from '../dto/chat-message.dto';

@Controller('api/chatbot')
export class ChatbotController {
    constructor(private readonly geminiService: GeminiService) { }

    @Post('message')
    async sendMessage(@Body() chatMessage: ChatMessageDto) {
        try {
            if (!chatMessage.message || chatMessage.message.trim() === '') {
                throw new HttpException(
                    'El mensaje no puede estar vacío',
                    HttpStatus.BAD_REQUEST
                );
            }

            const response = await this.geminiService.generateResponse(
                chatMessage.message
            );

            return {
                success: true,
                data: {
                    userMessage: chatMessage.message,
                    botResponse: response,
                    timestamp: new Date().toISOString()
                }
            };
        } catch (error) {
            console.error('Error en sendMessage:', error);
            throw new HttpException(
                error.message || 'Error al procesar el mensaje',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Post('feature')
    async getFeatureInfo(@Body() body: { featureId: string }) {
        try {
            const response = await this.geminiService.getFeatureInfo(body.featureId);

            return {
                success: true,
                data: {
                    featureId: body.featureId,
                    response: response,
                    timestamp: new Date().toISOString()
                }
            };
        } catch (error) {
            throw new HttpException(
                'Error al obtener información de la funcionalidad',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Get('health')
    healthCheck() {
        return {
            success: true,
            message: 'Chatbot service is running',
            timestamp: new Date().toISOString(),
            version: process.env.CHATBOT_VERSION || '1.0.0'
        };
    }

    @Get('context')
    getContext() {
        return {
            success: true,
            data: {
                projectName: 'SaludMap',
                description: 'Tu Guía Sanitaria y Veterinaria',
                availableFeatures: [
                    'Mapa Interactivo',
                    'Reserva de Turnos',
                    'Modo Offline',
                    'Soporte Multilingüe',
                    'Integración con Seguros'
                ]
            }
        };
    }
    @Get('test')
    async testGemini(): Promise<string> {
        return this.geminiService.testConnection();
    }

}