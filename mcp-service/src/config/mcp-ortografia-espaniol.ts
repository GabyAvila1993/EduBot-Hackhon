import {MCPEducationalContext} from '../interfaces/mcp-educational-context.interface';

export const ortografiaContext: MCPEducationalContext = {
    id: 'ortografia-espanol',
    name: 'Ortografía del Español',
    keywords: [
        'ortografía', 'reglas ortográficas', 'escritura correcta', 'gramática', 
        'acentuación', 'signos de puntuación', 'tilde', 'letras b y v', 'c y z', 
        'g y j', 'uso de s', 'errores ortográficos', 'normas de escritura'
    ],
    priority: 8,
    content: {
        description: 'Conjunto de reglas que permiten escribir correctamente las palabras en español, utilizando adecuadamente las letras, tildes y signos de puntuación. Basado en material educativo de ortografía básica en lengua española.',
        mainTopics: [
            'Uso correcto de la B y la V',
            'Uso de la S',
            'Uso de la C y la Z',
            'Uso de la G y la J',
            'Identificación de errores ortográficos',
            'Importancia de escribir con claridad y coherencia'
        ],
        rules: [
            {
                title: 'Uso de la B y la V',
                content: [
                    'Detrás de M se escribe B. Ej: ámbito, timbre, embudo.',
                    'Se escriben con B los sonidos BR y BL. Ej: cubrir, cable.',
                    'Detrás de N se escribe V. Ej: advertir, convento.'
                ],
                examples: ['timbre', 'ambiente', 'advertir']
            },
            {
                title: 'Uso de la S',
                content: [
                    'Las palabras terminadas en -sión provienen de otras terminadas en -so, -sor, -sivo o -sible. Ej: evasión/ evasor.',
                    'Se escriben con S las terminaciones -sivo/-siva, -ísimo/-ísima, -erso/-ersa.',
                    'Llevan S los ordinales terminados en -ésimo/-ésima.',
                    'Se escriben con S los gentilicios terminados en -és/-esa o -ense.'
                ],
                examples: ['decisión', 'diversa', 'cordobés']
            },
            {
                title: 'Uso de la C y la Z',
                content: [
                    'La C puede tener sonido fuerte o suave según la combinación de letras.',
                    'Los verbos terminados en –cer se escriben con C. Ej: vencer.',
                    'Las palabras terminadas en –ción provienen de otras en -do, -dor, -to, -tor.',
                    'La Z se usa antes de A, O, U y pasa a C delante de E, I.'
                ],
                examples: ['apreciación', 'cazador', 'actriz']
            },
            {
                title: 'Uso de la G y la J',
                content: [
                    'La G tiene sonido suave delante de A, O, U (gato, mago) y fuerte delante de E, I (gente, imaginar).',
                    'Para que suene suave delante de E, I se agrega una U: (hoguera, guiso).',
                    'Se escriben con J las palabras terminadas en -jero y -jería.'
                ],
                examples: ['pasajero', 'brujería', 'guiso']
            }
        ],
        learningSteps: [
            'Lee con atención el texto y detecta palabras que “suenen raras”.',
            'Busca la regla ortográfica que se aplica (letras, tildes, signos).',
            'Compara con otras palabras parecidas.',
            'Usa el diccionario o tus apuntes para confirmar.',
            'Corrige y explica el motivo del error.'
        ],
        recommendations: [
            'Practicar ejercicios de escritura regularmente.',
            'Revisar las reglas ortográficas más comunes antes de escribir textos largos.',
            'Leer en voz alta para identificar posibles errores.',
            'Evitar confiar únicamente en correctores automáticos.'
        ],
        sources: [
            'Material educativo: "Recordamos qué es la ortografía".',
            'Normas ortográficas de la Real Academia Española (RAE).'
        ]
    }
};
