import React from 'react';
import avatarProfesor from '../images/avatarProfesor.png';

const ProfesorPage: React.FC = () => {
    return (
        <section className="p-8">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex min-w-72 flex-col gap-1">
                    <h1 className="text-[#111318] dark:text-white text-3xl font-bold leading-tight tracking-[-0.03em]">
                        Bienvenido de nuevo, Profesor García
                    </h1>
                    <p className="text-[#616f89] dark:text-slate-400 text-base font-normal leading-normal">
                        Aquí tienes un resumen de la actividad de tu clase hoy.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative rounded-full p-2 hover:bg-slate-200 dark:hover:bg-slate-800">
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
                        <span className="absolute right-1 top-1 flex h-2.5 w-2.5 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-yellow-500"></span>
                        </span>
                    </button>
                    <div className="flex items-center gap-3">
                        <img src={avatarProfesor} alt="Profesor García" className="avatar-profesor aspect-square h-10 w-10 rounded-full bg-cover bg-center bg-no-repeat object-cover" />
                        <div className="flex flex-col text-sm">
                            <h2 className="font-medium text-[#111318] dark:text-white">Profesor García</h2>
                            <p className="text-[#616f89] dark:text-slate-400">Admin</p>
                        </div>
                    </div>
                </div>
            </header>

            <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-base font-medium text-[#111318] dark:text-slate-300">Estudiantes Activos</p>
                    <p className="text-3xl font-bold tracking-tight text-[#111318] dark:text-white">34</p>
                    <p className="text-sm font-medium text-green-600 dark:text-green-500">+2% vs mes anterior</p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-base font-medium text-[#111318] dark:text-slate-300">Tareas Calificadas</p>
                    <p className="text-3xl font-bold tracking-tight text-[#111318] dark:text-white">75%</p>
                    <p className="text-sm font-medium text-green-600 dark:text-green-500">+5% vs semana anterior</p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <p className="text-base font-medium text-[#111318] dark:text-slate-300">Próxima Entrega</p>
                    <p className="text-3xl font-bold tracking-tight text-[#111318] dark:text-white">2 días</p>
                    <p className="text-sm font-medium text-yellow-600 dark:text-yellow-500">Ensayo de Historia</p>
                </div>
            </section>

            <section className="mt-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] text-[#111318] dark:text-white">
                        Atajos Rápidos
                    </h2>
                    <div className="flex flex-1 gap-3 flex-wrap justify-start sm:justify-end">
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f4] text-[#111318] hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 text-sm font-bold leading-normal tracking-[0.015em]">
                            <span className="material-symbols-outlined text-base">campaign</span>
                            <span className="truncate">Enviar Notificación</span>
                        </button>
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white hover:bg-primary/90 text-sm font-bold leading-normal tracking-[0.015em]">
                            <span className="material-symbols-outlined text-base">add</span>
                            <span className="truncate">Crear Tarea</span>
                        </button>
                    </div>
                </div>
            </section>

            <section className="mt-8">
                <div className="rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-[#111318] dark:text-white">Tareas Recientes</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Revisa el estado de las últimas tareas asignadas.
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-800 dark:text-slate-400">
                                <tr>
                                    <th className="px-6 py-3" scope="col">Nombre Tarea</th>
                                    <th className="px-6 py-3" scope="col">Clase</th>
                                    <th className="px-6 py-3" scope="col">Fecha de Entrega</th>
                                    <th className="px-6 py-3" scope="col">Entregas</th>
                                    <th className="px-6 py-3" scope="col">Estado</th>
                                    <th className="px-6 py-3" scope="col"><span className="sr-only">Acciones</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/50">
                                    <th className="whitespace-nowrap px-6 py-4 font-medium text-[#111318] dark:text-white" scope="row">
                                        Ensayo de Historia Universal
                                    </th>
                                    <td className="px-6 py-4">Historia 8A</td>
                                    <td className="px-6 py-4">Oct 28, 2024</td>
                                    <td className="px-6 py-4">15 / 22</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                            Pendiente
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="font-medium text-primary hover:underline">Ver detalles</button>
                                    </td>
                                </tr>
                                <tr className="border-b border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/50">
                                    <th className="whitespace-nowrap px-6 py-4 font-medium text-[#111318] dark:text-white" scope="row">
                                        Problemas de Álgebra
                                    </th>
                                    <td className="px-6 py-4">Matemáticas 8A</td>
                                    <td className="px-6 py-4">Oct 24, 2024</td>
                                    <td className="px-6 py-4">22 / 22</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                            Calificado
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="font-medium text-primary hover:underline">Ver detalles</button>
                                    </td>
                                </tr>
                                <tr className="bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/50">
                                    <th className="whitespace-nowrap px-6 py-4 font-medium text-[#111318] dark:text-white" scope="row">
                                        Análisis de "Don Quijote"
                                    </th>
                                    <td className="px-6 py-4">Literatura 8A</td>
                                    <td className="px-6 py-4">Oct 21, 2024</td>
                                    <td className="px-6 py-4">21 / 22</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                                            Atrasada
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="font-medium text-primary hover:underline">Ver detalles</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </section>
    );
};

export default ProfesorPage;
