import { AppState, StudySession, SimulacroRecord } from '../types';

export function getTodayIso(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDays(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

export function formatSpanishDate(isoDate: string, includeYear = true): string {
  if (!isoDate) return '';
  const [y, m, d] = isoDate.split('-').map(Number);
  const months = [
    'ene',
    'feb',
    'mar',
    'abr',
    'may',
    'jun',
    'jul',
    'ago',
    'sep',
    'oct',
    'nov',
    'dic',
  ];
  const monthName = months[(m - 1) % 12] || '';
  return includeYear ? `${d} de ${monthName}. de ${y}` : `${d} ${monthName}`;
}

export function getDaysRemaining(targetDateIso: string): number {
  const todayIso = getTodayIso();
  const [ty, tm, td] = targetDateIso.split('-').map(Number);
  const [cy, cm, cd] = todayIso.split('-').map(Number);
  const targetMs = Date.UTC(ty, tm - 1, td);
  const currentMs = Date.UTC(cy, cm - 1, cd);
  const diffDays = Math.ceil((targetMs - currentMs) / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}

export function calculateStreak(sessions: StudySession[]): number {
  const completedSessions = sessions.filter((s) => s.completed);
  if (completedSessions.length === 0) return 0;

  // Check consecutive completed sessions in the plan order or by date
  const completedByDate = new Set<string>();
  for (const s of completedSessions) {
    completedByDate.add(s.date);
    if (s.completedAt) {
      completedByDate.add(s.completedAt.slice(0, 10));
    }
  }

  // Also count consecutive completed sessions from the latest completed session backwards in schedule
  let scheduleStreak = 0;
  const completedIndices = sessions
    .map((s, idx) => (s.completed ? idx : -1))
    .filter((idx) => idx !== -1);

  if (completedIndices.length > 0) {
    scheduleStreak = 1;
    for (let i = completedIndices.length - 1; i > 0; i--) {
      if (completedIndices[i] - completedIndices[i - 1] === 1) {
        scheduleStreak++;
      } else {
        break;
      }
    }
  }

  return scheduleStreak;
}

export function calculateComponentAverages(
  sessions: StudySession[],
  simulacros: SimulacroRecord[]
): {
  lecturaAvg: number;
  logicaAvg: number;
  globalAvg: number;
} {
  const lecturaScores: number[] = [];
  const logicaScores: number[] = [];

  for (const sim of simulacros) {
    const totalPerComp = sim.totalQuestionsPerComp || 40;
    lecturaScores.push(Math.round((sim.lecturaCorrect / totalPerComp) * 1000) / 10);
    logicaScores.push(Math.round((sim.logicaCorrect / totalPerComp) * 1000) / 10);
  }

  for (const s of sessions) {
    if (s.completed && s.score !== null && !Number.isNaN(s.score)) {
      if (s.component === 'Competencia Lectora') {
        lecturaScores.push(s.score);
      } else if (s.component === 'Razonamiento Lógico') {
        logicaScores.push(s.score);
      } else if (s.component === 'Simulacro') {
        lecturaScores.push(s.score);
        logicaScores.push(s.score);
      }
    }
  }

  const lecturaAvg =
    lecturaScores.length > 0
      ? Math.round((lecturaScores.reduce((a, b) => a + b, 0) / lecturaScores.length) * 10) / 10
      : 0;

  const logicaAvg =
    logicaScores.length > 0
      ? Math.round((logicaScores.reduce((a, b) => a + b, 0) / logicaScores.length) * 10) / 10
      : 0;

  const globalAvg =
    lecturaScores.length > 0 && logicaScores.length > 0
      ? Math.round(((lecturaAvg + logicaAvg) / 2) * 10) / 10
      : lecturaAvg || logicaAvg || 0;

  return { lecturaAvg, logicaAvg, globalAvg };
}

export function getTodayOrNextSession(sessions: StudySession[]): StudySession {
  const todayIso = getTodayIso();
  const exactToday = sessions.find((s) => s.date === todayIso);
  if (exactToday && !exactToday.completed) {
    return exactToday;
  }
  const nextPending = sessions.find((s) => !s.completed);
  if (nextPending) {
    return nextPending;
  }
  return exactToday || sessions[0];
}

export function buildEvolutionChartData(state: AppState) {
  const { simulacros, sessions, config } = state;
  const dataPoints: Array<{
    name: string;
    date: string;
    Lectura: number;
    Lógica: number;
    Global: number;
    MetaCorte: number;
  }> = [];

  const sortedSims = [...simulacros].sort((a, b) => a.date.localeCompare(b.date));

  sortedSims.forEach((sim, idx) => {
    const totalPerComp = sim.totalQuestionsPerComp || 40;
    const lecPct = Math.round((sim.lecturaCorrect / totalPerComp) * 1000) / 10;
    const logPct = Math.round((sim.logicaCorrect / totalPerComp) * 1000) / 10;
    const globPct = Math.round(((lecPct + logPct) / 2) * 10) / 10;
    dataPoints.push({
      name: sim.title.length > 18 ? `Sim #${idx + 1} (${formatSpanishDate(sim.date, false)})` : sim.title,
      date: sim.date,
      Lectura: lecPct,
      Lógica: logPct,
      Global: globPct,
      MetaCorte: config.targetCutoff,
    });
  });

  // Also include weekly averages from completed sessions that have scores if user logged session scores
  for (let w = 1; w <= 32; w++) {
    const weekSessions = sessions.filter(
      (s) => s.weekNumber === w && s.completed && s.score !== null
    );
    if (weekSessions.length > 0) {
      const lecS = weekSessions.filter((s) => s.component === 'Competencia Lectora');
      const logS = weekSessions.filter((s) => s.component === 'Razonamiento Lógico');
      const lecVal =
        lecS.length > 0
          ? Math.round(lecS.reduce((acc, x) => acc + (x.score || 0), 0) / lecS.length)
          : null;
      const logVal =
        logS.length > 0
          ? Math.round(logS.reduce((acc, x) => acc + (x.score || 0), 0) / logS.length)
          : null;

      if (lecVal !== null || logVal !== null) {
        const finalLec = lecVal ?? logVal ?? 70;
        const finalLog = logVal ?? lecVal ?? 70;
        dataPoints.push({
          name: `Sem ${w}`,
          date: weekSessions[0].date,
          Lectura: finalLec,
          Lógica: finalLog,
          Global: Math.round(((finalLec + finalLog) / 2) * 10) / 10,
          MetaCorte: config.targetCutoff,
        });
      }
    }
  }

  return dataPoints;
}

export const ERROR_CODE_META = {
  C: {
    code: 'C' as const,
    label: '(C) Concepto faltante',
    shortLabel: 'Concepto faltante',
    description:
      'Desconocimiento de una definición, propiedad geométrica, raíz etimológica, conectivo lógico o fórmula base.',
    badgeClass:
      'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
  },
  I: {
    code: 'I' as const,
    label: '(I) Inferencia forzada',
    shortLabel: 'Inferencia forzada',
    description:
      'Sobreinterpretación o extrapolación que va más allá de la evidencia del texto o asume premisas no dadas.',
    badgeClass:
      'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
  },
  P: {
    code: 'P' as const,
    label: '(P) Planteamiento matemático',
    shortLabel: 'Planteamiento matemático',
    description:
      'Fallo al traducir el enunciado verbal a ecuación, proporción, diagrama de Venn, árbol de conteo o modelo geométrico.',
    badgeClass:
      'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
  },
  T: {
    code: 'T' as const,
    label: '(T) Tiempo / descuido',
    shortLabel: 'Tiempo / descuido',
    description:
      'Error operativo elemental, pasar por alto un "NO / EXCEPTO", responder por el total equivocado o prisa de reloj.',
    badgeClass:
      'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
  },
};

