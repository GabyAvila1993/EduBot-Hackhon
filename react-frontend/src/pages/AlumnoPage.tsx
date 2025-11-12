import React from 'react';
import { Link } from 'react-router-dom';

const AlumnoPage: React.FC = () => {
  return (
    <div className="flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-full max-w-6xl px-4">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-neutral-gray-light/50 dark:border-neutral-gray-dark/30 px-6 py-4 bg-neutral-white dark:bg-background-dark rounded-xl shadow-sm">
          <div className="flex items-center gap-4 text-neutral-dark dark:text-neutral-white">
            <div className="text-primary-learnsphere size-7">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">LearnSphere</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-background-light-learnsphere dark:bg-background-dark text-neutral-dark dark:text-neutral-white hover:bg-neutral-gray-light/60 dark:hover:bg-neutral-gray-dark/30">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="avatar-img bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="Avatar de Alex"></div>
          </div>
        </header>

        <div className="flex flex-col gap-8 mt-8">
          <div className="flex flex-wrap justify-between gap-3 px-2">
            <div className="flex flex-col gap-2">
              <h1 className="text-neutral-dark dark:text-neutral-white text-4xl font-black leading-tight tracking-[-0.033em]">
                ¡Hola, Alex!
              </h1>
              <p className="text-neutral-gray-dark dark:text-neutral-gray-light text-base font-normal leading-normal">
                ¡Sigue así, vas por buen camino! Aquí tienes un resumen de tu día.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-neutral-white dark:bg-neutral-dark/30 border border-neutral-gray-light/50 dark:border-neutral-gray-dark/30 shadow-sm">
              <p className="text-base font-medium leading-normal text-neutral-dark dark:text-neutral-white">
                Puntos Totales
              </p>
              <p className="text-primary-learnsphere tracking-light text-3xl font-bold leading-tight">1,250</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-neutral-white dark:bg-neutral-dark/30 border border-neutral-gray-light/50 dark:border-neutral-gray-dark/30 shadow-sm">
              <p className="text-base font-medium leading-normal text-neutral-dark dark:text-neutral-white">
                Insignias Ganadas
              </p>
              <p className="text-primary-learnsphere tracking-light text-3xl font-bold leading-tight">8</p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-neutral-white dark:bg-neutral-dark/30 border border-neutral-gray-light/50 dark:border-neutral-gray-dark/30 shadow-sm">
              <p className="text-base font-medium leading-normal text-neutral-dark dark:text-neutral-white">
                Próxima Recompensa
              </p>
              <p className="text-primary-learnsphere tracking-light text-3xl font-bold leading-tight">Nivel Experto</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="bg-neutral-white dark:bg-neutral-dark/30 p-6 rounded-xl border border-neutral-gray-light/50 dark:border-neutral-gray-dark/30 shadow-sm">
                <h2 className="text-neutral-dark dark:text-neutral-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
                  Progreso General
                </h2>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-6 justify-between items-center">
                    <p className="text-neutral-dark dark:text-neutral-white text-base font-medium leading-normal">
                      Progreso del año escolar completado
                    </p>
                    <p className="text-primary-learnsphere text-lg font-bold leading-normal">75%</p>
                  </div>
                  <div className="w-full rounded-full bg-background-light-learnsphere dark:bg-background-dark h-3">
                    <div className="progress-75 h-3 rounded-full bg-success"></div>
                  </div>
                  <p className="text-neutral-gray-dark dark:text-neutral-gray-light text-sm font-normal leading-normal">
                    ¡Solo un 25% más para terminar!
                  </p>
                </div>
              </div>

              <div className="bg-neutral-white dark:bg-neutral-dark/30 p-6 rounded-xl border border-neutral-gray-light/50 dark:border-neutral-gray-dark/30 shadow-sm">
                <h2 className="text-neutral-dark dark:text-neutral-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
                  Mis Materias
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link to="/matematicas" className="flex items-center gap-4 rounded-lg p-4 bg-background-light-learnsphere dark:bg-background-dark hover:bg-neutral-gray-light/60 dark:hover:bg-neutral-gray-dark/30 cursor-pointer">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-primary-learnsphere/20 text-primary-learnsphere">
                      <span className="material-symbols-outlined">calculate</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-dark dark:text-neutral-white">Matemáticas</p>
                      <div className="w-full rounded-full bg-neutral-gray-light h-1.5 mt-1">
                        <div className="progress-85 h-1.5 rounded-full bg-primary-learnsphere"></div>
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-center gap-4 rounded-lg p-4 bg-background-light-learnsphere dark:bg-background-dark hover:bg-neutral-gray-light/60 dark:hover:bg-neutral-gray-dark/30 cursor-pointer">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-success/20 text-success">
                      <span className="material-symbols-outlined">science</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-dark dark:text-neutral-white">Ciencias</p>
                      <div className="w-full rounded-full bg-neutral-gray-light h-1.5 mt-1">
                        <div className="progress-65 h-1.5 rounded-full bg-success"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-lg p-4 bg-background-light-learnsphere dark:bg-background-dark hover:bg-neutral-gray-light/60 dark:hover:bg-neutral-gray-dark/30 cursor-pointer">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-warning/30 text-yellow-500">
                      <span className="material-symbols-outlined">history_edu</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-dark dark:text-neutral-white">Historia</p>
                      <div className="w-full rounded-full bg-neutral-gray-light h-1.5 mt-1">
                        <div className="progress-70 h-1.5 rounded-full bg-yellow-500"></div>
                      </div>
                    </div>
                  </div>

                  <Link to="/lengua" className="flex items-center gap-4 rounded-lg p-4 bg-background-light-learnsphere dark:bg-background-dark hover:bg-neutral-gray-light/60 dark:hover:bg-neutral-gray-dark/30 cursor-pointer">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-danger/20 text-danger">
                      <span className="material-symbols-outlined">translate</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-dark dark:text-neutral-white">Lengua</p>
                      <div className="w-full rounded-full bg-neutral-gray-light h-1.5 mt-1">
                        <div className="progress-90 h-1.5 rounded-full bg-danger"></div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 flex flex-col gap-8">
              <div className="bg-neutral-white dark:bg-neutral-dark/30 p-6 rounded-xl border border-neutral-gray-light/50 dark:border-neutral-gray-dark/30 shadow-sm">
                <h2 className="text-neutral-dark dark:text-neutral-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
                  Próximas Tareas
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background-light-learnsphere dark:bg-background-dark">
                    <div>
                      <p className="font-semibold text-neutral-dark dark:text-neutral-white">Ensayo de Historia</p>
                      <p className="text-sm text-neutral-gray-dark dark:text-neutral-gray-light">Vence en 2 días</p>
                    </div>
                    <span className="text-danger material-symbols-outlined">priority_high</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background-light-learnsphere dark:bg-background-dark">
                    <div>
                      <p className="font-semibold text-neutral-dark dark:text-neutral-white">Problemas de Álgebra</p>
                      <p className="text-sm text-neutral-gray-dark dark:text-neutral-gray-light">Vence en 5 días</p>
                    </div>
                    <span className="text-yellow-500 material-symbols-outlined">pending</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-background-light-learnsphere dark:bg-background-dark">
                    <div>
                      <p className="font-semibold text-neutral-dark dark:text-neutral-white">Experimento de Química</p>
                      <p className="text-sm text-neutral-gray-dark dark:text-neutral-gray-light">Vence en 1 semana</p>
                    </div>
                    <span className="text-primary-learnsphere material-symbols-outlined">hourglass_empty</span>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-white dark:bg-neutral-dark/30 p-6 rounded-xl border border-neutral-gray-light/50 dark:border-neutral-gray-dark/30 shadow-sm">
                <h2 className="text-neutral-dark dark:text-neutral-white text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">
                  Retroalimentación Reciente
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="p-3 rounded-lg bg-background-light-learnsphere dark:bg-background-dark">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-neutral-dark dark:text-neutral-white">Matemáticas</p>
                      <button className="text-sm text-primary-learnsphere font-medium hover:underline">Ver más</button>
                    </div>
                    <p className="text-sm text-neutral-gray-dark dark:text-neutral-gray-light mt-1">
                      "¡Excelente trabajo en la última prueba! Sigue practicando las ecuaciones..."
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-background-light-learnsphere dark:bg-background-dark">
                    <div className="flex justify-between items-start">
                      <p className="font-semibold text-neutral-dark dark:text-neutral-white">Lengua</p>
                      <button className="text-sm text-primary-learnsphere font-medium hover:underline">Ver más</button>
                    </div>
                    <p className="text-sm text-neutral-gray-dark dark:text-neutral-gray-light mt-1">
                      "Tu análisis del personaje principal fue muy profundo. Buen uso de las citas."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumnoPage;
