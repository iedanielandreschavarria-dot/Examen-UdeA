import React, { useState, useEffect } from 'react';
import {
  Play,
  Clock,
  CheckCircle2,
  XCircle,
  PlusCircle,
  BookOpen,
  Brain,
  AlertTriangle,
  RotateCcw,
  Save,
  Award,
  FilePlus2,
  ListChecks,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import {
  Question,
  ExamComponent,
  DifficultyLevel,
  ErrorCode,
  SimulacroRecord,
} from '../types';
import { ERROR_CODE_META, getTodayIso, formatSpanishDate } from '../utils/dateAndStats';

interface TrainerModuleProps {
  questions: Question[];
  simulacros: SimulacroRecord[];
  onAddCustomQuestion: (q: Question) => void;
  onAddErrorEntry: (params: {
    question: Question;
    userOption: 'A' | 'B' | 'C' | 'D';
    errorCode: ErrorCode;
    personalNote: string;
  }) => void;
  onAddSimulacroRecord: (sim: Omit<SimulacroRecord, 'id'>) => void;
}

type TrainerTab = 'simulator' | 'external_log' | 'create_question';
type SimulatorStage = 'setup' | 'running' | 'review';

export const TrainerModule: React.FC<TrainerModuleProps> = ({
  questions,
  simulacros,
  onAddCustomQuestion,
  onAddErrorEntry,
  onAddSimulacroRecord,
}) => {
  const [activeTab, setActiveTab] = useState<TrainerTab>('simulator');

  // Simulator setup states
  const [simStage, setSimStage] = useState<SimulatorStage>('setup');
  const [compFilter, setCompFilter] = useState<'Ambos' | ExamComponent>('Ambos');
  const [levelFilter, setLevelFilter] = useState<'Todos' | DifficultyLevel>('Todos');
  const [timerMode, setTimerMode] = useState<'timed' | 'free'>('timed');

  // Active quiz states
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [savedToDashboard, setSavedToDashboard] = useState<boolean>(false);

  // Error notebook tagging inside review screen
  const [errorCodeDrafts, setErrorCodeDrafts] = useState<Record<string, ErrorCode>>({});
  const [errorNoteDrafts, setErrorNoteDrafts] = useState<Record<string, string>>({});
  const [savedErrorIds, setSavedErrorIds] = useState<Record<string, boolean>>({});

  // External simulacro form state
  const [extDate, setExtDate] = useState<string>(getTodayIso());
  const [extTitle, setExtTitle] = useState<string>('Simulacro Completo Externo #1');
  const [extLectura, setExtLectura] = useState<number>(32);
  const [extLogica, setExtLogica] = useState<number>(30);
  const [extDuration, setExtDuration] = useState<number>(165);
  const [extNotes, setExtNotes] = useState<string>('');
  const [extSuccessMsg, setExtSuccessMsg] = useState<string>('');

  // Custom question form state
  const [newComp, setNewComp] = useState<ExamComponent>('Razonamiento Lógico');
  const [newLevel, setNewLevel] = useState<DifficultyLevel>('Intermedio');
  const [newTopic, setNewTopic] = useState<string>('');
  const [newContext, setNewContext] = useState<string>('');
  const [newStatement, setNewStatement] = useState<string>('');
  const [optA, setOptA] = useState<string>('');
  const [optB, setOptB] = useState<string>('');
  const [optC, setOptC] = useState<string>('');
  const [optD, setOptD] = useState<string>('');
  const [newCorrect, setNewCorrect] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [newExplanation, setNewExplanation] = useState<string>('');
  const [createdQuestionMsg, setCreatedQuestionMsg] = useState<string>('');

  // Filter questions for preview
  const filteredPool = questions.filter((q) => {
    const matchComp = compFilter === 'Ambos' || q.component === compFilter;
    const matchLevel = levelFilter === 'Todos' || q.level === levelFilter;
    return matchComp && matchLevel;
  });

  // Timer effect
  useEffect(() => {
    if (simStage !== 'running') return;
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
      if (timerMode === 'timed') {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setSimStage('review');
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [simStage, timerMode]);

  const startPractice = () => {
    if (filteredPool.length === 0) return;
    setActiveQuestions(filteredPool);
    setCurrentIdx(0);
    setAnswers({});
    setSecondsElapsed(0);
    // 2.25 minutes = 135 seconds per question
    setSecondsLeft(Math.round(filteredPool.length * 135));
    setSavedToDashboard(false);
    setSavedErrorIds({});
    setSimStage('running');
  };

  const finishPractice = () => {
    setSimStage('review');
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSelectOption = (qId: string, optId: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const handleSaveErrorFromReview = (q: Question) => {
    const userOpt = answers[q.id] || 'A';
    const chosenCode = errorCodeDrafts[q.id] || (q.component === 'Competencia Lectora' ? 'I' : 'P');
    const note =
      errorNoteDrafts[q.id] ||
      `Fallo en ${q.topic}: marqué ${userOpt} en lugar de ${q.correctOption}. Revisar explicación paso a paso.`;

    onAddErrorEntry({
      question: q,
      userOption: userOpt,
      errorCode: chosenCode,
      personalNote: note,
    });
    setSavedErrorIds((prev) => ({ ...prev, [q.id]: true }));
  };

  const handleSaveMiniSimulacroToDashboard = () => {
    if (savedToDashboard) return;
    const lecQs = activeQuestions.filter((q) => q.component === 'Competencia Lectora');
    const logQs = activeQuestions.filter((q) => q.component === 'Razonamiento Lógico');

    const lecHits = lecQs.filter((q) => answers[q.id] === q.correctOption).length;
    const logHits = logQs.filter((q) => answers[q.id] === q.correctOption).length;

    // Scale to /40 equivalent for comparability on the chart
    const scaledLec =
      lecQs.length > 0
        ? Math.round((lecHits / lecQs.length) * 40)
        : Math.round((logHits / Math.max(1, logQs.length)) * 40);
    const scaledLog =
      logQs.length > 0
        ? Math.round((logHits / logQs.length) * 40)
        : Math.round((lecHits / Math.max(1, lecQs.length)) * 40);

    onAddSimulacroRecord({
      date: getTodayIso(),
      title: `Mini-Simulacro App (${activeQuestions.length} ítems)`,
      lecturaCorrect: scaledLec,
      logicaCorrect: scaledLog,
      totalQuestionsPerComp: 40,
      durationMinutes: Math.max(1, Math.round(secondsElapsed / 60)),
      source: 'Mini-Simulacro App',
      notes: `Realizado en el Entrenador Activo (${lecHits}/${lecQs.length} Lectura, ${logHits}/${logQs.length} Lógica).`,
    });
    setSavedToDashboard(true);
  };

  const handleExternalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSimulacroRecord({
      date: extDate,
      title: extTitle.trim() || 'Simulacro Externo UdeA',
      lecturaCorrect: Math.min(40, Math.max(0, Number(extLectura))),
      logicaCorrect: Math.min(40, Math.max(0, Number(extLogica))),
      totalQuestionsPerComp: 40,
      durationMinutes: Math.min(240, Math.max(1, Number(extDuration))),
      source: 'Simulacro Externo',
      notes: extNotes.trim(),
    });
    setExtSuccessMsg('¡Simulacro registrado! Las gráficas del Dashboard se han actualizado.');
    setTimeout(() => setExtSuccessMsg(''), 4000);
  };

  const handleCreateQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim() || !newStatement.trim() || !optA.trim() || !optB.trim()) return;

    const customQ: Question = {
      id: `custom-${Date.now()}`,
      component: newComp,
      level: newLevel,
      topic: newTopic.trim(),
      contextText: newContext.trim() || undefined,
      statement: newStatement.trim(),
      options: [
        { id: 'A', text: optA.trim() },
        { id: 'B', text: optB.trim() },
        { id: 'C', text: optC.trim() || 'Opción C' },
        { id: 'D', text: optD.trim() || 'Opción D' },
      ],
      correctOption: newCorrect,
      explanation:
        newExplanation.trim() || 'Pregunta personalizada agregada por el estudiante.',
      distractorAnalysis: {
        A: newCorrect === 'A' ? 'CORRECTA.' : 'Distractor.',
        B: newCorrect === 'B' ? 'CORRECTA.' : 'Distractor.',
        C: newCorrect === 'C' ? 'CORRECTA.' : 'Distractor.',
        D: newCorrect === 'D' ? 'CORRECTA.' : 'Distractor.',
      },
      isCustom: true,
    };

    onAddCustomQuestion(customQ);
    setNewTopic('');
    setNewContext('');
    setNewStatement('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setNewExplanation('');
    setCreatedQuestionMsg('¡Pregunta agregada exitosamente al banco de entrenamiento!');
    setTimeout(() => setCreatedQuestionMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado y Pestañas del Módulo 4 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#026937] dark:bg-emerald-950 dark:text-emerald-300">
              <Clock className="h-3.5 w-3.5" />
              Entrenamiento Activo • Estándar 2,25 min/pregunta
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              Entrenador y Mini-Simulacros UdeA
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Banco calibrado de preguntas originales con análisis de distractores, conexión directa al Cuaderno de Errores y registro de simulacros.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                activeTab === 'simulator'
                  ? 'bg-[#026937] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Play className="h-4 w-4" />
              Simulador de Preguntas ({questions.length})
            </button>
            <button
              onClick={() => setActiveTab('external_log')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                activeTab === 'external_log'
                  ? 'bg-[#026937] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <ListChecks className="h-4 w-4" />
              Registrar Simulacro Externo ({simulacros.length})
            </button>
            <button
              onClick={() => setActiveTab('create_question')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                activeTab === 'create_question'
                  ? 'bg-[#026937] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <FilePlus2 className="h-4 w-4" />
              Agregar Pregunta Propia
            </button>
          </div>
        </div>
      </div>

      {/* ==================== PESTAÑA 1: SIMULADOR INTERACTIVO ==================== */}
      {activeTab === 'simulator' && (
        <>
          {simStage === 'setup' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Configurar Sesión de Entrenamiento
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Selecciona el componente, nivel de dificultad y modalidad de reloj antes de iniciar.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Componente a evaluar
                  </label>
                  <select
                    value={compFilter}
                    onChange={(e) => setCompFilter(e.target.value as 'Ambos' | ExamComponent)}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="Ambos">
                      Mixto Oficial (Competencia Lectora + Razonamiento Lógico)
                    </option>
                    <option value="Competencia Lectora">Solo Competencia Lectora</option>
                    <option value="Razonamiento Lógico">Solo Razonamiento Lógico</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Nivel de dificultad
                  </label>
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value as 'Todos' | DifficultyLevel)}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="Todos">Todos los niveles (Básico, Intermedio y Avanzado)</option>
                    <option value="Básico">Nivel Básico (Fundamentación)</option>
                    <option value="Intermedio">Nivel Intermedio (Estándar UdeA)</option>
                    <option value="Avanzado">Nivel Avanzado (Corte Medicina)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Modo de Cronómetro
                  </label>
                  <select
                    value={timerMode}
                    onChange={(e) => setTimerMode(e.target.value as 'timed' | 'free')}
                    className="mt-1.5 w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="timed">
                      Cronómetro Oficial UdeA (2,25 min / pregunta)
                    </option>
                    <option value="free">Modo Libre (Cronómetro ascendente sin corte)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30">
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">
                    Preguntas seleccionadas: {filteredPool.length} ítems
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Tiempo asignado (ritmo 2,25 min/preg):{' '}
                    <strong>{formatTimer(Math.round(filteredPool.length * 135))} min</strong>
                  </p>
                </div>

                <button
                  onClick={startPractice}
                  disabled={filteredPool.length === 0}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#026937] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#02542c] disabled:opacity-40"
                >
                  <Play className="h-4 w-4" />
                  Comenzar Mini-Simulacro Ahora
                </button>
              </div>
            </div>
          )}

          {/* MODO EN EJECUCIÓN (RUNNING) */}
          {simStage === 'running' && activeQuestions.length > 0 && (
            <div className="space-y-4">
              {/* Barra superior de progreso y cronómetro */}
              <div className="sticky top-2 z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 px-5 py-3.5 shadow-md backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-[#026937] px-3 py-1 text-xs font-extrabold text-white">
                    Pregunta {currentIdx + 1} de {activeQuestions.length}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Respondidas: {Object.keys(answers).length} / {activeQuestions.length}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-sm font-extrabold ${
                      timerMode === 'timed' && secondsLeft < 60
                        ? 'animate-pulse bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    <Clock className="h-4 w-4" />
                    {timerMode === 'timed'
                      ? `Restante: ${formatTimer(secondsLeft)}`
                      : `Tiempo: ${formatTimer(secondsElapsed)}`}
                  </div>

                  <button
                    onClick={finishPractice}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                  >
                    Finalizar y Calificar
                  </button>
                </div>
              </div>

              {/* Píldoras de navegación rápida de preguntas */}
              <div className="flex flex-wrap gap-1.5">
                {activeQuestions.map((q, idx) => {
                  const isAnswered = Boolean(answers[q.id]);
                  const isCurrent = idx === currentIdx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-8 w-8 rounded-lg text-xs font-bold transition ${
                        isCurrent
                          ? 'ring-2 ring-[#026937] bg-[#026937] text-white'
                          : isAnswered
                          ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Tarjeta de la pregunta actual */}
              {(() => {
                const q = activeQuestions[currentIdx];
                const selectedOpt = answers[q.id];
                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ${
                            q.component === 'Competencia Lectora'
                              ? 'bg-emerald-100 text-[#026937] dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {q.component === 'Competencia Lectora' ? (
                            <BookOpen className="h-3.5 w-3.5" />
                          ) : (
                            <Brain className="h-3.5 w-3.5" />
                          )}
                          {q.component}
                        </span>
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {q.topic}
                        </span>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          q.level === 'Avanzado'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            : q.level === 'Intermedio'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        }`}
                      >
                        Nivel {q.level}
                      </span>
                    </div>

                    {q.contextText && (
                      <div className="mt-4 whitespace-pre-line rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-sm leading-relaxed text-slate-800 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-200">
                        {q.contextText}
                      </div>
                    )}

                    <h3 className="mt-5 text-base font-bold leading-snug text-slate-900 dark:text-white">
                      {q.statement}
                    </h3>

                    <div className="mt-4 space-y-2.5">
                      {q.options.map((opt) => {
                        const isSelected = selectedOpt === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(q.id, opt.id)}
                            className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition ${
                              isSelected
                                ? 'border-2 border-[#026937] bg-emerald-50/60 font-semibold text-slate-900 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-white'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800/60'
                            }`}
                          >
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold ${
                                isSelected
                                  ? 'bg-[#026937] text-white'
                                  : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                              }`}
                            >
                              {opt.id}
                            </span>
                            <span className="leading-relaxed">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                      <button
                        onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                        disabled={currentIdx === 0}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
                      >
                        <ChevronLeft className="h-4 w-4" /> Anterior
                      </button>

                      {currentIdx < activeQuestions.length - 1 ? (
                        <button
                          onClick={() =>
                            setCurrentIdx((i) => Math.min(activeQuestions.length - 1, i + 1))
                          }
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#026937] px-5 py-2 text-xs font-bold text-white hover:bg-[#02542c]"
                        >
                          Siguiente <ChevronRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={finishPractice}
                          className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400"
                        >
                          <CheckCircle2 className="h-4 w-4" /> Entregar y Ver Explicaciones
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* PANTALLA DE REVISIÓN Y ETIQUETADO DE ERRORES (REVIEW) */}
          {simStage === 'review' && (
            <div className="space-y-6">
              {(() => {
                const totalQ = activeQuestions.length;
                const totalHits = activeQuestions.filter(
                  (q) => answers[q.id] === q.correctOption
                ).length;
                const scorePct = totalQ > 0 ? Math.round((totalHits / totalQ) * 1000) / 10 : 0;

                return (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#026937] dark:bg-emerald-950 dark:text-emerald-300">
                          <Award className="h-4 w-4" />
                          Revisión Forense de Respuestas y Distractores
                        </span>
                        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                          Resultado: {totalHits} / {totalQ} aciertos ({scorePct}%)
                        </h2>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Tiempo total empleado: {formatTimer(secondsElapsed)} • Promedio:{' '}
                          {Math.round(secondsElapsed / Math.max(1, totalQ))} s / pregunta
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={handleSaveMiniSimulacroToDashboard}
                          disabled={savedToDashboard}
                          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                            savedToDashboard
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-[#026937] text-white hover:bg-[#02542c]'
                          }`}
                        >
                          <Save className="h-4 w-4" />
                          {savedToDashboard
                            ? 'Guardado en Gráfica del Dashboard'
                            : 'Guardar Resultado en Dashboard'}
                        </button>
                        <button
                          onClick={() => setSimStage('setup')}
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Nueva Práctica
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Desglose pregunta por pregunta */}
              <div className="space-y-4">
                {activeQuestions.map((q, idx) => {
                  const userOpt = answers[q.id];
                  const isCorrect = userOpt === q.correctOption;
                  const isSavedErr = Boolean(savedErrorIds[q.id]);

                  return (
                    <div
                      key={q.id}
                      className={`rounded-2xl border bg-white p-6 shadow-sm dark:bg-slate-900 ${
                        isCorrect
                          ? 'border-emerald-300 dark:border-emerald-800/70'
                          : 'border-rose-300 dark:border-rose-800/70'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-bold text-white dark:bg-slate-700">
                            #{idx + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {q.component} • {q.topic} ({q.level})
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          }`}
                        >
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5" /> Correcta (Marcaste {userOpt})
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3.5 w-3.5" />{' '}
                              {userOpt
                                ? `Incorrecta (Marcaste ${userOpt} • Correcta: ${q.correctOption})`
                                : `Sin responder (Correcta: ${q.correctOption})`}
                            </>
                          )}
                        </span>
                      </div>

                      <p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                        {q.statement}
                      </p>

                      {/* Explicación Paso a Paso */}
                      <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-xs leading-relaxed text-slate-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-slate-200">
                        <strong className="block text-[#026937] dark:text-emerald-400">
                          Explicación paso a paso (Respuesta correcta: {q.correctOption}):
                        </strong>
                        <p className="mt-1 whitespace-pre-line">{q.explanation}</p>
                      </div>

                      {/* Análisis de Distractores A, B, C, D */}
                      <div className="mt-3 space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Análisis de opciones y distractores:
                        </span>
                        {q.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`rounded-lg border p-2.5 text-xs ${
                              opt.id === q.correctOption
                                ? 'border-emerald-300 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/30'
                                : opt.id === userOpt
                                ? 'border-rose-300 bg-rose-50/50 dark:border-rose-800 dark:bg-rose-950/30'
                                : 'border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-800/40'
                            }`}
                          >
                            <div className="font-bold text-slate-900 dark:text-white">
                              Opción {opt.id}: {opt.text}
                            </div>
                            <div className="mt-0.5 text-slate-600 dark:text-slate-300">
                              → {q.distractorAnalysis[opt.id]}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Selector para Etiquetar en el Cuaderno de Errores (Códigos C, I, P, T) */}
                      {!isCorrect && (
                        <div className="mt-4 rounded-xl border border-amber-300/80 bg-amber-50/60 p-4 dark:border-amber-800/60 dark:bg-amber-950/25">
                          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
                            <AlertTriangle className="h-4 w-4" />
                            <span>
                              Etiquetar este fallo en el Cuaderno de Errores (Repaso Espaciado 1-2-4 semanas)
                            </span>
                          </div>

                          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-12">
                            <div className="md:col-span-4">
                              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300">
                                Código de Error (Taxonomía UdeA)
                              </label>
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
                                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                              >
                                <option value="C">{ERROR_CODE_META.C.label}</option>
                                <option value="I">{ERROR_CODE_META.I.label}</option>
                                <option value="P">{ERROR_CODE_META.P.label}</option>
                                <option value="T">{ERROR_CODE_META.T.label}</option>
                              </select>
                            </div>

                            <div className="md:col-span-5">
                              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300">
                                Nota de aprendizaje personal (qué no volver a hacer)
                              </label>
                              <input
                                type="text"
                                placeholder="Ej: No olvidar restar la intersección central..."
                                value={errorNoteDrafts[q.id] || ''}
                                onChange={(e) =>
                                  setErrorNoteDrafts((prev) => ({
                                    ...prev,
                                    [q.id]: e.target.value,
                                  }))
                                }
                                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                              />
                            </div>

                            <div className="flex items-end md:col-span-3">
                              <button
                                onClick={() => handleSaveErrorFromReview(q)}
                                disabled={isSavedErr}
                                className={`w-full rounded-lg px-3 py-2 text-xs font-bold transition ${
                                  isSavedErr
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-[#026937] text-white hover:bg-[#02542c]'
                                }`}
                              >
                                {isSavedErr
                                  ? '✓ Agendado (+7 días)'
                                  : '+ Enviar a Cuaderno de Errores'}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* ==================== PESTAÑA 2: REGISTRAR SIMULACRO EXTERNO ==================== */}
      {activeTab === 'external_log' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-5">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Registrar Simulacro Externo (80 Preguntas)
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Ingresa tus aciertos en Competencia Lectora (/40) y Razonamiento Lógico (/40) para alimentar la curva de evolución del Dashboard.
            </p>

            <form onSubmit={handleExternalSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nombre o Referencia del Simulacro
                </label>
                <input
                  type="text"
                  required
                  value={extTitle}
                  onChange={(e) => setExtTitle(e.target.value)}
                  placeholder="Ej: Simulacro Univérsate #2 / Prueba Escolaria"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Fecha de realización
                  </label>
                  <input
                    type="date"
                    required
                    value={extDate}
                    onChange={(e) => setExtDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Tiempo empleado (min)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={240}
                    required
                    value={extDuration}
                    onChange={(e) => setExtDuration(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#026937] dark:text-emerald-400">
                    Aciertos Lectura (/40)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={40}
                    required
                    value={extLectura}
                    onChange={(e) => setExtLectura(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-emerald-300 bg-emerald-50/40 px-3 py-2 text-sm font-extrabold text-slate-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-white"
                  />
                  <span className="text-[11px] text-slate-500">
                    Equivale a {Math.round((extLectura / 40) * 1000) / 10}%
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-700 dark:text-amber-400">
                    Aciertos Lógica (/40)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={40}
                    required
                    value={extLogica}
                    onChange={(e) => setExtLogica(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-amber-300 bg-amber-50/40 px-3 py-2 text-sm font-extrabold text-slate-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-white"
                  />
                  <span className="text-[11px] text-slate-500">
                    Equivale a {Math.round((extLogica / 40) * 1000) / 10}%
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Observaciones de ritmo y fatiga
                </label>
                <textarea
                  rows={2}
                  value={extNotes}
                  onChange={(e) => setExtNotes(e.target.value)}
                  placeholder="Ej: Faltaron 10 min para las últimas 4 de geometría..."
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#026937] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#02542c]"
              >
                <PlusCircle className="h-4 w-4" />
                Guardar Simulacro en Historial
              </button>

              {extSuccessMsg && (
                <div className="rounded-xl bg-emerald-100 p-3 text-xs font-bold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                  {extSuccessMsg}
                </div>
              )}
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-7">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Historial de Simulacros Registrados ({simulacros.length})
            </h2>
            <div className="mt-4 space-y-3">
              {simulacros.map((sim) => {
                const total = sim.totalQuestionsPerComp || 40;
                const lecPct = Math.round((sim.lecturaCorrect / total) * 1000) / 10;
                const logPct = Math.round((sim.logicaCorrect / total) * 1000) / 10;
                const globPct = Math.round(((lecPct + logPct) / 2) * 10) / 10;

                return (
                  <div
                    key={sim.id}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/40"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-[#026937] dark:text-emerald-400">
                          {formatSpanishDate(sim.date)} • {sim.source}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {sim.title}
                        </h3>
                      </div>
                      <div className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-extrabold text-white dark:bg-emerald-700">
                        Global: {globPct}% ({sim.lecturaCorrect + sim.logicaCorrect}/{total * 2})
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                      <div className="rounded-lg bg-white p-2 dark:bg-slate-900">
                        <span className="text-slate-500">Comp. Lectora:</span>
                        <strong className="ml-1 text-[#026937] dark:text-emerald-400">
                          {sim.lecturaCorrect}/{total} ({lecPct}%)
                        </strong>
                      </div>
                      <div className="rounded-lg bg-white p-2 dark:bg-slate-900">
                        <span className="text-slate-500">Raz. Lógico:</span>
                        <strong className="ml-1 text-amber-600 dark:text-amber-400">
                          {sim.logicaCorrect}/{total} ({logPct}%)
                        </strong>
                      </div>
                      <div className="rounded-lg bg-white p-2 dark:bg-slate-900">
                        <span className="text-slate-500">Tiempo:</span>
                        <strong className="ml-1 text-slate-800 dark:text-slate-200">
                          {sim.durationMinutes} min
                        </strong>
                      </div>
                    </div>
                    {sim.notes && (
                      <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                        {sim.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ==================== PESTAÑA 3: AGREGAR PREGUNTA PROPIA ==================== */}
      {activeTab === 'create_question' && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Agregar Nueva Pregunta al Banco Personal
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Puedes incorporar ejercicios generados con las plantillas de IA del Módulo 6 o de talleres externos.
          </p>

          <form onSubmit={handleCreateQuestionSubmit} className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Componente
                </label>
                <select
                  value={newComp}
                  onChange={(e) => setNewComp(e.target.value as ExamComponent)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="Competencia Lectora">Competencia Lectora</option>
                  <option value="Razonamiento Lógico">Razonamiento Lógico</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nivel de dificultad
                </label>
                <select
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value as DifficultyLevel)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="Básico">Básico</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Subtema específico
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Áreas sombreadas / Inferencia crítica"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Contexto o Fragmento de Lectura (Opcional)
              </label>
              <textarea
                rows={3}
                value={newContext}
                onChange={(e) => setNewContext(e.target.value)}
                placeholder="Pega aquí el texto base o descripción del problema..."
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Enunciado de la pregunta *
              </label>
              <input
                type="text"
                required
                value={newStatement}
                onChange={(e) => setNewStatement(e.target.value)}
                placeholder="¿Cuál de las siguientes afirmaciones se infiere..."
                className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Opción A *
                </label>
                <input
                  type="text"
                  required
                  value={optA}
                  onChange={(e) => setOptA(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Opción B *
                </label>
                <input
                  type="text"
                  required
                  value={optB}
                  onChange={(e) => setOptB(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Opción C *
                </label>
                <input
                  type="text"
                  required
                  value={optC}
                  onChange={(e) => setOptC(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Opción D *
                </label>
                <input
                  type="text"
                  required
                  value={optD}
                  onChange={(e) => setOptD(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Respuesta Correcta
                </label>
                <select
                  value={newCorrect}
                  onChange={(e) => setNewCorrect(e.target.value as 'A' | 'B' | 'C' | 'D')}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="A">Opción A</option>
                  <option value="B">Opción B</option>
                  <option value="C">Opción C</option>
                  <option value="D">Opción D</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Explicación de la solución
                </label>
                <input
                  type="text"
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Paso clave para resolverla en < 2,25 min..."
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#026937] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#02542c]"
            >
              <PlusCircle className="h-4 w-4" />
              Guardar Pregunta en el Banco
            </button>

            {createdQuestionMsg && (
              <div className="rounded-xl bg-emerald-100 p-3 text-xs font-bold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                {createdQuestionMsg}
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

