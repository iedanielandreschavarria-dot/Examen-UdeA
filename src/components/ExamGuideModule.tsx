import React, { useState } from 'react';
import {
  ShieldCheck,
  Eye,
  BarChart3,
  BookOpen,
  Brain,
  Clock,
  Award,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Info,
} from 'lucide-react';
import { EXAM_GUIDE_TOPICS, HISTORICAL_CUTOFFS } from '../data/examGuideData';
import {
  ExamComponent,
  PriorityLevel,
  InfoVerificationType,
} from '../types';

export const ExamGuideModule: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<'Todos' | ExamComponent>('Todos');
  const [selectedPriority, setSelectedPriority] = useState<'Todas' | PriorityLevel>('Todas');
  const [selectedVerification, setSelectedVerification] = useState<'Todos' | InfoVerificationType>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = EXAM_GUIDE_TOPICS.filter((topic) => {
    const matchesComp = selectedComponent === 'Todos' || topic.component === selectedComponent;
    const matchesPrio = selectedPriority === 'Todas' || topic.priority === selectedPriority;
    const matchesVerif =
      selectedVerification === 'Todos' || topic.verificationType === selectedVerification;
    const matchesSearch =
      searchQuery.trim() === '' ||
      topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.subtopics.some((st) => st.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesComp && matchesPrio && matchesVerif && matchesSearch;
  });

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'Alta':
        return 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800';
      case 'Media-Alta':
        return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800';
      case 'Media':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800';
      case 'Baja':
        return 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const getVerificationBadge = (vType: InfoVerificationType) => {
    switch (vType) {
      case 'Información Oficial':
        return {
          className:
            'bg-emerald-50 text-[#026937] border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
          icon: <ShieldCheck className="h-3.5 w-3.5" />,
        };
      case 'Patrones Observados':
        return {
          className:
            'bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800',
          icon: <Eye className="h-3.5 w-3.5" />,
        };
      case 'Estimaciones/Referencias':
        return {
          className:
            'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
          icon: <BarChart3 className="h-3.5 w-3.5" />,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Encabezado del Módulo */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#026937] dark:bg-emerald-950 dark:text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              Base de Conocimiento Verificada UdeA
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              Guía Estructural del Examen de Admisión UdeA
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Radiografía técnica de la prueba de admisión de pregrado, diferenciando rigurosamente entre lineamientos oficiales, patrones recurrentes y referencias históricas de puntaje.
            </p>
          </div>

          {/* Leyenda Epistemológica de Fuentes */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-semibold text-[#026937] dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Información Oficial</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-sky-300 bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-800 dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-300">
              <Eye className="h-4 w-4 shrink-0" />
              <span>Patrones Observados</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
              <BarChart3 className="h-4 w-4 shrink-0" />
              <span>Estimaciones/Referencias</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bloque 1: Estructura Oficial del Examen y Criterio de Admisión */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-[#026937] dark:bg-emerald-950 dark:text-emerald-300">
              <ShieldCheck className="h-3 w-3" /> Información Oficial
            </span>
            <BookOpen className="h-5 w-5 text-[#026937] dark:text-emerald-400" />
          </div>
          <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
            80 Preguntas de Selección Múltiple
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            Ítems de única respuesta (opciones A, B, C, D) distribuidos equitativamente en dos pruebas fundamentales:
          </p>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2 font-semibold text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200">
              <span>Competencia Lectora</span>
              <span>40 preguntas (50%)</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2 font-semibold text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
              <span>Razonamiento Lógico</span>
              <span>40 preguntas (50%)</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-[#026937] dark:bg-emerald-950 dark:text-emerald-300">
              <ShieldCheck className="h-3 w-3" /> Información Oficial
            </span>
            <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
            Duración Máxima: 3 Horas (180 min)
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            El tiempo total de la sesión única exige una gestión táctica milimétrica del ritmo de resolución:
          </p>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2 font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
              <span>Tiempo promedio por ítem</span>
              <span className="text-[#026937] dark:text-emerald-400">2,25 min (2 min 15 s)</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2 font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
              <span>Ritmo táctico sugerido</span>
              <span>20 preguntas cada 45 min</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-[#026937] dark:bg-emerald-950 dark:text-emerald-300">
              <ShieldCheck className="h-3 w-3" /> Información Oficial
            </span>
            <Award className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </div>
          <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
            Criterio de Admisión por Orden de Mérito
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
            La UdeA asigna los cupos en estricto <strong>orden descendente de puntaje estandarizado</strong> hasta completar el cupo aprobado para cada programa y sede.
          </p>
          <div className="mt-3 rounded-lg border border-sky-200 bg-sky-50/70 p-2.5 text-xs text-sky-900 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-200">
            <strong>Importante:</strong> No existe un «puntaje mínimo fijo» que garantice admisión automática en carreras de alta demanda; el puntaje de corte depende de la competencia de esa cohorte.
          </div>
        </div>
      </div>

      {/* Bloque 2: Referencia de Puntajes de Corte (Medicina Medellín y Alta Demanda) */}
      <div className="rounded-2xl border border-amber-300/80 bg-white p-6 shadow-sm dark:border-amber-800/60 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
              <BarChart3 className="h-3.5 w-3.5" />
              Estimaciones/Referencias — Franja Histórica de Puntajes de Corte
            </div>
            <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
              Referencia Histórica: Medicina (Medellín) y Programas de Alta Demanda
            </h2>
          </div>
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-50 px-4 py-2.5 text-right dark:bg-emerald-950/50">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#026937] dark:text-emerald-300">
              Franja Medicina Medellín
            </span>
            <span className="text-xl font-extrabold text-[#026937] dark:text-emerald-400">
              ~85.38 a 89.25 / 100
            </span>
          </div>
        </div>

        {/* Aviso claro requerido */}
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50/90 p-3.5 text-xs text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <strong>Aviso metodológico importante:</strong> Los puntajes de corte aquí expuestos (como la franja histórica de <strong>~85.38 a 89.25 / 100</strong> para Medicina en Medellín) constituyen una <strong>referencia histórica recopilada de convocatorias previas y NO representan una garantía ni un umbral fijo para la convocatoria 2027-2</strong>. El corte real de cada semestre varía en función del número de inscritos, la dificultad relativa de la prueba y el cupo oficial ofertado.
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <th className="pb-2.5 font-bold uppercase">Programa Académico</th>
                <th className="pb-2.5 font-bold uppercase">Sede / Campus</th>
                <th className="pb-2.5 font-bold uppercase">Franja Histórica Ref.</th>
                <th className="pb-2.5 font-bold uppercase">Demanda</th>
                <th className="pb-2.5 font-bold uppercase">Observación Estratégica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {HISTORICAL_CUTOFFS.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-bold text-slate-900 dark:text-white">
                    {item.program}
                  </td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">{item.campus}</td>
                  <td className="py-3">
                    <span className="rounded-md bg-emerald-100 px-2 py-1 font-extrabold text-[#026937] dark:bg-emerald-950 dark:text-emerald-300">
                      {item.historicalRange}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-bold ${
                        item.demandLevel === 'Extrema'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {item.demandLevel}
                    </span>
                  </td>
                  <td className="py-3 max-w-md text-slate-600 dark:text-slate-300">{item.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bloque 3: Temario Desglosado y Filtrable con Etiquetas de Prioridad */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Temario Desglosado por Prioridad y Evidencia
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Filtra los 13 bloques temáticos de Competencia Lectora y Razonamiento Lógico según su peso en el examen.
            </p>
          </div>

          {/* Controles de Filtro */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar tema, ej: áreas, analogías..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <select
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value as 'Todos' | ExamComponent)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="Todos">Todos los Componentes</option>
              <option value="Competencia Lectora">Competencia Lectora</option>
              <option value="Razonamiento Lógico">Razonamiento Lógico</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as 'Todas' | PriorityLevel)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="Todas">Prioridad: Todas</option>
              <option value="Alta">Prioridad: Alta</option>
              <option value="Media-Alta">Prioridad: Media-Alta</option>
              <option value="Media">Prioridad: Media</option>
              <option value="Baja">Prioridad: Baja</option>
            </select>

            <select
              value={selectedVerification}
              onChange={(e) =>
                setSelectedVerification(e.target.value as 'Todos' | InfoVerificationType)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="Todos">Fuente: Todas</option>
              <option value="Información Oficial">Información Oficial</option>
              <option value="Patrones Observados">Patrones Observados</option>
              <option value="Estimaciones/Referencias">Estimaciones/Referencias</option>
            </select>
          </div>
        </div>

        {/* Grid de Tarjetas del Temario */}
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredTopics.map((topic) => {
            const verifMeta = getVerificationBadge(topic.verificationType);
            const isLectura = topic.component === 'Competencia Lectora';
            return (
              <div
                key={topic.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/40 p-5 transition hover:border-[#026937]/40 hover:shadow-sm dark:border-slate-800 dark:bg-slate-800/30"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold ${
                        isLectura
                          ? 'bg-emerald-100 text-[#026937] dark:bg-emerald-950/70 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                      }`}
                    >
                      {isLectura ? (
                        <BookOpen className="h-3.5 w-3.5" />
                      ) : (
                        <Brain className="h-3.5 w-3.5" />
                      )}
                      {topic.component}
                    </span>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-bold ${getPriorityBadge(
                          topic.priority
                        )}`}
                      >
                        Prioridad {topic.priority}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${verifMeta.className}`}
                      >
                        {verifMeta.icon}
                        {topic.verificationType}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                    {topic.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {topic.description}
                  </p>

                  <div className="mt-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Subtemas evaluados:
                    </span>
                    <ul className="mt-1.5 space-y-1">
                      {topic.subtopics.map((sub, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-200"
                        >
                          <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#026937] dark:text-emerald-400" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 space-y-2 border-t border-slate-200/80 pt-3 dark:border-slate-700/70">
                  <div className="flex items-start gap-2 rounded-lg bg-white p-2.5 text-xs text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-300">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <div>
                      <strong className="text-slate-900 dark:text-white">Tip táctico UdeA: </strong>
                      {topic.studyStrategy}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <span>Peso estimado en el componente:</span>
                    <span className="text-slate-800 dark:text-slate-200">{topic.estimatedWeight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTopics.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-500">
            <Filter className="mx-auto mb-2 h-8 w-8 text-slate-400" />
            No se encontraron temas con los filtros seleccionados.
          </div>
        )}
      </div>
    </div>
  );
};

