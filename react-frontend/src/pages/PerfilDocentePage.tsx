import React from 'react';
import students from '../data/students.json';

type Student = {
  id: string;
  name: string;
  class: string;
  progress: number;
  errorPatterns: { topic: string; severity: 'low' | 'medium' | 'high' }[];
  lastActivity: string;
  avatar?: string;
};

const severityRank = (s: string) => {
  if (s === 'high') return 3;
  if (s === 'medium') return 2;
  return 1;
};

const PerfilDocentePage: React.FC = () => {
  const data: Student[] = students as unknown as Student[];

  // Use explicit pattern lists as requested: for each topic list the students (allow repeats)
  const patternTopics = [
    {
      topic: 'Ecuaciones de segundo grado',
      color: 'red',
      students: ['Ana Martínez', 'Lucía Gómez']
    },
    {
      topic: 'Fracciones complejas',
      color: 'cyan',
      students: ['Carlos Rodríguez']
    },
    {
      topic: 'Sistemas de ecuaciones',
      color: 'orange',
      students: ['Javier Torres']
    },
    {
      topic: 'Ecuaciones de primer grado',
      color: 'yellow',
      students: ['Lucía Gómez']
    }
  ];

  return (
    <div className="p-8">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Bienvenido de nuevo, Profesor</h1>
          <p className="text-sm text-[#616f89]">Aquí tienes un resumen de la actividad de tu clase hoy.</p>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold">Seguimiento de Progreso</h3>
              <p className="text-sm text-slate-500">Progreso individual de los estudiantes en tiempo real.</p>
            </div>
            <div>
              <select className="rounded-lg border-slate-300 dark:border-slate-700 px-3 py-2">
                <option>Clase de Matemáticas 8A</option>
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            {data.map((s) => (
              <div key={s.id} className="flex items-center gap-4">
                <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full bg-slate-200" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-medium text-sm">{s.name}</p>
                    <p className={`text-sm font-bold ${s.progress >= 80 ? 'text-green-600' : s.progress >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{s.progress}%</p>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`${s.progress >= 80 ? 'bg-green-500' : s.progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'} h-2 rounded-full`}
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 text-sm font-medium text-primary hover:underline">Ver todos los estudiantes</button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="text-lg font-bold">Patrones de Error Comunes</h3>
          <p className="text-sm text-slate-500">Identifica temas y alumnos que necesitan refuerzo.</p>

          <div className="mt-4">
            <p className="text-sm font-semibold">Por Tema:</p>
            <div className="mt-3">
              {patternTopics.map((pt) => (
                <div key={pt.topic} className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${pt.color === 'red' ? 'bg-red-50 text-red-800' : pt.color === 'cyan' ? 'bg-cyan-50 text-cyan-800' : pt.color === 'orange' ? 'bg-orange-50 text-orange-800' : 'bg-yellow-50 text-yellow-800'}`}>
                      {pt.topic}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {pt.students.map((stuName, idx) => {
                      const colorClass = pt.color === 'red'
                        ? 'bg-red-100 text-red-800'
                        : pt.color === 'cyan'
                        ? 'bg-cyan-100 text-cyan-800'
                        : pt.color === 'orange'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-yellow-100 text-yellow-800';
                      return (
                        <span key={`${pt.topic}-${idx}`} className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${colorClass}`}>
                          {stuName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="mt-6 flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-primary text-white hover:bg-primary/90 text-sm font-bold">
            Generar Reporte Detallado
          </button>
        </div>
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold">Actividad Reciente</h3>
        <p className="text-sm text-slate-500">Revisa el estado de las últimas tareas asignadas.</p>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-sm">
            <thead className="border-b text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3">Nombre Tarea</th>
                <th className="px-6 py-3">Clase</th>
                <th className="px-6 py-3">Fecha de Entrega</th>
                <th className="px-6 py-3">Entregas</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4">Ensayo de Historia Universal</td>
                <td className="px-6 py-4">Historia 8A</td>
                <td className="px-6 py-4">Oct 28, 2024</td>
                <td className="px-6 py-4">15 / 22</td>
                <td className="px-6 py-4">Pendiente</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PerfilDocentePage;
