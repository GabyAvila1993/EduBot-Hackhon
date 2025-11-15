import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProfesorPage from './pages/ProfesorPage';
import AlumnoPage from './pages/AlumnoPage';
import SelectionRole from './pages/SelectionRole';
import PerfilDocentePage from './pages/PerfilDocentePage';
import CursosPage from './pages/CursosPage';
import RefuerzoPage from './pages/RefuerzoPage';
import PerfilPage from './pages/PerfilPage';
import MCPMathematicsExercises from './components/MCPMathematicsExercises';
import MCPLanguageExercises from './components/MCPLanguageExercises';
import MCPEcuacionesExercises from './components/MCPEcuacionesExercises';
import MCPOperacionesCombinadosExercises from './components/MCPOperacionesCombinadosExercises';
import MCPOrtografiaExercises from './components/MCPOrtografiaExercises';
import MCPClasesDepalabrasExercises from './components/MCPClasesDepalabrasExercises';
import MatematicaInfo from './pages/MatematicaInfo';
import LenguaInfo from './pages/LenguaInfo';
import PracticaOrtografiaPage from './pages/PracticaOrtografiaPage';
import PracticaMatematicaPage from './pages/PracticaMatematicaPage';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [role, setRole] = useState<'profesor' | 'alumno' | null>(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className={`${darkMode ? 'dark' : ''} bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-white`}>
        <div className="relative flex h-auto min-h-screen w-full flex-row">
          {
            // Mostrar Sidebar solo cuando se ha seleccionado un rol (docente o alumno)
            role !== null && (
              <Sidebar role={role} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            )
          }

          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<SelectionRole setRole={setRole} />} />
              <Route path="/profesor" element={<ProfesorPage />} />
              <Route path="/profesor/perfil-docente" element={<PerfilDocentePage />} />
              <Route path="/alumno" element={<AlumnoPage />} />
              <Route path="/cursos" element={<CursosPage />} />
              <Route path="/refuerzo" element={<RefuerzoPage />} />
              <Route path="/perfil" element={<PerfilPage />} />
              <Route path="/matematicas" element={<MatematicaInfo />} />
              <Route path="/matematicas/ecuaciones" element={<MCPEcuacionesExercises />} />
              <Route path="/matematicas/ejercicioscombinados" element={<MCPOperacionesCombinadosExercises />} />
              <Route path="/lengua" element={<LenguaInfo />} />
              <Route path="/lengua/ortografia" element={<MCPOrtografiaExercises />} />
              <Route path="/lengua/clasesdepalabras" element={<MCPClasesDepalabrasExercises />} />
              <Route path="/practica-ortografia" element={<PracticaOrtografiaPage />} />
              <Route path="/practica-matematica" element={<PracticaMatematicaPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
