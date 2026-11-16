import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Layers,
  BookOpen,
  Brain,
  RotateCcw,
  Award,
  CheckSquare,
} from 'lucide-react';
import { AppState, StudyConfig, StudySession } from '../types';
import {
  PHASES_INFO,
  WEEKLY_CURRICULUM,
  getDynamicPhaseDates,
} from '../data/studyPlanData';
import { formatSpanishDate } from '../utils/dateAndStats';

interface StudyPlanModuleProps {
  state: AppState;
  onUpdateConfig: (newConfig: StudyConfig) => void;
  onToggleSession: (sessionId: string, score?: number | null, notes?: string) => void;
  onUpdateSessionDetails: (sessionId: string, score: number | null, notes: string) => void;
  onOpenLessonModal: (sessionId: string) => void;
}

const PRESET_PROGRAMS = [
  { name: 'Medicina (Medellín)', cutoff: 88.5 },
  { name: 'Medicina (Seccionales)', cutoff: 83.0 },
  { name: 'Ingeniería de Sistemas (Medellín)', cutoff: 81.5 },
  { name: 'Psicología / Derecho (Medellín)', cutoff: 79.0 },
  { name: 'Enfermería / Odontología (Medellín)', cutoff: 78.0 },
  { name: 'Ingeniería Civil / Mecánica / Industrial', cutoff: 75.0 },
  { name: 'Otro Pregrado UdeA (Personalizado)', cutoff: 72.0 },
];

