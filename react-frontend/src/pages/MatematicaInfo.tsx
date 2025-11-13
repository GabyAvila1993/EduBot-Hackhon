import React from 'react';
import { Link } from 'react-router-dom';

const MatematicaInfo = () => {
    return (
        <div className="flex flex-1 justify-center py-6">
            <div className="layout-content-container flex flex-col w-full max-w-6xl px-4">
                <header className="flex items-center gap-4 mb-6">
                    <Link to="/" className="flex items-center gap-3 text-neutral-gray-dark hover:underline">
                        <span className="material-symbols-outlined">arrow_back</span>
                        <span>Volver a Mis Cursos</span>
                    </Link>
                </header>

                <div className="bg-neutral-white p-6 rounded-xl border border-neutral-gray-light/50 shadow-sm">
                    <div className="flex flex-col md:flex-row md:justify-between gap-4">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold">Matemáticas</h1>
                            <p className="mt-2 text-neutral-gray-dark">Contenido del curso de matemáticas</p>
                        </div>
                        <div className="w-full md:w-48">
                            <div className="rounded-lg bg-background-light-learnsphere p-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-neutral-gray-dark">Progreso General</span>
                                    <span className="text-sm font-bold text-primary-learnsphere">60%</span>
                                </div>
                                <div className="w-full rounded-full bg-neutral-gray-light h-3 mt-3">
                                    <div style={{ width: '60%' }} className="h-3 rounded-full bg-primary-learnsphere"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-neutral-white p-4 rounded-lg">
                            <h2 className="font-semibold mb-2">Introducción al Curso</h2>
                            <p className="text-sm text-neutral-gray-dark">Bienvenido al curso de Matemáticas. Aquí explorarás el fascinante mundo de los números, las formas y los patrones. Aprenderás a resolver problemas, pensar lógicamente y aplicar conceptos matemáticos en situaciones de la vida real.</p>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-medium">Objetivos del Curso</h3>
                                    <ul className="mt-2 space-y-2 text-sm">
                                        <li className="flex items-start gap-2"><span className="text-primary-learnsphere material-symbols-outlined">check_circle</span> Dominar las operaciones aritméticas básicas.</li>
                                        <li className="flex items-start gap-2"><span className="text-primary-learnsphere material-symbols-outlined">check_circle</span> Comprender los conceptos de fracciones y decimales.</li>
                                        <li className="flex items-start gap-2"><span className="text-primary-learnsphere material-symbols-outlined">check_circle</span> Introducirse al álgebra y la resolución de ecuaciones.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium">Requisitos Previos</h3>
                                    <ul className="mt-2 space-y-2 text-sm text-neutral-gray-dark">
                                        <li>Conocimientos básicos de suma, resta, multiplicación y división.</li>
                                        <li>Disposición para resolver problemas y puzzles.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-white p-4 rounded-lg">
                            <h3 className="font-medium">Nota</h3>
                            <p className="text-sm text-neutral-gray-dark mt-2">Prepara tus habilidades y descubre que las matemáticas pueden ser divertidas y desafiantes.</p>
                        </div>
                    </div>
                </div>

                <section className="mt-6">
                    <h2 className="text-lg font-bold mb-3">Unidades del Curso</h2>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-background-light-learnsphere border border-neutral-gray-light/50">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
                                    <span className="material-symbols-outlined">check</span>
                                </div>
                                <div>
                                    <p className="font-semibold">Ecuaciones</p>
                                    <p className="text-sm text-neutral-gray-dark">Aritmética Básica</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-32">
                                    <div className="w-full rounded-full bg-neutral-gray-light h-2">
                                        <div style={{ width: '100%' }} className="h-2 rounded-full bg-success"></div>
                                    </div>
                                    
                                </div>
                                <Link to='/matematicas' className="px-4 py-2 rounded-lg bg-white border hover:bg-neutral-gray-light transition">Revisar</Link>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg border border-primary-learnsphere bg-white">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary-learnsphere/10 flex items-center justify-center text-primary-learnsphere">
                                    <span className="material-symbols-outlined">play_arrow</span>
                                </div>
                                <div>
                                    <p className="font-semibold">Ejercicios combinados</p>
                                    <p className="text-sm text-neutral-gray-dark">Multiplicación, Suma, Resta, Division, Raíz y Potencia</p>
                                    
                                </div>
                                
                            </div>
                            <Link to='/matematicas/ejercicioscombinados' className="px-4 py-2 rounded-full bg-primary-learnsphere text-black hover:bg-primary-learnsphere/90 transition">Continuar</Link>
                            
                        </div>

                        {/* <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-gray-light/30 border border-neutral-gray-light/50 opacity-70">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-full bg-neutral-gray-light flex items-center justify-center text-neutral-gray-dark">
									<span className="material-symbols-outlined">lock</span>
								</div>
								<div>
									<p className="font-semibold">Unidad 3</p>
									<p className="text-sm text-neutral-gray-dark">Introducción a la Geometría</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<p className="text-sm text-neutral-gray-dark">Sin empezar</p>
								<button className="px-4 py-2 rounded-lg bg-neutral-gray-light cursor-not-allowed" disabled>—</button>
							</div>
						</div> */}
                    </div>
                </section >
                <section className="mt-6">
                    <h2 className="text-lg font-bold mb-3">Ejercicios</h2>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-background-light-learnsphere border border-neutral-gray-light/50">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
                                    <span className="material-symbols-outlined">check</span>
                                </div>
                                <div>
                                    <p className="font-semibold">Ecuaciones</p>
                                    <p className="text-sm text-neutral-gray-dark">Aritmética Básica</p>
                                </div>
                                
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="w-32">
                                    <div className="w-full rounded-full bg-neutral-gray-light h-2">
                                        <div style={{ width: '100%' }} className="h-2 rounded-full bg-success"></div>
                                    </div>
                                    
                                </div>
                                <Link to="/matematicas/ecuaciones" className="px-4 py-2 rounded-lg bg-white border hover:bg-neutral-gray-light transition">Realizar Ejercicios</Link>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg border border-primary-learnsphere bg-white">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary-learnsphere/10 flex items-center justify-center text-primary-learnsphere">
                                    <span className="material-symbols-outlined">play_arrow</span>
                                </div>
                                <div>
                                    <p className="font-semibold">Ejercicios combinados</p>
                                    <p className="text-sm text-neutral-gray-dark">Multiplicación, Suma, Resta, Division, Raíz y Potencia</p>
                                    
                                </div>
                                
                            </div>
                            <Link to='/matematicas/ejercicioscombinados' className="px-4 py-2 rounded-lg bg-white border hover:bg-neutral-gray-light transition">Realizar Ejercicios</Link>
                            
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MatematicaInfo;

