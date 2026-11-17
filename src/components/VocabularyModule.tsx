import React, { useState, useMemo } from 'react';
import {
  BookA,
  PlusCircle,
  Search,
  CheckCircle2,
  Trash2,
  Edit3,
  RotateCw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutGrid,
  X,
} from 'lucide-react';
import { VocabularyEntry, VocabularyCategory } from '../types';
import { getTodayIso, formatSpanishDate } from '../utils/dateAndStats';

interface VocabularyModuleProps {
  vocabulary: VocabularyEntry[];
  onAddWord: (entry: Omit<VocabularyEntry, 'id'>) => void;
  onUpdateWord: (entry: VocabularyEntry) => void;
  onToggleMastered: (id: string) => void;
  onDeleteWord: (id: string) => void;
}

const CATEGORIES: VocabularyCategory[] = [
  'Léxico Académico',
  'Raíz / Etimología',
  'Locución Latina',
  'Conector / Discurso',
  'Científico / Médico',
];

export const VocabularyModule: React.FC<VocabularyModuleProps> = ({
  vocabulary,
  onAddWord,
  onUpdateWord,
  onToggleMastered,
  onDeleteWord,
}) => {
  const [viewMode, setViewMode] = useState<'dictionary' | 'flashcards'>('dictionary');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'Todas' | VocabularyCategory>('Todas');
  const [statusFilter, setStatusFilter] = useState<'all' | 'learning' | 'mastered'>('all');

  // Form states (Add or Edit)
  const [showForm, setShowForm] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [wordInput, setWordInput] = useState<string>('');
  const [meaningInput, setMeaningInput] = useState<string>('');
  const [categoryInput, setCategoryInput] = useState<VocabularyCategory>('Léxico Académico');
  const [synonymsInput, setSynonymsInput] = useState<string>('');
  const [exampleInput, setExampleInput] = useState<string>('');

  // Flashcard states
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const filteredWords = useMemo(() => {
    return vocabulary.filter((item) => {
      const matchesCat =
        selectedCategory === 'Todas' || item.category === selectedCategory;
      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'mastered'
          ? item.mastered
          : !item.mastered;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        item.word.toLowerCase().includes(q) ||
        item.meaning.toLowerCase().includes(q) ||
        (item.synonyms && item.synonyms.toLowerCase().includes(q)) ||
        (item.example && item.example.toLowerCase().includes(q));
      return matchesCat && matchesStatus && matchesSearch;
    });
  }, [vocabulary, selectedCategory, statusFilter, searchQuery]);

  const masteredCount = vocabulary.filter((v) => v.mastered).length;
  const pendingCount = vocabulary.length - masteredCount;

  const resetForm = () => {
    setEditingId(null);
    setWordInput('');
    setMeaningInput('');
    setCategoryInput('Léxico Académico');
    setSynonymsInput('');
    setExampleInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordInput.trim() || !meaningInput.trim()) return;

    if (editingId) {
      const existing = vocabulary.find((v) => v.id === editingId);
      if (existing) {
        onUpdateWord({
          ...existing,
          word: wordInput.trim(),
          meaning: meaningInput.trim(),
          category: categoryInput,
          synonyms: synonymsInput.trim() || undefined,
          example: exampleInput.trim() || undefined,
        });
      }
    } else {
      onAddWord({
        word: wordInput.trim(),
        meaning: meaningInput.trim(),
        category: categoryInput,
        synonyms: synonymsInput.trim() || undefined,
        example: exampleInput.trim() || undefined,
        mastered: false,
        createdAt: getTodayIso(),
      });
    }
    resetForm();
  };

  const handleStartEdit = (entry: VocabularyEntry) => {
    setEditingId(entry.id);
    setWordInput(entry.word);
    setMeaningInput(entry.meaning);
    setCategoryInput(entry.category);
    setSynonymsInput(entry.synonyms || '');
    setExampleInput(entry.example || '');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryBadge = (cat: VocabularyCategory) => {
    switch (cat) {
      case 'Léxico Académico':
        return 'bg-emerald-100 text-[#026937] border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
      case 'Raíz / Etimología':
        return 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
      case 'Locución Latina':
        return 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
      case 'Conector / Discurso':
        return 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800';
      case 'Científico / Médico':
        return 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
    }
  };

  const safeCardIndex =
    filteredWords.length > 0 ? Math.min(cardIndex, filteredWords.length - 1) : 0;
  const currentFlashcard = filteredWords[safeCardIndex];

  return (
    <div className="space-y-6">
      {/* Encabezado y KPIs de Vocabulario */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-[#026937] dark:bg-emerald-950 dark:text-emerald-300">
              <BookA className="h-3.5 w-3.5" />
              Léxico Académico, Etimologías y Locuciones UdeA
            </span>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              Mi Glosario y Entrenador de Vocabulario
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Añade cada palabra nueva que encuentres en tus lecturas o simulacros junto con su significado, sinónimos y ejemplo para dominar las preguntas de semántica contextual.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setViewMode('dictionary')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                viewMode === 'dictionary'
                  ? 'bg-[#026937] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              Diccionario ({vocabulary.length})
            </button>
            <button
              onClick={() => {
                setViewMode('flashcards');
                setCardIndex(0);
                setIsFlipped(false);
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                viewMode === 'flashcards'
                  ? 'bg-[#026937] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Layers className="h-4 w-4" />
              Repasar con Flashcards
            </button>
            <button
              onClick={() => {
                if (editingId) resetForm();
                setShowForm(!showForm);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 hover:bg-amber-300"
            >
              <PlusCircle className="h-4 w-4" />
              {showForm ? 'Ocultar Formulario' : '+ Añadir Palabra'}
            </button>
          </div>
        </div>

        {/* Mini KPIs de Vocabulario */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Total Palabras Registradas
            </span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white">
              {vocabulary.length}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-emerald-200/80 bg-emerald-50/60 px-4 py-3 dark:border-emerald-900/50 dark:bg-emerald-950/30">
            <span className="text-xs font-semibold text-[#026937] dark:text-emerald-300">
              Palabras Dominadas
            </span>
            <span className="text-xl font-extrabold text-[#026937] dark:text-emerald-400">
              {masteredCount} ({vocabulary.length > 0 ? Math.round((masteredCount / vocabulary.length) * 100) : 0}%)
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-amber-200/80 bg-amber-50/60 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/30">
            <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">
              En Aprendizaje (Por repasar)
            </span>
            <span className="text-xl font-extrabold text-amber-700 dark:text-amber-400">
              {pendingCount}
            </span>
          </div>
        </div>

        {/* Formulario para Añadir o Editar Palabra */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-5 space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 dark:border-emerald-900/50 dark:bg-slate-800/50"
          >
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white">
                <Sparkles className="h-4 w-4 text-[#026937] dark:text-emerald-400" />
                {editingId
                  ? 'Editar Palabra del Glosario'
                  : 'Añadir Nueva Palabra y su Significado'}
              </h3>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                >
                  <X className="h-3.5 w-3.5" /> Cancelar edición
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Palabra, Raíz o Expresión *
                </label>
                <input
                  type="text"
                  required
                  value={wordInput}
                  onChange={(e) => setWordInput(e.target.value)}
                  placeholder="Ej: Inefable, Epistemología, Sui generis, Nefro-..."
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Categoría
                </label>
                <select
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value as VocabularyCategory)}
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Significado / Definición clara *
              </label>
              <textarea
                rows={2}
                required
                value={meaningInput}
                onChange={(e) => setMeaningInput(e.target.value)}
                placeholder="Escribe qué significa la palabra con tus propias palabras o su definición precisa..."
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Sinónimos y Antónimos (Opcional)
                </label>
                <input
                  type="text"
                  value={synonymsInput}
                  onChange={(e) => setSynonymsInput(e.target.value)}
                  placeholder="Ej: Indescriptible, inenarrable (Ant: expresable)"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Oración o Ejemplo de Uso (Opcional)
                </label>
                <input
                  type="text"
                  value={exampleInput}
                  onChange={(e) => setExampleInput(e.target.value)}
                  placeholder="Ej: «Sintió una emoción inefable al leer el resultado»"
                  className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#026937] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#02542c]"
              >
                <PlusCircle className="h-4 w-4" />
                {editingId ? 'Guardar Cambios en la Palabra' : 'Guardar Palabra en Mi Glosario'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Controles de Búsqueda y Filtro */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCardIndex(0);
              }}
              placeholder="Buscar palabra, significado, raíz o sinónimo..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs text-slate-900 focus:border-[#026937] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value as 'Todas' | VocabularyCategory);
                setCardIndex(0);
              }}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="Todas">Categoría: Todas</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as 'all' | 'learning' | 'mastered');
                setCardIndex(0);
              }}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="all">Estado: Todas ({vocabulary.length})</option>
              <option value="learning">En aprendizaje ({pendingCount})</option>
              <option value="mastered">Dominadas ({masteredCount})</option>
            </select>
          </div>
        </div>

        {/* ==================== MODO 1: DICCIONARIO EN TARJETAS ==================== */}
        {viewMode === 'dictionary' && (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredWords.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col justify-between rounded-2xl border p-5 transition ${
                  item.mastered
                    ? 'border-emerald-200 bg-emerald-50/20 dark:border-emerald-900/40 dark:bg-emerald-950/10'
                    : 'border-slate-200 bg-white hover:border-[#026937]/40 dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`inline-block rounded-lg border px-2.5 py-0.5 text-[11px] font-bold ${getCategoryBadge(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Añadida: {formatSpanishDate(item.createdAt, false)}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-lg font-extrabold text-slate-900 dark:text-white">
                    {item.word}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                    {item.meaning}
                  </p>

                  {item.synonyms && (
                    <div className="mt-2.5 rounded-lg bg-slate-50 px-3 py-1.5 text-xs text-slate-600 dark:bg-slate-800/70 dark:text-slate-300">
                      <strong className="text-[#026937] dark:text-emerald-400">
                        Sinónimos / Contraste:
                      </strong>{' '}
                      {item.synonyms}
                    </div>
                  )}

                  {item.example && (
                    <p className="mt-2 border-l-2 border-amber-400 pl-2.5 text-xs italic text-slate-500 dark:text-slate-400">
                      {item.example}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                  <button
                    onClick={() => onToggleMastered(item.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                      item.mastered
                        ? 'bg-emerald-100 text-[#026937] dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-[#026937] hover:text-white dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {item.mastered ? 'Dominada' : 'Marcar Dominada'}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleStartEdit(item)}
                      title="Editar palabra"
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteWord(item.id)}
                      title="Eliminar palabra"
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================== MODO 2: TARJETAS DE MEMORIA (FLASHCARDS) ==================== */}
        {viewMode === 'flashcards' && currentFlashcard && (
          <div className="mx-auto mt-6 max-w-xl">
            <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>
                Tarjeta {safeCardIndex + 1} de {filteredWords.length}
              </span>
              <span>{currentFlashcard.category}</span>
            </div>

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-[#026937]/40 bg-gradient-to-br from-white to-emerald-50/40 p-8 text-center shadow-md transition hover:border-[#026937] dark:border-emerald-700/50 dark:from-slate-900 dark:to-emerald-950/20"
            >
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-[#026937] dark:bg-emerald-950 dark:text-emerald-300">
                {isFlipped ? 'Significado y Contexto' : 'Palabra / Término (Clic para voltear)'}
              </span>

              <h2 className="mt-4 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                {currentFlashcard.word}
              </h2>

              {isFlipped ? (
                <div className="mt-4 space-y-3 text-sm">
                  <p className="font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                    {currentFlashcard.meaning}
                  </p>
                  {currentFlashcard.synonyms && (
                    <p className="text-xs font-semibold text-[#026937] dark:text-emerald-400">
                      Sinónimos: {currentFlashcard.synonyms}
                    </p>
                  )}
                  {currentFlashcard.example && (
                    <p className="text-xs italic text-slate-500 dark:text-slate-400">
                      {currentFlashcard.example}
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                  <RotateCw className="h-3.5 w-3.5" /> Haz clic en la tarjeta para revelar el significado
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setCardIndex((prev) => Math.max(0, prev - 1));
                  setIsFlipped(false);
                }}
                disabled={safeCardIndex === 0}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
              >
                <ChevronLeft className="h-4 w-4" /> Anterior
              </button>

              <button
                onClick={() => onToggleMastered(currentFlashcard.id)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold ${
                  currentFlashcard.mastered
                    ? 'bg-emerald-100 text-[#026937] dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-[#026937] text-white'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                {currentFlashcard.mastered ? 'Dominada' : '¡Ya la domino!'}
              </button>

              <button
                onClick={() => {
                  setCardIndex((prev) =>
                    Math.min(filteredWords.length - 1, prev + 1)
                  );
                  setIsFlipped(false);
                }}
                disabled={safeCardIndex >= filteredWords.length - 1}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
              >
                Siguiente <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {filteredWords.length === 0 && (
          <div className="py-12 text-center text-sm text-slate-500">
            No se encontraron palabras con ese criterio. ¡Usa el formulario superior para añadir una nueva!
          </div>
        )}
      </div>
    </div>
  );
};

