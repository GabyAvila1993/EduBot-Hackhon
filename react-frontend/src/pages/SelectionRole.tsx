import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SelectionRoleProps {
  setRole: (r: 'profesor' | 'alumno' | null) => void;
}

const SelectionRole: React.FC<SelectionRoleProps> = ({ setRole }) => {
  const navigate = useNavigate();

  const selectProfesor = () => {
    setRole('profesor');
    navigate('/profesor');
  };

  const selectAlumno = () => {
    setRole('alumno');
    navigate('/alumno');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark font-display">
      <div className="max-w-[960px] w-full px-4">
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-4 text-[#111318] dark:text-white">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold">EducaApp</h2>
          </div>
        </header>

        <main className="text-center py-10">
          <h1 className="text-[32px] font-bold">¿Cómo vas a usar la plataforma hoy?</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div
              onClick={selectProfesor}
              className="flex flex-col items-center p-8 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg cursor-pointer"
            >
              <div className="mb-4 h-20 w-20 flex items-center justify-center rounded-full bg-blue-100">
                <span className="material-symbols-outlined text-4xl text-blue-500">school</span>
              </div>
              <p className="text-xl font-bold">Soy Docente</p>
              <p className="text-sm text-[#616f89] mt-2">Para organizar tus clases, crear tareas y seguir el progreso de tus alumnos.</p>
            </div>

            <div
              onClick={selectAlumno}
              className="flex flex-col items-center p-8 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg cursor-pointer"
            >
              <div className="mb-4 h-20 w-20 flex items-center justify-center rounded-full bg-orange-100">
                <span className="material-symbols-outlined text-4xl text-orange-500">backpack</span>
              </div>
              <p className="text-xl font-bold">Soy Alumno</p>
              <p className="text-sm text-[#616f89] mt-2">Para acceder a tus materiales de estudio, entregar tareas y ver tus calificaciones.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SelectionRole;
