import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpenCheck,
  CalendarRange,
  Timer,
  NotebookPen,
  Library,
  Sun,
  Moon,
  Download,
  Upload,
  RotateCcw,
  GraduationCap,
  Menu,
  X,
  BookA,
} from 'lucide-react';
import {
  AppState,
  ModuleId,
  StudyConfig,
  Question,
  ErrorCode,
  SimulacroRecord,
  ErrorNotebookEntry,
  VocabularyEntry,
} from './types';
import {
  generateInitialSessions,
  buildBreakdownForComponent,
  getRealDayNameFromIso,
} from './data/studyPlanData';
import { INITIAL_QUESTIONS_BANK } from './data/questionsData';
import {
  INITIAL_SIMULACROS,
  INITIAL_ERROR_NOTEBOOK,
} from './data/resourcesData';
import { INITIAL_VOCABULARY } from './data/vocabularyData';
import { addDays, getTodayIso } from './utils/dateAndStats';
import { DashboardModule } from './components/DashboardModule';
import { ExamGuideModule } from './components/ExamGuideModule';
import { StudyPlanModule } from './components/StudyPlanModule';
import { TrainerModule } from './components/TrainerModule';
import { ErrorNotebookModule } from './components/ErrorNotebookModule';
import { VocabularyModule } from './components/VocabularyModule';
import { ResourcesModule } from './components/ResourcesModule';
import { FloatingStudyTimer } from './components/FloatingStudyTimer';
import { DailyLessonModal } from './components/DailyLessonModal';

const STORAGE_KEY = 'udea_prep_state_v1';

function createDefaultState(): AppState {
  const defaultConfig: StudyConfig = {
    targetDate: '2027-06-30',
    startDate: '2026-11-16',
    dailyHours: 1,
    daysPerWeek: 7,
    targetProgram: 'Medicina (Medellín)',
    targetCutoff: 88.5,
    studentName: 'Aspirante UdeA',
  };

  return {
    version: 2,
    darkMode: false,
    config: defaultConfig,
    sessions: generateInitialSessions(defaultConfig.startDate, defaultConfig.dailyHours),
    customQuestions: [],
    errorNotebook: INITIAL_ERROR_NOTEBOOK,
    simulacros: INITIAL_SIMULACROS,
    vocabulary: INITIAL_VOCABULARY,
  };
}

