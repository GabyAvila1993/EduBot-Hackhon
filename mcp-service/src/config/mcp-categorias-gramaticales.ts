
import { MCPEducationalContext } from '../interfaces/mcp-educational-context.interface';

export const categoriasGramaticalesContext: MCPEducationalContext = {
  id: 'categorias-gramaticales',
  name: 'Clases de Palabras o Categorías Gramaticales',
  keywords: [
    'categorías gramaticales', 'clases de palabras', 'sustantivo', 'adjetivo',
    'verbo', 'adverbio', 'preposición', 'conjunción', 'interjección', 
    'artículo', 'pronombre', 'gramática', 'lengua española'
  ],
  priority: 9,
  content: {
    description:
      'Las clases de palabras, o categorías gramaticales, son los grupos en los que se clasifican las palabras de una lengua según su función y forma dentro de la oración. Se dividen en variables (que cambian de forma) e invariables (que no cambian).',
    mainTopics: [
      'Palabras variables e invariables',
      'Sustantivo',
      'Adjetivo',
      'Artículo',
      'Pronombre',
      'Verbo',
      'Adverbio',
      'Preposición',
      'Conjunción',
      'Interjección'
    ],
    rules: [
      {
        title: 'Palabras variables e invariables',
        content: [
          'Las palabras variables cambian su forma según género, número, persona o tiempo. Incluyen sustantivos, adjetivos, artículos, pronombres y verbos.',
          'Las palabras invariables no cambian su forma. Incluyen adverbios, preposiciones, conjunciones e interjecciones.'
        ],
        examples: ['niña/niñas', 'rápido/rápida', 'ayer', 'con', '¡hola!']
      },
      {
        title: 'Sustantivo',
        content: [
          'Designa seres, objetos, lugares, sentimientos o ideas.',
          'Se clasifica en: propios, comunes, concretos, abstractos, individuales y colectivos.',
          'Tiene género (masculino/femenino) y número (singular/plural).'
        ],
        examples: [
          'Propios: Lucía, Argentina, Mendoza',
          'Comunes: árbol, mesa, montaña',
          'Concretos: flor, casa, hada',
          'Abstractos: amor, justicia, valentía',
          'Colectivos: enjambre, biblioteca'
        ]
      },
      {
        title: 'Adjetivo',
        content: [
          'Acompaña al sustantivo y le da cualidades o características.',
          'Tipos: calificativos, numerales, gentilicios.',
          'Numerales: cardinales (uno, dos), ordinales (primero, segundo), partitivos (mitad), múltiplos (doble).'
        ],
        examples: ['alto', 'rápido', 'segundo', 'cordobés']
      },
      {
        title: 'Artículo',
        content: [
          'Determina al sustantivo y concuerda con él en género y número.',
          'Tipos: determinados (el, la, los, las), indeterminados (un, una, unos, unas) y neutro (lo).'
        ],
        examples: ['el libro', 'una flor', 'lo difícil']
      },
      {
        title: 'Pronombre',
        content: [
          'Sustituye al sustantivo en una oración.',
          'Tipos: personales, posesivos, demostrativos, relativos, indefinidos, interrogativos/exclamativos.'
        ],
        examples: ['yo', 'tuyo', 'este', 'quien', 'alguien', 'qué']
      },
      {
        title: 'Verbo',
        content: [
          'Indica acción, estado o proceso.',
          'Tiene raíz (significado) y terminación o desinencia (forma).',
          'Tres conjugaciones: -ar, -er, -ir.',
          'Sufre accidentes gramaticales: persona, número, tiempo y modo.'
        ],
        examples: [
          'Primera conjugación: amar',
          'Segunda: temer',
          'Tercera: partir'
        ]
      },
      {
        title: 'Modo verbal',
        content: [
          'Indicativo: expresa acciones reales.',
          'Subjuntivo: expresa deseo o posibilidad.',
          'Imperativo: expresa orden o mandato.'
        ],
        examples: ['corre', 'ojalá estudies', '¡ven aquí!']
      },
      {
        title: 'Tiempo verbal',
        content: [
          'Los tiempos verbales indican cuándo ocurre la acción.',
          'Simples: formados por una palabra (amo, amaba, amé, amaré, amaría).',
          'Compuestos: formados por dos palabras, con el verbo auxiliar “haber” (he amado, había amado, habré amado).'
        ],
        examples: ['amaba', 'había temido', 'habré partido']
      },
      {
        title: 'Adverbio',
        content: [
          'Modifica al verbo, adjetivo u otro adverbio.',
          'Tipos: lugar, tiempo, modo, cantidad, duda, afirmación y negación.'
        ],
        examples: [
          'Lugar: aquí, allá, cerca',
          'Tiempo: hoy, mañana, después',
          'Modo: bien, mal, ágilmente',
          'Cantidad: mucho, poco, demasiado',
          'Duda: quizás, tal vez',
          'Afirmación: sí, claro',
          'Negación: no, jamás'
        ]
      },
      {
        title: 'Preposición',
        content: [
          'Palabra invariable que relaciona dos términos de una oración.',
          'Ejemplo: “El libro está sobre la mesa”.'
        ],
        examples: [
          'a', 'ante', 'bajo', 'con', 'de', 'desde', 'en', 
          'entre', 'hacia', 'hasta', 'para', 'por', 'según', 
          'sin', 'sobre', 'tras', 'vía'
        ]
      },
      {
        title: 'Conjunción',
        content: [
          'Une palabras u oraciones.',
          'Tipos: copulativas (y, e, ni), disyuntivas (o, u), adversativas (pero, sino), causales (porque), consecutivas (por lo tanto).'
        ],
        examples: ['y', 'pero', 'o', 'porque', 'así que']
      },
      {
        title: 'Interjección',
        content: [
          'Expresa emociones o sentimientos espontáneos.',
          'Puede manifestar sorpresa, dolor, alegría, saludo, etc.'
        ],
        examples: ['¡Ay!', '¡Hola!', '¡Bravo!', '¡Uf!']
      }
    ],
    learningSteps: [
      'Leer y comprender las definiciones de cada clase de palabra.',
      'Identificar ejemplos en oraciones cotidianas.',
      'Clasificar palabras según su función y forma.',
      'Practicar con ejercicios de identificación y uso.',
      'Crear oraciones aplicando todas las categorías gramaticales.'
    ],
    recommendations: [
      'Usar ejemplos concretos para comprender mejor las categorías.',
      'Reconocer los cambios en género, número y tiempo para entender las variables.',
      'Aplicar los conocimientos en la escritura cotidiana.',
      'Utilizar recursos visuales (cuadros o esquemas) para repasar.'
    ],
    sources: [
      'Material educativo: "Clases de palabras o categorías gramaticales".',
      'Gramática básica del español - RAE (Real Academia Española).'
    ],
    exercises: [
      {
        id: 'GRAM-1',
        title: 'Identificación de Clases de Palabras',
        instruction: 'Identifica la clase de palabra (sustantivo, verbo, adjetivo, adverbio, preposición, conjunción, artículo o pronombre) para cada palabra destacada en las siguientes oraciones.',
        questions: [
          'En la oración "El gato negro salta rápidamente", ¿qué clase de palabra es "rápidamente"?',
          'En "Yo compré un libro", ¿qué es "compré"?',
          'En "La casa grande está entre los árboles", ¿cuál es la clase de "entre"?',
          'En "Él y yo corremos", ¿qué clase de palabra es "y"?',
          'En "María estudia química", ¿qué clase es "María"?',
          'En "Este libro es interesante", identifica el pronombre demostrativo.',
          'En "Habló claramente", ¿qué palabra modifica al verbo?',
          'En "Un día soleado", ¿cuál es el artículo indeterminado?'
        ]
      }
    ]
  }
};
