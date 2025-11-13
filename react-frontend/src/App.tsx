import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProfesorPage from './pages/ProfesorPage';
import AlumnoPage from './pages/AlumnoPage';
import CursosPage from './pages/CursosPage';
import RefuerzoPage from './pages/RefuerzoPage';
import PerfilPage from './pages/PerfilPage';
import MCPMathematicsExercises from './components/MCPMathematicsExercises';
import MCPLanguageExercises from './components/MCPLanguageExercises';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className={`${darkMode ? 'dark' : ''} bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-white`}>
        <div className="relative flex h-auto min-h-screen w-full flex-row">
          <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<ProfesorPage />} />
              <Route path="/profesor" element={<ProfesorPage />} />
              <Route path="/alumno" element={<AlumnoPage />} />
              <Route path="/cursos" element={<CursosPage />} />
              <Route path="/refuerzo" element={<RefuerzoPage />} />
              <Route path="/perfil" element={<PerfilPage />} />
              <Route path="/matematicas" element={<MCPMathematicsExercises />} />
              <Route path="/lengua" element={<MCPLanguageExercises />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
