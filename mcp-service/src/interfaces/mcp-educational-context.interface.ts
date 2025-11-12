export interface Rule {
  title: string;
  content: string[];      // Descripción de la regla o pasos
  examples?: string[];    // Ejemplos prácticos
}

export interface MCPEducationalContext {
  id: string;             // Identificador único del contexto
  name: string;           // Nombre del contexto (ej: Ortografía del Español)
  keywords: string[];     // Palabras clave relacionadas
  priority?: number | string; // Nivel de importancia o prioridad
  content: {
    description: string;  // Descripción general del contexto
    mainTopics?: string[]; // Temas principales tratados
    rules?: Rule[];        // Lista de reglas o conceptos a enseñar
    learningSteps?: string[]; // Pasos para aprender o aplicar el tema
    recommendations?: string[]; // Consejos generales o sugerencias
    sources?: string[];     // Fuentes o referencias utilizadas
    
  };
}
