import React from 'react';

const PerfilPage: React.FC = () => {
  return (
    <div className="flex flex-1 justify-center p-4 sm:p-6 lg:p-10">
      <div className="layout-content-container flex flex-col w-full max-w-5xl gap-6">
        <div className="flex p-4 bg-white dark:bg-[#182131] rounded-xl shadow-sm">
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex gap-4 items-center">
              <div className="avatar-profile-img bg-center bg-no-repeat aspect-square bg-cover rounded-full h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0"></div>
              <div className="flex flex-col justify-center">
                <p className="text-slate-800 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  Alex Pérez
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  Nivel 5: Explorador Curioso
                </p>
              </div>
            </div>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] sm:w-auto hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              <span className="truncate">Editar Perfil</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-xl border border-slate-200 dark:border-slate-700 p-4 items-start bg-white dark:bg-[#182131] shadow-sm">
                <p className="text-slate-800 dark:text-white tracking-light text-2xl font-bold leading-tight">
                  12,500
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                    Puntos Totales
                  </p>
                </div>
              </div>
              <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-xl border border-slate-200 dark:border-slate-700 p-4 items-start bg-white dark:bg-[#182131] shadow-sm">
                <p className="text-slate-800 dark:text-white tracking-light text-2xl font-bold leading-tight">42</p>
                <div className="flex items-center gap-2">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                    Logros Desbloqueados
                  </p>
                </div>
              </div>
              <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-2 rounded-xl border border-slate-200 dark:border-slate-700 p-4 items-start bg-white dark:bg-[#182131] shadow-sm">
                <p className="text-slate-800 dark:text-white tracking-light text-2xl font-bold leading-tight">7</p>
                <div className="flex items-center gap-2">
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                    Días Consecutivos
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#182131] p-6 shadow-sm">
              <div className="flex flex-col gap-3">
                <h2 className="text-slate-800 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  Progreso por Materia
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  Tu rendimiento en cada área de estudio
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-blue-500/20 text-blue-500">
                    <span className="material-symbols-outlined">calculate</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold text-slate-800 dark:text-white">Matemáticas</p>
                      <span className="text-sm font-medium text-blue-500">85%</span>
                    </div>
                    <div className="w-full rounded-full bg-slate-200 dark:bg-slate-700 h-2">
                      <div className="progress-85 h-2 rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-green-500/20 text-green-500">
                    <span className="material-symbols-outlined">science</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold text-slate-800 dark:text-white">Ciencias</p>
                      <span className="text-sm font-medium text-green-500">78%</span>
                    </div>
                    <div className="w-full rounded-full bg-slate-200 dark:bg-slate-700 h-2">
                      <div className="progress-75 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-purple-500/20 text-purple-500">
                    <span className="material-symbols-outlined">history_edu</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold text-slate-800 dark:text-white">Historia</p>
                      <span className="text-sm font-medium text-purple-500">62%</span>
                    </div>
                    <div className="w-full rounded-full bg-slate-200 dark:bg-slate-700 h-2">
                      <div className="progress-62-5 h-2 rounded-full bg-purple-500"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-12 rounded-lg bg-red-500/20 text-red-500">
                    <span className="material-symbols-outlined">translate</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold text-slate-800 dark:text-white">Lengua y Literatura</p>
                      <span className="text-sm font-medium text-red-500">90%</span>
                    </div>
                    <div className="w-full rounded-full bg-slate-200 dark:bg-slate-700 h-2">
                      <div className="progress-90 h-2 rounded-full bg-red-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="flex flex-col gap-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#182131] p-6 shadow-sm">
              <div className="flex flex-col gap-3">
                <h2 className="text-slate-800 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  Logros Recientes
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  Tus últimos reconocimientos
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                  <div className="flex items-center justify-center size-10 rounded-full bg-yellow-500 text-white">
                    <span className="material-symbols-outlined text-lg">emoji_events</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-white text-sm">Maestro de Álgebra</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Completaste 50 ejercicios</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center justify-center size-10 rounded-full bg-blue-500 text-white">
                    <span className="material-symbols-outlined text-lg">local_fire_department</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-white text-sm">Racha de 7 días</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Estudiaste todos los días</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <div className="flex items-center justify-center size-10 rounded-full bg-green-500 text-white">
                    <span className="material-symbols-outlined text-lg">star</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 dark:text-white text-sm">Perfección en Lengua</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">100% en el último examen</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#182131] p-6 shadow-sm">
              <div className="flex flex-col gap-3">
                <h2 className="text-slate-800 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  Actividad Semanal
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                  Tu progreso esta semana
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Ejercicios completados</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">24/30</span>
                </div>
                <div className="w-full rounded-full bg-slate-200 dark:bg-slate-700 h-2">
                  <div className="w-4/5 h-2 rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Tiempo de estudio</span>
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">4.5h</span>
                </div>
                <div className="w-full rounded-full bg-slate-200 dark:bg-slate-700 h-2">
                  <div className="progress-45 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilPage;
