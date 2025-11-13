import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';

interface Exercise {
  exerciseId: string;
  title: string;
  description?: string;
  theory?: any;
  loading?: boolean;
}

const MatematicaInfo = () => {
    const [exercises, setExercises] = useState<Exercise[]>([
        { exerciseId: 'MAT-3', title: 'Ecuaciones', description: 'Cargando...', loading: true },
        { exerciseId: 'MAT-1', title: 'Ejercicios combinados', description: 'Cargando...', loading: true }
    ]);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [modalTheory, setModalTheory] = useState<any>(null);
    const [modalExplanation, setModalExplanation] = useState<string | null>(null);
    const [modalExerciseId, setModalExerciseId] = useState<string | null>(null);

    useEffect(() => {
        const loadTheory = async () => {
            const updated = await Promise.all(
                exercises.map(async (ex) => {
                    try {
                        const response = await apiService.getExerciseTheory(ex.exerciseId);
                        return {
                            ...ex,
                            description: response.theory?.moduleDescription || 'Descripción no disponible',
                            theory: response.theory,
                            loading: false
                        };
                    } catch (error) {
                        console.error(`Error cargando teoría de ${ex.exerciseId}:`, error);
                        return {
                            ...ex,
                            description: 'Error al cargar la descripción',
                            loading: false
                        };
                    }
                })
            );
            setExercises(updated);
        };

        loadTheory();
    }, []);

    const openTheoryModal = async (exerciseId: string) => {
        setModalExerciseId(exerciseId);
        setModalOpen(true);
        setModalLoading(true);
        setModalTheory(null);
        try {
            const response = await apiService.getExerciseTheory(exerciseId);
            // backend returns { theory, explanation }
            setModalTheory(response.theory || null);
            setModalExplanation(response.explanation || null);
        } catch (error) {
            console.error('Error cargando teoría:', error);
            setModalTheory({ error: 'Error al cargar la teoría. Intenta de nuevo.' });
        } finally {
            setModalLoading(false);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalTheory(null);
        setModalExerciseId(null);
    };

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
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
                                    <span className="material-symbols-outlined">check</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">Ecuaciones</p>
                                    <p className="text-sm text-neutral-gray-dark">Resolución de Ecuaciones de Primer Grado</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-32">
                                    <div className="w-full rounded-full bg-neutral-gray-light h-2">
                                        <div style={{ width: '100%' }} className="h-2 rounded-full bg-success"></div>
                                    </div>
                                </div>
                                <button onClick={() => openTheoryModal('MAT-3')} className="px-4 py-2 rounded-lg bg-white border hover:bg-neutral-gray-light transition">Revisar</button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg border border-primary-learnsphere bg-white">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-10 h-10 rounded-full bg-primary-learnsphere/10 flex items-center justify-center text-primary-learnsphere">
                                    <span className="material-symbols-outlined">play_arrow</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">Operaciones Combinadas</p>
                                    <p className="text-sm text-neutral-gray-dark">Operaciones Combinadas con Números Enteros</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-32">
                                    <div className="w-full rounded-full bg-neutral-gray-light h-2">
                                        <div style={{ width: '100%' }} className="h-2 rounded-full bg-primary-learnsphere"></div>
                                    </div>
                                </div>
                                <button onClick={() => openTheoryModal('MAT-1')} className="px-4 py-2 rounded-lg bg-white border hover:bg-neutral-gray-light transition">Revisar</button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg bg-neutral-gray-light/30 border border-neutral-gray-light/50 opacity-70">
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
                                <p className="text-sm text-neutral-gray-dark">Progreso 0%</p>
                                <button className="px-4 py-2 rounded-lg bg-neutral-gray-light cursor-not-allowed" disabled>Bloqueado</button>
                            </div>
                        </div>
                    </div>
                </section >
                {/* Modal para mostrar teoría de la unidad */}
                {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/40" onClick={closeModal}></div>
                        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg w-[90%] max-w-3xl p-6 z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {modalLoading ? 'Cargando teoría...' : (modalTheory?.name || modalTheory?.moduleName || 'Teoría')}
                                    </h3>
                                    <p className="text-sm text-neutral-gray-dark mt-1">{modalExerciseId === 'MAT-3' ? 'Ecuaciones' : modalExerciseId === 'MAT-1' ? 'Operaciones combinadas' : ''}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={closeModal} className="px-3 py-1 rounded-md bg-neutral-gray-light hover:bg-neutral-gray-light/90">Cerrar</button>
                                </div>
                            </div>

                            <div className="max-h-[60vh] overflow-auto text-sm text-gray-700 dark:text-gray-200">
                                {modalLoading && (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-learnsphere"></div>
                                    </div>
                                )}

                                {!modalLoading && modalTheory && modalTheory.error && (
                                    <p className="text-red-600">{modalTheory.error}</p>
                                )}

                                {!modalLoading && modalTheory && !modalTheory.error && (
                                    <div className="space-y-4">
                                        {/* Explicación generada por Gemini - Renderizada con formato */}
                                        {modalExplanation && (
                                            <div className="bg-gradient-to-br from-primary-learnsphere/10 to-primary-learnsphere/5 p-4 rounded-lg border-l-4 border-primary-learnsphere">
                                                <div className="prose prose-sm max-w-none dark:prose-invert">
                                                    {modalExplanation.split('\n\n').map((section: string, sectionIdx: number) => {
                                                        // Parsear cada sección
                                                        const lines = section.split('\n');
                                                        return (
                                                            <div key={sectionIdx} className="mb-3">
                                                                {lines.map((line: string, lineIdx: number) => {
                                                                    // Detectar títulos (líneas en mayúsculas o que terminan con)
                                                                    const isTitle = /^[A-Z][A-Z\s]+$/.test(line.trim()) && line.trim().length > 0;
                                                                    const isNumberedList = /^\d+\./.test(line.trim());
                                                                    const isBullet = /^[-•]/.test(line.trim());
                                                                    
                                                                    if (isTitle) {
                                                                        return (
                                                                            <h5 key={lineIdx} className="font-bold text-gray-900 dark:text-white mt-3 mb-2 text-base">
                                                                                {line.trim()}
                                                                            </h5>
                                                                        );
                                                                    } else if (isNumberedList) {
                                                                        return (
                                                                            <div key={lineIdx} className="ml-4 my-1 text-gray-700 dark:text-gray-300">
                                                                                {line.trim()}
                                                                            </div>
                                                                        );
                                                                    } else if (isBullet) {
                                                                        return (
                                                                            <div key={lineIdx} className="ml-4 my-1 text-gray-700 dark:text-gray-300">
                                                                                {line.trim()}
                                                                            </div>
                                                                        );
                                                                    } else if (line.trim().length > 0) {
                                                                        return (
                                                                            <p key={lineIdx} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                                                {line.trim()}
                                                                            </p>
                                                                        );
                                                                    }
                                                                    return null;
                                                                })}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Teoría del MCP como respaldo */}
                                        {(!modalExplanation || modalExplanation.includes('Error')) && (
                                            <>
                                                {modalTheory?.moduleDescription && (
                                                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                                                        <p className="text-gray-700 dark:text-gray-300">{modalTheory.moduleDescription}</p>
                                                    </div>
                                                )}

                                                {modalTheory?.content?.description && (
                                                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                                                        <p className="text-gray-700 dark:text-gray-300">{modalTheory.content.description}</p>
                                                    </div>
                                                )}

                                                {modalTheory?.content?.mainTopics && (
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Temas principales</h4>
                                                        <ul className="space-y-1 ml-4">
                                                            {modalTheory.content.mainTopics.map((t: string, i: number) => (
                                                                <li key={i} className="text-gray-700 dark:text-gray-300 flex items-start">
                                                                    <span className="mr-2">•</span>
                                                                    <span>{t}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {modalTheory?.content?.rules && (
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Reglas y Pasos</h4>
                                                        <div className="space-y-2">
                                                            {modalTheory.content.rules.map((r: any, idx: number) => (
                                                                <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded p-3 border-l-2 border-primary-learnsphere">
                                                                    {r.title && <div className="font-medium text-gray-900 dark:text-white mb-1">{r.title}</div>}
                                                                    {r.content && Array.isArray(r.content) ? (
                                                                        <ul className="space-y-1 ml-4">
                                                                            {r.content.map((line: string, li: number) => (
                                                                                <li key={li} className="text-gray-700 dark:text-gray-300 text-xs flex items-start">
                                                                                    <span className="mr-2">→</span>
                                                                                    <span>{line}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    ) : (
                                                                        <p className="text-gray-700 dark:text-gray-300 text-xs">{r.content}</p>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 flex justify-end gap-3">
                                <Link to={modalExerciseId === 'MAT-3' ? '/matematicas/ecuaciones' : '/matematicas/ejercicioscombinados'} className="px-4 py-2 rounded-full bg-primary-learnsphere text-black hover:bg-primary-learnsphere/90 transition">Ir a ejercicios</Link>
                                <button onClick={closeModal} className="px-4 py-2 rounded-full bg-neutral-gray-light">Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
                <section className="mt-6">
                    <h2 className="text-lg font-bold mb-3">Ejercicios</h2>
                    <div className="flex flex-col gap-3">
                        {exercises.map((exercise) => (
                            <div key={exercise.exerciseId} className="flex items-center justify-between p-4 rounded-lg bg-background-light-learnsphere border border-neutral-gray-light/50">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
                                        <span className="material-symbols-outlined">check</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{exercise.title}</p>
                                        <p className="text-sm text-neutral-gray-dark">
                                            {exercise.loading ? 'Cargando descripción...' : exercise.description}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className="w-32">
                                        <div className="w-full rounded-full bg-neutral-gray-light h-2">
                                            <div style={{ width: '100%' }} className="h-2 rounded-full bg-success"></div>
                                        </div>
                                    </div>
                                    <Link 
                                        to={exercise.exerciseId === 'MAT-3' ? "/matematicas/ecuaciones" : "/matematicas/ejercicioscombinados"}
                                        className="px-4 py-2 rounded-lg bg-white border hover:bg-neutral-gray-light transition"
                                    >
                                        Realizar Ejercicios
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section >
            </div>
        </div>
    );
};

export default MatematicaInfo;

