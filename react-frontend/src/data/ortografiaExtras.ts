export interface ExerciseItem {
  id: string;
  title: string;
  instruction?: string;
  questions: string[];
}

export const actividadesExtraExercises: ExerciseItem[] = [
  {
    id: 'ByV-1',
    title: 'Completar Palabras con B y V',
    instruction: 'Completa las siguientes palabras con B o V según corresponda.',
    questions: ['Tu_o', 'Nie_e', 'Escri_ir', '_olsa', 'A_uelo', 'Pro_lema', '_aca', 'A_entura'],
  },
  {
    id: 'ByV-2',
    title: 'Marcar la Palabra Bien Escrita (B y V)',
    instruction: 'Marca con una X (o elige) la palabra que está bien escrita.',
    questions: ['Tubo / Tuvo (para "objeto")', 'Benir / Venir', 'Havlar / Hablar', 'Bamos / Vamos', 'Observar / Opservar'],
  },
  {
    id: 'ByV-3',
    title: 'Corregir Oraciones (B y V)',
    instruction: 'Las siguientes oraciones tienen errores en el uso de B y V. Escríbelas correctamente.',
    questions: ['Vuelo en avioneta bajo el biento', 'Mi hermano bino tarde', 'Me enbió una carta', 'Esa casa tiene una bentana rota', 'El perro ladrava fuerte'],
  },
  {
    id: 'SCZ-1',
    title: 'Corregir Texto (S, C y Z)',
    instruction: 'Encuentra 5 palabras que deberían escribirse con S, C o Z y corrígelas.',
    questions: ['La grasiosa niña recojió una roza hermoza del jardín. Su mamá la abrasó y le dio un becito antes de dormir'],
  },
  {
    id: 'SCZ-2',
    title: 'Completar Palabras con S, C y Z',
    instruction: 'Completa las siguientes palabras con S, C o Z según corresponda.',
    questions: ['Pa_o (de caminar)', 'Lu_e (brillo)', 'Man_ana (fruta)', 'Di_iplina', 'Pe_o', 'Pe_ebre', 'Ve_indad', 'Lu_ir', 'Ra_ón'],
  },
  {
    id: 'SionCion-1',
    title: 'Marcar la Palabra Correcta (-sión, -ción)',
    instruction: 'Marca la palabra que está escrita correctamente.',
    questions: ['Canción / Cansión', 'Dezcanzar / descansar', 'Emosión / Emoción', 'Raíz / Raís'],
  },
  {
    id: 'GyJ-1',
    title: 'Elegir la Palabra Correcta (G y J)',
    instruction: 'Elige la palabra (con G o J) que da el sentido correcto.',
    questions: ['El [viaje / viage] fue muy largo, pero lleno de aventuras.', 'Mis hermanos es muy [lijero / ligero] para correr.', 'El mago hizo un acto de [magia / majia] increíble.', 'El policía [projió / protegió] al ciudadano.'],
  },
];

export default actividadesExtraExercises;
