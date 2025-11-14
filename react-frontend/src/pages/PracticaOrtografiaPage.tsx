import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import actividadesExtraExercises, { Question } from '../data/ortografiaExtras';
import { apiService } from '../services/api';

type QuestionAnswer = string | string[];

const PracticaOrtografiaPage: React.FC = () => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, QuestionAnswer[]>>({});
  const [results, setResults] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState<Record<string, boolean>>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; body: string; exId?: string } | null>(null);
  const [lastSubmission, setLastSubmission] = useState<any>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState<{ ok: boolean; title: string; body: string; rules?: string[] } | null>(null);

  const location = useLocation();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await apiService.getExercisesByModule('ortografia');
        let exs: any[] = [];
        // If navigation includes explicit source to load local exercises, use them
        const navState: any = (location && (location as any).state) || {};
        if (navState.source === 'ortografiaExtras') {
          exs = actividadesExtraExercises;
        } else if (res && Array.isArray(res.exercises) && res.exercises.length > 0) {
          exs = res.exercises;
        } else if (Array.isArray(res)) {
          exs = res as any[];
        } else {
          exs = actividadesExtraExercises;
        }
        setExercises(exs);
        // inicializar respuestas una sola vez después de cargar ejercicios
        const initialAnswers: Record<string, QuestionAnswer[]> = {};
        exs.forEach(ex => {
          const arr: QuestionAnswer[] = [];
          ex.questions.forEach((q: Question) => {
            const text = (q && (q as any).text) ? (q as any).text : '';
            if ((q as any).kind === 'fill' || text.includes('_')) {
              const blanks = (text.match(/_/g) || []).length;
              arr.push(Array(blanks).fill(''));
            } else if ((q as any).kind === 'choose' || text.includes(' / ') || text.match(/\[.*?\]/)) {
              arr.push('');
            } else if ((q as any).kind === 'correct' && text && text.length > 80 && text.includes('grasiosa')) {
              arr.push(Array(5).fill(''));
            } else {
              arr.push('');
            }
          });
          initialAnswers[ex.id] = arr;
        });
        setAnswers(initialAnswers);
      } catch (err) {
        // fallback local
        setExercises(actividadesExtraExercises);
        const initialAnswers: Record<string, QuestionAnswer[]> = {};
        actividadesExtraExercises.forEach(ex => {
          const arr: QuestionAnswer[] = [];
          ex.questions.forEach((q: Question) => {
            const text = (q && (q as any).text) ? (q as any).text : '';
            if ((q as any).kind === 'fill' || text.includes('_')) {
              const blanks = (text.match(/_/g) || []).length;
              arr.push(Array(blanks).fill(''));
            } else if ((q as any).kind === 'choose' || text.includes(' / ') || text.match(/\[.*?\]/)) {
              arr.push('');
            } else if ((q as any).kind === 'correct' && text && text.length > 80 && text.includes('grasiosa')) {
              arr.push(Array(5).fill(''));
            } else {
              arr.push('');
            }
          });
          initialAnswers[ex.id] = arr;
        });
        setAnswers(initialAnswers);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const handleBlankInput = (exId: string, qIndex: number, blankIndex: number, value: string) => {
    setAnswers(prev => {
      const ex = prev[exId] ? [...prev[exId]] : [];
      ex[qIndex] = ex[qIndex] ? [...(ex[qIndex] as any)] : [];
      (ex[qIndex] as string[])[blankIndex] = value;
      return { ...prev, [exId]: ex };
    });
  };

  const handleSingleInput = (exId: string, qIndex: number, value: string) => {
    setAnswers(prev => {
      const ex = prev[exId] ? [...prev[exId]] : [];
      ex[qIndex] = value;
      return { ...prev, [exId]: ex };
    });
  };

  const renderQuestion = (exId: string, q: Question, qIndex: number) => {
    const text = (q as any).text || '';

    // blanks (fill)
    if ((q as any).kind === 'fill' || text.includes('_')) {
      const parts = text.split('_');
      const blanks = parts.length - 1;
      const slots = (answers[exId] && Array.isArray(answers[exId][qIndex]) ? (answers[exId][qIndex] as string[]).length : blanks);
      return (
        <div className="flex items-center gap-2" key={qIndex}>
          {parts.map((part: string, i: number) => (
            <React.Fragment key={i}>
              <span>{part}</span>
              {i < blanks && (
                <input
                  className="w-12 h-8 border rounded px-1 text-center"
                  value={(answers[exId] && Array.isArray(answers[exId][qIndex]) && (answers[exId][qIndex] as string[])[i]) || ''}
                  onChange={(e) => handleBlankInput(exId, qIndex, i, e.target.value)}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      );
    }

    // bracket options like 'El [viaje / viage] fue...'
    const bracketMatch = text.match(/\[(.*?)\]/);
    if (bracketMatch || (q as any).kind === 'choose') {
      const inner = bracketMatch ? bracketMatch[1] : '';
      const opts = (q as any).kind === 'choose' ? (q as any).options || [] : inner.split('/').map((s: string) => s.trim());
      return (
        <div key={qIndex} className="flex flex-col gap-1">
          {opts.map((opt: string, oi: number) => (
            <label key={oi} className="flex items-center gap-2">
              <input type="radio" name={`${exId}-${qIndex}`} value={opt} checked={answers[exId] && answers[exId][qIndex] === opt} onChange={(e) => handleSingleInput(exId, qIndex, e.target.value)} />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      );
    }

    // Special case SCZ-1: expects 5 answers (per spec)
    if ((q as any).kind === 'correct' && text && text.length > 80 && text.includes('grasiosa')) {
      return (
        <div key={qIndex} className="grid grid-cols-1 gap-2">
          {[0,1,2,3,4].map(i => (
            <input key={i} className="w-full border rounded p-2" placeholder={`Palabra ${i+1}`} value={(answers[exId] && Array.isArray(answers[exId][qIndex]) && (answers[exId][qIndex] as string[])[i]) || ''} onChange={(e) => handleBlankInput(exId, qIndex, i, e.target.value)} />
          ))}
        </div>
      );
    }

    // default: textarea
    return (
      <textarea key={qIndex} className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-w-2xl border rounded p-2" rows={3} value={(answers[exId] && (answers[exId][qIndex] as string)) || ''} onChange={(e) => handleSingleInput(exId, qIndex, e.target.value)} />
    );
  };

  const buildSubmissionForExercise = (exId: string, ex: any) => {
    const ans = answers[exId] || [];
    const normalized = ex.questions.map((q: Question, qi: number) => {
      const text = (q as any).text || '';
      if ((q as any).kind === 'fill' || text.includes('_')) {
        const parts = text.split('_');
        const blanks = parts.length - 1;
        const filled = (ans[qi] && Array.isArray(ans[qi])) ? (ans[qi] as string[]) : Array(blanks).fill('');
        let built = '';
        for (let i=0;i<parts.length;i++){
          built += parts[i];
          if (i < blanks) built += (filled[i] || '');
        }
        return built;
      }
      if ((q as any).kind === 'choose') {
        return ans[qi] || '';
      }
      const bracketMatch = text.match(/\[(.*?)\]/);
      if (bracketMatch) return ans[qi] || '';
      if ((q as any).kind === 'correct' && text && text.length > 80 && text.includes('grasiosa')) {
        return ans[qi] || [];
      }
      return ans[qi] || '';
    });
    return normalized;
  };

  const submitExercise = async (ex: any) => {
    const exId = ex.id;
    const payload = { exercise: exId, answers: buildSubmissionForExercise(exId, ex) };
    setSubmitting(prev => ({ ...prev, [exId]: true }));
    try {
      const res = await apiService.correctExercise({ answer: JSON.stringify(payload), module: 'ortografia', exerciseContext: exId });
      // store last submission so the "Continuar" modal can request feedback
      setLastSubmission({ exercise: exId, answers: buildSubmissionForExercise(exId, ex) });
      const response = res.response || res;
      setResults(prev => ({ ...prev, [exId]: response }));
      // abrir modal explicativo si hay preguntas incorrectas
      const perQ = response.perQuestion || response.per_question || response.perQuestionResults || null;
      const anyIncorrect = Array.isArray(perQ) && perQ.some((p: any) => p && p.isCorrect === false);
      if (anyIncorrect) {
        const explanation = response.explanation || response.explain || response.text || response.message || response.analysis || response.feedback || response;
        const asText = typeof explanation === 'string' ? explanation : JSON.stringify(explanation, null, 2);
        setModalContent({ title: `Explicación: ${ex.title}`, body: sanitizeText(asText), exId });
        setModalOpen(true);
      }
    } catch (err) {
      setResults(prev => ({ ...prev, [exId]: { error: String(err) } }));
    } finally {
      setSubmitting(prev => ({ ...prev, [exId]: false }));
    }
  };

  const submitAll = async () => {
    // Enviar cada ejercicio individualmente para que el backend lo procese correctamente
    setSubmitting(prev => ({ ...prev, all: true }));
    const aggregatedResults: Record<string, any> = {};
    let anyIncorrectOverall = false;
    for (const ex of exercises) {
      try {
        const payload = { exercise: ex.id, answers: buildSubmissionForExercise(ex.id, ex) };
        const res = await apiService.correctExercise({ answer: JSON.stringify(payload), module: 'ortografia', exerciseContext: ex.id });
        const response = res.response || res;
        aggregatedResults[ex.id] = response;
        // detectar si hay incorrectas en este ejercicio
        if (findAnyIncorrect(response)) anyIncorrectOverall = true;
      } catch (err) {
        aggregatedResults[ex.id] = { error: String(err) };
      }
    }
    // actualizar estado
    setResults(prev => ({ ...prev, ...aggregatedResults }));
    setLastSubmission({ exercise: 'all', answers: exercises.reduce((acc: any, ex: any) => ({ ...acc, [ex.id]: buildSubmissionForExercise(ex.id, ex) }), {}) });
    if (anyIncorrectOverall) {
      setModalContent({ title: `Explicación: Corrección completa`, body: 'Hay respuestas incorrectas. Revisa los resultados por ejercicio.', exId: 'all' });
      setModalOpen(true);
    }
    setSubmitting(prev => ({ ...prev, all: false }));
  };

  const closeModal = () => { setModalOpen(false); setModalContent(null); };

  const sanitizeText = (s: string) => {
    return s.replace(/`{1,3}/g, '').replace(/\*{1,3}/g, '').replace(/__+/g, '').trim();
  };

  const parseModalBody = (body: string) => {
    try {
      return JSON.parse(body);
    } catch (e) {
      return null;
    }
  };

  const requestGeminiFeedback = async () => {
    if (!lastSubmission) return;
    // try to find rules for the exercise in loaded exercises
    let rules: string[] | undefined;
    if (modalContent && modalContent.exId && modalContent.exId !== 'all') {
      const ex = exercises.find(e => e.id === modalContent.exId);
      if (ex) {
        // prefer structured rules if present
        if (ex.rules && Array.isArray(ex.rules)) rules = ex.rules.map((r: any) => typeof r === 'string' ? r : (r.title ? `${r.title}: ${Array.isArray(r.content) ? r.content.join(' ') : r.content}` : JSON.stringify(r)));
        else if (ex.content && ex.content.rules && Array.isArray(ex.content.rules)) rules = ex.content.rules.map((r: any) => typeof r === 'string' ? r : (r.title ? `${r.title}: ${Array.isArray(r.content) ? r.content.join(' ') : r.content}` : JSON.stringify(r)));
      }
    }

    try {
      const res = await apiService.requestFeedback({ ...lastSubmission, module: 'ortografia', rules });
      const feedback = res.feedback || res;
      const ok = feedback.ok === true || feedback.verdict === 'correct' || feedback.correct === true;
      const explanation = feedback.explanation || feedback.text || feedback.message || JSON.stringify(feedback, null, 2);
      const returnedRules = feedback.rules || rules || [];
      setFeedbackContent({ ok, title: ok ? 'Correcto' : 'Incorrecto', body: sanitizeText(typeof explanation === 'string' ? explanation : JSON.stringify(explanation)), rules: returnedRules });
      setFeedbackOpen(true);
      setModalOpen(false);
    } catch (err) {
      setFeedbackContent({ ok: false, title: 'Error', body: String(err), rules: [] });
      setFeedbackOpen(true);
    }
  };

  const closeFeedback = () => { setFeedbackOpen(false); setFeedbackContent(null); };

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
      <h1 className="text-2xl font-bold mb-4">Ejercicios de Ortografía</h1>
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
              {ex.questions.map((q: Question, qi: number) => {
                const text = (q as any).text || '';
                const isInline = (q as any).kind === 'fill' || text.includes('_');
                const bracketMatch = text.match(/\[(.*?)\]/);
                const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
                const showQuestionText = !isInline && (Boolean(bracketMatch) || wordCount > 1);
                return (
                  <div key={qi} className="p-2 bg-gray-50 rounded">
                    {showQuestionText && (
                      <div className="mb-2 text-base text-gray-700">{text}</div>
                    )}
                    <div>
                      {renderQuestion(ex.id, q, qi)}
                    </div>
                    {results[ex.id] && results[ex.id].perQuestion && results[ex.id].perQuestion[qi] && (
                      <div className={`mt-2 p-2 rounded ${results[ex.id].perQuestion[qi].isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {results[ex.id].perQuestion[qi].isCorrect ? 'Correcto' : 'Incorrecto'}
                        {results[ex.id].perQuestion[qi].analysis && <div className="text-sm mt-1">{results[ex.id].perQuestion[qi].analysis}</div>}
                      </div>
                    )}
                  </div>
                );
              })}
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

            <div className="max-h-[60vh] overflow-auto text-sm text-gray-700">
              {(() => {
                const parsed = parseModalBody(modalContent.body);
                if (parsed && typeof parsed === 'object') {
                  return (
                    <div className="space-y-3">
                      {parsed.aiUnavailable && (
                        <div className="p-3 rounded bg-yellow-50 text-yellow-800">La IA no está temporalmente disponible; mostrando información disponible.</div>
                      )}

                      {Array.isArray(parsed.perQuestion) ? (
                        parsed.perQuestion.map((p: any, i: number) => (
                          <div key={i} className="p-3 border rounded bg-gray-50">
                            <div className="font-semibold">Pregunta {p.index != null ? p.index + 1 : i + 1}</div>
                            <div className="mt-1 text-sm text-gray-700"><strong>Resultado:</strong> {p.isCorrect === true ? 'Correcto' : p.isCorrect === false ? 'Incorrecto' : 'No evaluado'}</div>
                            {p.analysis && <div className="mt-1 text-sm text-gray-700"><strong>Análisis:</strong> {p.analysis}</div>}
                            {p.correction && <div className="mt-1 text-sm text-gray-700"><strong>Corrección:</strong> <div className="whitespace-pre-wrap">{p.correction}</div></div>}
                            {p.theory && <div className="mt-1 text-sm text-gray-700"><strong>Teoría:</strong> {p.theory}</div>}
                          </div>
                        ))
                      ) : (
                        <pre className="whitespace-pre-wrap">{modalContent.body}</pre>
                      )}

                      {Array.isArray(parsed.recommendations) && parsed.recommendations.length > 0 && (
                        <div className="mt-2 p-3 border rounded bg-blue-50">
                          <div className="font-semibold">Recomendaciones</div>
                          <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
                            {parsed.recommendations.map((r: any, idx: number) => <li key={idx}>{r}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                }
                return <div className="whitespace-pre-wrap">{modalContent.body}</div>;
              })()}
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button onClick={closeModal} className="px-4 py-2 rounded bg-gray-200 text-gray-800">Cerrar</button>
              <button onClick={requestGeminiFeedback} className="px-4 py-2 rounded bg-primary text-white">Continuar</button>
            </div>
          </div>
        </div>
      )}

      {feedbackOpen && feedbackContent && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeFeedback}></div>
          <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-background-dark/80 rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-[#111318]">{feedbackContent.title}</h3>
              <button onClick={closeFeedback} className="text-gray-500">Cerrar ✕</button>
            </div>

            <div className="max-h-[60vh] overflow-auto text-sm text-gray-700 whitespace-pre-wrap">{feedbackContent.body}</div>

            {feedbackContent.rules && feedbackContent.rules.length > 0 && (
              <div className="mt-4 p-4 border rounded bg-gray-50">
                <h4 className="font-semibold mb-2">Reglas / Material de estudio relacionado</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {feedbackContent.rules.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button onClick={closeFeedback} className="px-4 py-2 rounded bg-primary text-white">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PracticaOrtografiaPage;
