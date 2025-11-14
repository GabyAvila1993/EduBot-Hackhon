export interface BaseQuestion {
  id?: string;
  text: string;
}

export type Question =
  | (BaseQuestion & { kind: 'fill' })
  | (BaseQuestion & { kind: 'choose'; options: string[] })
  | (BaseQuestion & { kind: 'correct' })
  | (BaseQuestion & { kind: 'mark'; options?: string[] })
  | (BaseQuestion & { kind: 'ruleFill' })
  | (BaseQuestion & { kind: 'text' });

export interface ExerciseItem {
  id: string;
  title: string;
  instruction?: string;
  questions: Question[];
}

export const actividadesExtraExercises: ExerciseItem[] = [
  {
    id: 'ByV-1',
    title: 'Completar Palabras con B y V',
    instruction: 'Completa las siguientes palabras con B o V según corresponda.',
    questions: [
      { kind: 'fill', text: 'Tu_o  | pista: acción de tener'  },
      { kind: 'fill', text: 'Nie_e' },
      { kind: 'fill', text: 'Escri_ir' },
      { kind: 'fill', text: '_olsa' },
      { kind: 'fill', text: 'A_uelo' },
      { kind: 'fill', text: 'Pro_lema' },
      { kind: 'fill', text: '_aca' },
      { kind: 'fill', text: 'A_entura' },
    ],
  },
  {
    id: 'ByV-2',
    title: 'Marcar la Palabra Bien Escrita (B y V)',
    instruction: 'Marca con una X (o elige) la palabra que está bien escrita.',
    questions: [
      { kind: 'choose', text: 'Tubo (para "objeto")  / Tuvo ', options: ['Tubo', 'Tuvo'] },
      { kind: 'choose', text: 'Benir / Venir', options: ['Benir', 'Venir'] },
      { kind: 'choose', text: 'Havlar / Hablar', options: ['Havlar', 'Hablar'] },
      { kind: 'choose', text: 'Bamos / Vamos', options: ['Bamos', 'Vamos'] },
      { kind: 'choose', text: 'Observar / Opservar', options: ['Observar', 'Opservar'] },
    ],
  },
  {
    id: 'ByV-3',
    title: 'Corregir Oraciones (B y V)',
    instruction: 'Las siguientes oraciones tienen errores en el uso de B y V. Escríbelas correctamente.',
    questions: [
      { kind: 'correct', text: 'Vuelo en avioneta bajo el biento' },
      { kind: 'correct', text: 'Mi hermano bino tarde' },
      { kind: 'correct', text: 'Me enbió una carta' },
      { kind: 'correct', text: 'Esa casa tiene una bentana rota' },
      { kind: 'correct', text: 'El perro ladrava fuerte' },
    ],
  },
  {
    id: 'ByV-4',
    title: 'Completa las reglas (B y V)',
    instruction: 'Escribe la letra que falta (B o V) en cada regla.',
    questions: [
      { kind: 'ruleFill', text: 'Se escribe con _ después de M. Ejemplo: cam_a, tam_or.' },
      { kind: 'ruleFill', text: 'Se escribe con _ las formas del verbo ir. Ejemplo: _oy, _amos, _an.' },
      { kind: 'ruleFill', text: 'Se escribe con _ las palabras que comienzan con _u-, _ur-, _us.' },
      { kind: 'ruleFill', text: 'Se escribe con _ las palabras que comienzan con e_a, e_e, e_i, e_o.' },
    ],
  },
  {
    id: 'SCZ-1',
    title: 'Corregir Texto (S, C y Z)',
    instruction: 'Encuentra 5 palabras que deberían escribirse con S, C o Z y corrígelas.',
    questions: [
      {
        kind: 'correct',
        text: 'La grasiosa niña recojió una roza hermoza del jardín. Su mamá la abrasó y le dio un becito antes de dormir',
      },
    ],
  },
  {
    id: 'SCZ-2',
    title: 'Completar Palabras con S, C y Z',
    instruction: 'Completa las siguientes palabras con S, C o Z según corresponda.',
    questions: [
      { kind: 'fill', text: 'Pa_o (de caminar)' },
      { kind: 'fill', text: 'Lu_e (brillo)' },
      { kind: 'fill', text: 'Man_ana (fruta)' },
      { kind: 'fill', text: 'Di_iplina' },
      { kind: 'fill', text: 'Pe_o' },
      { kind: 'fill', text: 'Pe_ebre' },
      { kind: 'fill', text: 'Ve_indad' },
      { kind: 'fill', text: 'Lu_ir' },
      { kind: 'fill', text: 'Ra_ón' },
    ],
  },
  {
    id: 'SCZ-3',
    title: 'Construye Familias de Palabras (S, C y Z)',
    instruction: 'Forma tres familias de palabras (palabras derivadas) a partir de las siguientes raíces.',
    questions: [
      { kind: 'text', text: 'Raíz: paz' },
      { kind: 'text', text: 'Raíz: Cruz' },
      { kind: 'text', text: 'Raíz: preciso' },
    ],
  },
  {
    id: 'SionCion-1',
    title: 'Marcar la Palabra Correcta (-sión, -ción, -zón)',
    instruction: 'Marca con una X (o elige) la palabra que está escrita correctamente.',
    questions: [
      { kind: 'choose', text: 'Canción / Cansión', options: ['Canción', 'Cansión'] },
      { kind: 'choose', text: 'Dezcanzar / descansar', options: ['Dezcanzar', 'descansar'] },
      { kind: 'choose', text: 'Emosión / Emoción', options: ['Emosión', 'Emoción'] },
      { kind: 'choose', text: 'Raíz / Raís', options: ['Raíz', 'Raís'] },
      { kind: 'choose', text: 'Corazón / Corasón', options: ['Corazón', 'Corasón'] },
    ],
  },
  {
    id: 'SionCion-2',
    title: 'Completar y Clasificar Terminaciones',
    instruction: 'Completa las palabras y luego clasifícalas en una tabla según su terminación (-sión, -ción, -zón).',
    questions: [
      { kind: 'fill', text: 'Deci_ión' },
      { kind: 'fill', text: 'Televi_ión' },
      { kind: 'fill', text: 'Can_ión' },
      { kind: 'fill', text: 'Confu_ión' },
      { kind: 'fill', text: 'Rela_ión' },
      { kind: 'fill', text: 'Pre_ión' },
      { kind: 'fill', text: 'Rai_ón' },
      { kind: 'fill', text: 'Ilu_ión' },
      { kind: 'fill', text: 'Bendi_ión' },
      { kind: 'fill', text: 'Oca_ión' },
      { kind: 'fill', text: 'Cora_ón' },
    ],
  },
  {
    id: 'GyJ-1',
    title: 'Elegir la Palabra Correcta (G y J)',
    instruction: 'Lee las oraciones y elige la palabra (con G o J) que le da el sentido correcto.',
    questions: [
      { kind: 'choose', text: 'El [viaje / viage] fue muy largo, pero lleno de aventuras.', options: ['viaje', 'viage'] },
      { kind: 'choose', text: 'Mis hermanos es muy [lijero / ligero] para correr.', options: ['lijero', 'ligero'] },
      { kind: 'choose', text: 'El mago hizo un acto de [magia / majia] increíble.', options: ['magia', 'majia'] },
      { kind: 'choose', text: 'El policía [projió / protegió] al ciudadano.', options: ['projió', 'protegió'] },
    ],
  },
  {
    id: 'GyJ-2',
    title: 'Palabras Escondidas (G y J)',
    instruction: 'Piensa en una palabra con G o J que cumpla cada pista y escríbela.',
    questions: [
      { kind: 'text', text: 'Lleva G y se usa para estudiar países' },
      { kind: 'text', text: 'Lleva J y se usa para servir líquido' },
      { kind: 'text', text: 'Lleva G y se refiere a una persona muy amable' },
      { kind: 'text', text: 'Lleva G y se usa para limpiar' },
    ],
  },
  {
    id: 'GyJ-3',
    title: 'Completar Palabras con G y J',
    instruction: 'Completa las siguientes palabras con G o J según corresponda.',
    questions: [
      { kind: 'fill', text: 'Via_e' },
      { kind: 'fill', text: 'Prote_er' },
      { kind: 'fill', text: 'Ma_ia' },
      { kind: 'fill', text: 'Diri_ir' },
      { kind: 'fill', text: 'Exi_ir' },
      { kind: 'fill', text: 'Corre_ir' },
      { kind: 'fill', text: 'Ma_estuoso' },
      { kind: 'fill', text: 'Refle_o' },
    ],
  },
  {
    id: 'GyJ-4',
    title: 'Adivina la Palabra (G y J)',
    instruction: 'Completa las palabras con G o J según la pista.',
    questions: [
      { kind: 'fill', text: 'Instrumento musical de cuerdas: _uitarra' },
      { kind: 'fill', text: 'Persona que manda: _efe' },
      { kind: 'fill', text: 'Sinónimo de "andar de un lugar a otro": via_ar' },
      { kind: 'fill', text: 'Don de realizar cosas maravillosas: ma_ia' },
      { kind: 'fill', text: 'Opuesto de fino: _rueso' },
    ],
  },
];

export default actividadesExtraExercises;
