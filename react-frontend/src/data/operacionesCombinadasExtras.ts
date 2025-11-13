export interface ExerciseItem {
  id: string;
  title: string;
  instruction?: string;
  questions: string[];
}

export const actividadesExtraExercises: ExerciseItem[] = [
  {
    id: 'op-comb-1-basicos',
    title: 'Básicos (Sin potencias ni raíces)',
    instruction: 'Resuelve los siguientes cálculos.',
    questions: [
      '20 - 4 * 3 + 15 / 5',
      '5 + (-3) * 4 - 10 / 2',
      '(-8) * 2 - 30 / (-6) + 7',
      '-14 + 20 / (-4) - (-2) * 6',
    ],
  },
  {
    id: 'op-comb-2-parentesis',
    title: 'Con Paréntesis',
    instruction: 'Resuelve los siguientes cálculos.',
    questions: [
      '4 * (5 + 3) - 10',
      '(12 - 4) * 2 + 30 / (5 - 2)',
      '25 - 3 * (1 + 4 * 2) + 6',
      '(-5) * (9 - 7) - ( -4 + 10)',
    ],
  },
  {
    id: 'op-comb-3-completos',
    title: 'Completos (Con Potencias y Raíces)',
    instruction: 'Resuelve los siguientes cálculos.',
    questions: [
      '3^2 + 10 / 2 - √16',
      '5 * (2 + 1)^2 - √100',
      '√81 + (-3)^3 / 9 + 4 * 5',
      '(√36 + 2^2) * (4 - 7)',
      '(-2)^4 + √49 - 3 * (5 + √4)',
    ],
  },
  {
    id: 'op-comb-4-mixta',
    title: 'Tanda Adicional (Práctica Mixta)',
    instruction: 'Resuelve los siguientes cálculos.',
    questions: [
      '4^2 + (10 - 5 * √4) - 6',
      '(-2)^3 + √81 / (5 - 2)',
      '30 / (4 - (-1)) + (2^3 - √25)',
      '[ 15 + (2 - 7) * 3 ] * √100',
      '√49 - (-3)^2 + 20 / (1 + 3)',
    ],
  },
];

export default actividadesExtraExercises;
