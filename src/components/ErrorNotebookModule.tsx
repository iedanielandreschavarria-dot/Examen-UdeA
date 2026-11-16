import React, { useState } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  PlusCircle,
  Calendar,
  BookOpen,
  Brain,
  Trash2,
  ArrowUpRight,
  LayoutGrid,
  Table,
} from 'lucide-react';
import {
  ErrorNotebookEntry,
  ErrorCode,
  ExamComponent,
} from '../types';
import {
  ERROR_CODE_META,
  formatSpanishDate,
  getTodayIso,
  addDays,
} from '../utils/dateAndStats';

interface ErrorNotebookModuleProps {
  entries: ErrorNotebookEntry[];
  onAdvanceReviewStage: (entryId: string) => void;
  onToggleMastered: (entryId: string) => void;
  onDeleteEntry: (entryId: string) => void;
  onAddManualError: (entry: Omit<ErrorNotebookEntry, 'id'>) => void;
}

export const ErrorNotebookModule: React.FC<ErrorNotebookModuleProps> = ({
  entries,
  onAdvanceReviewStage,
  onToggleMastered,
  onDeleteEntry,
  onAddManualError,
}) => {
  const [filterCode, setFilterCode] = useState<'Todos' | ErrorCode>('Todos');
  const [filterComponent, setFilterComponent] = useState<'Todos' | ExamComponent>('Todos');
  const [filterStatus, setFilterStatus] = useState<'active' | 'mastered' | 'all'>('active');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [showManualForm, setShowManualForm] = useState<boolean>(false);

  // Manual form states
  const [mTitle, setMTitle] = useState('');
  const [mComp, setMComp] = useState<ExamComponent>('Razonamiento Lógico');
  const [mTopic, setMTopic] = useState('');
  const [mCode, setMCode] = useState<ErrorCode>('P');
  const [mUserOpt, setMUserOpt] = useState<'A' | 'B' | 'C' | 'D'>('B');
  const [mCorrOpt, setMCorrOpt] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [mNote, setMNote] = useState('');

  const filteredEntries = entries.filter((e) => {
    const matchCode = filterCode === 'Todos' || e.errorCode === filterCode;
    const matchComp = filterComponent === 'Todos' || e.component === filterComponent;
    const matchStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'mastered'
        ? e.mastered
        : !e.mastered;
    return matchCode && matchComp && matchStatus;
  });

  const handleManualSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!mTitle.trim() || !mNote.trim()) return;
    const today = getTodayIso();
    onAddManualError({
      questionId: `manual-${Date.now()}`,
      questionTitle: mTitle.trim(),
      component: mComp,
      topic: mTopic.trim() || 'Subtema general',
      errorCode: mCode,
      userOption: mUserOpt,
      correctOption: mCorrOpt,
      personalNote: mNote.trim(),
      createdAt: today,
      reviewStage: 1,
      nextReviewDate: addDays(today, 7),
      lastReviewedAt: null,
      mastered: false,
      reviewCount: 0,
    });
    setMTitle('');
    setMTopic('');
    setMNote('');
    setShowManualForm(false);
  };

  const getStageLabel = (stage: 1 | 2 | 3, mastered: boolean) => {
    if (mastered) return 'Superado (100% Dominado)';
    switch (stage) {
      case 1:
        return 'Ciclo 1: +7 días (1 semana)';
      case 2:
        return 'Ciclo 2: +14 días (2 semanas)';
      case 3:
        return 'Ciclo 3: +28 días (4 semanas)';
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado y Explicación del Algoritmo 1-2-4 Semanas */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800 dark:bg-purple-950 dark:text-purple-300">
              <RotateCcw className="h-3.5 w-3.5" />
              Algoritmo de Repaso Espaciado 1 — 2 — 4 Semanas (+7d, +14d, +28d)
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              Cuaderno de Errores y Retención Activa
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Cada fallo se clasifica con los códigos <strong>(C), (I), (P), (T)</strong> y programa automáticamente su próxima fecha de revisión hasta ser marcado como <strong>Superado</strong>.
            </p>
          </div>

          <button
            onClick={() => setShowManualForm(!showManualForm)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#026937] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#02542c]"
          >
            <PlusCircle className="h-4 w-4" />
            {showManualForm ? 'Cerrar Formulario' : 'Registrar Nuevo Error Manual'}
          </button>
        </div>

        {/* Formulario Manual Desplegable */}
        {showManualForm && (
          <form
            onSubmit={handleManualSubmit}
            className="mt-5 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50"
          >
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Agregar Error de Taller o Simulacro Externo (Programa revisión automática a +7 días)
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Resumen de la pregunta o problema fallado *
                </label>
                <input
                  type="text"
                  required
                  value={mTitle}
                  onChange={(e) => setMTitle(e.target.value)}
                  placeholder="Ej: Cubo pintado 4x4x4 — caras con exactamente 2 lados pintados"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Componente
                </label>
                <select
                  value={mComp}
                  onChange={(e) => setMComp(e.target.value as ExamComponent)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  <option value="Razonamiento Lógico">Razonamiento Lógico</option>
                  <option value="Competencia Lectora">Competencia Lectora</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Código de Error
                </label>
                <select
                  value={mCode}
                  onChange={(e) => setMCode(e.target.value as ErrorCode)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  <option value="C">(C) Concepto faltante</option>
                  <option value="I">(I) Inferencia forzada</option>
                  <option value="P">(P) Planteamiento matemático</option>
                  <option value="T">(T) Tiempo / descuido</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Subtema específico
                </label>
                <input
                  type="text"
                  value={mTopic}
                  onChange={(e) => setMTopic(e.target.value)}
                  placeholder="Ej: Razonamiento espacial / Contrarrecíproco"
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Opción marcada (Fallo)
                </label>
                <select
                  value={mUserOpt}
                  onChange={(e) => setMUserOpt(e.target.value as 'A' | 'B' | 'C' | 'D')}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-rose-700 dark:border-slate-700 dark:bg-slate-900"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Opción correcta
                </label>
                <select
                  value={mCorrOpt}
                  onChange={(e) => setMCorrOpt(e.target.value as 'A' | 'B' | 'C' | 'D')}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-emerald-700 dark:border-slate-700 dark:bg-slate-900"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Regla correctiva / Nota metacognitiva (¿Por qué fallé y cómo resolverlo sin ayuda?) *
              </label>
              <textarea
                rows={2}
                required
                value={mNote}
                onChange={(e) => setMNote(e.target.value)}
                placeholder="Ej: Para cubitos con 2 caras pintadas se usan las 12 aristas: 12 × (n - 2)..."
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#026937] px-5 py-2 text-xs font-bold text-white hover:bg-[#02542c]"
            >
              Guardar y Programar Revisión (+7 días)
            </button>
          </form>
        )}
      </div>

      {/* Tarjetas de Diagnóstico por Código de Error (C, I, P, T) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {(['C', 'I', 'P', 'T'] as ErrorCode[]).map((code) => {
          const meta = ERROR_CODE_META[code];
          const countActive = entries.filter((e) => e.errorCode === code && !e.mastered).length;
          const countTotal = entries.filter((e) => e.errorCode === code).length;
          const isSelected = filterCode === code;

          return (
            <div
              key={code}
              onClick={() => setFilterCode(isSelected ? 'Todos' : code)}
              className={`cursor-pointer rounded-2xl border p-4 transition ${
                isSelected
                  ? 'border-2 border-[#026937] bg-white shadow-md dark:bg-slate-900'
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`rounded-lg border px-2.5 py-1 text-xs font-extrabold ${meta.badgeClass}`}>
                  {meta.label}
                </span>
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {countActive} <span className="text-xs font-normal text-slate-400">/ {countTotal}</span>
                </span>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                {meta.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Barra de Filtros y Conmutador Tarjetas / Tabla */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterCode}
              onChange={(e) => setFilterCode(e.target.value as 'Todos' | ErrorCode)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="Todos">Código: Todos (C, I, P, T)</option>
              <option value="C">(C) Concepto faltante</option>
              <option value="I">(I) Inferencia forzada</option>
              <option value="P">(P) Planteamiento matemático</option>
              <option value="T">(T) Tiempo / descuido</option>
            </select>

            <select
              value={filterComponent}
              onChange={(e) => setFilterComponent(e.target.value as 'Todos' | ExamComponent)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="Todos">Componente: Todos</option>
              <option value="Competencia Lectora">Competencia Lectora</option>
              <option value="Razonamiento Lógico">Razonamiento Lógico</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'active' | 'mastered' | 'all')}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="active">Estado: Pendientes de Repaso</option>
              <option value="mastered">Estado: Superados</option>
              <option value="all">Estado: Todos</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setViewMode('cards')}
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Tarjetas
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Table className="h-3.5 w-3.5" /> Tabla
            </button>
          </div>
        </div>

        {/* VISTA TARJETAS */}
        {viewMode === 'cards' ? (
          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredEntries.map((entry) => {
              const codeMeta = ERROR_CODE_META[entry.errorCode];
              return (
                <div
                  key={entry.id}
                  className={`flex flex-col justify-between rounded-2xl border p-5 transition ${
                    entry.mastered
                      ? 'border-emerald-200 bg-emerald-50/20 dark:border-emerald-900/40 dark:bg-emerald-950/10'
                      : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-bold ${codeMeta.badgeClass}`}
                      >
                        {codeMeta.label}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {entry.component === 'Competencia Lectora' ? (
                          <BookOpen className="h-3.5 w-3.5 text-[#026937]" />
                        ) : (
                          <Brain className="h-3.5 w-3.5 text-amber-600" />
                        )}
                        {entry.component}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                      {entry.questionTitle}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                      Subtema: {entry.topic} • Marcaste{' '}
                      <strong className="text-rose-600 dark:text-rose-400">{entry.userOption}</strong>{' '}
                      (Correcta:{' '}
                      <strong className="text-emerald-600 dark:text-emerald-400">
                        {entry.correctOption}
                      </strong>
                      )
                    </p>

                    <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                      <strong className="block text-slate-900 dark:text-white">
                        Bitácora de Corrección:
                      </strong>
                      {entry.personalNote}
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 font-semibold text-purple-700 dark:text-purple-300">
                        <RotateCcw className="h-3.5 w-3.5" />
                        {getStageLabel(entry.reviewStage, entry.mastered)}
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
                        <Calendar className="h-3.5 w-3.5 text-[#026937] dark:text-emerald-400" />
                        Próxima revisión: {formatSpanishDate(entry.nextReviewDate)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {!entry.mastered && (
                        <button
                          onClick={() => onAdvanceReviewStage(entry.id)}
                          className="inline-flex items-center gap-1 rounded-xl border border-purple-300 bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-900 hover:bg-purple-100 dark:border-purple-800 dark:bg-purple-950/60 dark:text-purple-200"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          {entry.reviewStage === 1
                            ? 'Avanzar a +14 días (Sem 2)'
                            : entry.reviewStage === 2
                            ? 'Avanzar a +28 días (Sem 4)'
                            : 'Completar Ciclo 4 Sem'}
                        </button>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleMastered(entry.id)}
                          className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                            entry.mastered
                              ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                              : 'bg-[#026937] text-white hover:bg-[#02542c]'
                          }`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {entry.mastered ? 'Reabrir Repaso' : 'Marcar como Superado'}
                        </button>
                        <button
                          onClick={() => onDeleteEntry(entry.id)}
                          title="Eliminar registro"
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* VISTA TABLA */
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="pb-2.5 font-bold uppercase">Código</th>
                  <th className="pb-2.5 font-bold uppercase">Componente / Subtema</th>
                  <th className="pb-2.5 font-bold uppercase">Pregunta y Regla Correctiva</th>
                  <th className="pb-2.5 font-bold uppercase">Ciclo 1-2-4</th>
                  <th className="pb-2.5 font-bold uppercase">Próx. Revisión</th>
                  <th className="pb-2.5 font-bold uppercase">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredEntries.map((entry) => {
                  const meta = ERROR_CODE_META[entry.errorCode];
                  return (
                    <tr key={entry.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="py-3 pr-2">
                        <span
                          className={`inline-block rounded-md border px-2 py-0.5 font-bold ${meta.badgeClass}`}
                        >
                          ({entry.errorCode}) {meta.shortLabel}
                        </span>
                      </td>
                      <td className="py-3 pr-2">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {entry.component}
                        </div>
                        <div className="text-slate-500">{entry.topic}</div>
                      </td>
                      <td className="py-3 pr-3 max-w-md">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {entry.questionTitle}
                        </div>
                        <div className="mt-0.5 text-slate-600 dark:text-slate-300">
                          {entry.personalNote}
                        </div>
                      </td>
                      <td className="py-3 pr-2 font-semibold text-purple-700 dark:text-purple-300">
                        {getStageLabel(entry.reviewStage, entry.mastered)}
                      </td>
                      <td className="py-3 pr-2 font-semibold text-slate-700 dark:text-slate-300">
                        {formatSpanishDate(entry.nextReviewDate)}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1.5">
                          {!entry.mastered && (
                            <button
                              onClick={() => onAdvanceReviewStage(entry.id)}
                              className="rounded-lg bg-purple-100 px-2 py-1 font-bold text-purple-900 hover:bg-purple-200 dark:bg-purple-950 dark:text-purple-200"
                            >
                              +Ciclo
                            </button>
                          )}
                          <button
                            onClick={() => onToggleMastered(entry.id)}
                            className={`rounded-lg px-2.5 py-1 font-bold ${
                              entry.mastered
                                ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                                : 'bg-[#026937] text-white'
                            }`}
                          >
                            {entry.mastered ? 'Reabrir' : 'Superado'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {filteredEntries.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-500">
            No hay errores que coincidan con el filtro actual. ¡Excelente trabajo!
          </div>
        )}
      </div>
    </div>
  );
};

