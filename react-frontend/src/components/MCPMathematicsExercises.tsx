import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiService } from '../services/api';

interface MCPExercise {
  id: string;
  title: string;
  instruction: string;
  questions: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  type: string;
  contextId: string;
  module: string;
}

const MCPMathematicsExercises: React.FC = () => {
  const [exercises, setExercises] = useState<MCPExercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aiCorrection, setAiCorrection] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const response = await apiService.getExercisesByModule('matematicas');
        setExercises(response.exercises || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const handleAnswerSubmit = async () => {
    if (!userAnswer.trim()) return;
    
    setShowResult(true);
    
    const currentExercise = exercises[currentExerciseIndex];
    const currentQuestion = currentExercise.questions[currentQuestionIndex];
    
    try {
      // Call AI correction service
      const correctionResponse = await apiService.correctAnswerWithAI({
        question: currentQuestion,
        userAnswer: userAnswer,
        correctAnswer: '', // We don't have predefined correct answers for MCP exercises
        contextId: currentExercise.contextId,
        exerciseId: currentExercise.id
      });
      
      setAiCorrection(correctionResponse.response);
      
      // For now, we'll assume the AI will tell us if it's correct
      // In a real implementation, you might parse the AI response to determine correctness
      const isAnswerCorrect = correctionResponse.response.toLowerCase().includes('correcto') || 
                             correctionResponse.response.toLowerCase().includes('bien');
      
      setIsCorrect(isAnswerCorrect);
      
      if (isAnswerCorrect) {
        setScore(score + 1);
      }
    } catch (error) {
      console.error('Error getting AI correction:', error);
      setAiCorrection('Error al obtener la corrección. Por favor, intenta de nuevo.');
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    const currentExercise = exercises[currentExerciseIndex];
    
    if (currentQuestionIndex < currentExercise.questions.length - 1) {
      // Next question in same exercise
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setShowResult(false);
      setAiCorrection('');
      setIsCorrect(null);
    } else if (currentExerciseIndex < exercises.length - 1) {
      // Next exercise
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentQuestionIndex(0);
      setUserAnswer('');
      setShowResult(false);
      setAiCorrection('');
      setIsCorrect(null);
    } else {
      // All exercises completed
      setCompleted(true);
    }
  };

  const resetExercises = () => {
    setCurrentExerciseIndex(0);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setShowResult(false);
    setScore(0);
    setCompleted(false);
    setAiCorrection('');
    setIsCorrect(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500 bg-green-100 dark:bg-green-900';
      case 'medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900';
      case 'hard': return 'text-red-500 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getTotalQuestions = () => {
    return exercises.reduce((total, exercise) => total + exercise.questions.length, 0);
  };

  const getCurrentQuestionNumber = () => {
    let questionNumber = 0;
    for (let i = 0; i < currentExerciseIndex; i++) {
      questionNumber += exercises[i].questions.length;
    }
    return questionNumber + currentQuestionIndex + 1;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando ejercicios de matemáticas...</p>
        </div>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">No se encontraron ejercicios de matemáticas.</p>
          <Link to="/cursos" className="text-primary hover:text-primary/80 mt-4 inline-block">
            Volver a Cursos
          </Link>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-green-500 text-4xl">check_circle</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">¡Ejercicios Completados!</h1>
            <p className="text-gray-600 dark:text-gray-400">Has terminado todos los ejercicios de matemáticas.</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Resultados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{score}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Respuestas Evaluadas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{getTotalQuestions()}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total de Preguntas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">100%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completado</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={resetExercises}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Intentar de Nuevo
            </button>
            <Link
              to="/cursos"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-center"
            >
              Volver a Cursos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentExercise = exercises[currentExerciseIndex];
  const currentQuestion = currentExercise.questions[currentQuestionIndex];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/cursos" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
          <span className="material-symbols-outlined mr-2">arrow_back</span>
          Volver a Cursos
        </Link>
        
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ejercicios de Matemáticas</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentExercise.difficulty)}`}>
            {currentExercise.difficulty === 'easy' ? 'Fácil' : currentExercise.difficulty === 'medium' ? 'Medio' : 'Difícil'}
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Pregunta {getCurrentQuestionNumber()} de {getTotalQuestions()}</span>
          <span>•</span>
          <span>Ejercicio: {currentExercise.title}</span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(getCurrentQuestionNumber() / getTotalQuestions()) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {currentExercise.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {currentExercise.instruction}
          </p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {currentQuestion}
          </h3>
        </div>

        <div className="mb-6">
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={showResult}
            className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-700 dark:text-white"
            rows={4}
            placeholder="Escribe tu respuesta aquí..."
          />
        </div>

        {showResult && aiCorrection && (
          <div className={`border rounded-lg p-4 mb-6 ${
            isCorrect 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
              : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
          }`}>
            <h3 className={`font-semibold mb-2 ${
              isCorrect ? 'text-green-900 dark:text-green-100' : 'text-orange-900 dark:text-orange-100'
            }`}>
              Corrección de EduBot:
            </h3>
            <div className={`${
              isCorrect ? 'text-green-800 dark:text-green-200' : 'text-orange-800 dark:text-orange-200'
            }`}>
              {aiCorrection.split('\n').map((line, index) => (
                <p key={index} className="mb-2">{line}</p>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <div className="text-base">Matemática</div>
            
          </div>
          
          {!showResult ? (
            <button
              onClick={handleAnswerSubmit}
              disabled={!userAnswer.trim()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Enviar Respuesta
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              {currentQuestionIndex < currentExercise.questions.length - 1 
                ? 'Siguiente Pregunta' 
                : currentExerciseIndex < exercises.length - 1 
                  ? 'Siguiente Ejercicio' 
                  : 'Ver Resultados'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MCPMathematicsExercises;
