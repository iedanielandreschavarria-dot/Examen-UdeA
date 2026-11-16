import React, { useState } from 'react';
import {
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Globe,
  BookMarked,
  Clock,
  CheckCircle2,
  Bot,
  Download,
  Upload,
} from 'lucide-react';
import {
  VERIFIED_RESOURCES,
  AI_PROMPT_TEMPLATES,
} from '../data/resourcesData';

interface ResourcesModuleProps {
  onExportJson: () => void;
  onImportJson: (file: File) => void;
}

export const ResourcesModule: React.FC<ResourcesModuleProps> = ({
  onExportJson,
  onImportJson,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredResources = VERIFIED_RESOURCES.filter(
    (r) => selectedCategory === 'Todas' || r.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Encabezado del Módulo 6 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#026937] dark:bg-emerald-950 dark:text-emerald-300">
              <BookMarked className="h-3.5 w-3.5" />
              Ecosistema de Estudio Verificado
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              Directorio de Recursos UdeA y Plantillas para Tutor IA
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Fuentes oficiales de la Universidad de Antioquia, bancos de guías de práctica y prompts estructurados listos para copiar y entrenar con Inteligencia Artificial.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Todas', 'Portal Oficial UdeA', 'Bancos de Guías y Talleres', 'Estrategia y Simulacros'].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                    selectedCategory === cat
                      ? 'bg-[#026937] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Directorio de Recursos por Categoría */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-[#026937]/40 dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-[#026937] dark:bg-emerald-950/60 dark:text-emerald-300">
                  <Globe className="h-3.5 w-3.5" />
                  {res.category}
                </span>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                  {res.badge}
                </span>
              </div>

              <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                {res.title}
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {res.institution}
              </p>

              <div className="mt-3 space-y-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  <strong className="text-slate-900 dark:text-white">¿Para qué sirve?: </strong>
                  {res.purpose}
                </p>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/60">
                  <div className="flex items-center gap-1.5 font-bold text-[#026937] dark:text-emerald-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Cómo integrarlo en tu hora diaria (60 min):</span>
                  </div>
                  <p className="mt-1 text-slate-700 dark:text-slate-200">{res.dailyIntegration}</p>
                </div>
              </div>

              <ul className="mt-3 space-y-1">
                {res.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#026937] dark:text-emerald-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {res.url.startsWith('http') && (
              <div className="mt-5 border-t border-slate-100 pt-3 dark:border-slate-800">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-[#026937] dark:bg-slate-800 dark:hover:bg-[#026937]"
                >
                  Abrir Recurso Externo <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Plantillas de Prompts para Tutor IA (Con botón "Copiar Prompt") */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-emerald-100 p-2 text-[#026937] dark:bg-emerald-950 dark:text-emerald-400">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Plantillas de Prompts para Tutor IA (Generación y Método Socrático)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Haz clic en «Copiar Prompt» y úsalo con tu asistente de IA para generar ejercicios inéditos de tus subtemas débiles o analizar errores sin spoilers.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {AI_PROMPT_TEMPLATES.map((tpl) => {
            const isCopied = copiedId === tpl.id;
            return (
              <div
                key={tpl.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-5 dark:border-slate-800 dark:bg-slate-800/30"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-[#026937]/10 px-2.5 py-1 text-xs font-bold text-[#026937] dark:bg-emerald-950 dark:text-emerald-300">
                      <Sparkles className="h-3.5 w-3.5" />
                      {tpl.category}
                    </span>
                    <button
                      onClick={() => handleCopyPrompt(tpl.id, tpl.promptText)}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold shadow-sm transition ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#026937] text-white hover:bg-[#02542c]'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5" /> ¡Prompt Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copiar Prompt
                        </>
                      )}
                    </button>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                    {tpl.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-amber-700 dark:text-amber-400">
                    Caso de uso: {tpl.targetWeakness}
                  </p>

                  <pre className="mt-3 max-h-48 overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-3 font-sans text-xs leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    {tpl.promptText}
                  </pre>
                </div>

                <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
                  <strong>Tip de integración:</strong> {tpl.usageTip}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tarjeta de Respaldo y Portabilidad de Datos (JSON Export/Import) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Persistencia Local y Copia de Seguridad (JSON)
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Todo tu progreso se guarda automáticamente en este navegador (`localStorage`). Exporta un respaldo JSON periódicamente para llevarlo a otro computador o celular.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onExportJson}
              className="inline-flex items-center gap-2 rounded-xl bg-[#026937] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#02542c]"
            >
              <Download className="h-4 w-4" />
              Exportar Respaldo (.JSON)
            </button>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <Upload className="h-4 w-4" />
              Importar Respaldo (.JSON)
              <input
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onImportJson(file);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

