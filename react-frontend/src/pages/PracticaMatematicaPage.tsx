import React, { useEffect, useState } from 'react';
import actividadesExtraExercises from '../data/operacionesCombinadasExtras';

type QuestionAnswer = string;

const PracticaMatematicaPage: React.FC = () => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, QuestionAnswer[]>>({});
  const [results, setResults] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch('/assistant/exercises/matematicas');
        if (!res.ok) throw new Error('No hay respuesta del backend');
        const json = await res.json();
        let exs: any[] = [];
        if (json && Array.isArray(json.exercises) && json.exercises.length > 0) {
          exs = json.exercises;
        } else if (json && Array.isArray(json)) {
          exs = json as any[];
        } else {
          exs = actividadesExtraExercises;
        }
        setExercises(exs);
        const initialAnswers: Record<string, QuestionAnswer[]> = {};
        exs.forEach(ex => {
          const arr: QuestionAnswer[] = ex.questions.map(() => '');
          initialAnswers[ex.id] = arr;
        });
        setAnswers(initialAnswers);
      } catch (err) {
        setExercises(actividadesExtraExercises);
        const initialAnswers: Record<string, QuestionAnswer[]> = {};
        actividadesExtraExercises.forEach(ex => {
          const arr: QuestionAnswer[] = ex.questions.map(() => '');
          initialAnswers[ex.id] = arr;
        });
        setAnswers(initialAnswers);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const normalizeNumberString = (s: string) => {
    if (s === null || s === undefined) return '';
    return String(s).replace(',', '.').trim();
  };

  const handleInput = (exId: string, qIndex: number, value: string) => {
    setAnswers(prev => {
      const ex = prev[exId] ? [...prev[exId]] : [];
      ex[qIndex] = value;
      return { ...prev, [exId]: ex };
    });
  };

  const buildSubmissionForExercise = (exId: string, ex: any) => {
    const ans = answers[exId] || [];
    return ex.questions.map((q: string, qi: number) => normalizeNumberString(ans[qi] || ''));
  };

  const submitExercise = async (ex: any) => {
    const exId = ex.id;
    const payload = { exercise: exId, answers: buildSubmissionForExercise(exId, ex) };
    setSubmitting(prev => ({ ...prev, [exId]: true }));
    try {
      const res = await fetch('/assistant/correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: JSON.stringify(payload), module: 'matematica', exerciseContext: exId })
      });
      const json = await res.json();
      const response = json.response || json;
      setResults(prev => ({ ...prev, [exId]: response }));
      const perQ = response.perQuestion || response.per_question || null;
      const anyIncorrect = Array.isArray(perQ) && perQ.some((p: any) => p && p.isCorrect === false);
      if (anyIncorrect) {
        const explanation = response.explanation || response.explain || response.text || response.message || response.analysis || response.feedback || response;
        const asText = typeof explanation === 'string' ? explanation : JSON.stringify(explanation, null, 2);
        setModalContent({ title: `Explicación: ${ex.title}`, body: sanitizeText(asText) });
        setModalOpen(true);
      }
    } catch (err) {
      setResults(prev => ({ ...prev, [exId]: { error: String(err) } }));
    } finally {
      setSubmitting(prev => ({ ...prev, [exId]: false }));
    }
  };

  const submitAll = async () => {
    const allAnswers: Record<string, any> = {};
    exercises.forEach(ex => {
      allAnswers[ex.id] = buildSubmissionForExercise(ex.id, ex);
    });
    setSubmitting(prev => ({ ...prev, all: true }));
    try {
      const res = await fetch('/assistant/correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: JSON.stringify({ exercise: 'all', answers: allAnswers }), module: 'matematica', exerciseContext: 'all' })
      });
      const json = await res.json();
      const response = json.response || json;
      if (response.byExercise) {
        setResults(prev => ({ ...prev, ...response.byExercise }));
      } else if (response.perExercise) {
        setResults(prev => ({ ...prev, ...response.perExercise }));
      }
      const anyIncorrect = findAnyIncorrect(response);
      if (anyIncorrect) {
        const explanation = response.explanation || response.text || response.message || response.analysis || response.feedback || response;
        const asText = typeof explanation === 'string' ? explanation : JSON.stringify(explanation, null, 2);
        setModalContent({ title: `Explicación: Corrección completa`, body: sanitizeText(asText) });
        setModalOpen(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(prev => ({ ...prev, all: false }));
    }
  };

  const closeModal = () => { setModalOpen(false); setModalContent(null); };

  const sanitizeText = (s: string) => {
    return s.replace(/`{1,3}/g, '').replace(/\*{1,3}/g, '').replace(/__+/g, '').trim();
  };

  const findAnyIncorrect = (resp: any) => {
    if (!resp) return false;
    if (Array.isArray(resp.perQuestion)) return resp.perQuestion.some((p: any) => p && p.isCorrect === false);
    if (resp.byExercise && typeof resp.byExercise === 'object') {
      return Object.values(resp.byExercise).some((v: any) => Array.isArray(v.perQuestion) && v.perQuestion.some((p: any) => p && p.isCorrect === false));
    }
    if (resp.perExercise && typeof resp.perExercise === 'object') {
      return Object.values(resp.perExercise).some((v: any) => Array.isArray(v.perQuestion) && v.perQuestion.some((p: any) => p && p.isCorrect === false));
    }
    return false;
  };

  if (loading) return <div className="p-6">Cargando ejercicios...</div>;

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ejercicios de Operaciones Combinadas</h1>
      <div className="space-y-6">
        {exercises.map((ex) => (
          <div key={ex.id} className="p-4 border rounded shadow-sm bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{ex.title}</h2>
                {ex.instruction && <p className="text-sm text-gray-600">{ex.instruction}</p>}
              </div>
              <div className="text-right">
                <button disabled={submitting[ex.id]} onClick={() => submitExercise(ex)} className="px-3 py-2 rounded bg-primary text-white">Corregir</button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {ex.questions.map((q: string, qi: number) => (
                <div key={qi} className="p-2 bg-gray-50 rounded">
                  <div className="mb-2 text-base text-gray-700">{q}</div>
                  <div>
                    <input
                      inputMode="decimal"
                      className="w-40 border rounded px-2 py-1"
                      value={(answers[ex.id] && answers[ex.id][qi]) || ''}
                      onChange={(e) => handleInput(ex.id, qi, e.target.value)}
                      placeholder="Respuesta (ej. 12.5)"
                    />
                  </div>
                  {results[ex.id] && results[ex.id].perQuestion && results[ex.id].perQuestion[qi] && (
                    <div className={`mt-2 p-2 rounded ${results[ex.id].perQuestion[qi].isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                      {results[ex.id].perQuestion[qi].isCorrect ? 'Correcto' : 'Incorrecto'}
                      {results[ex.id].perQuestion[qi].analysis && <div className="text-sm mt-1">{results[ex.id].perQuestion[qi].analysis}</div>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={submitAll} className="px-4 py-2 rounded bg-primary text-white">Corregir todo</button>
      </div>

      {modalOpen && modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeModal}></div>
          <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-background-dark/80 rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-[#111318]">{modalContent.title}</h3>
              <button onClick={closeModal} className="text-gray-500">Cerrar ✕</button>
            </div>

            <div className="max-h-[60vh] overflow-auto text-sm text-gray-700 whitespace-pre-wrap">{modalContent.body}</div>

            <div className="mt-4 flex justify-end">
              <button onClick={closeModal} className="px-4 py-2 rounded bg-primary text-white">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PracticaMatematicaPage;
