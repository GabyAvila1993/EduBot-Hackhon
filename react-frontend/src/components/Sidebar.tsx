import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
    role?: 'profesor' | 'alumno' | null;
    darkMode: boolean;
    toggleDarkMode: () => void;
    setRole?: (r: 'profesor' | 'alumno' | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role = null, darkMode, toggleDarkMode, setRole }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => {
        return location.pathname === path || (path === '/profesor' && location.pathname === '/');
    };

    const itemsProfesor = [
        { path: '/profesor', icon: 'dashboard', label: 'Profesor', iconFill: true },
        { path: '/profesor/perfil-docente', icon: 'person', label: 'Perfil Docente', iconFill: false }
    ];

    const itemsAlumno = [
        { path: '/alumno', icon: 'space_dashboard', label: 'Alumno', iconFill: false },
        { path: '/cursos', icon: 'auto_stories', label: 'Mis Cursos', iconFill: false },
        { path: '/refuerzo', icon: 'model_training', label: 'Refuerzo', iconFill: false },
        { path: '/perfil', icon: 'person', label: 'Perfil', iconFill: false }
    ];

    const navItems = role === 'profesor' ? itemsProfesor : role === 'alumno' ? itemsAlumno : [];

    return (
        <aside className="sticky top-0 flex h-screen min-w-60 flex-col justify-between border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-background-dark">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 px-3">
                    <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg">
                        <span className="material-symbols-outlined text-white text-2xl">school</span>
                    </div>
                    <h1 className="text-xl font-bold dark:text-white">Menu de Configuración</h1>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                    {navItems.map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            className={`nav-link flex items-center gap-3 rounded-lg px-3 py-2 ${isActive(item.path) ? 'active-link' : ''}`}
                        >
                            <span className={`material-symbols-outlined ${item.iconFill ? 'fill' : ''}`}>
                                {item.icon}
                            </span>
                            <p className="text-sm font-medium leading-normal">{item.label}</p>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-1 border-t border-slate-200 pt-4 dark:border-slate-800">
                <button
                    onClick={toggleDarkMode}
                    className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg"
                >
                    <span className="material-symbols-outlined">
                        {darkMode ? 'light_mode' : 'dark_mode'}
                    </span>
                    <p className="text-sm font-medium leading-normal">
                        {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
                    </p>
                </button>
                <button className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg">
                    <span className="material-symbols-outlined">settings</span>
                    <p className="text-sm font-medium leading-normal">Ajustes</p>
                </button>
                <button
                    onClick={() => {
                        // Clear role (if provided) so sidebar hides, then navigate to selection
                        if (setRole) setRole(null);
                        navigate('/');
                    }}
                    className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg"
                >
                    <span className="material-symbols-outlined">logout</span>
                    <p className="text-sm font-medium leading-normal">Cerrar Sesión</p>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
