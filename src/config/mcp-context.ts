import {MCPContext} from '../interfaces/mcp-context.interface'

export const saludMapContext: MCPContext = {
  projectInfo: {
    name: "SaludMap",
    botName: "AURA",
    descriptionBotName: "Asistente Útil de Respuesta Automatizada",
    description: "Aplicación diseñada para facilitar el acceso a información sobre puntos de referencia sanitarios y veterinarios en un mapa interactivo",
    mission: "Facilitar el acceso a servicios sanitarios y veterinarios a turistas, residentes y dueños de mascotas mediante una aplicación móvil intuitiva y geolocalizada",
    vision: "Convertirnos en la herramienta líder para acceder a servicios de salud y veterinarios a nivel mundial",
    targetAudience: [
      "Turistas locales e internacionales",
      "Residentes en zonas turísticas",
      "Dueños de mascotas",
      "Usuarios que requieren turnos médicos rápidos",
      "Personas con limitaciones idiomáticas"
    ]
  },
  
  features: [
    {
      id: "F1",
      name: "Mapa Interactivo",
      description: "Geolocalización en tiempo real de hospitales, clínicas, farmacias y veterinarias con filtros por especialidad, horarios y seguros",
      priority: "high"
    },
    {
      id: "F2",
      name: "Reserva de Turnos",
      description: "Agendamiento instantáneo para consultas médicas o veterinarias con notificaciones y recordatorios",
      priority: "high"
    },
    {
      id: "F3",
      name: "Modo Offline",
      description: "Acceso a información guardada previamente, descarga de mapas para zonas sin internet",
      priority: "medium"
    },
    {
      id: "F4",
      name: "Soporte Multilingüe",
      description: "Traducción automática en 3 idiomas con posibilidad de expansión",
      priority: "medium"
    },
    {
      id: "F5",
      name: "Integración con Seguros",
      description: "Verificación de cobertura internacional y conexión directa con aseguradoras",
      priority: "high"
    }
  ],
  
  userStories: [
    {
      id: "HU1",
      title: "Visualizar ubicaciones en el mapa",
      description: "Como usuario quiero ver las ubicaciones de centros de salud en un mapa interactivo",
      sprint: 1
    },
    {
      id: "HU2",
      title: "Reservar turnos",
      description: "Como usuario quiero poder reservar turnos médicos y veterinarios",
      sprint: 1
    }
  ],
  
  technicalStack: {
    frontend: ["React Native", "Leaflet Maps", "JavaScript"],
    backend: ["Node.js", "NestJS", "TypeScript"],
    apis: ["Google Maps API", "Leaflet API", "Gemini AI"]
  }
};