import React, { useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Lightbulb,
  PenTool,
  XCircle,
  Save,
  ArrowRight,
} from 'lucide-react';
import {
  StudySession,
  Question,
  ErrorCode,
} from '../types';
import { getLessonGuideForSession } from '../data/dailyLessonContent';
import { ERROR_CODE_META, formatSpanishDate } from '../utils/dateAndStats';

interface DailyLessonModalProps {
  session: StudySession;
  allQuestions: Question[];
  onClose: () => void;
  onCompleteSession: (sessionId: string, score: number | null, notes: string) => void;
  onSaveDetailsOnly: (sessionId: string, score: number | null, notes: string) => void;
  onAddErrorEntry: (params: {
    question: Question;
    userOption: 'A' | 'B' | 'C' | 'D';
    errorCode: ErrorCode;
    personalNote: string;
  }) => void;
}

export const DailyLessonModal: React.FC<DailyLessonModalProps> = ({
  session,
  allQuestions,
  onClose,
  onCompleteSession,
  onSaveDetailsOnly,
  onAddErrorEntry,
}) => {
  const lesson = getLessonGuideForSession(session, allQuestions);

  const [activeStep, setActiveStep] = useState<'theory' | 'practice' | 'log'>('theory');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({});
  const [errorCodeDrafts, setErrorCodeDrafts] = useState<Record<string, ErrorCode>>({});
  const [savedErrors, setSavedErrors] = useState<Record<string, boolean>>({});

  const [notesDraft, setNotesDraft] = useState<string>(session.notes || '');
  const [scoreDraft, setScoreDraft] = useState<string>(
    session.score !== null && session.score !== undefined ? String(session.score) : ''
  );

  const practiceQs = lesson.practiceQuestions;
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = practiceQs.filter(
    (q) => selectedAnswers[q.id] === q.correctOption
  ).length;
  const calculatedPct =
    answeredCount > 0 ? Math.round((correctCount / practiceQs.length) * 100) : null;

  const handleSelectOption = (qId: string, opt: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: opt }));
    setRevealedQuestions((prev) => ({ ...prev, [qId]: true }));
  };

  const handleSendToErrorNotebook = (q: Question) => {
    const userOpt = selectedAnswers[q.id] || 'A';
    const code =
      errorCodeDrafts[q.id] || (q.component === 'Competencia Lectora' ? 'I' : 'P');
    onAddErrorEntry({
      question: q,
      userOption: userOpt,
      errorCode: code,
      personalNote: `Fallo en Aula del Día (Sem ${session.weekNumber} - ${session.dayName}): ${session.topic}. Marqué ${userOpt} en vez de ${q.correctOption}.`,
    });
    setSavedErrors((prev) => ({ ...prev, [q.id]: true }));
  };

  const handleFinishAndComplete = () => {
    const finalScore =
      scoreDraft.trim() !== ''
        ? Math.min(100, Math.max(0, Number(scoreDraft)))
        : calculatedPct ?? session.score;

    if (!session.completed) {
      onCompleteSession(session.id, finalScore, notesDraft);
    } else {
      onSaveDetailsOnly(session.id, finalScore, notesDraft);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-xs sm:p-6">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        {/* Encabezado del Aula del Día */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-gradient-to-r from-[#026937] to-[#04542d] px-6 py-4 text-white dark:border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-emerald-100">
              <span className="rounded-md bg-white/20 px-2 py-0.5 text-white">
                Semana {session.weekNumber} • {session.dayName}
              </span>
              <span>•</span>
              <span>{session.component}</span>
              <span>•</span>
              <span>{formatSpanishDate(session.date)}</span>
            </div>
            <h2 className="mt-1.5 text-lg font-extrabold sm:text-xl">
              Aula del Día: {session.topic}
            </h2>
            <p className="text-xs text-emerald-100/90">{session.subtopic}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Barra de los 3 Pasos de la Hora Sagrada (15m + 35m + 10m) */}
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-800/60">
          <button
            onClick={() => setActiveStep('theory')}
            className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition ${
              activeStep === 'theory'
                ? 'bg-[#026937] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>1. Teoría y Esquema ({session.breakdown.theoryMin}m)</span>
          </button>

          <button
            onClick={() => setActiveStep('practice')}
            className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition ${
              activeStep === 'practice'
                ? 'bg-[#026937] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>2. Taller Práctico ({session.breakdown.practiceMin}m)</span>
          </button>

          <button
            onClick={() => setActiveStep('log')}
            className={`flex items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition ${
              activeStep === 'log'
                ? 'bg-[#026937] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <PenTool className="h-4 w-4" />
            <span>3. Bitácora y Cierre ({session.breakdown.logMin}m)</span>
          </button>
        </div>

        {/* Contenido Principal con Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* ==================== PASO 1: TEORÍA Y ESQUEMA ==================== */}
          {activeStep === 'theory' && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#026937] dark:text-emerald-400">
                  <Lightbulb className="h-4 w-4" />
                  Concepto Esencial UdeA para Hoy
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                  {lesson.coreConcept}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Fórmulas y Reglas Clave */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#026937] dark:text-emerald-400">
                    Reglas de Oro, Fórmulas y Método
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {lesson.keyRulesAndFormulas.map((rule, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs leading-relaxed text-slate-700 dark:text-slate-200"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#026937] dark:text-emerald-400" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trampas Frecuentes a Evitar */}
                <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 dark:border-amber-900/50 dark:bg-amber-950/20">
                  <h4 className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    <AlertTriangle className="h-4 w-4" />
                    Trampas Clásicas en el Examen UdeA
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {lesson.udeaTrapsToAvoid.map((trap, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs leading-relaxed text-slate-700 dark:text-slate-200"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-200 text-[10px] font-bold text-amber-900 dark:bg-amber-900 dark:text-amber-200">
                          !
                        </span>
                        <span>{trap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ejemplo Modelo Resuelto Paso a Paso */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
                <span className="inline-block rounded-md bg-slate-900 px-2.5 py-0.5 text-[11px] font-bold text-white dark:bg-emerald-700">
                  Ejemplo Modelo Resuelto Paso a Paso
                </span>
                <p className="mt-2.5 text-sm font-bold text-slate-900 dark:text-white">
                  {lesson.workedExample.prompt}
                </p>
                <div className="mt-3 whitespace-pre-line rounded-xl bg-white p-3.5 text-xs leading-relaxed text-slate-700 shadow-xs dark:bg-slate-900 dark:text-slate-200">
                  {lesson.workedExample.stepByStep}
                </div>
                <p className="mt-2.5 text-xs font-bold text-[#026937] dark:text-emerald-400">
                  💡 Conclusión táctica: {lesson.workedExample.takeaway}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveStep('practice')}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#026937] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#02542c]"
                >
                  Pasar al Mini-Taller Práctico ({session.breakdown.practiceMin} min)
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* ==================== PASO 2: MINI-TALLER PRÁCTICO ==================== */}
          {activeStep === 'practice' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="text-xs">
                  <strong className="text-slate-900 dark:text-white">
                    Ejercicios de Aplicación del Día ({practiceQs.length} preguntas):
                  </strong>{' '}
                  <span className="text-slate-600 dark:text-slate-300">
                    Selecciona una opción para ver la explicación inmediata y el análisis de distractores.
                  </span>
                </div>
                {calculatedPct !== null && (
                  <span className="rounded-lg bg-[#026937] px-3 py-1 text-xs font-extrabold text-white">
                    Aciertos hoy: {correctCount}/{practiceQs.length} ({calculatedPct}%)
                  </span>
                )}
              </div>

              {practiceQs.map((q, idx) => {
                const chosen = selectedAnswers[q.id];
                const isRevealed = Boolean(revealedQuestions[q.id]);
                const isRight = chosen === q.correctOption;

                return (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        Ejercicio #{idx + 1} • Nivel {q.level}
                      </span>
                      {isRevealed && (
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            isRight
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          }`}
                        >
                          {isRight ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5" /> ¡Correcto!
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5" /> Incorrecto (Correcta: {q.correctOption})
                            </>
                          )}
                        </span>
                      )}
                    </div>

                    {q.contextText && (
                      <div className="mt-3 whitespace-pre-line rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-200">
                        {q.contextText}
                      </div>
                    )}

                    <p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                      {q.statement}
                    </p>

                    <div className="mt-3 space-y-2">
                      {q.options.map((opt) => {
                        const isPicked = chosen === opt.id;
                        const isCorrectOpt = opt.id === q.correctOption;

                        let btnStyle =
                          'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900';
                        if (isRevealed) {
                          if (isCorrectOpt) {
                            btnStyle =
                              'border-2 border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40';
                          } else if (isPicked && !isCorrectOpt) {
                            btnStyle =
                              'border-2 border-rose-500 bg-rose-50/70 dark:bg-rose-950/40';
                          }
                        } else if (isPicked) {
                          btnStyle = 'border-2 border-[#026937] bg-emerald-50/50';
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            className={`flex w-full items-start gap-2.5 rounded-xl border p-3 text-left text-xs transition ${btnStyle}`}
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-200 font-extrabold text-slate-800 dark:bg-slate-700 dark:text-white">
                              {opt.id}
                            </span>
                            <span className="leading-relaxed text-slate-800 dark:text-slate-200">
                              {opt.text}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {isRevealed && (
                      <div className="mt-4 space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs dark:border-slate-800 dark:bg-slate-800/50">
                        <div>
                          <strong className="text-[#026937] dark:text-emerald-400">
                            Solución explicada:
                          </strong>
                          <p className="mt-1 whitespace-pre-line text-slate-700 dark:text-slate-200">
                            {q.explanation}
                          </p>
                        </div>

                        {!isRight && (
                          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3 dark:border-slate-700">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-amber-800 dark:text-amber-300">
                                Clasificar fallo:
                              </span>
                              <select
                                value={
                                  errorCodeDrafts[q.id] ||
                                  (q.component === 'Competencia Lectora' ? 'I' : 'P')
                                }
                                onChange={(e) =>
                                  setErrorCodeDrafts((prev) => ({
                                    ...prev,
                                    [q.id]: e.target.value as ErrorCode,
                                  }))
                                }
                                className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold dark:border-slate-700 dark:bg-slate-900"
                              >
                                <option value="C">{ERROR_CODE_META.C.label}</option>
                                <option value="I">{ERROR_CODE_META.I.label}</option>
                                <option value="P">{ERROR_CODE_META.P.label}</option>
                                <option value="T">{ERROR_CODE_META.T.label}</option>
                              </select>
                            </div>

                            <button
                              onClick={() => handleSendToErrorNotebook(q)}
                              disabled={Boolean(savedErrors[q.id])}
                              className="rounded-lg bg-[#026937] px-3 py-1.5 text-xs font-bold text-white disabled:bg-emerald-600"
                            >
                              {savedErrors[q.id]
                                ? '✓ Guardado en Cuaderno (+7 días)'
                                : '+ Agendar en Cuaderno de Errores'}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    if (calculatedPct !== null && scoreDraft === '') {
                      setScoreDraft(String(calculatedPct));
                    }
                    setActiveStep('log');
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#026937] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#02542c]"
                >
                  Pasar a Bitácora y Cierre ({session.breakdown.logMin} min)
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* ==================== PASO 3: BITÁCORA Y CIERRE ==================== */}
          {activeStep === 'log' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Bitácora Metacognitiva del Día ({session.breakdown.logMin} minutos finales)
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Escribe en tus propias palabras la idea clave, fórmula o trampa que aprendiste hoy. Esto quedará guardado permanentemente en la tarjeta de este día.
                </p>

                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mis apuntes y conclusiones de esta sesión:
                  </label>
                  <textarea
                    rows={4}
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    placeholder="Ej: Hoy aprendí que en oraciones concesivas con 'Aunque A, B', la tesis del autor siempre está en B..."
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div className="mt-4 max-w-xs">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Nota / Puntaje obtenido en la sesión (0 a 100 %):
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={scoreDraft}
                    onChange={(e) => setScoreDraft(e.target.value)}
                    placeholder={calculatedPct !== null ? String(calculatedPct) : 'Ej: 85'}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    const sc =
                      scoreDraft.trim() !== ''
                        ? Math.min(100, Math.max(0, Number(scoreDraft)))
                        : calculatedPct ?? session.score;
                    onSaveDetailsOnly(session.id, sc, notesDraft);
                    onClose();
                  }}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  Guardar Apuntes sin Marcar Completada
                </button>

                <button
                  onClick={handleFinishAndComplete}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#026937] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#02542c]"
                >
                  <Save className="h-4 w-4" />
                  {session.completed
                    ? 'Guardar Cambios de la Sesión'
                    : 'Guardar Bitácora y Marcar Día Completado'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

