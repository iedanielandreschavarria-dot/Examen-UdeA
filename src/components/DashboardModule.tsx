import React, { useState } from 'react';
import {
  CheckCircle2,
  Calendar,
  Target,
  Flame,
  TrendingUp,
  Clock,
  BookOpen,
  Brain,
  ArrowRight,
  Edit3,
  Award,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from 'recharts';
import { AppState, ModuleId } from '../types';
import {
  getDaysRemaining,
  calculateStreak,
  calculateComponentAverages,
  getTodayOrNextSession,
  buildEvolutionChartData,
  formatSpanishDate,
  getTodayIso,
} from '../utils/dateAndStats';

interface DashboardModuleProps {
  state: AppState;
  onToggleSession: (sessionId: string, score?: number | null, notes?: string) => void;
  onUpdateTargetDate: (newDate: string) => void;
  onNavigate: (module: ModuleId) => void;
  onOpenLessonModal: (sessionId: string) => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({
  state,
  onToggleSession,
  onUpdateTargetDate,
  onNavigate,
  onOpenLessonModal,
}) => {
  const { config, sessions, simulacros, errorNotebook } = state;
  const [editingDate, setEditingDate] = useState(false);
  const [tempDate, setTempDate] = useState(config.targetDate);
  const [quickScore, setQuickScore] = useState<string>('');

  const completedCount = sessions.filter((s) => s.completed).length;
  const totalSessions = sessions.length;
  const progressPct = totalSessions > 0 ? Math.round((completedCount / totalSessions) * 1000) / 10 : 0;

  const daysRemaining = getDaysRemaining(config.targetDate);
  const streakDays = calculateStreak(sessions);
  const { lecturaAvg, logicaAvg, globalAvg } = calculateComponentAverages(sessions, simulacros);

  const todaySession = getTodayOrNextSession(sessions);
  const chartData = buildEvolutionChartData(state);

  const todayIso = getTodayIso();
  const dueErrorsCount = errorNotebook.filter(
    (e) => !e.mastered && e.nextReviewDate <= todayIso
  ).length;

  const handleSaveDate = () => {
    if (tempDate) {
      onUpdateTargetDate(tempDate);
      setEditingDate(false);
    }
  };

  const handleQuickComplete = () => {
    const parsedScore =
      quickScore.trim() !== ''
        ? Math.min(100, Math.max(0, Number(quickScore)))
        : todaySession.score;
    onToggleSession(todaySession.id, parsedScore);
    setQuickScore('');
  };

  const getComponentBadge = (comp: string) => {
    switch (comp) {
      case 'Competencia Lectora':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
      case 'Razonamiento Lógico':
        return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
      case 'Repaso Espaciado':
        return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
      default:
        return 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Institucional de Bienvenida */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#026937] via-[#045c31] to-slate-900 p-6 text-white shadow-lg">
        <div className="relative z-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-100 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              OBJETIVO: {config.targetProgram.toUpperCase()} — META CORTE ≥ {config.targetCutoff}%
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Panel de Control Académico UdeA Prep
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-emerald-100/90">
              Sistema integral de preparación estructurado a {config.dailyHours} h/día durante 32 semanas
              (80 preguntas: 40 Competencia Lectora + 40 Razonamiento Lógico en 180 minutos).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('entrenador')}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-amber-300"
            >
              <Clock className="h-4 w-4" />
              Iniciar Práctica Cronometrada
            </button>
            <button
              onClick={() => onNavigate('plan')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Ver Calendario 32 Semanas
            </button>
          </div>
        </div>
      </div>

      {/* 4 Tarjetas de KPIs en Tiempo Real */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* KPI 1: Porcentaje de avance total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Avance Total del Plan
            </span>
            <div className="rounded-xl bg-emerald-100 p-2 text-[#026937] dark:bg-emerald-950/70 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {progressPct}%
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              ({completedCount} / {totalSessions} sesiones)
            </span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-[#026937] transition-all duration-500"
              style={{ width: `${Math.min(100, progressPct)}%` }}
            />
          </div>
          <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400">
            Equivale a <strong className="text-slate-700 dark:text-slate-200">{Math.round(completedCount * config.dailyHours)} horas</strong> de estudio efectivo acumuladas.
          </p>
        </div>

        {/* KPI 2: Cuenta regresiva editable */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Cuenta Regresiva Examen
            </span>
            <button
              onClick={() => {
                setTempDate(config.targetDate);
                setEditingDate(!editingDate);
              }}
              title="Editar fecha objetivo"
              className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <Edit3 className="h-3.5 w-3.5" />
              Editar
            </button>
          </div>

          {editingDate ? (
            <div className="mt-2 space-y-2">
              <input
                type="date"
                value={tempDate}
                onChange={(e) => setTempDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-sm text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveDate}
                  className="rounded-lg bg-[#026937] px-3 py-1 text-xs font-semibold text-white hover:bg-[#02542c]"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditingDate(false)}
                  className="rounded-lg bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {daysRemaining}
                </span>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  días restantes
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                <Calendar className="h-3.5 w-3.5 text-[#026937] dark:text-emerald-400" />
                Meta: {formatSpanishDate(config.targetDate)}
              </div>
              <div className="mt-2 inline-block rounded-md border border-amber-300/80 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800 dark:border-amber-800/70 dark:bg-amber-950/50 dark:text-amber-300">
                Fecha provisional — editable al salir convocatoria oficial 2027-2
              </div>
            </>
          )}
        </div>

        {/* KPI 3: Promedio Global y Desglosado */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Promedio de Acierto
            </span>
            <div className="rounded-xl bg-amber-100 p-2 text-amber-700 dark:bg-amber-950/70 dark:text-amber-400">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {globalAvg}%
              </span>
              <span className="ml-1.5 text-xs text-slate-500 dark:text-slate-400">
                Global
              </span>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                globalAvg >= config.targetCutoff
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              Corte ref: {config.targetCutoff}%
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 pt-1 text-xs">
            <div className="rounded-lg bg-emerald-50/80 px-2.5 py-1.5 dark:bg-emerald-950/30">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <BookOpen className="h-3 w-3 text-[#026937] dark:text-emerald-400" />
                <span>Comp. Lectora</span>
              </div>
              <p className="mt-0.5 text-sm font-bold text-emerald-800 dark:text-emerald-300">
                {lecturaAvg}%
              </p>
            </div>
            <div className="rounded-lg bg-amber-50/80 px-2.5 py-1.5 dark:bg-amber-950/30">
              <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <Brain className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                <span>Raz. Lógico</span>
              </div>
              <p className="mt-0.5 text-sm font-bold text-amber-800 dark:text-amber-300">
                {logicaAvg}%
              </p>
            </div>
          </div>
        </div>

        {/* KPI 4: Racha de estudio diario */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Racha de Estudio ({config.dailyHours} h/día)
            </span>
            <div className="rounded-xl bg-orange-100 p-2 text-orange-600 dark:bg-orange-950/70 dark:text-orange-400">
              <Flame className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {streakDays}
            </span>
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              {streakDays === 1 ? 'día consecutivo' : 'días consecutivos'}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs dark:bg-slate-800/70">
            <span className="text-slate-600 dark:text-slate-300">
              Errores por repasar hoy:
            </span>
            <button
              onClick={() => onNavigate('errores')}
              className="font-bold text-[#026937] underline hover:text-[#02542c] dark:text-emerald-400"
            >
              {dueErrorsCount} {dueErrorsCount === 1 ? 'ítem' : 'ítems'}
            </button>
          </div>
        </div>
      </div>

      {/* Sección Central: Acción Rápida del Día + Gráfico de Evolución */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Tarjeta Destacada: Acción Rápida del Día (5 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border-2 border-[#026937]/30 bg-white p-6 shadow-sm dark:border-emerald-700/40 dark:bg-slate-900 lg:col-span-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#026937] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                Acción Rápida del Día
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Semana {todaySession.weekNumber} • Fase {todaySession.phaseId} ({todaySession.dayName})
              </span>
            </div>

            <div className="mt-4">
              <span
                className={`inline-block rounded-lg border px-2.5 py-1 text-xs font-bold ${getComponentBadge(
                  todaySession.component
                )}`}
              >
                {todaySession.component}
              </span>
              <h2 className="mt-2.5 text-xl font-bold text-slate-900 dark:text-white">
                {todaySession.topic}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {todaySession.subtopic}
              </p>
            </div>

            {/* Desglose de los 60 minutos */}
            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span>Estructura de la sesión ({Math.round(config.dailyHours * 60)} min)</span>
                <span>{formatSpanishDate(todaySession.date)}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-white p-2 shadow-sm dark:bg-slate-900">
                  <span className="block text-sm font-extrabold text-[#026937] dark:text-emerald-400">
                    {todaySession.breakdown.theoryMin} min
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Teoría / Esquema
                  </span>
                </div>
                <div className="rounded-lg bg-white p-2 shadow-sm dark:bg-slate-900">
                  <span className="block text-sm font-extrabold text-amber-600 dark:text-amber-400">
                    {todaySession.breakdown.practiceMin} min
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Práctica Activa
                  </span>
                </div>
                <div className="rounded-lg bg-white p-2 shadow-sm dark:bg-slate-900">
                  <span className="block text-sm font-extrabold text-sky-600 dark:text-sky-400">
                    {todaySession.breakdown.logMin} min
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Bitácora Errores
                  </span>
                </div>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {todaySession.breakdown.description}
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3 pt-2">
            {/* Botón Principal para abrir el Aula Interactiva del Día */}
            <button
              onClick={() => onOpenLessonModal(todaySession.id)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-sm font-extrabold text-slate-950 shadow-sm transition hover:bg-amber-300"
            >
              <BookOpen className="h-4 w-4" />
              📖 Iniciar Clase del Día (Teoría + Taller + Bitácora)
            </button>

            <div className="flex items-center gap-3">
              <div className="w-40">
                <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Puntaje sesión (% opc.)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  placeholder="Ej: 85"
                  value={quickScore}
                  onChange={(e) => setQuickScore(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="flex-1 pt-4">
                <button
                  onClick={handleQuickComplete}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold shadow-sm transition ${
                    todaySession.completed
                      ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-200'
                      : 'bg-[#026937] text-white hover:bg-[#02542c]'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {todaySession.completed
                    ? 'Sesión Completada (Clic para desmarcar)'
                    : 'Marcar sesión como completada'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <button
                onClick={() => onNavigate('entrenador')}
                className="inline-flex items-center gap-1 font-semibold text-[#026937] hover:underline dark:text-emerald-400"
              >
                Ir al Simulador General <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => onNavigate('plan')}
                className="hover:underline"
              >
                Ver semana completa
              </button>
            </div>
          </div>
        </div>

        {/* Gráfico de Evolución por Componente (7 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#026937] dark:text-emerald-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Curva de Evolución de Aciertos por Componente
                </h2>
              </div>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Desempeño histórico en simulacros y semanas registradas frente a la meta de corte ({config.targetCutoff}%).
              </p>
            </div>
            <button
              onClick={() => onNavigate('entrenador')}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              + Registrar Simulacro
            </button>
          </div>

          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLectura" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#026937" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#026937" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="colorLogica" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d97706" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#d97706" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <YAxis
                  domain={[0, 100]}
                  unit="%"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#1e293b',
                    borderRadius: '12px',
                    color: '#f8fafc',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <ReferenceLine
                  y={config.targetCutoff}
                  stroke="#ef4444"
                  strokeDasharray="5 5"
                  label={{
                    value: `Meta Corte (${config.targetCutoff}%)`,
                    position: 'insideTopRight',
                    fill: '#ef4444',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="Lectura"
                  name="Competencia Lectora (%)"
                  stroke="#026937"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorLectura)"
                />
                <Area
                  type="monotone"
                  dataKey="Lógica"
                  name="Razonamiento Lógico (%)"
                  stroke="#d97706"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorLogica)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" />
              <span>
                Referencia histórica Medicina Medellín: <strong>85.38 — 89.25 / 100</strong> (~70/80 aciertos).
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Simulacros registrados: {simulacros.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

