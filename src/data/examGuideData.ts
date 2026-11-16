import { ExamGuideTopic } from '../types';

export interface CutoffReference {
  program: string;
  campus: string;
  historicalRange: string;
  minObserved: number;
  maxObserved: number;
  demandLevel: 'Extrema' | 'Muy Alta' | 'Alta';
  verificationType: 'Estimaciones/Referencias';
  note: string;
}

export const HISTORICAL_CUTOFFS: CutoffReference[] = [
  {
    program: 'Medicina',
    campus: 'Medellín (Ciudad Universitaria / Área de la Salud)',
    historicalRange: '85.38 — 89.25 / 100',
    minObserved: 85.38,
    maxObserved: 89.25,
    demandLevel: 'Extrema',
    verificationType: 'Estimaciones/Referencias',
    note: 'Equivale aproximadamente a responder correctamente entre 69 y 72 de las 80 preguntas del examen, según la curva de estandarización de cada cohorte.',
  },
  {
    program: 'Ingeniería de Sistemas / Software',
    campus: 'Medellín',
    historicalRange: '78.40 — 83.60 / 100',
    minObserved: 78.4,
    maxObserved: 83.6,
    demandLevel: 'Muy Alta',
    verificationType: 'Estimaciones/Referencias',
    note: 'Alta competencia por cupo; requiere solidez sobresaliente en Razonamiento Lógico sin descuidar Competencia Lectora.',
  },
  {
    program: 'Psicología / Derecho',
    campus: 'Medellín',
    historicalRange: '76.10 — 81.50 / 100',
    minObserved: 76.1,
    maxObserved: 81.5,
    demandLevel: 'Muy Alta',
    verificationType: 'Estimaciones/Referencias',
    note: 'Alta exigencia en lectura inferencial, crítica e intertextualidad.',
  },
  {
    program: 'Enfermería / Odontología / Microbiología',
    campus: 'Medellín',
    historicalRange: '74.50 — 80.20 / 100',
    minObserved: 74.5,
    maxObserved: 80.2,
    demandLevel: 'Alta',
    verificationType: 'Estimaciones/Referencias',
    note: 'Programas del área de la salud con puntajes de corte elevados y variación semestral según número de aspirantes.',
  },
  {
    program: 'Medicina (Seccionales cuando aplica oferta)',
    campus: 'Urabá / Oriente / Bajo Cauca',
    historicalRange: '79.80 — 84.90 / 100',
    minObserved: 79.8,
    maxObserved: 84.9,
    demandLevel: 'Muy Alta',
    verificationType: 'Estimaciones/Referencias',
    note: 'Sujeto a apertura oficial en el acuerdo de convocatoria de cada semestre.',
  },
];

