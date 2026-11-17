export type ModuleId =
  | 'dashboard'
  | 'guia'
  | 'plan'
  | 'entrenador'
  | 'errores'
  | 'vocabulario'
  | 'recursos';

export type SessionComponent =
  | 'Competencia Lectora'
  | 'Razonamiento Lógico'
  | 'Repaso Espaciado'
  | 'Simulacro';

export type ExamComponent = 'Competencia Lectora' | 'Razonamiento Lógico';

export type DifficultyLevel = 'Básico' | 'Intermedio' | 'Avanzado';

export type PriorityLevel = 'Alta' | 'Media-Alta' | 'Media' | 'Baja';

export type InfoVerificationType =
  | 'Información Oficial'
  | 'Patrones Observados'
  | 'Estimaciones/Referencias';

export type ErrorCode = 'C' | 'I' | 'P' | 'T';

export interface StudyConfig {
  targetDate: string; // YYYY-MM-DD, default '2027-06-30'
  startDate: string; // YYYY-MM-DD, default '2026-11-15'
  dailyHours: number; // default 1
  daysPerWeek: number; // default 7
  targetProgram: string; // default 'Medicina (Medellín)'
  targetCutoff: number; // default 88.5
  studentName: string;
}

export interface SessionBreakdown {
  theoryMin: number;
  practiceMin: number;
  logMin: number;
  description: string;
}

export interface StudySession {
  id: string;
  weekNumber: number; // 1 to 32
  phaseId: 1 | 2 | 3 | 4;
  dayIndex: number; // 0 (Lunes) to 6 (Domingo)
  dayName: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  date: string; // YYYY-MM-DD calculated dynamically or from base
  component: SessionComponent;
  topic: string;
  subtopic: string;
  breakdown: SessionBreakdown;
  completed: boolean;
  completedAt?: string;
  score: number | null; // 0 to 100 percentage in session
  notes: string;
  minutesPracticed?: number; // Minutos reales practicados ese día
}

export interface PhaseInfo {
  id: 1 | 2 | 3 | 4;
  name: string;
  subtitle: string;
  weeksRange: [number, number];
  defaultStartDate: string;
  defaultEndDate: string;
  description: string;
  focusTopics: string[];
  recommendedGoal: string;
}

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string;
  component: ExamComponent;
  level: DifficultyLevel;
  topic: string;
  contextText?: string;
  statement: string;
  options: QuestionOption[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  distractorAnalysis: Record<'A' | 'B' | 'C' | 'D', string>;
  isCustom?: boolean;
}

export interface ErrorNotebookEntry {
  id: string;
  questionId: string;
  questionTitle: string;
  component: ExamComponent;
  topic: string;
  errorCode: ErrorCode;
  userOption: 'A' | 'B' | 'C' | 'D';
  correctOption: 'A' | 'B' | 'C' | 'D';
  personalNote: string;
  createdAt: string; // YYYY-MM-DD
  reviewStage: 1 | 2 | 3; // 1 = +7 days, 2 = +14 days, 3 = +28 days
  nextReviewDate: string; // YYYY-MM-DD
  lastReviewedAt: string | null;
  mastered: boolean;
  reviewCount: number;
}

export interface SimulacroRecord {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  lecturaCorrect: number; // out of 40
  logicaCorrect: number; // out of 40
  totalQuestionsPerComp: number; // 40 for full simulacro, or custom for mini-simulacro
  durationMinutes: number;
  source: 'Mini-Simulacro App' | 'Simulacro Externo' | 'Diagnóstico Inicial';
  notes?: string;
}

export interface ExamGuideTopic {
  id: string;
  component: ExamComponent;
  name: string;
  priority: PriorityLevel;
  verificationType: InfoVerificationType;
  description: string;
  subtopics: string[];
  studyStrategy: string;
  estimatedWeight: string;
}

export type VocabularyCategory =
  | 'Léxico Académico'
  | 'Raíz / Etimología'
  | 'Locución Latina'
  | 'Conector / Discurso'
  | 'Científico / Médico';

export interface VocabularyEntry {
  id: string;
  word: string;
  meaning: string;
  category: VocabularyCategory;
  synonyms?: string;
  example?: string;
  mastered: boolean;
  createdAt: string; // YYYY-MM-DD
}

export interface AppState {
  version: number;
  darkMode: boolean;
  config: StudyConfig;
  sessions: StudySession[];
  customQuestions: Question[];
  errorNotebook: ErrorNotebookEntry[];
  simulacros: SimulacroRecord[];
  vocabulary?: VocabularyEntry[];
}

