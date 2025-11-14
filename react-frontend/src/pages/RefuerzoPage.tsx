import React from 'react';
import algebraImg from '../images/algebra.png';
import ortografiaImg from '../images/Ortografia.png';
import { useNavigate } from 'react-router-dom';

const RefuerzoPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="p-8">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex flex-col gap-2">
              <p className="text-[#111318] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                Mi Centro de Refuerzo
              </p>
              <p className="text-[#616f89] dark:text-gray-400 text-base font-normal leading-normal">
                Revisa tus errores, repasa y sigue mejorando.
              </p>
            </div>
          </div>

          <div>
            <div className="flex border-b border-gray-200 dark:border-gray-700 gap-8">
              <button className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-primary pb-[13px] pt-4">
                <p className="text-primary text-sm font-bold leading-normal tracking-[0.015em]">Errores Recientes</p>
              </button>
              <button className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#616f89] dark:text-gray-400 pb-[13px] pt-4 hover:text-[#111318] dark:hover:text-white">
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Material de Estudio</p>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-full">
              <div className="flex flex-col items-stretch justify-start rounded-lg xl:flex-row xl:items-start shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/50">
                <img src={algebraImg} alt="Álgebra" className="card-img-algebra w-full xl:w-2/5 xl:max-w-xs bg-center bg-no-repeat aspect-video xl:aspect-auto xl:h-full bg-cover rounded-t-lg xl:rounded-l-lg xl:rounded-r-none object-cover" />
                <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-4">
                  <p className="text-[#616f89] dark:text-gray-400 text-sm font-normal leading-normal">
                    Error en Álgebra
                  </p>
                  <p className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                    ¿Cuál es el valor de x en 2x + 3 = 11?
                  </p>
                  <div className="flex flex-col items-start gap-3 justify-between mt-2 sm:flex-row sm:items-end">
                    <div className="flex flex-col gap-1">
                      <p className="text-[#616f89] dark:text-gray-400 text-base font-normal leading-normal">
                        <span className="text-red-500">Tu respuesta: x = 5.</span> Respuesta correcta: x = 4.
                      </p>
                      <p className="text-[#616f89] dark:text-gray-400 text-base font-normal leading-normal">
                        Error de tipo: Cálculo.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                      <button onClick={() => navigate('/practica-matematica')} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-medium leading-normal w-full sm:w-auto">
                        <span className="truncate">Practicar este tema</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="flex flex-col items-stretch justify-start rounded-lg xl:flex-row xl:items-start shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark/50">
                <img src={ortografiaImg} alt="Ortografía" className="card-img-ortografia w-full xl:w-2/5 xl:max-w-xs bg-center bg-no-repeat aspect-video xl:aspect-auto xl:h-full bg-cover rounded-t-lg xl:rounded-l-lg xl:rounded-r-none object-cover" />
                <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-4">
                    <p className="text-[#616f89] dark:text-gray-400 text-sm font-normal leading-normal">Errores de Ortografía</p>
                    <p className="text-[#111318] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">¿Cuál es la forma correcta: "Tuvo" o "Tubo"?</p>
                    <div className="flex flex-col items-start gap-3 justify-between mt-2 sm:flex-row sm:items-end">
                      <div className="flex flex-col gap-1">
                        <p className="text-[#616f89] dark:text-gray-400 text-base font-normal leading-normal"><span className="text-red-500">Tu respuesta: Tubo.</span> Respuesta correcta: Tuvo.</p>
                        <p className="text-[#616f89] dark:text-gray-400 text-base font-normal leading-normal">Error de tipo: Ortográfico (B/V).</p>
                      </div>
                      <div className="flex flex-col gap-2 w-full sm:w-auto">
                        <button onClick={() => navigate('/practica-ortografia')} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-medium leading-normal w-full sm:w-auto">
                          <span className="truncate">Practicar este tema</span>
                        </button>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="xl:col-span-1 flex flex-col gap-6 sticky top-8 h-fit">
          <div className="bg-white dark:bg-background-dark/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold text-[#111318] dark:text-white">Mi Progreso General</h3>
            <p className="text-sm text-[#616f89] dark:text-gray-400 mb-6">
              ¡Sigue así, estás haciendo un gran trabajo!
            </p>
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-gray-200 dark:text-gray-700"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-primary progress-circle-65"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#111318] dark:text-white">65%</span>
                <span className="text-sm text-[#616f89] dark:text-gray-400">Reforzado</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div className="progress-bar-65 bg-primary h-2.5 rounded-full"></div>
            </div>
          </div>

          <div className="bg-white dark:bg-background-dark/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold text-[#111318] dark:text-white">Sugerencias para ti</h3>
            <p className="text-sm text-[#616f89] dark:text-gray-400 mb-6">
              Estos son tus próximos pasos para seguir mejorando.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/10 dark:bg-primary/20">
                <div className="flex-shrink-0 size-8 bg-primary rounded-full text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">play_lesson</span>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-primary">Lección: Ecuaciones de primer grado</p>
                  <p className="text-sm text-[#616f89] dark:text-gray-300">
                    Un video corto para recordar los pasos clave.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-gray-100 dark:bg-white/10">
                <div className="flex-shrink-0 size-8 bg-gray-600 rounded-full text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-base">quiz</span>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-[#111318] dark:text-white">Práctica: La célula y sus partes</p>
                  <p className="text-sm text-[#616f89] dark:text-gray-400">
                    5 ejercicios rápidos para afianzar el conocimiento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      
    </section>
  );
};

export default RefuerzoPage;