export const EXAM_GUIDE_TOPICS: ExamGuideTopic[] = [
  // ==================== COMPETENCIA LECTORA ====================
  {
    id: 'cl-lectura-critica',
    component: 'Competencia Lectora',
    name: 'Lectura Crítica e Inferencial',
    priority: 'Alta',
    verificationType: 'Información Oficial',
    description:
      'Capacidad para deducir información implícita, identificar presuposiciones, evaluar la solidez argumentativa, reconocer la intención comunicativa del autor y contrastar posturas entre dos textos.',
    subtopics: [
      'Inferencias deductivas, inductivas y abductivas válidas',
      'Identificación de tesis central y argumentos de soporte',
      'Presuposiciones, sobreentendidos e ironía discursiva',
      'Intertextualidad: diálogo y contraste entre Texto A y Texto B',
      'Detección de extrapolaciones o inferencias forzadas (distractor clásico)',
    ],
    studyStrategy:
      'Ante cada opción, exige evidencia textual: si una opción introduce cuantificadores absolutos ("siempre", "únicamente", "jamás") no respaldados por el autor, descártala de inmediato.',
    estimatedWeight: '35% - 40% de Competencia Lectora (~14-16 preguntas)',
  },
  {
    id: 'cl-estrategias-tipologia',
    component: 'Competencia Lectora',
    name: 'Estrategias de Lectura y Tipología Textual',
    priority: 'Alta',
    verificationType: 'Información Oficial',
    description:
      'Reconocimiento de la arquitectura global del texto (macroestructura y superestructura) según su género: expositivo, argumentativo, narrativo-literario, filosófico o discontinuo.',
    subtopics: [
      'Macroestructura: tema general, título pertinente y resumen fiel',
      'Función de cada párrafo dentro de la progresión temática',
      'Textos expositivos y científicos vs. ensayos argumentativos',
      'Narrativa literaria: narrador, tiempo diegético y simbolismo',
      ' Síntesis local y global de fragmentos complejos',
    ],
    studyStrategy:
      'Al leer cada párrafo, anota al margen su función en 3 palabras (ej. "Plantea hipótesis", "Cita contraargumento", "Ejemplifica caso").',
    estimatedWeight: '20% - 25% de Competencia Lectora (~8-10 preguntas)',
  },
  {
    id: 'cl-semantica',
    component: 'Competencia Lectora',
    name: 'Semántica Contextual y Precisión Léxica',
    priority: 'Media-Alta',
    verificationType: 'Información Oficial',
    description:
      'Determinación del sentido exacto que adquiere una palabra, locución o expresión metafórica dentro de su contexto específico, más allá de su primera acepción de diccionario.',
    subtopics: [
      'Sinonimia y antonimia contextual en registro académico',
      'Polisemia, homonimia y connotación vs. denotación',
      'Hiperonimia, hiponimia y campos semánticos',
      'Paráfrasis y reformulación de enunciados sin pérdida de sentido',
    ],
    studyStrategy:
      'Sustituye la palabra preguntada por las opciones dentro del renglón original y verifica que se conserve tanto el significado como la carga valorativa (positiva, neutra o crítica).',
    estimatedWeight: '15% - 18% de Competencia Lectora (~6-7 preguntas)',
  },
  {
    id: 'cl-elementos-discursivos',
    component: 'Competencia Lectora',
    name: 'Elementos Discursivos, Cohesión y Conectores',
    priority: 'Media-Alta',
    verificationType: 'Patrones Observados',
    description:
      'Análisis de los mecanismos lingüísticos que articulan las ideas: conectores lógicos, signos de puntuación con valor semántico y referencias anafóricas/catafóricas.',
    subtopics: [
      'Conectores adversativos, concesivos, causales, consecutivos y condicionales',
      'Deixis personal y demostrativa: anáfora ("este", "aquel", "su") y catáfora',
      'Elipsis y sustitución léxica para mantener el referente',
      'Valor interpretativo de comillas, guiones largos, dos puntos y paréntesis',
    ],
    studyStrategy:
      'En preguntas de "¿A quién se refiere el pronombre X en el párrafo 3?", retrocede al sujeto u objeto nominal inmediatamente anterior y verifica concordancia de género y número.',
    estimatedWeight: '12% - 15% de Competencia Lectora (~5-6 preguntas)',
  },
  {
    id: 'cl-analogias',
    component: 'Competencia Lectora',
    name: 'Relaciones Analógicas',
    priority: 'Media',
    verificationType: 'Patrones Observados',
    description:
      'Identificación de semejanzas estructurales o relacionales entre pares de conceptos o entre situaciones descritas dentro de la lectura y escenarios análogos.',
    subtopics: [
      'Analogías clásicas de par base (A : B :: C : D)',
      'Relaciones de causa-efecto, parte-todo, intensidad, función y reciprocidad',
      'Analogías argumentativas dentro del texto ("El autor compara X con Y para...")',
      'Criterios de orden y naturaleza semántica para desempatar distractores',
    ],
    studyStrategy:
      'Construye una oración breve y precisa con el par base y respeta estrictamente el orden (izquierda a derecha) al evaluar las 4 opciones.',
    estimatedWeight: '8% - 10% de Competencia Lectora (~3-4 preguntas)',
  },
  {
    id: 'cl-etimologias',
    component: 'Competencia Lectora',
    name: 'Etimologías y Raíces Grecolatinas',
    priority: 'Baja',
    verificationType: 'Patrones Observados',
    description:
      'Deducción del significado de términos cultos, científicos o humanísticos a partir de sus prefijos, sufijos y raíces griegas o latinas.',
    subtopics: [
      'Prefijos de negación, oposición y posición (a-, an-, anti-, epi-, endo-, exo-)',
      'Raíces frecuentes en ciencias de la salud (hemo, pato, morfo, nefro, fago, lisis)',
      'Raíces filosóficas y sociales (antropo, crono, gnos, cracia, polis, logos)',
      'Latinismos académicos frecuentes (ad hoc, a priori, per se, statu quo, sui generis)',
    ],
    studyStrategy:
      'No memorices diccionarios enteros: domina las 60 raíces más productivas y apóyate en palabras de la misma familia léxica que ya conozcas.',
    estimatedWeight: '3% - 5% de Competencia Lectora (~1-2 preguntas)',
  },

  // ==================== RAZONAMIENTO LÓGICO ====================
  {
    id: 'rl-proporcionalidad-porcentajes',
    component: 'Razonamiento Lógico',
    name: 'Aritmética, Fracciones, Porcentajes y Proporcionalidad',
    priority: 'Alta',
    verificationType: 'Información Oficial',
    description:
      'Eje transversal del examen UdeA: manejo fluido de razones, proporciones, fracciones de cantidades restantes, variaciones porcentuales sucesivas y mezclas sin usar calculadora.',
    subtopics: [
      'Fracciones de un total y extracciones sucesivas del resto',
      'Razones, proporciones directas e inversas y repartos proporcionales',
      'Porcentajes, descuentos/aumentos sucesivos y cambios de base',
      'Divisibilidad, MCM, MCD y aritmética de residuos (ciclicidad)',
      'Promedios aritméticos y ponderados',
    ],
    studyStrategy:
      'En problemas de porcentajes sin valores absolutos, asigna el valor base 100 para operar con enteros rápidos en menos de 40 segundos.',
    estimatedWeight: '22% - 25% de Razonamiento Lógico (~9-10 preguntas)',
  },
  {
    id: 'rl-geometria-espacial',
    component: 'Razonamiento Lógico',
    name: 'Geometría (Áreas, Perímetros, Volúmenes) y Razonamiento Espacial',
    priority: 'Alta',
    verificationType: 'Información Oficial',
    description:
      'Resolución visual y deductiva de figuras planas, áreas sombreadas por traslación o resta, relaciones de escala y visualización tridimensional de sólidos.',
    subtopics: [
      'Áreas sombreadas mediante traslación, simetría y resta de regiones',
      'Triángulos notables, Teorema de Pitágoras y semejanza (razón lineal k vs. área k²)',
      'Perímetros de figuras compuestas, escalonadas y arcos circulares',
      'Volúmenes de cubos, prismas, cilindros y conos; cubos pintados y cortados',
      'Vistas ortogonales, plegado de plantillas de cubos/dados y rotación de sólidos',
    ],
    studyStrategy:
      'En la UdeA casi nunca requieres cálculos decimales largos con π: deja π indicado y busca simetrías o divide la figura en triángulos congruentes.',
    estimatedWeight: '18% - 22% de Razonamiento Lógico (~7-9 preguntas)',
  },
  {
    id: 'rl-ecuaciones-conjuntos-secuencias',
    component: 'Razonamiento Lógico',
    name: 'Ecuaciones, Conjuntos y Secuencias / Patrones',
    priority: 'Alta',
    verificationType: 'Información Oficial',
    description:
      'Modelación algebraica de situaciones verbales, organización de conjuntos con diagramas de Venn-Euler o tablas de Carroll, e identificación de leyes de formación en sucesiones.',
    subtopics: [
      'Planteamiento de ecuaciones lineales y sistemas 2×2 desde lenguaje verbal',
      'Teoría de conjuntos (2 y 3 conjuntos) y principio de inclusión-exclusión',
      'Sucesiones numéricas, alfanuméricas, arreglos figurados y sumatorias',
      'Razonamiento inductivo: analizar casos pequeños (paso 1, 2, 3) para generalizar al paso n',
    ],
    studyStrategy:
      'Si el planteamiento algebraico luce engorroso, evalúa sustituir las opciones de respuesta (Empezando por B o C) directamente en la condición del enunciado.',
    estimatedWeight: '18% - 20% de Razonamiento Lógico (~7-8 preguntas)',
  },
  {
    id: 'rl-conteo-probabilidad',
    component: 'Razonamiento Lógico',
    name: 'Principios de Conteo, Combinatoria y Probabilidad',
    priority: 'Media-Alta',
    verificationType: 'Información Oficial',
    description:
      'Determinación del número de configuraciones posibles bajo restricciones específicas y cálculo de probabilidad clásica o condicional.',
    subtopics: [
      'Principio aditivo (evento A o B) y multiplicativo (evento A y luego B)',
      'Permutaciones (importa el orden) vs. Combinaciones (no importa el orden)',
      'Conteo de rutas en cuadrículas y conteo sistemático de figuras',
      'Probabilidad clásica de Laplace (casos favorables / casos posibles)',
      'Probabilidad del complemento ("al menos uno" = 1 − "ninguno") y sin reposición',
    ],
    studyStrategy:
      'Antes de usar una fórmula con factoriales, dibuja las casillas de decisión y multiplica las opciones disponibles en cada etapa considerando las restricciones.',
    estimatedWeight: '12% - 15% de Razonamiento Lógico (~5-6 preguntas)',
  },
  {
    id: 'rl-tablas-graficas',
    component: 'Razonamiento Lógico',
    name: 'Análisis e Interpretación de Tablas y Gráficas',
    priority: 'Media-Alta',
    verificationType: 'Información Oficial',
    description:
      'Lectura crítica de información cuantitativa presentada en tablas cruzadas, gráficos de barras, líneas de tendencia, sectores circulares e histogramas.',
    subtopics: [
      'Extracción y cruce de datos entre dos gráficas complementarias',
      'Diferencia entre variación porcentual y variación en puntos porcentuales',
      'Cálculo de tasas, índices, promedios y medianas a partir de gráficos',
      'Validación de afirmaciones ("De la gráfica se puede concluir con certeza que...")',
    ],
    studyStrategy:
      'Lee primero los títulos de los ejes, las unidades (¿miles?, ¿porcentajes?, ¿pesos?) y las convenciones antes de realizar cualquier operación.',
    estimatedWeight: '10% - 12% de Razonamiento Lógico (~4-5 preguntas)',
  },
  {
    id: 'rl-logica-proposicional-series',
    component: 'Razonamiento Lógico',
    name: 'Lógica Proposicional, Deducción y Series Gráficas',
    priority: 'Media',
    verificationType: 'Patrones Observados',
    description:
      'Deducción rigurosa con conectivos lógicos, cuantificadores, acertijos de verdades/mentiras, ordenamiento de información y secuencias de matrices gráficas.',
    subtopics: [
      'Condicional (p → q), contrarrecíproco (~q → ~p) y negación del condicional (p ∧ ~q)',
      'Cuantificadores ("Todos", "Algún", "Ningún") y su negación exacta',
      'Acertijos de verdades y mentiras, certezas (principio del palomar) y ordenamientos',
      'Series gráficas: rotaciones, reflexiones y superposición de patrones',
    ],
    studyStrategy:
      'Recuerda siempre: "Si p entonces q" NO equivale a "Si q entonces p", sino a su contrarrecíproco "Si no q entonces no p".',
    estimatedWeight: '8% - 10% de Razonamiento Lógico (~3-4 preguntas)',
  },
  {
    id: 'rl-operadores-no-convencionales',
    component: 'Razonamiento Lógico',
    name: 'Operaciones No Convencionales (Operadores Arbitrarios)',
    priority: 'Media',
    verificationType: 'Patrones Observados',
    description:
      'Evaluación de nuevas operaciones definidas mediante símbolos arbitrarios (*, #, Δ, □) a través de fórmulas algebraicas, condicionales por tramos o tablas de doble entrada.',
    subtopics: [
      'Sustitución directa y anidada en operadores simbólicos',
      'Operadores definidos por paridad o relación de orden (si a > b entonces...)',
      'Reconocimiento de patrones o propiedades en tablas de operadores',
    ],
    studyStrategy:
      'Resuelve desde el paréntesis más interno hacia afuera, escribiendo claramente quién actúa como primera componente (a) y quién como segunda (b).',
    estimatedWeight: '5% - 8% de Razonamiento Lógico (~2-3 preguntas)',
  },
];

