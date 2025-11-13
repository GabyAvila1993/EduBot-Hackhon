import React from 'react';
import { Link } from 'react-router-dom';

const LenguaInfo = () => {
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
							<h1 className="text-2xl font-bold">Lengua y Literatura</h1>
							<p className="mt-2 text-neutral-gray-dark">Desarrolla tus habilidades de lectura, escritura y comunicación.</p>
						</div>
						<div className="w-full md:w-48">
							<div className="rounded-lg bg-background-light-learnsphere p-4">
								<div className="flex items-center justify-between">
									<span className="text-sm text-neutral-gray-dark">Progreso Total</span>
									<span className="text-sm font-bold text-danger">72%</span>
								</div>
								<div className="w-full rounded-full bg-neutral-gray-light h-3 mt-3">
									<div style={{ width: '72%' }} className="h-3 rounded-full bg-danger"></div>
								</div>
							</div>
						</div>
					</div>

					<div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="md:col-span-2 bg-neutral-white p-4 rounded-lg">
							<h2 className="font-semibold mb-2">Introducción al curso</h2>
							<p className="text-sm text-neutral-gray-dark">Este curso está diseñado para fortalecer tus competencias en el área de Lengua y Literatura. Explorarás desde las reglas gramaticales básicas hasta el análisis de textos literarios complejos, mejorando tu capacidad para expresarte con claridad y creatividad.</p>

							<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h3 className="font-medium">Objetivos de aprendizaje</h3>
									<ul className="mt-2 space-y-2 text-sm">
										<li className="flex items-start gap-2"><span className="text-success material-symbols-outlined">check_circle</span> Comprender y aplicar reglas de ortografía y gramática.</li>
										<li className="flex items-start gap-2"><span className="text-success material-symbols-outlined">check_circle</span> Analizar diferentes tipos de textos, identificando sus características.</li>
										<li className="flex items-start gap-2"><span className="text-success material-symbols-outlined">check_circle</span> Desarrollar la escritura creativa y la redacción de textos argumentativos.</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="bg-neutral-white p-4 rounded-lg">
							<h3 className="font-medium">Resumen</h3>
							<p className="text-sm text-neutral-gray-dark mt-2">Un curso pensado para 6° grado. Avanza a tu ritmo y revisa las unidades completadas.</p>
						</div>
					</div>
				</div>

				<section className="mt-6">
					<h2 className="text-lg font-bold mb-3">Unidades de Aprendizaje</h2>
					<div className="flex flex-col gap-3">
						<div className="flex items-center justify-between p-4 rounded-lg bg-background-light-learnsphere border border-neutral-gray-light/50">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
									<span className="material-symbols-outlined">check</span>
								</div>
								<div>
									<p className="font-semibold">Unidad 1</p>
									<p className="text-sm text-neutral-gray-dark">Ortografía</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<div className="w-32">
									<div className="w-full rounded-full bg-neutral-gray-light h-2">
										<div style={{ width: '100%' }} className="h-2 rounded-full bg-success"></div>
									</div>
									<p className="text-sm text-success text-right mt-1">Completado 100%</p>
								</div>
								<Link to="/lengua/ortografia" className="px-4 py-2 rounded-lg bg-white border hover:bg-neutral-gray-light transition">Revisar</Link>
							</div>
						</div>

						<div className="flex items-center justify-between p-4 rounded-lg bg-background-light-learnsphere border border-neutral-gray-light/50">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-full bg-primary-learnsphere/10 flex items-center justify-center text-primary-learnsphere">
									<span className="material-symbols-outlined">play_arrow</span>
								</div>
								<div>
									<p className="font-semibold">Unidad 2</p>
									<p className="text-sm text-neutral-gray-dark">Clases de Palabras</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<div className="w-32">
									<div className="w-full rounded-full bg-neutral-gray-light h-2">
										<div style={{ width: '65%' }} className="h-2 rounded-full bg-primary-learnsphere"></div>
									</div>
									<p className="text-sm text-primary-learnsphere text-right mt-1">Progreso 65%</p>
								</div>
								<Link to="/lengua/clasesdepalabras" className="px-4 py-2 rounded-full bg-primary-learnsphere text-white hover:bg-primary-learnsphere/90 transition">Continuar</Link>
							</div>
						</div>

						<div className="flex items-center justify-between p-4 rounded-lg bg-neutral-gray-light/30 border border-neutral-gray-light/50 opacity-70">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 rounded-full bg-neutral-gray-light flex items-center justify-center text-neutral-gray-dark">
									<span className="material-symbols-outlined">lock</span>
								</div>
								<div>
									<p className="font-semibold">Unidad 3</p>
									<p className="text-sm text-neutral-gray-dark">Análisis Literario</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<p className="text-sm text-neutral-gray-dark">Progreso 0%</p>
								<button className="px-4 py-2 rounded-lg bg-neutral-gray-light cursor-not-allowed" disabled>Bloqueado</button>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default LenguaInfo;