export const StudyPlanModule: React.FC<StudyPlanModuleProps> = ({
  state,
  onUpdateConfig,
  onToggleSession,
  onUpdateSessionDetails,
  onOpenLessonModal,
}) => {
  const { config, sessions } = state;

  // Determine initial active week based on first incomplete session
  const firstPendingWeek = sessions.find((s) => !s.completed)?.weekNumber || 1;
  const [selectedWeek, setSelectedWeek] = useState<number>(firstPendingWeek);
  const [activePhaseTab, setActivePhaseTab] = useState<1 | 2 | 3 | 4>(
    (Math.ceil(firstPendingWeek / 8) as 1 | 2 | 3 | 4) || 1
  );
  const [showConfigPanel, setShowConfigPanel] = useState<boolean>(true);

  const dynamicPhases = getDynamicPhaseDates(config.startDate, config.targetDate);
  const currentWeekBlueprint =
    WEEKLY_CURRICULUM.find((w) => w.week === selectedWeek) || WEEKLY_CURRICULUM[0];
  const weekSessions = sessions.filter((s) => s.weekNumber === selectedWeek);

  const weekCompletedCount = weekSessions.filter((s) => s.completed).length;
  const weekProgressPct = Math.round((weekCompletedCount / 7) * 100);

  const handlePhaseSelect = (phaseId: 1 | 2 | 3 | 4) => {
    setActivePhaseTab(phaseId);
    const firstWeekOfPhase = (phaseId - 1) * 8 + 1;
    setSelectedWeek(firstWeekOfPhase);
  };

  const handleProgramChange = (progName: string) => {
    const found = PRESET_PROGRAMS.find((p) => p.name === progName);
    onUpdateConfig({
      ...config,
      targetProgram: progName,
      targetCutoff: found ? found.cutoff : config.targetCutoff,
    });
  };

  const getComponentStyle = (comp: StudySession['component']) => {
    switch (comp) {
      case 'Competencia Lectora':
        return {
          badge:
            'bg-emerald-100 text-[#026937] border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800',
          borderLeft: 'border-l-4 border-l-[#026937]',
          icon: <BookOpen className="h-4 w-4 text-[#026937] dark:text-emerald-400" />,
        };
      case 'Razonamiento Lógico':
        return {
          badge:
            'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800',
          borderLeft: 'border-l-4 border-l-amber-500',
          icon: <Brain className="h-4 w-4 text-amber-600 dark:text-amber-400" />,
        };
      case 'Repaso Espaciado':
        return {
          badge:
            'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-800',
          borderLeft: 'border-l-4 border-l-purple-500',
          icon: <RotateCcw className="h-4 w-4 text-purple-600 dark:text-purple-400" />,
        };
      case 'Simulacro':
        return {
          badge:
            'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/70 dark:text-sky-300 dark:border-sky-800',
          borderLeft: 'border-l-4 border-l-sky-500',
          icon: <Award className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuración Personalizable en la Parte Superior */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#026937] dark:bg-emerald-950 dark:text-emerald-300">
              <Sliders className="h-3.5 w-3.5" />
              Planificador Dinámico 32 Semanas (224 Sesiones)
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              Plan de Estudio Interactivo por Fases y Semanas
            </h1>
          </div>
          <button
            onClick={() => setShowConfigPanel(!showConfigPanel)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <Sliders className="h-4 w-4" />
            {showConfigPanel ? 'Ocultar Parámetros' : 'Personalizar Parámetros'}
          </button>
        </div>

        {showConfigPanel && (
          <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Carrera Objetivo UdeA
              </label>
              <select
                value={config.targetProgram}
                onChange={(e) => handleProgramChange(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                {PRESET_PROGRAMS.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Meta Puntaje Corte (/100)
              </label>
              <input
                type="number"
                step="0.5"
                min={50}
                max={100}
                value={config.targetCutoff}
                onChange={(e) =>
                  onUpdateConfig({
                    ...config,
                    targetCutoff: Math.min(100, Math.max(50, Number(e.target.value))),
                  })
                }
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Fecha Inicio del Plan
              </label>
              <input
                type="date"
                value={config.startDate}
                onChange={(e) =>
                  e.target.value && onUpdateConfig({ ...config, startDate: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Fecha Objetivo Examen
              </label>
              <input
                type="date"
                value={config.targetDate}
                onChange={(e) =>
                  e.target.value && onUpdateConfig({ ...config, targetDate: e.target.value })
                }
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
              <span className="mt-0.5 block text-[10px] text-amber-700 dark:text-amber-400">
                Provisional — editable al salir convocatoria
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Intensidad Diaria (Horas/día)
              </label>
              <select
                value={config.dailyHours}
                onChange={(e) =>
                  onUpdateConfig({ ...config, dailyHours: Number(e.target.value) })
                }
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value={1}>1,0 hora / día (60 min - Estándar)</option>
                <option value={1.5}>1,5 horas / día (90 min - Intensivo)</option>
                <option value={2}>2,0 horas / día (120 min - Avanzado)</option>
                <option value={3}>3,0 horas / día (180 min - Inmersión)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Vista por Fases (4 Bloques Progresivos con Barra de Progreso) */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PHASES_INFO.map((phase) => {
          const phaseSessions = sessions.filter((s) => s.phaseId === phase.id);
          const phaseCompleted = phaseSessions.filter((s) => s.completed).length;
          const phasePct =
            phaseSessions.length > 0
              ? Math.round((phaseCompleted / phaseSessions.length) * 100)
              : 0;
          const dynDates = dynamicPhases[phase.id];
          const isSelectedPhase = activePhaseTab === phase.id;

          return (
            <div
              key={phase.id}
              onClick={() => handlePhaseSelect(phase.id)}
              className={`cursor-pointer rounded-2xl border p-5 transition ${
                isSelectedPhase
                  ? 'border-2 border-[#026937] bg-emerald-50/40 shadow-md dark:border-emerald-500 dark:bg-emerald-950/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-lg bg-[#026937] px-2.5 py-0.5 text-xs font-bold text-white">
                  <Layers className="h-3 w-3" />
                  Semanas {phase.weeksRange[0]}–{phase.weeksRange[1]}
                </span>
                <span className="text-xs font-extrabold text-[#026937] dark:text-emerald-400">
                  {phasePct}% ({phaseCompleted}/{phaseSessions.length})
                </span>
              </div>

              <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                {phase.name}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                {formatSpanishDate(dynDates.startDate, false)} —{' '}
                {formatSpanishDate(dynDates.endDate, true)}
              </p>

              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-[#026937] transition-all duration-300"
                  style={{ width: `${phasePct}%` }}
                />
              </div>

              <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {phase.description}
              </p>

              <div className="mt-3 border-t border-slate-100 pt-2.5 text-[11px] font-semibold text-amber-700 dark:border-slate-800 dark:text-amber-400">
                Meta: {phase.recommendedGoal}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navegador de las 32 Semanas y Barra de Progreso Semanal */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-[#026937] px-2.5 py-1 text-xs font-extrabold text-white">
                SEMANA {selectedWeek} DE 32
              </span>
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Fase {currentWeekBlueprint.phase}
              </span>
            </div>
            <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
              {currentWeekBlueprint.weekTitle}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                const prev = Math.max(1, selectedWeek - 1);
                setSelectedWeek(prev);
                setActivePhaseTab(Math.ceil(prev / 8) as 1 | 2 | 3 | 4);
              }}
              disabled={selectedWeek === 1}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <ChevronLeft className="h-4 w-4" /> Anterior
            </button>

            <select
              value={selectedWeek}
              onChange={(e) => {
                const wk = Number(e.target.value);
                setSelectedWeek(wk);
                setActivePhaseTab(Math.ceil(wk / 8) as 1 | 2 | 3 | 4);
              }}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {WEEKLY_CURRICULUM.map((w) => (
                <option key={w.week} value={w.week}>
                  Semana {w.week} (Fase {w.phase}): {w.weekTitle.slice(0, 42)}...
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                const next = Math.min(32, selectedWeek + 1);
                setSelectedWeek(next);
                setActivePhaseTab(Math.ceil(next / 8) as 1 | 2 | 3 | 4);
              }}
              disabled={selectedWeek === 32}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              Siguiente <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Píldoras rápidas de las 8 semanas de la Fase activa */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {Array.from({ length: 8 }, (_, idx) => (activePhaseTab - 1) * 8 + idx + 1).map(
              (wkNum) => {
                const wkSess = sessions.filter((s) => s.weekNumber === wkNum);
                const wkDone = wkSess.filter((s) => s.completed).length;
                const isCurr = wkNum === selectedWeek;
                return (
                  <button
                    key={wkNum}
                    onClick={() => setSelectedWeek(wkNum)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      isCurr
                        ? 'bg-[#026937] text-white shadow-sm'
                        : wkDone === 7
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    Sem {wkNum} ({wkDone}/7)
                  </button>
                );
              }
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Progreso Semana {selectedWeek}: {weekCompletedCount}/7 días ({weekProgressPct}%)
            </span>
            <div className="h-2.5 w-32 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-[#026937] transition-all duration-300"
                style={{ width: `${weekProgressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tarjetas Diarias Interactivas (Lunes a Domingo) */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {weekSessions.map((session) => {
            const style = getComponentStyle(session.component);
            return (
              <div
                key={session.id}
                className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition ${
                  style.borderLeft
                } ${
                  session.completed
                    ? 'bg-emerald-50/25 dark:border-slate-800 dark:bg-emerald-950/10'
                    : 'dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-extrabold text-white dark:bg-slate-700">
                      {session.dayName}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatSpanishDate(session.date)}
                    </span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold ${style.badge}`}
                  >
                    {style.icon}
                    {session.component}
                  </span>
                </div>

                <h3
                  className={`mt-3 text-base font-bold ${
                    session.completed
                      ? 'line-through text-slate-500 dark:text-slate-400'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {session.topic}
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  {session.subtopic}
                </p>

                {/* Desglose de los 60 minutos */}
                <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/60">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
                    <Clock className="h-3.5 w-3.5 text-[#026937] dark:text-emerald-400" />
                    <span>
                      Desglose ({session.breakdown.theoryMin + session.breakdown.practiceMin + session.breakdown.logMin} min):
                    </span>
                  </div>
                  <p className="mt-1 text-slate-600 dark:text-slate-300">
                    {session.breakdown.description}
                  </p>
                </div>

                {session.notes && (
                  <div className="mt-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 p-2.5 text-xs text-slate-700 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-slate-200">
                    <strong className="text-[#026937] dark:text-emerald-400">
                      Mi Bitácora:
                    </strong>{' '}
                    {session.notes}
                  </div>
                )}

                {/* Botón para abrir el Aula Interactiva del Día (Teoría + Taller + Bitácora) */}
                <div className="mt-3">
                  <button
                    onClick={() => onOpenLessonModal(session.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#026937]/30 bg-emerald-50/80 px-3.5 py-2 text-xs font-extrabold text-[#026937] transition hover:bg-[#026937] hover:text-white dark:border-emerald-700/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-600 dark:hover:text-white"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    📖 Abrir Aula del Día (Teoría + Taller + Bitácora)
                  </button>
                </div>

                {/* Controles: Checkbox Completado + Nota/Puntaje + Observación */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <button
                    onClick={() => onToggleSession(session.id, session.score, session.notes)}
                    className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                      session.completed
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {session.completed ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Completada
                      </>
                    ) : (
                      <>
                        <CheckSquare className="h-4 w-4 text-slate-400" />
                        Marcar Completada
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Nota/Puntaje (%):
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      placeholder="0-100"
                      value={session.score ?? ''}
                      onChange={(e) => {
                        const val =
                          e.target.value === ''
                            ? null
                            : Math.min(100, Math.max(0, Number(e.target.value)));
                        onUpdateSessionDetails(session.id, val, session.notes);
                      }}
                      className="w-20 rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-center text-xs font-bold text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

