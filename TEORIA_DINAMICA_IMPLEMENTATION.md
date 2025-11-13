# Implementación: Carga Dinámica de Teoría de Ejercicios

## Descripción General
Se ha implementado un sistema para cargar dinámicamente la teoría y descripción de los temas de ejercicios desde el backend, en lugar de utilizar contenido hardcodeado en el frontend.

## Cambios Implementados

### 1. Backend - GeminiService (mcp-service/src/services/gemini.service.ts)

**Nuevo método:** `getTheoryByExerciseId(exerciseId: string)`

```typescript
getTheoryByExerciseId(exerciseId: string): any
```

**Funcionalidad:**
- Busca un ejercicio específico por su ID en todos los contextos educativos
- Cuando encuentra el ejercicio, retorna:
  - `exerciseId`: ID del ejercicio
  - `exerciseTitle`: Título del ejercicio
  - `moduleId`: ID del módulo educativo
  - `moduleName`: Nombre del módulo
  - `moduleDescription`: Descripción del módulo (teoría principal)
  - `theory`: Objeto con mainTopics, rules, learningSteps, recommendations

**Ejemplo de uso:**
```
GET /assistant/theory/MAT-3
Respuesta:
{
  "exerciseId": "MAT-3",
  "exerciseTitle": "Ecuaciones",
  "moduleId": "matematica-operaciones",
  "moduleName": "Ecuaciones Algebraicas",
  "moduleDescription": "Las ecuaciones son...",
  "theory": {
    "mainTopics": [...],
    "rules": [...],
    "learningSteps": [...],
    "recommendations": [...]
  }
}
```

### 2. Backend - ChatbotController (mcp-service/src/controllers/chatbot.controller.ts)

**Nuevo endpoint:** `GET /assistant/theory/:exerciseId`

```typescript
@Get('theory/:exerciseId')
getTheory(@Param('exerciseId') exerciseId: string)
```

**Respuesta:**
```json
{
  "exerciseId": "MAT-3",
  "theory": { ... },
  "success": true
}
```

### 3. Frontend - API Service (react-frontend/src/services/api.ts)

**Nuevo método:** `getExerciseTheory(exerciseId: string)`

```typescript
getExerciseTheory: async (exerciseId: string) => {
  const response = await api.get(`/assistant/theory/${exerciseId}`);
  return response.data;
}
```

### 4. Frontend - MatematicaInfo.tsx (react-frontend/src/pages/MatematicaInfo.tsx)

**Cambios:**
- Convertido a componente funcional con hooks
- Añadido estado `exercises` con array de ejercicios:
  ```typescript
  interface Exercise {
    exerciseId: string;
    title: string;
    description?: string;
    theory?: any;
    loading?: boolean;
  }
  ```

- Implementado `useEffect` que carga la teoría de cada ejercicio al montarse:
  ```typescript
  useEffect(() => {
    const loadTheory = async () => {
      const updated = await Promise.all(
        exercises.map(async (ex) => {
          const response = await apiService.getExerciseTheory(ex.exerciseId);
          return {
            ...ex,
            description: response.theory?.moduleDescription || 'Descripción no disponible',
            theory: response.theory,
            loading: false
          };
        })
      );
      setExercises(updated);
    };
    loadTheory();
  }, []);
  ```

- La sección de ejercicios ahora renderiza dinámicamente usando `.map()`:
  ```tsx
  {exercises.map((exercise) => (
    <div key={exercise.exerciseId} className="...">
      {/* Card que muestra descripción cargada dinámicamente */}
      <p className="text-sm text-neutral-gray-dark">
        {exercise.loading ? 'Cargando descripción...' : exercise.description}
      </p>
    </div>
  ))}
  ```

### 5. Frontend - LenguaInfo.tsx (react-frontend/src/pages/LenguaInfo.tsx)

**Cambios idénticos a MatematicaInfo.tsx:**
- Convertido a componente con hooks
- Carga dinámicamente la teoría de:
  - ORT-1 (Ortografía)
  - GRAM-1 (Clases de Palabras)
