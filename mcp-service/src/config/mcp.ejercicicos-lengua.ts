import { MCPEducationalContext } from '../interfaces/mcp-educational-context.interface';

export const lenguaContext: MCPEducationalContext = {
  id: 'lengua-espanol',
  name: 'Lengua y Gramática Española',
  keywords: ['ortografía', 'gramática', 'clases de palabras', 'lengua', 'español'],
  content: {
    description: 'Módulo educativo centrado en ortografía y clases de palabras del idioma español.',
    mainTopics: [
      'Uso correcto de B y V',
      'Uso correcto de S, C y Z',
      'Uso correcto de G y J',
      'Identificación de sustantivos, adjetivos y adverbios',
      'Tipos de adjetivos y sustantivos',
      'Conjunciones y modos verbales'
    ],
    rules: [
      { title: 'Uso de B/V', content: ['Se escrisbe con B después de M, y con V después de N. Ejemplo: cambiar, enviar.'] },
      { title: 'Uso de S/C/Z', content:['Las palabras terminadas en -ción se escriben con C si provienen de verbos terminados en -ar, y con S o Z en otros casos según la raíz.']},
      { title: 'Uso de G/J', content: ['Se escribe con G antes de E o I si proviene de una palabra con G en su familia léxica (por ejemplo, “coger” → “cogió”).'] },
      { title: 'Sustantivos', content: ['Nombran personas, lugares, cosas o ideas. Pueden ser propios, comunes, individuales o colectivos.'] },
      { title: 'Adjetivos', content: ['Acompañan al sustantivo para expresar una cualidad o característica. Pueden ser calificativos, numerales, gentilicios, etc.'] },
      { title: 'Adverbios', content: ['Modifican al verbo, adjetivo o a otro adverbio. Indican modo, lugar, tiempo, cantidad, etc.'] },
      { title: 'Conjunciones', content: ['Sirven para unir palabras o proposiciones. Pueden ser copulativas, adversativas, disyuntivas, etc.'] },
      { title: 'Modos Verbales', content: ['El modo imperativo se usa para expresar órdenes o mandatos.'] }
    ],
    exercises: [
      {
        id: 'ORT-1',
        title: 'Completa con la letra correcta (B/V, S/C/Z, G/J)',
        instruction: 'Completa la palabra con la letra correcta según las reglas ortográficas estudiadas.',
        questions: [
          'E__budo',
          'Ad__ertir',
          'Ca__les',
          'Deci__ión (de "decisivo")',
          'Exten__ión (de "extenso")',
          'Canadien__e',
          'Ven__er',
          'Acentua__ión (de "acento")',
          'Actri__es (plural de "actriz")',
          '__ente',
          'Pasa__ero',
          'Tu_o (acción de tener)',
          'Nie_e'
        ]
      },
      {
        id: 'GRAM-1',
        title: 'Clases de Palabras',
        instruction: 'Lee las oraciones e identifica lo que se te pide.',
        questions: [
          {
            question: 'En la oración "La casa bonita está lejos": ¿Qué clase de palabra es "casa"?',
            answerType: 'open'
          },
          {
            question: '¿Qué clase de palabra es "bonita"?',
            answerType: 'open'
          },
          {
            question: '¿Qué clase de palabra es "lejos"?',
            answerType: 'open'
          },
          {
            question: 'Identifica el sustantivo propio y el sustantivo colectivo en: "Argentina tiene una gran jauría."',
            answerType: 'open'
          },
          {
            question: 'En "Tengo dos gatos y estoy en primer año", ¿qué tipo de adjetivos numerales son "dos" y "primero"?',
            answerType: 'open'
          },
          {
            question: 'En "Mi profesor es francés", ¿qué tipo de adjetivo es "francés"?',
            answerType: 'open'
          },
          {
            question: 'En "El vaso de vidrio está sobre la mesa", ¿qué clase de palabra es "sobre"?',
            answerType: 'open'
          },
          {
            question: 'En "Ella canta y baila muy bien": identifica los dos verbos.',
            answerType: 'open'
          },
          {
            question: 'Identifica el adverbio de modo.',
            answerType: 'open'
          },
          {
            question: '¿A qué conjugación pertenecen los verbos AMAR, TEMER y PARTIR?',
            answerType: 'open'
          },
          {
            question: 'En "Quiero ir, pero no tengo dinero", ¿qué tipo de conjunción es "pero"?',
            answerType: 'open'
          },
          {
            question: '¿Cuál de estas oraciones utiliza el verbo en modo imperativo?\nA) Ojalá llueva.\nB) Llovió mucho.\nC) ¡Deja de llover!',
            answerType: 'multiple-choice',
            options: ['A', 'B', 'C']
          },
          {
            question: 'En "¡Hola! ¿Cómo estás?", ¿qué clase de palabra es "Hola"?',
            answerType: 'open'
          }
        ]
      }
    ]
  }
};
