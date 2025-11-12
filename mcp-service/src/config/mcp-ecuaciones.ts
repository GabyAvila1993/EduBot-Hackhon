import {MCPEducationalContext} from '../interfaces/mcp-educational-context.interface';

export const ecuacionesContext: MCPEducationalContext = {
    id: 'ecuaciones-primer-grado',
    name: 'Resolución de Ecuaciones de Primer Grado',
    keywords: [
        'ecuaciones', 'álgebra', 'resolver ecuaciones', 'incógnita', 'despejar x', 
        'igualdad', 'lenguaje simbólico', 'lenguaje coloquial', 'plantear problemas', 
        'propiedad distributiva', 'verificación', 'términos semejantes'
    ],
    priority: 9,
    content: {
        description: 'Conjunto de reglas y pasos para resolver ecuaciones, que son igualdades donde aparecen elementos desconocidos (incógnitas). Resolverla significa encontrar el valor de la incógnita que hace verdadera la igualdad.',
        mainTopics: [
            'Identificar la incógnita y los miembros de la ecuación',
            'Agrupar términos semejantes (con y sin incógnita)',
            'Despejar la incógnita usando operaciones inversas',
            'Aplicar la propiedad distributiva',
            'Traducción de lenguaje coloquial a simbólico (plantear problemas)',
            'Verificación del resultado'
        ],
        rules: [
            {
                title: 'Pasos para Resolver una Ecuación',
                content: [
                    '1. Separar en términos en cada miembro de la igualdad.',
                    '2. Aplicar la propiedad distributiva si hay paréntesis. Ej: 3(x + 2) = 3x + 6.',
                    '3. Agrupar los términos con la incógnita (ej. \'x\') en un miembro y los términos numéricos en el otro.',
                    '4. Para pasar un término a otro miembro, se usa la operación inversa (lo que suma, pasa restando; lo que multiplica, pasa dividiendo).',
                    '5. Operar en cada miembro y obtener el valor de la incógnita (despejar \'x\').'
                ],
                examples: ['5x – 8 = 2 + 10x', '2x + 6 = 30 – 2x', '5(x – 3) = 4(x + 4)']
            },
            {
                title: 'Traducción de Lenguaje Coloquial a Simbólico',
                content: [
                    '"Un número" se representa con una letra (ej: x).',
                    '"El doble de un número" es 2x; "El triple" es 3x.',
                    '"Aumentado en..." significa sumar (+); "Disminuido en..." significa restar (-).',
                    '"El siguiente de un número" es (x + 1); "El anterior" es (x - 1).',
                    '"La mitad" es x / 2; "La tercera parte" es x / 3.'
                ],
                examples: ['El triple de un número menos 3 es -12  =>  3x - 3 = -12', 'El doble de un número más 9 es -27  =>  2x + 9 = -27']
            },
            {
                title: 'Verificación',
                content: [
                    'Consiste en reemplazar el valor de la incógnita que encontramos en la ecuación original.',
                    'Se resuelven las operaciones en ambos miembros.',
                    'Si se llega a una igualdad (ej: 20 = 20), el resultado es correcto.'
                ],
                examples: ['Si x = 5 en 2x + 1 = 11', 'Verificación: 2(5) + 1 = 11', '10 + 1 = 11', '11 = 11 (Correcto)']
            }
        ],
        learningSteps: [
            '1. Lee atentamente el problema o la ecuación.',
            '2. Si es un problema, plantea la ecuación traduciendo del lenguaje coloquial al simbólico.',
            '3. Separa en términos para identificar las operaciones.',
            '4. Resuelve aplicando los pasos: agrupar términos, despejar la incógnita.',
            '5. Realiza la verificación para asegurar que el resultado sea correcto.',
            '6. Responde la pregunta del problema (si es un problema).'
        ],
        recommendations: [
            'Prestar mucha atención a la regla de los signos en sumas, restas, multiplicaciones y divisiones.',
            'Ser ordenado al pasar términos de un miembro a otro.',
            'Verificar siempre el resultado, es la mejor forma de saber si lo hiciste bien.',
            'Practicar primero con ecuaciones simples antes de pasar a las que tienen paréntesis o son problemas.'
        ],
        sources: [
            'Material educativo: "Pasos para resolver una ecuación".',
            'Taller: "Lenguaje Simbólico".',
            'Ejercitación de álgebra básica.'
        ]
    }
};