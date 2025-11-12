import {MCPEducationalContext} from '../interfaces/mcp-educational-context.interface';

export const operacionesCombinadasContext: MCPEducationalContext = {
    id: 'operaciones-combinadas-enteros',
    name: 'Operaciones Combinadas con Números Enteros',
    keywords: [
        'operaciones combinadas', 'cálculos combinados', 'jerarquía de operaciones',
        'orden de operaciones', 'separar en términos', 'potencias', 'raíces',
        'multiplicación', 'división', 'suma', 'resta', 'paréntesis', 'regla de signos'
    ],
    priority: 9,
    content: {
        description: 'Conjunto de reglas y pasos para resolver cálculos que involucran múltiples operaciones (suma, resta, multiplicación, división, potenciación y radicación), respetando un orden específico para garantizar un resultado correcto.',
        mainTopics: [
            'Separación en términos',
            'Jerarquía de operaciones (orden de resolución)',
            'Uso de paréntesis, corchetes y llaves',
            'Aplicación de la regla de los signos'
        ],
        rules: [
            {
                title: '1. Separación en Términos',
                content: [
                    'Es el primer paso y el más importante.',
                    'Se debe separar en términos usando los signos de suma (+) y resta (-) que estén *fuera* de los paréntesis.',
                    'Cada término se resuelve por separado hasta que solo queden sumas y restas al final.'
                ],
                examples: ['En 2 . 3² + 12: 2 - 5, los términos son "2 . 3²", "+ 12: 2" y "- 5"']
            },
            {
                title: '2. Jerarquía de Operaciones (Orden)',
                content: [
                    'Una vez separados los términos, dentro de cada uno se resuelve respetando el siguiente orden:',
                    '1° Se resuelven las potencias y raíces.',
                    '2° Se resuelven las multiplicaciones y divisiones.',
                    '3° Se resuelven las sumas y restas.'
                ],
                examples: ['2 . 3² + 12: 2 = 2 . 9 + 6 = 18 + 6 = 24']
            },
            {
                title: '3. Uso de Paréntesis (Corchetes y Llaves)',
                content: [
                    'Los paréntesis ( ), corchetes [ ] y llaves { } alteran la jerarquía.',
                    'Se debe resolver *primero* lo que está *dentro* del paréntesis.',
                    'Si hay varios, se resuelven desde el más interno al más externo.',
                    'Dentro del paréntesis, se vuelve a aplicar la misma jerarquía (pasos 1 y 2).'
                ],
                examples: ['(4 – 7)² + 9 = (-3)² + 9 = 9 + 9 = 18', '3 . (7 . 2 – 20) = 3 . (14 - 20) = 3 . (-6) = -18']
            }
        ],
        learningSteps: [
            '1. Observar el cálculo completo.',
            '2. Separar en términos (marcando con arcos por encima).',
            '3. Identificar si hay paréntesis, corchetes o llaves.',
            '4. Resolver las operaciones *dentro* de los paréntesis (respetando la jerarquía).',
            '5. Resolver las potencias y raíces en cada término.',
            '6. Resolver las multiplicaciones y divisiones en cada término.',
            '7. Una vez que solo queden números sumando y restando, resolver de izquierda a derecha.'
        ],
        recommendations: [
            'Ser muy ordenado y volver a escribir todo el cálculo en el renglón de abajo después de cada paso.',
            'Prestar extrema atención a la regla de los signos, especialmente al multiplicar, dividir y quitar paréntesis.',
            'No saltear pasos, resolver una operación a la vez.'
        ],
        sources: [
            'Material educativo: "OPERACIONES COMBINADAS".',
            'Ejercitación XI.'
        ]
    }
};