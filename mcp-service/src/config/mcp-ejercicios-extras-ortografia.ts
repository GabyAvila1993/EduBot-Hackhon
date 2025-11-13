import { MCPEducationalContext } from '../interfaces/mcp-educational-context.interface';

/**
 * Este contexto educativo contiene todas las actividades
 * del archivo 'Actividades Extra de Ortografía.pdf'.
 */
export const actividadesExtraContext: MCPEducationalContext = {
	id: 'ortografia-pdf-actividades',
	name: 'Actividades Extra de Ortografía (PDF)',
	keywords: [
		'ortografía', 'B y V', 'S, C y Z', 'G y J', 'sión y ción', 'ejercicios', 'completar', 'corregir',
	],
	priority: 9,
	content: {
		description: 'Ejercicios de ortografía extraídos del PDF "Actividades Extra de Ortografía", enfocados en el uso de B/V, S/C/Z, G/J y terminaciones -sión/-ción.',
		mainTopics: [
			'Uso de la B y V',
			'Uso de la S, C y Z',
			'Terminaciones -sión y -ción',
			'Uso de la G y J',
		],
		rules: [
			{
				title: 'Reglas de B y V (Extracto del PDF)',
				content: [
					"Se escribe con B después de M. Ejemplo: camba, tambor. /* cite: 30,31 */",
					"Se escribe con V las formas del verbo ir. Ejemplo: voy, vamos, van. /* cite: 28,32,33 */",
					"Se escribe con B las palabras que comienzan con bu-, bur-, bus. /* cite: 34 */",
					"Se escribe con V las palabras que comienzan con eva, eve, evi, evo. /* cite: 36 */",
				],
				examples: ['camba', 'voy', 'buscar', 'evaluar'],
			},
		],
		learningSteps: [],
		recommendations: [],
		sources: [
			'Actividades Extra de Ortografía.pdf',
		],
		// Aquí están todos los ejercicios del PDF con sus IDs
		exercises: [
			{
				id: 'ByV-1',
				title: 'Completar Palabras con B y V',
				instruction: 'Completa las siguientes palabras con B o V según corresponda. /* cite: 2 */',
				questions: [
					'Tu_o',
					'Nie_e',
					'Escri_ir',
					'_olsa',
					'A_uelo',
					'Pro_lema',
					'_aca',
					'A_entura',
				],
			},
			{
				id: 'ByV-2',
				title: 'Marcar la Palabra Bien Escrita (B y V)',
				instruction: 'Marca con una X (o elige) la palabra que está bien escrita. Presta atención a la pista si la hay. /* cite: 11 */',
				questions: [
					'Tubo / Tuvo (para "objeto")',
					'Benir / Venir',
					'Havlar / Hablar',
					'Bamos / Vamos',
					'Observar / Opservar',
				],
			},
			{
				id: 'ByV-3',
				title: 'Encuentra el error (B y V)',
				instruction: 'Las siguientes oraciones tienen errores en el uso de B y V. Escríbelas correctamente. /* cite: 18 */',
				questions: [
					'Vuelo en avioneta bajo el biento',
					'Mi hermano bino tarde',
					'Me enbió una carta',
					'Esa casa tiene una bentana rota',
					'El perro ladrava fuerte',
				],
			},
            {
                id: 'ByV-4',
                title:' Completa las reglas',
                instruction:'Escribe  la letra que falta (B y V) en las reglas',
                questions:[
                    '"Se escribe con _ después de M. Ejemplo: cam_a, tam_or."',
                    '"Se escribe con _ las formas del verbo ir. Ejemplo: _oy, _amos, _an."',
                    '"Se escribe con _ las palabras que comienzan con _u-, _ur-, _us."',
                    '"Se escribe con _ las palabras que comienzan con e_a, e_e, e_i, e_o."'
                ]
            },
			{
				id: 'SCZ-1',
				title: 'Palabras Escondidas (S, C y Z)',
				instruction: 'Encuentra 5 palabras en el siguiente texto que deberían escribirse con S, C o Z y corrígelas. /* cite: 38 */',
				questions: [
					'"La grasiosa niña recojió una roza hermoza del jardín. Su mamá la abrasó y le dio un becito antes de dormir"',
				],
			},
			{
				id: 'SCZ-2',
				title: 'Completar Palabras con S, C y Z',
				instruction: 'Completa las siguientes palabras con S, C o Z según corresponda.',
				questions: [
					'Pa_o (de caminar)',
					'Lu_e (brillo)',
					'Man_ana (fruta)',
					'Di_iplina',
					'Pe_o',
					'Pe_ebre',
					'Ve_indad',
					'Lu_ir',
					'Ra_ón',
				],
			},
			{
				id: 'SCZ-3',
				title: 'Construye Familias de Palabras (S, C y Z)',
				instruction: `'Forma tres familias de palabras (palabras derivadas) a partir de las siguientes raíces. '
                Ejemplo: Raíz: "feliz" → felizmente, felicidad.`,
				questions: [
					'Raíz: paz',
					'Raíz: Cruz',
					'Raíz: preciso',
				],
			},
			{
				id: 'SionCion-1',
				title: 'Marcar la Palabra Correcta (-sión, -ción, -zón)',
				instruction: 'Marca con una X (o elige) la palabra que está escrita correctamente. ',
				questions: [
					'Canción / Cansión',
					'Dezcanzar / descansar',
					'Emosión / Emoción',
					'Raíz / Raís',
                    'Corazón / Corasón',
				],
			},
			{
				id: 'SionCion-2',
				title: 'Completar y Clasificar Terminaciones',
				instruction: 'Completa las palabras y luego clasifícalas en una tabla según su terminación (-sión, -ción, -zón).',
				questions: [
					'Deci_ión',
					'Televi_ión',
					'Can_ión',
					'Confu_ión',
					'Rela_ión',
					'Pre_ión',
					'Rai_ón',
					'Ilu_ión',
					'Bendi_ión',
					'Oca_ión',
					'Cora_ón',
				],
			},
			{
				id: 'GyJ-1',
				title: 'Elegir la Palabra Correcta (G y J)',
				instruction: 'Lee las oraciones y elige la palabra (con G o J) que le da el sentido correcto. /* cite: 86 */',
				questions: [
					'El [viaje / viage] fue muy largo, pero lleno de aventuras.',
					'Mis hermanos es muy [lijero / ligero] para correr.',
					'El mago hizo un acto de [magia / majia] increíble.',
					'El policía [projió / protegió] al ciudadano.',
				],
			},
			{
				id: 'GyJ-2',
				title: 'Palabras Escondidas (G y J)',
				instruction: 'Piensa en una palabra con G o J que cumpla cada pista y escríbela.',
				questions: [
					'Lleva G y se usa para estudiar países',
					'Lleva J y se usa para servir líquido',
					'Lleva G y se refiere a una persona muy amable',
					'Lleva G y se usa para limpiar',
				],
			},
			{
				id: 'GyJ-3',
				title: 'Completar Palabras con G y J',
				instruction: 'Completa las siguientes palabras con G o J según corresponda. /* cite: 100 */',
				questions: [
					'Via_e',
					'Prote_er',
					'Ma_ia',
					'Diri_ir',
					'Exi_ir',
					'Corre_ir',
					'Ma_estuoso',
					'Refle_o',
				],
			},
			{
				id: 'GyJ-4',
				title: 'Adivina la Palabra (G y J)',
				instruction: 'Completa las palabras con G o J según la pista. /* cite: 109 */',
				questions: [
					'Instrumento musical de cuerdas: _uitarra',
					'Persona que manda: _efe',
					'Sinónimo de "andar de un lugar a otro": via_ar',
					'Don de realizar cosas maravillosas: ma_ia',
					'Opuesto de fino: _rueso',
				],
			},
		],
	},
};