- Muestra descripciones dinámicas en la UI

## Flujo de Datos

```
Frontend (MatematicaInfo.tsx)
   ↓
useState initializa exercises array con IDs
   ↓
useEffect se ejecuta al montar
   ↓
Para cada ejercicio, llama a apiService.getExerciseTheory()
   ↓
API Service (api.ts)
   ↓
GET /assistant/theory/:exerciseId
   ↓
Backend Controller (chatbot.controller.ts)
   ↓
Llama a geminiService.getTheoryByExerciseId()
   ↓
Backend Service (gemini.service.ts)
   ↓
Busca en educationalContexts el ejercicio con ese ID
   ↓
Retorna teoría/descripción del módulo
   ↓
Frontend actualiza estado con description cargada
   ↓
UI renderiza descripción dinámicamente
```

## IDs de Ejercicios Soportados

### Matemática:
- `MAT-1`: Operaciones Combinadas
- `MAT-2`: Traducción al Lenguaje Simbólico
- `MAT-3`: Ecuaciones
- `MAT-4`: Problemas Algebraicos

### Lengua:
- `ORT-1`: Ortografía
- `GRAM-1`: Clases de Palabras

## Ventajas de Esta Implementación

1. **Mantenibilidad**: Las descripciones se actualizan en un solo lugar (archivos MCP)
2. **Escalabilidad**: Fácil agregar nuevos ejercicios
3. **Reutilización**: El mismo método puede usarse en otros componentes
4. **Separación de Concerns**: Backend maneja la lógica de búsqueda, Frontend solo renderiza
5. **Carga en Tiempo Real**: Las descripciones se cargan cuando el usuario navega a la página
6. **Manejo de Estados**: Muestra "Cargando..." mientras se obtienen los datos

## Testing

Para verificar que funciona:

1. **Backend compilación:**
   ```powershell
   cd mcp-service
   npm run build
   ```
   (Sin errores)

2. **Frontend compilación:**
   ```powershell
   cd react-frontend
   npm run build
   ```
   (Sin errores de TypeScript)

3. **Prueba manual:**
   - Navegar a `/matematicas` o `/lengua`
   - Observar que las descripciones de ejercicios aparecen dinámicamente
   - Verificar en DevTools que se hacen requests a `/assistant/theory/:exerciseId`

## Archivos Modificados

```
Backend:
- mcp-service/src/services/gemini.service.ts (método getTheoryByExerciseId)
- mcp-service/src/controllers/chatbot.controller.ts (endpoint GET /theory/:exerciseId)

Frontend:
- react-frontend/src/services/api.ts (método getExerciseTheory)
- react-frontend/src/pages/MatematicaInfo.tsx (refactor a hooks con carga dinámica)
- react-frontend/src/pages/LenguaInfo.tsx (refactor a hooks con carga dinámica)
```

## Estructura de Respuesta Teórica

Cada respuesta del endpoint `/assistant/theory/:exerciseId` incluye:

```typescript
{
  exerciseId: string;          // ID del ejercicio (e.g., "MAT-3")
  exerciseTitle: string;       // Título (e.g., "Ecuaciones")
  moduleId: string;            // ID del módulo (e.g., "matematica-operaciones")
  moduleName: string;          // Nombre del módulo
  moduleDescription: string;   // Descripción principal (teoría)
  theory: {
    mainTopics: string[];      // Temas principales del módulo
    rules: RuleObject[];       // Reglas con ejemplos
    learningSteps: string[];   // Pasos de aprendizaje
    recommendations: string[]; // Recomendaciones para el aprendizaje
  }
}
```

## Próximas Mejoras Posibles

1. Cachear las respuestas en el frontend para evitar llamadas repetidas
2. Agregar un modal/sidebar que muestre la teoría completa
3. Implementar vista expandible de reglas y ejemplos
4. Agregar búsqueda/filtrado de teoría
5. Integrar panel de teoría directamente en componentes de ejercicios
