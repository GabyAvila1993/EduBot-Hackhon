import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CursosPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const subjects = [
    { name: 'Matemáticas', icon: 'calculate', progress: 60, color: 'primary' },
    { name: 'Ciencias Naturales', icon: 'science', progress: 85, color: 'green-500' },
    { name: 'Historia Universal', icon: 'account_balance', progress: 40, color: 'purple-500' },
    { name: 'Lengua y Literatura', icon: 'menu_book', progress: 72, color: 'red-500' },
    { name: 'Arte y Cultura', icon: 'palette', progress: 95, color: 'orange-500' },
    { name: 'Geografía', icon: 'public', progress: 30, color: 'teal-500' },
    { name: 'Música', icon: 'music_note', progress: 55, color: 'yellow-500' },
    { name: 'Educación Física', icon: 'sports_soccer', progress: 100, color: 'pink-500' }
  ];

  const filters = ['Todas', 'Ciencias', 'Humanidades', 'Artes'];

  const getProgressClass = (progress: number) => {
    if (progress === 30) return 'progress-30';
    if (progress === 40) return 'progress-40';
    if (progress === 55) return 'progress-55';
    if (progress === 60) return 'progress-60';
    if (progress === 72) return 'progress-72';
    if (progress === 85) return 'progress-85';
    if (progress === 95) return 'progress-95';
    if (progress === 100) return 'progress-100';
    return 'progress-60';
  };

  const handleSubjectClick = (subjectName: string) => {
    switch (subjectName) {
      case 'Matemáticas':
        navigate('/matematicas');
        break;
      case 'Lengua y Literatura':
        navigate('/lengua');
        break;
      default:
        // For other subjects, you can add more routes or show a "coming soon" message
        alert(`Los ejercicios de ${subjectName} estarán disponibles pronto.`);
        break;
    }
  };

  return (
    <section className="p-8">
      <div className="w-full max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex min-w-72 flex-col gap-1">
            <p className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">
              Explora tus Materias
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Primaria</p>
          </div>
          <div className="w-full md:w-auto md:max-w-xs">
            <label className="flex flex-col min-w-40 h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-gray-500 dark:text-gray-400 flex border-none bg-white dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-white dark:bg-gray-800 h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 pl-2 text-base font-normal leading-normal"
                  placeholder="Buscar materias o temas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </label>
          </div>
        </header>

        <div className="flex gap-3 py-3 overflow-x-auto mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 ${
                activeFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <p className="text-sm font-medium leading-normal">{filter}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <div
              key={index}
              onClick={() => handleSubjectClick(subject.name)}
              className="flex flex-col bg-white dark:bg-gray-800 rounded-xl p-5 gap-4 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${subject.color}/10`}>
                <span className={`material-symbols-outlined text-${subject.color} text-3xl`}>
                  {subject.icon}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Progreso</span>
                    <span className={`text-xs font-medium text-${subject.color}`}>{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className={`${getProgressClass(subject.progress)} bg-${subject.color} h-1.5 rounded-full`}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CursosPage;
