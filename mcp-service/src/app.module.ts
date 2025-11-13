import { Module } from '@nestjs/common';
import { ChatbotController } from './controllers/chatbot.controller';
import { GeminiService } from './services/gemini.service';
import { GeminiMCPService } from './services/gemini-mcp.service';

@Module({
  imports: [],
  controllers: [ChatbotController],
  providers: [GeminiService, GeminiMCPService],
})
export class AppModule {}