import { MCPEducationalContext } from '../interfaces/mcp-educational-context.interface';

export const matematicaContext: MCPEducationalContext = {
  id: 'matematica-operaciones',
  name: 'Matemática: Operaciones y Lenguaje Simbólico',
  keywords: ['matemática', 'operaciones combinadas', 'ecuaciones', 'lenguaje simbólico', 'aritmética', 'álgebra'],
  content: {
    description: 'Módulo educativo centrado en operaciones combinadas, lenguaje simbólico y resolución de ecuaciones numéricas y de planteo.',
    mainTopics: [
      'Orden de las operaciones combinadas',
      'Uso de potencias y raíces',
      'Traducción al lenguaje simbólico algebraico',
      'Resolución de ecuaciones numéricas',
      'Planteo y resolución de problemas algebraicos'
    ],
    rules: [
      { title: 'Orden de Operaciones', content: ['1° Potencias y raíces, 2° Multiplicaciones y divisiones, 3° Sumas y restas.'] },
      { title: 'Paréntesis', content: ['Las operaciones dentro de paréntesis se resuelven primero.'] },
      { title: 'Lenguaje Simbólico', content: ['El lenguaje simbólico traduce enunciados matemáticos al uso de letras y símbolos, como x para representar números desconocidos.'] },
      { title: 'Ecuaciones', content: ['Resolver una ecuación consiste en encontrar el valor de la incógnita que hace verdadera la igualdad.'] },
      { title: 'Pasos para Resolver Ecuaciones', content: [
          '1. Simplificar cada lado.',
          '2. Agrupar términos semejantes.',
          '3. Despejar la incógnita.',
          '4. Verificar la solución sustituyendo el valor hallado.'
        ] },
      { title: 'Regla de Oro del Despeje', content: ['Todo término que cruza el signo igual cambia de operación: si suma pasa restando, si resta pasa sumando, si multiplica pasa dividiendo.'] }
    ],
    exercises: [
      {
        id: 'MAT-1',
        title: 'Operaciones Combinadas',
        instruction: 'Resuelve respetando el orden de las operaciones: 1° potencias y raíces, 2° multiplicaciones y divisiones, 3° sumas y restas. Resuelve primero los paréntesis.',
        questions: [
          '3³ + 20:4 - √25 * 2 =',
          '8 * (6 – 2) + √49 / 7 =',
          '(10 + 2)² + √3 * 27 - (40:8 - 1)³ =',
          '100:10 + 4² - √64 + 5 * (9-7) =',
          '³√27 + 5² - 6 * (18:6 - 2) ='
        ]
      },
      {
        id: 'MAT-2',
        title: 'Traducción al Lenguaje Simbólico',
        instruction: 'Utiliza el lenguaje simbólico de la matemática para expresar los siguientes enunciados.',
        questions: [
          'El doble de un número',
          'El anterior de un número',
          'La mitad de un número',
          'El cuadrado de la suma de dos números cualquiera',
          'El triple de un número aumentado en diez',
          'El siguiente de un número',
          'El cuadrado de ocho',
          'La suma de los cuadrados de dos números',
          'Un número disminuido en tres',
          'Un número cualquiera, mayor que cero y menor o igual que nueve'
        ]
      },
      {
        id: 'MAT-3',
        title: 'Resolución de Ecuaciones Numéricas',
        instruction: 'Encuentra el valor de x aplicando los pasos metodológicos: simplificar, agrupar y despejar.',
        questions: [
          '3x + 8 = 29',
          '5x - 4 = 2x + 11',
          '4(x + 3) = 24',
          '-3x + 10 = 15 - 8x',
          '7x - 2 + 3x = 28'
        ]
      },
      {
        id: 'MAT-4',
        title: 'Planteo y Resolución de Problemas Algebraicos',
        instruction: 'Traduce el lenguaje cotidiano a una ecuación y luego resuélvela para encontrar el número.',
        questions: [
          'El triple de un número más 5 es igual a 20. ¿Cuál es el número?',
          'El doble de un número disminuido en 7 es igual a -3. ¿Cuál es el número?',
          'La mitad de un número es igual a 9. ¿Cuál es el número?',
          'El consecutivo de un número es igual a 15. ¿Cuál es el número?',
          'El anterior de un número es 4. ¿Cuál es el número?'
        ]
      }
    ]
  }
};
