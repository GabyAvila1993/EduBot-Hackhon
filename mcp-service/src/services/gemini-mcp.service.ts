import { Injectable } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Injectable()
export class GeminiMCPService {
  constructor(private readonly geminiService: GeminiService) {}

  /**
   * Devuelve la estructura de teoría tal como la resuelve el MCP (sin IA)
   */
  getRawTheoryForExercise(exerciseId: string): any {
    try {
      return this.geminiService.getTheoryByExerciseId(exerciseId);
    } catch (error) {
      throw new Error(`No se pudo obtener la teoría para ${exerciseId}: ${error.message}`);
    }
  }

  /**
   * Genera una explicación simplificada y amigable para el estudiante
   * usando el servicio Gemini ya existente.
   * Retorna un objeto con la teoría cruda y la explicación simplificada.
   */
  async getSimplifiedExplanationForExercise(exerciseId: string): Promise<{ theory: any; explanation: string }>{
    const theory = this.getRawTheoryForExercise(exerciseId);

    // Construir un topic claro para que Gemini explique de forma simple
    const topic = theory?.moduleName || theory?.exerciseTitle || exerciseId;
    const moduleName = theory?.moduleId || theory?.moduleName || undefined;

    try {
      const explanation = await this.geminiService.explainTopic(topic, moduleName);
      return { theory, explanation };
    } catch (error) {
      // Si hay fallo en Gemini, devolvemos la teoría cruda y un mensaje de error legible
      return { theory, explanation: `No se pudo generar la explicación con Gemini: ${error.message}` };
    }
  }
}