export function App() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as AppState;
        if (parsed && Array.isArray(parsed.sessions) && parsed.sessions.length > 0) {
          // Migrate old 2026-11-15 (Sunday) start date to 2026-11-16 (Monday) & sync real weekday names
          const effectiveStartDate =
            parsed.config?.startDate === '2026-11-15'
              ? '2026-11-16'
              : parsed.config?.startDate || '2026-11-16';

          const migratedSessions = parsed.sessions.map((s, idx) => {
            const correctedDate = addDays(effectiveStartDate, idx);
            return {
              ...s,
              date: correctedDate,
              dayName: getRealDayNameFromIso(correctedDate),
            };
          });

          return {
            ...parsed,
            version: 2,
            config: {
              ...parsed.config,
              startDate: effectiveStartDate,
            },
            sessions: migratedSessions,
            vocabulary:
              Array.isArray(parsed.vocabulary) && parsed.vocabulary.length > 0
                ? parsed.vocabulary
                : INITIAL_VOCABULARY,
          };
        }
      }
    } catch (err) {
      console.error('Error cargando estado desde localStorage:', err);
    }
    return createDefaultState();
  });

  const [activeModule, setActiveModule] = useState<ModuleId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('');
  const [lessonModalSessionId, setLessonModalSessionId] = useState<string | null>(null);

  // Persist to localStorage & sync dark mode
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Error guardando estado en localStorage:', err);
    }

    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Handlers
  const handleToggleDarkMode = () => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const handleUpdateConfig = (newConfig: StudyConfig) => {
    setState((prev) => {
      // Recalculate session dates & breakdowns if startDate or dailyHours changed
      const updatedSessions = prev.sessions.map((s, idx) => {
        const newDate = addDays(newConfig.startDate, idx);
        const newBreakdown = buildBreakdownForComponent(
          s.component,
          newConfig.dailyHours
        );
        return {
          ...s,
          date: newDate,
          dayName: getRealDayNameFromIso(newDate),
          breakdown: newBreakdown,
        };
      });

      return {
        ...prev,
        config: newConfig,
        sessions: updatedSessions,
      };
    });
    showToast('Configuración y calendario recalculados dinámicamente.');
  };

  const handleUpdateTargetDate = (newDate: string) => {
    handleUpdateConfig({
      ...state.config,
      targetDate: newDate,
    });
  };

  const handleToggleSession = (
    sessionId: string,
    score?: number | null,
    notes?: string
  ) => {
    setState((prev) => ({
      ...prev,
      sessions: prev.sessions.map((s) => {
        if (s.id !== sessionId) return s;
        const nextCompleted = !s.completed;
        const defaultSessionMin =
          s.breakdown.theoryMin + s.breakdown.practiceMin + s.breakdown.logMin;
        return {
          ...s,
          completed: nextCompleted,
          completedAt: nextCompleted ? new Date().toISOString() : undefined,
          score: score !== undefined ? score : s.score,
          notes: notes !== undefined ? notes : s.notes,
          minutesPracticed: nextCompleted
            ? s.minutesPracticed && s.minutesPracticed > 0
              ? s.minutesPracticed
              : defaultSessionMin
            : 0,
        };
      }),
    }));
  };

  const handleUpdateSessionPracticeMinutes = (
    sessionId: string,
    minutes: number,
    markCompleted: boolean
  ) => {
    setState((prev) => ({
      ...prev,
      sessions: prev.sessions.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              minutesPracticed: minutes,
              completed: markCompleted,
              completedAt: markCompleted
                ? s.completedAt || new Date().toISOString()
                : undefined,
              score: markCompleted ? s.score : null,
              notes: markCompleted ? s.notes : '',
            }
          : s
      ),
    }));
    showToast(
      minutes > 0
        ? `Registrados ${minutes} minutos de práctica en el calendario.`
        : 'Registro del día eliminado (0 min).'
    );
  };

  const handleUpdateSessionDetails = (
    sessionId: string,
    score: number | null,
    notes: string
  ) => {
    setState((prev) => ({
      ...prev,
      sessions: prev.sessions.map((s) =>
        s.id === sessionId ? { ...s, score, notes } : s
      ),
    }));
  };

  const handleAddCustomQuestion = (q: Question) => {
    setState((prev) => ({
      ...prev,
      customQuestions: [q, ...prev.customQuestions],
    }));
    showToast('Pregunta personalizada añadida al banco.');
  };

  const handleAddErrorEntry = (params: {
    question: Question;
    userOption: 'A' | 'B' | 'C' | 'D';
    errorCode: ErrorCode;
    personalNote: string;
  }) => {
    const today = getTodayIso();
    const newEntry: ErrorNotebookEntry = {
      id: `err-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      questionId: params.question.id,
      questionTitle: params.question.statement,
      component: params.question.component,
      topic: params.question.topic,
      errorCode: params.errorCode,
      userOption: params.userOption,
      correctOption: params.question.correctOption,
      personalNote: params.personalNote,
      createdAt: today,
      reviewStage: 1,
      nextReviewDate: addDays(today, 7),
      lastReviewedAt: null,
      mastered: false,
      reviewCount: 0,
    };

    setState((prev) => ({
      ...prev,
      errorNotebook: [newEntry, ...prev.errorNotebook],
    }));
    showToast('Fallo etiquetado en el Cuaderno de Errores (+7 días).');
  };

  const handleAddManualError = (entry: Omit<ErrorNotebookEntry, 'id'>) => {
    const fullEntry: ErrorNotebookEntry = {
      ...entry,
      id: `err-man-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      errorNotebook: [fullEntry, ...prev.errorNotebook],
    }));
    showToast('Error registrado con programación de repaso espaciado.');
  };

  const handleAdvanceReviewStage = (entryId: string) => {
    const today = getTodayIso();
    setState((prev) => ({
      ...prev,
      errorNotebook: prev.errorNotebook.map((e) => {
        if (e.id !== entryId) return e;
        if (e.reviewStage === 1) {
          return {
            ...e,
            reviewStage: 2,
            lastReviewedAt: today,
            nextReviewDate: addDays(today, 14),
            reviewCount: e.reviewCount + 1,
          };
        }
        if (e.reviewStage === 2) {
          return {
            ...e,
            reviewStage: 3,
            lastReviewedAt: today,
            nextReviewDate: addDays(today, 28),
            reviewCount: e.reviewCount + 1,
          };
        }
        return {
          ...e,
          mastered: true,
          lastReviewedAt: today,
          reviewCount: e.reviewCount + 1,
        };
      }),
    }));
    showToast('Ciclo de repaso espaciado actualizado (1-2-4 semanas).');
  };

  const handleToggleMastered = (entryId: string) => {
    const today = getTodayIso();
    setState((prev) => ({
      ...prev,
      errorNotebook: prev.errorNotebook.map((e) => {
        if (e.id !== entryId) return e;
        const nextMastered = !e.mastered;
        return {
          ...e,
          mastered: nextMastered,
          lastReviewedAt: today,
          nextReviewDate: nextMastered ? e.nextReviewDate : addDays(today, 7),
        };
      }),
    }));
  };

  const handleDeleteErrorEntry = (entryId: string) => {
    setState((prev) => ({
      ...prev,
      errorNotebook: prev.errorNotebook.filter((e) => e.id !== entryId),
    }));
  };

  const handleAddSimulacroRecord = (sim: Omit<SimulacroRecord, 'id'>) => {
    const newSim: SimulacroRecord = {
      ...sim,
      id: `sim-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      simulacros: [...prev.simulacros, newSim],
    }));
    showToast('Simulacro guardado y graficado en el Dashboard.');
  };

  // Vocabulary handlers
  const handleAddVocabularyWord = (entry: Omit<VocabularyEntry, 'id'>) => {
    const newWord: VocabularyEntry = {
      ...entry,
      id: `voc-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      vocabulary: [newWord, ...(prev.vocabulary || INITIAL_VOCABULARY)],
    }));
    showToast(`Palabra «${entry.word}» añadida a tu glosario.`);
  };

  const handleUpdateVocabularyWord = (updated: VocabularyEntry) => {
    setState((prev) => ({
      ...prev,
      vocabulary: (prev.vocabulary || INITIAL_VOCABULARY).map((v) =>
        v.id === updated.id ? updated : v
      ),
    }));
    showToast(`Palabra «${updated.word}» actualizada.`);
  };

  const handleToggleVocabularyMastered = (id: string) => {
    setState((prev) => ({
      ...prev,
      vocabulary: (prev.vocabulary || INITIAL_VOCABULARY).map((v) =>
        v.id === id ? { ...v, mastered: !v.mastered } : v
      ),
    }));
  };

  const handleDeleteVocabularyWord = (id: string) => {
    setState((prev) => ({
      ...prev,
      vocabulary: (prev.vocabulary || INITIAL_VOCABULARY).filter((v) => v.id !== id),
    }));
    showToast('Palabra eliminada del glosario.');
  };

  // Export & Import JSON Backup
  const handleExportJson = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `udea-prep-respaldo-${getTodayIso()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Respaldo JSON descargado correctamente.');
  };

  const handleImportJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(String(event.target?.result)) as AppState;
        if (parsed && Array.isArray(parsed.sessions) && parsed.config) {
          setState(parsed);
          showToast('¡Respaldo JSON restaurado con éxito!');
        } else {
          showToast('Archivo JSON inválido para UdeA Prep.');
        }
      } catch {
        showToast('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetProgress = () => {
    if (
      window.confirm(
        '¿Deseas restablecer el sistema a sus valores iniciales? Se recomienda exportar primero un respaldo JSON.'
      )
    ) {
      const fresh = createDefaultState();
      fresh.darkMode = state.darkMode;
      setState(fresh);
      showToast('Sistema restablecido a los valores por defecto.');
    }
  };

  const allQuestions = [...INITIAL_QUESTIONS_BANK, ...state.customQuestions];
  const pendingErrorsCount = state.errorNotebook.filter((e) => !e.mastered).length;
  const completedSessionsCount = state.sessions.filter((s) => s.completed).length;
  const vocabularyList = state.vocabulary || INITIAL_VOCABULARY;

  const navItems: Array<{
    id: ModuleId;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    badge?: string | number;
  }> = [
    {
      id: 'dashboard',
      label: '1. Dashboard de Progreso',
      shortLabel: 'Inicio',
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      id: 'guia',
      label: '2. Guía del Examen UdeA',
      shortLabel: 'Guía UdeA',
      icon: <BookOpenCheck className="h-4 w-4" />,
    },
    {
      id: 'plan',
      label: '3. Plan de Estudio (32 Sem)',
      shortLabel: 'Plan 32s',
      icon: <CalendarRange className="h-4 w-4" />,
      badge: `${completedSessionsCount}/224`,
    },
    {
      id: 'entrenador',
      label: '4. Entrenador y Simulacros',
      shortLabel: 'Práctica',
      icon: <Timer className="h-4 w-4" />,
      badge: allQuestions.length,
    },
    {
      id: 'errores',
      label: '5. Cuaderno de Errores',
      shortLabel: 'Errores',
      icon: <NotebookPen className="h-4 w-4" />,
      badge: pendingErrorsCount > 0 ? pendingErrorsCount : undefined,
    },
    {
      id: 'vocabulario',
      label: '6. Vocabulario y Léxico',
      shortLabel: 'Léxico',
      icon: <BookA className="h-4 w-4" />,
      badge: vocabularyList.length,
    },
    {
      id: 'recursos',
      label: '7. Recursos y Tutor IA',
      shortLabel: 'Recursos',
      icon: <Library className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col lg:flex-row">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-20 right-4 z-50 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white shadow-xl dark:bg-emerald-600 lg:bottom-6">
          {toastMsg}
        </div>
      )}

      {/* ==================== SIDEBAR ESCRITORIO ==================== */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 z-30">
        {/* Identidad Institucional UdeA Prep */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#026937] text-white shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                UdeA Prep
              </h1>
              <p className="text-[11px] font-semibold text-[#026937] dark:text-emerald-400">
                Sistema Integral de Admisión
              </p>
            </div>
          </div>
          <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-[11px] dark:bg-slate-800/70">
            <span className="text-slate-500 dark:text-slate-400">Meta actual: </span>
            <strong className="text-slate-800 dark:text-slate-200">
              {state.config.targetProgram}
            </strong>
          </div>
        </div>

        {/* Navegación Principal (6 Módulos) */}
        <nav className="flex-1 space-y-1.5 p-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-bold transition ${
                  isActive
                    ? 'bg-[#026937] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
                {item.badge !== undefined && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Controles Inferiores: Respaldo JSON + Modo Claro/Oscuro */}
        <div className="border-t border-slate-200 p-4 space-y-2.5 dark:border-slate-800">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleExportJson}
              title="Descargar copia de seguridad JSON"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Download className="h-3.5 w-3.5 text-[#026937] dark:text-emerald-400" />
              Exportar JSON
            </button>

            <label
              title="Restaurar copia de seguridad JSON"
              className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-[11px] font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <Upload className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              Importar JSON
              <input
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImportJson(file);
                  e.target.value = '';
                }}
              />
            </label>
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              onClick={handleToggleDarkMode}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {state.darkMode ? (
                <>
                  <Sun className="h-4 w-4 text-amber-400" /> Modo Claro
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-slate-600" /> Modo Oscuro
                </>
              )}
            </button>

            <button
              onClick={handleResetProgress}
              title="Restablecer valores por defecto"
              className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-500 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-800"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ==================== HEADER MÓVIL Y DRAWER ==================== */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 lg:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#026937] text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
              UdeA Prep
            </span>
            <span className="ml-2 rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-[#026937] dark:bg-emerald-950 dark:text-emerald-300">
              {state.config.targetProgram}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleDarkMode}
            className="rounded-lg border border-slate-200 p-2 text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            {state.darkMode ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-slate-200 p-2 text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Drawer Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden">
          <div className="fixed inset-y-0 right-0 w-72 bg-white p-5 shadow-2xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <span className="text-sm font-extrabold text-[#026937] dark:text-emerald-400">
                Menú UdeA Prep
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-1 text-slate-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveModule(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-bold ${
                    activeModule === item.id
                      ? 'bg-[#026937] text-white'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-200 pt-4 space-y-2 dark:border-slate-800">
              <button
                onClick={handleExportJson}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2 text-xs font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200"
              >
                <Download className="h-4 w-4" /> Exportar Respaldo JSON
              </button>
              <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-100 py-2 text-xs font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                <Upload className="h-4 w-4" /> Importar Respaldo JSON
                <input
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImportJson(file);
                    setMobileMenuOpen(false);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Temporizador Flotante Configurable (Siempre visible a la derecha) */}
      <FloatingStudyTimer />

      {/* Modal de Aula del Día (Teoría + Taller + Bitácora) */}
      {lessonModalSessionId &&
        (() => {
          const targetSession = state.sessions.find((s) => s.id === lessonModalSessionId);
          if (!targetSession) return null;
          return (
            <DailyLessonModal
              session={targetSession}
              allQuestions={allQuestions}
              onClose={() => setLessonModalSessionId(null)}
              onCompleteSession={(sessionId, score, notes) => {
                handleToggleSession(sessionId, score, notes);
                showToast('¡Día completado y bitácora guardada con éxito!');
              }}
              onSaveDetailsOnly={(sessionId, score, notes) => {
                handleUpdateSessionDetails(sessionId, score, notes);
                showToast('Apuntes de la bitácora guardados.');
              }}
              onAddErrorEntry={handleAddErrorEntry}
            />
          );
        })()}

      {/* ==================== ÁREA PRINCIPAL DE CONTENIDO ==================== */}
      <main className="flex-1 lg:pl-72 pb-20 lg:pb-10">
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          {activeModule === 'dashboard' && (
            <DashboardModule
              state={state}
              onToggleSession={handleToggleSession}
              onUpdateTargetDate={handleUpdateTargetDate}
              onNavigate={setActiveModule}
              onOpenLessonModal={(sessionId) => setLessonModalSessionId(sessionId)}
              onUpdateSessionPracticeMinutes={handleUpdateSessionPracticeMinutes}
            />
          )}

          {activeModule === 'guia' && <ExamGuideModule />}

          {activeModule === 'plan' && (
            <StudyPlanModule
              state={state}
              onUpdateConfig={handleUpdateConfig}
              onToggleSession={handleToggleSession}
              onUpdateSessionDetails={handleUpdateSessionDetails}
              onOpenLessonModal={(sessionId) => setLessonModalSessionId(sessionId)}
            />
          )}

          {activeModule === 'entrenador' && (
            <TrainerModule
              questions={allQuestions}
              simulacros={state.simulacros}
              onAddCustomQuestion={handleAddCustomQuestion}
              onAddErrorEntry={handleAddErrorEntry}
              onAddSimulacroRecord={handleAddSimulacroRecord}
            />
          )}

          {activeModule === 'errores' && (
            <ErrorNotebookModule
              entries={state.errorNotebook}
              onAdvanceReviewStage={handleAdvanceReviewStage}
              onToggleMastered={handleToggleMastered}
              onDeleteEntry={handleDeleteErrorEntry}
              onAddManualError={handleAddManualError}
            />
          )}

          {activeModule === 'vocabulario' && (
            <VocabularyModule
              vocabulary={vocabularyList}
              onAddWord={handleAddVocabularyWord}
              onUpdateWord={handleUpdateVocabularyWord}
              onToggleMastered={handleToggleVocabularyMastered}
              onDeleteWord={handleDeleteVocabularyWord}
            />
          )}

          {activeModule === 'recursos' && (
            <ResourcesModule
              onExportJson={handleExportJson}
              onImportJson={handleImportJson}
            />
          )}
        </div>
      </main>

      {/* ==================== NAVEGACIÓN INFERIOR MÓVIL ==================== */}
      <nav className="fixed bottom-0 inset-x-0 z-30 grid grid-cols-7 border-t border-slate-200 bg-white/95 py-1.5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 lg:hidden">
        {navItems.map((item) => {
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`flex flex-col items-center justify-center py-1 text-[10px] font-bold ${
                isActive
                  ? 'text-[#026937] dark:text-emerald-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {item.icon}
              <span className="mt-0.5 truncate">{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default App;

