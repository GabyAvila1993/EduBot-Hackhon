import axios from 'axios';

// Base URL for your backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // Aumentado a 60 segundos para operaciones de Gemini
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types for API responses
export interface Exercise {
  id: string;
  title: string;
  instruction: string;
  questions: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  type: string;
  contextId: string;
  module: string;
}

export interface ExerciseResult {
  exerciseId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

export interface StudentProgress {
  studentId: string;
  subject: string;
  totalExercises: number;
  completedExercises: number;
  correctAnswers: number;
  averageScore: number;
  lastActivity: string;
}

export interface TeacherStats {
  activeStudents: number;
  gradedTasks: number;
  pendingTasks: number;
  nextDeadline: {
    task: string;
    daysLeft: number;
  };
}

// API functions
export const apiService = {
  // Authentication
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('authToken');
    return response.data;
  },

  // Get exercises from MCP backend
  getExercisesByModule: async (module: string) => {
    const response = await api.get(`/assistant/exercises/${module}`);
    return response.data;
  },

  // Get exercises by specific IDs
  getExercisesByIds: async (ids: string[]) => {
    const idsString = ids.join(',');
    const response = await api.get(`/assistant/exercises-by-ids/${idsString}`);
    return response.data;
  },

  // Get exercise theory/description
  getExerciseTheory: async (exerciseId: string) => {
    const response = await api.get(`/assistant/theory-simplified/${exerciseId}`);
    return response.data;
  },

  // Mathematics exercises
  getMathematicsExercises: async (): Promise<Exercise[]> => {
    const response = await api.get('/assistant/exercises/matematicas');
    return response.data.exercises || [];
  },

  // Correct endpoint used by practice pages
  correctExercise: async (payload: { answer: string; module: string; exerciseContext: string }) => {
    const response = await api.post('/assistant/correct', payload);
    return response.data;
  },

  // Request feedback (Gemini) for a submission
  requestFeedback: async (payload: { exercise: string; answers: any; module: string; rules?: string[] }) => {
    const response = await api.post('/assistant/feedback', payload);
    return response.data;
  },

  // Language exercises
  getLanguageExercises: async (): Promise<Exercise[]> => {
    const response = await api.get('/assistant/exercises/lengua');
    return response.data.exercises || [];
  },

  // Correct answer with AI
  correctAnswerWithAI: async (data: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    contextId: string;
    exerciseId?: string;
  }) => {
    const response = await api.post('/assistant/correct-answer', data);
    return response.data;
  },

  // Submit exercise results
  submitExerciseResult: async (result: ExerciseResult) => {
    const response = await api.post('/exercises/results', result);
    return response.data;
  },

  // Get student progress
  getStudentProgress: async (studentId: string): Promise<StudentProgress[]> => {
    const response = await api.get(`/students/${studentId}/progress`);
    return response.data;
  },

  // Get teacher statistics
  getTeacherStats: async (): Promise<TeacherStats> => {
    const response = await api.get('/teacher/stats');
    return response.data;
  },

  // Get recent tasks for teacher
  getRecentTasks: async () => {
    const response = await api.get('/teacher/tasks/recent');
    return response.data;
  },

  // Create new task
  createTask: async (taskData: any) => {
    const response = await api.post('/teacher/tasks', taskData);
    return response.data;
  },

  // Get student profile
  getStudentProfile: async (studentId: string) => {
    const response = await api.get(`/students/${studentId}/profile`);
    return response.data;
  },

  // Update student profile
  updateStudentProfile: async (studentId: string, profileData: any) => {
    const response = await api.put(`/students/${studentId}/profile`, profileData);
    return response.data;
  },

  // Get student achievements
  getStudentAchievements: async (studentId: string) => {
    const response = await api.get(`/students/${studentId}/achievements`);
    return response.data;
  },

  // Get reinforcement data
  getReinforcementData: async (studentId: string) => {
    const response = await api.get(`/students/${studentId}/reinforcement`);
    return response.data;
  },

  // Get subjects and courses
  getSubjects: async () => {
    const response = await api.get('/subjects');
    return response.data;
  },

  // Error reporting
  reportError: async (error: any, context: string) => {
    try {
      await api.post('/errors/report', {
        error: error.message || error,
        stack: error.stack,
        context,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      });
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  },
};

// Utility function to handle API errors
export const handleApiError = (error: any, context: string = '') => {
  console.error(`API Error ${context}:`, error);
  
  // Report error to backend
  apiService.reportError(error, context);
  
  // Return user-friendly error message
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const message = error.response.data?.message || error.message;
    
    switch (status) {
      case 400:
        return 'Datos inválidos. Por favor, verifica la información ingresada.';
      case 401:
        return 'No tienes autorización para realizar esta acción.';
      case 403:
        return 'No tienes permisos para acceder a este recurso.';
      case 404:
        return 'El recurso solicitado no fue encontrado.';
      case 500:
        return 'Error interno del servidor. Por favor, intenta más tarde.';
      default:
        return message || 'Ha ocurrido un error inesperado.';
    }
  } else if (error.request) {
    // Network error
    return 'Error de conexión. Por favor, verifica tu conexión a internet.';
  } else {
    // Other error
    return error.message || 'Ha ocurrido un error inesperado.';
  }
};

export default api;
