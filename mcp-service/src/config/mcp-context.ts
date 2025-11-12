import { MCPContext } from '../interfaces/mcp-context.interface';
import { MCPEducationalContext } from '../interfaces/mcp-educational-context.interface';
import {categoriasGramaticalesContext} from './mcp-categorias-gramaticales';
import {ortografiaContext} from './mcp-ortografia-espaniol';
import {ecuacionesContext} from './mcp-ecuaciones';
import {operacionesCombinadasContext} from './mcp-ejercicioscombinados';
import {matematicaContext} from './mcp.ejercicios-matematica';
import {lenguaContext} from './mcp.ejercicicos-lengua';



export const eduBotContext: MCPContext = {
  projectInfo: {
    name: "EduBot",
    botName: "AURA",
    descriptionBotName: "Asistente Útil de Respuesta Automatizada",
    description: "Asistente educativo que ayuda a los estudiantes a aprender y practicar temas de Lengua y Matemática mediante explicaciones, ejercicios y correcciones.",
    mission: "Fomentar el aprendizaje autónomo a través de la IA, ofreciendo apoyo escolar accesible y claro.",
    vision: "Convertirse en el asistente educativo más completo del mundo hispano, integrando Lengua, Matemática y otras áreas del conocimiento.",
    targetAudience: [
      "Estudiantes de todos los niveles",
      "Docentes y tutores",
      "Usuarios autodidactas",
      "Instituciones educativas con interés en IA educativa"
    ]
  },

  features: [
    { id: "F1", name: "Corrección ortográfica y gramatical", description: "Explica errores de escritura y gramática, con ejemplos y reglas.", priority: "high" },
    { id: "F2", name: "Asistente matemático", description: "Ayuda a resolver ecuaciones paso a paso explicando el razonamiento.", priority: "high" },
    { id: "F3", name: "Modo de práctica guiada", description: "Permite aprender con ejercicios interactivos y autoevaluaciones.", priority: "medium" },
    { id: "F4", name: "Aprendizaje por módulos", description: "Cada tema (Lengua o Matemática) se organiza en módulos temáticos.", priority: "high" },
    { id: "F5", name: "Soporte conversacional", description: "AURA responde en lenguaje natural adaptado al nivel del usuario.", priority: "medium" }
  ],

  userStories: [
    { id: "HU1", title: "Aprender ortografía", description: "Como estudiante quiero aprender reglas ortográficas con ejemplos.", sprint: 1 },
    { id: "HU2", title: "Practicar categorías gramaticales", description: "Como usuario quiero identificar sustantivos, verbos, adjetivos, etc.", sprint: 2 },
    { id: "HU3", title: "Resolver ecuaciones", description: "Como estudiante quiero que el bot me enseñe a resolver ecuaciones paso a paso.", sprint: 3 },
    { id: "HU4", title: "Traducir lenguaje cotidiano a algebraico", description: "Como estudiante quiero comprender cómo convertir frases en expresiones matemáticas.", sprint: 3 }
  ],

  technicalStack: {
    frontend: ["React", "Tailwind", "TypeScript"],
    backend: ["Node.js", "Express", "TypeScript"],
    apis: ["Gemini AI", "OpenAI API"]
  }
};

// 🔹 Contextos educativos combinados
export const educationalContexts: MCPEducationalContext[] = [
  ortografiaContext,
  categoriasGramaticalesContext,
  ecuacionesContext,
  operacionesCombinadasContext,
  matematicaContext,
  lenguaContext
];
