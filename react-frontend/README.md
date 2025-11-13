# EduBot - Panel Unificado Frontend

Este es el frontend de React para el sistema educativo EduBot, que proporciona una interfaz unificada para profesores y estudiantes.

## 🚀 Configuración Actualizada (React 19 + Vite)

Este proyecto ha sido migrado de **React con react-scripts** a **React 19 con Vite 5.4.3** para mejor rendimiento y experiencia de desarrollo.

### Versiones Principales
- **React**: 19.2.0
- **Vite**: 5.4.3
- **TypeScript**: 5.6.0
- **Tailwind CSS**: 3.3.0

## Características

- **Panel del Profesor**: Dashboard con estadísticas de estudiantes, tareas y notificaciones
- **Panel del Estudiante**: Dashboard personalizado con progreso, materias y tareas pendientes
- **Ejercicios Interactivos**: Módulos separados para matemáticas y lengua con ejercicios dinámicos
- **Modo Oscuro**: Soporte completo para tema claro y oscuro
- **Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **Navegación Intuitiva**: Sidebar con navegación clara entre secciones

## Tecnologías Utilizadas

- **React 19** con TypeScript
- **Vite** como herramienta de build
- **React Router** para navegación
- **Tailwind CSS** para estilos
- **Axios** para comunicación con API
- **Material Symbols** para iconografía

## Instalación y Uso

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo (puerto 3000)
npm run dev
```

El servidor estará disponible en `http://localhost:3000` con Hot Module Replacement (HMR) activado.

### Build de Producción

```bash
# Compilar TypeScript y crear build optimizado
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

### Preview de Producción

```bash
# Vista previa del build de producción
npm run preview
```

## Variables de Entorno

Crear un archivo `.env` con las siguientes variables (ya incluido):

```env
# Server Configuration
VITE_PORT=3000

# API Configuration
VITE_API_URL=http://localhost:3000

# App Configuration
VITE_APP_NAME=EduBot Panel Unificado
VITE_APP_VERSION=1.0.0
```

**Nota**: Las variables de entorno en Vite deben comenzar con `VITE_` para ser accesibles en el código.

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Sidebar.tsx     # Navegación lateral
│   ├── MCPMathematicsExercises.tsx  # Ejercicios de matemáticas
│   └── MCPLanguageExercises.tsx     # Ejercicios de lengua
├── pages/              # Páginas principales
│   ├── ProfesorPage.tsx    # Dashboard del profesor
│   ├── AlumnoPage.tsx      # Dashboard del estudiante
│   ├── CursosPage.tsx      # Página de materias
│   ├── RefuerzoPage.tsx    # Centro de refuerzo
│   └── PerfilPage.tsx      # Perfil del usuario
├── services/           # Servicios de API
│   └── api.ts         # Configuración y funciones de API
└── hooks/             # Custom hooks de React
```

## Instalación y Configuración

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   Crear archivo `.env` con:
   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm start
   ```

4. **Construir para producción**:
   ```bash
   npm run build
   ```

## Conexión con Backend

El frontend está configurado para conectarse con el backend NestJS en `http://localhost:3001`. 

### Endpoints principales:
- `GET /exercises/mathematics` - Obtener ejercicios de matemáticas
- `GET /exercises/language` - Obtener ejercicios de lengua
- `POST /exercises/results` - Enviar resultados de ejercicios
- `GET /students/:id/progress` - Obtener progreso del estudiante
- `GET /teacher/stats` - Obtener estadísticas del profesor

## Características del Diseño

### Colores del Sistema
- **Primario**: `#135bec` (azul)
- **Éxito**: `#50E3C2` (verde)
- **Advertencia**: `#F8E71C` (amarillo)
- **Peligro**: `#D0021B` (rojo)

### Componentes Principales

1. **Sidebar**: Navegación lateral con modo oscuro
2. **Dashboard del Profesor**: Estadísticas, tareas recientes, atajos rápidos
3. **Dashboard del Estudiante**: Progreso, materias, tareas pendientes
4. **Ejercicios**: Sistema interactivo con preguntas, opciones y explicaciones
5. **Centro de Refuerzo**: Análisis de errores y material de estudio

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm test` - Ejecuta las pruebas
- `npm run build` - Construye la aplicación para producción
- `npm run eject` - Expone la configuración de webpack (irreversible)

## Próximas Mejoras

- [ ] Autenticación y autorización
- [ ] Notificaciones en tiempo real
- [ ] Sistema de gamificación
- [ ] Reportes y analytics
- [ ] Modo offline
- [ ] Accesibilidad mejorada

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
