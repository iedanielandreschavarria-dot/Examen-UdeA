import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  BookOpen,
  Check,
  Trash2,
} from 'lucide-react';
import { StudySession, SimulacroRecord } from '../types';
import { formatSpanishDate, getTodayIso } from '../utils/dateAndStats';

interface StudyActivityHeatmapProps {
  sessions: StudySession[];
  simulacros: SimulacroRecord[];
  dailyHours: number;
  onOpenLessonModal: (sessionId: string) => void;
  onUpdateSessionPracticeMinutes: (
    sessionId: string,
    minutes: number,
    markCompleted: boolean
  ) => void;
}

interface TooltipState {
  session: StudySession;
  mins: number;
  isCompleted: boolean;
  x: number;
  y: number;
}

const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MONTH_NAMES = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

export const StudyActivityHeatmap: React.FC<StudyActivityHeatmapProps> = ({
  sessions,
  simulacros,
  dailyHours,
  onOpenLessonModal,
  onUpdateSessionPracticeMinutes,
}) => {
  const todayIso = getTodayIso();
  const defaultSessionMin = Math.round(dailyHours * 60);

  // Map extra minutes from simulacros by date (excluding initial diagnostic baseline)
  const simulacroMinutesByDate = useMemo(() => {
    const map: Record<string, number> = {};
    for (const sim of simulacros) {
      if (sim.source !== 'Diagnóstico Inicial') {
        map[sim.date] = (map[sim.date] || 0) + (sim.durationMinutes || 0);
      }
    }
    return map;
  }, [simulacros]);

  const getMinutesForSession = (session: StudySession): number => {
    if (
      session.minutesPracticed !== undefined &&
      session.minutesPracticed !== null
    ) {
      return session.minutesPracticed + (simulacroMinutesByDate[session.date] || 0);
    }
    const baseMin = session.completed
      ? session.breakdown.theoryMin +
      session.breakdown.practiceMin +
      session.breakdown.logMin
      : 0;
    return baseMin + (simulacroMinutesByDate[session.date] || 0);
  };

  // Group sessions into 32 weeks (columns), each with 7 days (rows 0..6)
  const weeksGrid = useMemo(() => {
    const weeks: StudySession[][] = [];
    for (let w = 1; w <= 32; w++) {
      const wkSessions = sessions
        .filter((s) => s.weekNumber === w)
        .sort((a, b) => a.dayIndex - b.dayIndex);
      weeks.push(wkSessions);
    }
    return weeks;
  }, [sessions]);

  // Month header labels
  const weekMonthLabels = useMemo(() => {
    const labels: Array<string | null> = [];
    let lastMonth = -1;
    for (const wk of weeksGrid) {
      if (wk.length === 0) {
        labels.push(null);
        continue;
      }
      const firstDate = wk[0].date;
      const monthNum = parseInt(firstDate.split('-')[1], 10) - 1;
      if (monthNum !== lastMonth) {
        labels.push(MONTH_NAMES[monthNum] || null);
        lastMonth = monthNum;
      } else {
        labels.push(null);
      }
    }
    return labels;
  }, [weeksGrid]);

  // Selected session for the bottom control bar (only changes on click, never on hover)
  const defaultSelected =
    sessions.find((s) => s.date === todayIso) ||
    sessions.find((s) => !s.completed) ||
    sessions[0];

  const [selectedSessionId, setSelectedSessionId] = useState<string>(
    defaultSelected?.id || 'w1-d1'
  );
  const [customMinutesInput, setCustomMinutesInput] = useState<string>(() => {
    const initMins = defaultSelected ? getMinutesForSession(defaultSelected) : 0;
    return String(initMins > 0 ? initMins : defaultSessionMin);
  });

  // Floating tooltip state (positioned with fixed coordinates so no container clips it)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const selectedSession =
    sessions.find((s) => s.id === selectedSessionId) || defaultSelected;
  const selectedMinutes = selectedSession
    ? getMinutesForSession(selectedSession)
    : 0;
  const isSelectedActive =
    Boolean(selectedSession) &&
    (selectedMinutes > 0 ||
      Boolean(selectedSession.completed) ||
      selectedSession.score !== null ||
      Boolean(selectedSession.notes));

  // Global stats across all 224 days
  const { totalActiveDays, totalMinutesPracticed } = useMemo(() => {
    let activeDays = 0;
    let totalMin = 0;
    for (const s of sessions) {
      const m = getMinutesForSession(s);
      if (s.completed || m > 0) {
        activeDays++;
      }
      totalMin += m;
    }
    return { totalActiveDays: activeDays, totalMinutesPracticed: totalMin };
  }, [sessions, simulacroMinutesByDate]);

  const formatHoursAndMinutes = (mins: number) => {
    if (mins <= 0) return '0 min';
    const h = Math.floor(mins / 60);
    const r = mins % 60;
    if (h === 0) return `${r} min`;
    if (r === 0) return `${h} h (${mins} min)`;
    return `${h} h ${r} min (${mins} min)`;
  };

  const getCellVisuals = (session: StudySession) => {
    const mins = getMinutesForSession(session);
    const isCompleted = session.completed || mins > 0;
    const isToday = session.date === todayIso;
    const isSelected = session.id === selectedSessionId;

    let bgClass =
      'bg-slate-100 border-slate-200/90 dark:bg-slate-800/80 dark:border-slate-700/70';
    let dotClass = 'bg-transparent';

    if (isCompleted) {
      if (mins >= 90) {
        bgClass =
          'bg-[#02542c] border-amber-400 dark:bg-emerald-400 dark:border-amber-300';
        dotClass = 'bg-amber-300 dark:bg-slate-950';
      } else if (mins >= 60) {
        bgClass =
          'bg-[#026937] border-[#02542c] dark:bg-emerald-500 dark:border-emerald-400';
        dotClass = 'bg-white dark:bg-slate-950';
      } else if (mins >= 30) {
        bgClass =
          'bg-emerald-400 border-emerald-500 dark:bg-emerald-700 dark:border-emerald-600';
        dotClass = 'bg-white dark:bg-emerald-200';
      } else {
        bgClass =
          'bg-emerald-200 border-emerald-300 dark:bg-emerald-900/90 dark:border-emerald-700';
        dotClass = 'bg-[#026937] dark:bg-emerald-300';
      }
    }

    const ringClass = isSelected
      ? 'ring-2 ring-slate-900 dark:ring-white z-10'
      : isToday
        ? 'ring-2 ring-amber-500 dark:ring-amber-400 z-10'
        : 'hover:border-slate-900 dark:hover:border-white';

    return { bgClass, dotClass, ringClass, mins, isCompleted, isToday };
  };

  const handleMouseEnterCell = (
    e: React.MouseEvent<HTMLButtonElement>,
    session: StudySession,
    mins: number,
    isCompleted: boolean
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Clamp horizontal coordinate so the 256px tooltip never overflows left or right of the screen
    const halfWidth = 135;
    const rawX = rect.left + rect.width / 2;
    const clampedX = Math.max(
      halfWidth + 12,
      Math.min(window.innerWidth - halfWidth - 12, rawX)
    );
    const y = rect.top;

    setTooltip({
      session,
      mins,
      isCompleted,
      x: clampedX,
      y,
    });
  };

  const handleSelectDay = (session: StudySession) => {
    setSelectedSessionId(session.id);
    const currentMins = getMinutesForSession(session);
    setCustomMinutesInput(
      String(currentMins > 0 ? currentMins : defaultSessionMin)
    );
  };

  const handleSaveMinutesForSelected = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSession) return;
    const parsed = Math.max(0, Math.min(480, parseInt(customMinutesInput || '0', 10)));
    onUpdateSessionPracticeMinutes(selectedSession.id, parsed, parsed > 0);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Tooltip Flotante en Posición Fija (Nunca es cortado por ninguna división ni altera el tamaño de nada) */}
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            left: `${tooltip.x}px`,
            top: `${Math.max(12, tooltip.y - 10)}px`,
            transform: 'translate(-50%, -100%)',
          }}
          className="pointer-events-none z-[9999] w-64 rounded-xl border border-slate-700 bg-slate-900/95 p-3 text-left text-[11px] text-white shadow-2xl backdrop-blur-xs dark:border-slate-600 dark:bg-slate-800/95"
        >
          <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 font-bold text-emerald-300">
            <span>
              {tooltip.session.dayName}, {formatSpanishDate(tooltip.session.date)}
            </span>
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300">
              Sem {tooltip.session.weekNumber}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs font-extrabold text-white">
            <Clock className="h-3.5 w-3.5 shrink-0 text-amber-400" />
            <span>
              {tooltip.mins > 0
                ? `${tooltip.mins} min practicados`
                : '0 min practicados (Pendiente)'}
            </span>
          </div>

          <div className="mt-1.5 line-clamp-2 leading-snug text-slate-300">
            <span className="font-bold text-amber-300">
              [{tooltip.session.component}]
            </span>{' '}
            {tooltip.session.topic}
          </div>

          <div className="mt-2 flex items-center justify-between border-t border-slate-800 pt-1.5 text-[10px] text-slate-400">
            <span>
              {tooltip.isCompleted
                ? '● Actividad realizada (Clic para editar)'
                : '○ Sin realizar (Clic para seleccionar)'}
            </span>
            {tooltip.session.score !== null && (
              <span className="font-bold text-emerald-400">
                Nota: {tooltip.session.score}%
              </span>
            )}
          </div>
        </div>
      )}

      {/* Encabezado y Resumen */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-[#026937] dark:text-emerald-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Mapa de Constancia y Tiempo Practicado (32 Semanas)
            </h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Pasa el mouse sobre cualquier punto para ver el tiempo practicado; haz clic en un día para seleccionarlo y editar sus minutos abajo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2 text-xs dark:bg-emerald-950/50">
            <CheckCircle2 className="h-4 w-4 text-[#026937] dark:text-emerald-400" />
            <div>
              <span className="text-slate-500 dark:text-slate-400">Días realizados: </span>
              <strong className="font-extrabold text-slate-900 dark:text-white">
                {totalActiveDays} / {sessions.length}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-2 text-xs dark:bg-amber-950/50">
            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <div>
              <span className="text-slate-500 dark:text-slate-400">Tiempo total practicado: </span>
              <strong className="font-extrabold text-slate-900 dark:text-white">
                {formatHoursAndMinutes(totalMinutesPracticed)}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Cuadrícula Estilo GitHub (Sin tooltips internos que se corten) */}
      <div
        className="mt-5 overflow-x-auto pb-2"
        onMouseLeave={() => setTooltip(null)}
      >
        <div className="inline-block min-w-full">
          {/* Fila de Etiquetas de Meses */}
          <div className="mb-1.5 flex items-center pl-10">
            {weeksGrid.map((_, wIdx) => {
              const monthLabel = weekMonthLabels[wIdx];
              const isPhaseStart = wIdx === 0 || wIdx === 8 || wIdx === 16 || wIdx === 24;
              return (
                <div
                  key={`month-col-${wIdx}`}
                  className={`w-5 shrink-0 text-[10px] font-bold text-slate-500 dark:text-slate-400 ${isPhaseStart && wIdx > 0 ? 'ml-2' : 'mr-1'
                    }`}
                >
                  {monthLabel || ''}
                </div>
              );
            })}
          </div>

          {/* Cuerpo: 7 filas (Lun a Dom) × 32 semanas */}
          <div className="flex">
            <div className="mr-2 flex w-8 shrink-0 flex-col justify-between py-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              {DAY_LABELS.map((dLabel) => (
                <div key={dLabel} className="flex h-5 items-center">
                  {dLabel}
                </div>
              ))}
            </div>

            <div className="flex items-center">
              {weeksGrid.map((weekSessions, wIdx) => {
                const isPhaseStart = wIdx === 8 || wIdx === 16 || wIdx === 24;
                return (
                  <div
                    key={`wk-col-${wIdx}`}
                    className={`flex flex-col gap-1 ${isPhaseStart
                        ? 'ml-2 border-l border-dashed border-slate-200 pl-2 mr-1 dark:border-slate-800'
                        : 'mr-1'
                      }`}
                  >
                    {weekSessions.map((session) => {
                      const {
                        bgClass,
                        dotClass,
                        ringClass,
                        mins,
                        isCompleted,
                        isToday,
                      } = getCellVisuals(session);

                      return (
                        <button
                          key={session.id}
                          type="button"
                          onMouseEnter={(e) =>
                            handleMouseEnterCell(e, session, mins, isCompleted)
                          }
                          onMouseLeave={() => setTooltip(null)}
                          onClick={() => handleSelectDay(session)}
                          aria-label={`${session.dayName} ${session.date}: ${mins} minutos practicados`}
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${bgClass} ${ringClass}`}
                        >
                          {isCompleted ? (
                            <span className={`h-2 w-2 rounded-full ${dotClass}`} />
                          ) : isToday ? (
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Etiquetas de las 4 Fases */}
          <div className="mt-2 flex items-center justify-between pl-10 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            <span>Fase 1 (Sem 1–8)</span>
            <span>Fase 2 (Sem 9–16)</span>
            <span>Fase 3 (Sem 17–24)</span>
            <span>Fase 4 (Sem 25–32)</span>
          </div>
        </div>
      </div>

      {/* Barra Inferior Estática del Día Seleccionado (Altura fija, nunca salta al mover el mouse) */}
      <div className="mt-4 flex flex-col justify-between gap-4 rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/50 xl:flex-row xl:items-center">
        {selectedSession && (
          <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center min-w-0">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold ${selectedMinutes > 0 || selectedSession.completed
                      ? 'bg-emerald-100 text-[#026937] dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                >
                  {selectedMinutes > 0 || selectedSession.completed
                    ? `● Realizado (${selectedMinutes} min)`
                    : '○ Sin actividad (0 min)'}
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Día seleccionado: {selectedSession.dayName},{' '}
                  {formatSpanishDate(selectedSession.date)} (Sem {selectedSession.weekNumber})
                </span>
                {selectedSession.date === todayIso && (
                  <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-extrabold text-slate-950">
                    HOY
                  </span>
                )}
              </div>
              <p className="mt-1 truncate text-xs text-slate-600 dark:text-slate-300">
                <strong className="text-[#026937] dark:text-emerald-400">
                  {selectedSession.component}:
                </strong>{' '}
                {selectedSession.topic}
              </p>
            </div>

            {/* Botones de tamaño fijo constante */}
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <form
                onSubmit={handleSaveMinutesForSelected}
                className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 dark:border-slate-700 dark:bg-slate-900"
              >
                <Clock className="h-3.5 w-3.5 text-[#026937] dark:text-emerald-400" />
                <input
                  type="number"
                  min={0}
                  max={480}
                  value={customMinutesInput}
                  onChange={(e) => setCustomMinutesInput(e.target.value)}
                  className="w-14 bg-transparent text-center text-xs font-extrabold text-slate-900 focus:outline-none dark:text-white"
                  title="Minutos practicados en este día"
                />
                <span className="text-[11px] font-semibold text-slate-400">min</span>
                <button
                  type="submit"
                  className="ml-1 inline-flex items-center gap-1 rounded-lg bg-[#026937] px-2.5 py-1 text-[11px] font-bold text-white hover:bg-[#02542c]"
                >
                  <Check className="h-3 w-3" /> Registrar
                </button>
              </form>

              <button
                type="button"
                onClick={() => onOpenLessonModal(selectedSession.id)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-3 py-2 text-xs font-extrabold text-slate-950 hover:bg-amber-300"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Aula del Día
              </button>

              <button
                type="button"
                disabled={!isSelectedActive}
                onClick={() => {
                  onUpdateSessionPracticeMinutes(selectedSession.id, 0, false);
                  setCustomMinutesInput('0');
                }}
                title="Eliminar registro de actividad de este día"
                className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-300"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Borrar día
              </button>
            </div>
          </div>
        )}

        {/* Leyenda de niveles estilo GitHub */}
        <div className="flex shrink-0 items-center gap-1.5 border-t border-slate-200 pt-3 text-[11px] font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400 xl:border-t-0 xl:border-l xl:pl-4 xl:pt-0">
          <span>Menos (0m)</span>
          <span
            title="0 min (Sin realizar)"
            className="flex h-4 w-4 items-center justify-center rounded-sm border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
          />
          <span
            title="1 - 29 min"
            className="flex h-4 w-4 items-center justify-center rounded-sm border border-emerald-300 bg-emerald-200 dark:border-emerald-700 dark:bg-emerald-900"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#026937] dark:bg-emerald-300" />
          </span>
          <span
            title="30 - 59 min"
            className="flex h-4 w-4 items-center justify-center rounded-sm border border-emerald-500 bg-emerald-400 dark:border-emerald-600 dark:bg-emerald-700"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <span
            title="60 - 89 min (Meta 1h)"
            className="flex h-4 w-4 items-center justify-center rounded-sm border border-[#02542c] bg-[#026937] dark:border-emerald-400 dark:bg-emerald-500"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-slate-950" />
          </span>
          <span
            title="90+ min (Intensivo / Simulacro)"
            className="flex h-4 w-4 items-center justify-center rounded-sm border border-amber-400 bg-[#02542c] dark:border-amber-300 dark:bg-emerald-400"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 dark:bg-slate-950" />
          </span>
          <span>Más (90m+)</span>
        </div>
      </div>
    </div>
  );
};
