import { PhaseInfo, StudySession, SessionComponent } from '../types';

export const PHASES_INFO: PhaseInfo[] = [
  {
    id: 1,
    name: 'Fase 1: Base y Diagnóstico',
    subtitle: 'Fundamentación cuantitativa y arquitectura textual',
    weeksRange: [1, 8],
    defaultStartDate: '2026-11-16',
    defaultEndDate: '2027-01-10',
    description:
      'Construcción de cimientos sólidos en aritmética sin calculadora, razones, proporciones, porcentajes, planteamiento de ecuaciones lineales, junto con estrategias de lectura activa, tipología textual y precisión semántica.',
    focusTopics: [
      'Aritmética básica y fracciones',
      'Porcentajes y variaciones sucesivas',
      'Proporcionalidad directa, inversa y compuesta',
      'Planteamiento de ecuaciones de primer grado',
      'Estrategias de lectura y macroestructura',
      'Tipología textual (expositivo, argumentativo, literario)',
      'Semántica contextual, sinonimia y antonimia',
    ],
    recommendedGoal: 'Alcanzar 70% de precisión sin presión extrema de tiempo.',
  },
  {
    id: 2,
    name: 'Fase 2: Inferencia y Abstracción',
    subtitle: 'Lectura crítica, combinatoria, conjuntos y operadores',
    weeksRange: [9, 16],
    defaultStartDate: '2027-01-10',
    defaultEndDate: '2027-03-06',
    description:
      'Desarrollo de pensamiento inferencial profundo, relaciones analógicas complejas, etimologías grecolatinas, teoría de conjuntos, secuencias numéricas/alfanuméricas, principios de conteo, probabilidad y operaciones arbitrarias.',
    focusTopics: [
      'Relaciones analógicas verbales y estructurales',
      'Lectura crítica, presuposiciones e implícitos',
      'Etimologías y raíces léxicas en textos académicos',
      'Teoría de conjuntos y diagramas de Venn-Euler',
      'Secuencias numéricas, sucesiones y sumatorias',
      'Principio multiplicativo, permutaciones y combinaciones',
      'Probabilidad clásica y condicional elemental',
      'Operaciones no convencionales (operadores arbitrarios)',
    ],
    recommendedGoal: 'Superar 78% de acierto dominando distractores de inferencia forzada.',
  },
  {
    id: 3,
    name: 'Fase 3: Geometría, Gráficas y Deducción',
    subtitle: 'Visión espacial, áreas sombreadas, estadística y lógica formal',
    weeksRange: [17, 24],
    defaultStartDate: '2027-03-07',
    defaultEndDate: '2027-05-01',
    description:
      'Dominio visual y deductivo del examen UdeA: cálculo ágil de áreas sombreadas por traslación, perímetros, volúmenes, rotación de sólidos, plegado de cubos, series gráficas, interpretación de tablas/gráficas y lógica proposicional.',
    focusTopics: [
      'Geometría plana: áreas sombreadas y perímetros',
      'Geometría espacial: volúmenes, cortes y proyecciones',
      'Razonamiento espacial: despliegue de cubos y vistas',
      'Series gráficas y matrices de transformación',
      'Análisis crítico de tablas, histogramas y gráficos mixtos',
      'Lógica proposicional: conectivos, cuantificadores y negaciones',
      'Intertextualidad y contraste de posturas autorales',
    ],
    recommendedGoal: 'Consolidar 84% de acierto con promedio <= 2,25 min por ítem.',
  },
  {
    id: 4,
    name: 'Fase 4: Simulacros Integrales y Cierre',
    subtitle: 'Ritmo oficial de 80 preguntas (3 horas) y depuración de errores',
    weeksRange: [25, 32],
    defaultStartDate: '2027-05-02',
    defaultEndDate: '2027-06-30',
    description:
      'Entrenamiento de resistencia mental y calibración de velocidad bajo condiciones reales (80 preguntas en 180 minutos). Cierre de brechas del Cuaderno de Errores para asegurar puntaje competitivo en carreras de alta demanda como Medicina (>88/100).',
    focusTopics: [
      'Simulacros completos de 80 ítems (40 Lectura + 40 Lógica)',
      'Gestión táctica del tiempo (bloques de 20 preguntas / 45 min)',
      'Descarte rápido de distractores en lectura filosófica/científica',
      'Atajos geométricos y estimación numérica rápida',
      'Erradicación de errores tipo (C), (I), (P) y (T)',
      'Simulación de hoja de respuestas y control de fatiga cognitiva',
    ],
    recommendedGoal: 'Estabilizar puntaje entre 86% y 92% para corte de Medicina Medellín.',
  },
];

interface WeeklyCurriculumBlueprint {
  week: number;
  phase: 1 | 2 | 3 | 4;
  weekTitle: string;
  monLectura: { topic: string; subtopic: string };
  tueLogicaCuant: { topic: string; subtopic: string };
  wedLecturaCrit: { topic: string; subtopic: string };
  thuLogicaEsp: { topic: string; subtopic: string };
  friLogicaProp: { topic: string; subtopic: string };
  satRepaso: { topic: string; subtopic: string };
  sunSimulacro: { topic: string; subtopic: string };
}

export const WEEKLY_CURRICULUM: WeeklyCurriculumBlueprint[] = [
  // ==================== FASE 1 (Semanas 1 - 8) ====================
  {
    week: 1,
    phase: 1,
    weekTitle: 'Diagnóstico Basal y Fundamentos de Lectura y Aritmética',
    monLectura: {
      topic: 'Estrategias de lectura activa y niveles de comprensión',
      subtopic: 'Lectura literal, inferencial y crítica en textos expositivos UdeA',
    },
    tueLogicaCuant: {
      topic: 'Aritmética básica y propiedades de los números enteros',
      subtopic: 'Divisibilidad, MCM, MCD y residuos en problemas cotidianos',
    },
    wedLecturaCrit: {
      topic: 'Semántica contextual: polisemia y sentido figurado',
      subtopic: 'Determinación del significado de términos según el cotexto',
    },
    thuLogicaEsp: {
      topic: 'Patrones numéricos iniciales y arreglos en cuadrículas',
      subtopic: 'Reconocimiento de regularidades aditivas y multiplicativas',
    },
    friLogicaProp: {
      topic: 'Lectura e interpretación elemental de tablas de frecuencias',
      subtopic: 'Extracción de totales, diferencias y razones directas en tablas',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 1: Auditoría de Diagnóstico',
      subtopic: 'Clasificación de primeros fallos en códigos C, I, P y T',
    },
    sunSimulacro: {
      topic: 'Mini-Simulacro Diagnóstico Basal (26 preguntas - 60 min)',
      subtopic: '13 ítems Competencia Lectora + 13 ítems Razonamiento Lógico',
    },
  },
  {
    week: 2,
    phase: 1,
    weekTitle: 'Fracciones, Razones y Estructura del Párrafo',
    monLectura: {
      topic: 'Microestructura y macroestructura textual',
      subtopic: 'Identificación de idea central, tesis y argumentos secundarios',
    },
    tueLogicaCuant: {
      topic: 'Fracciones y números racionales en contexto',
      subtopic: 'Fracciones de una cantidad, partes restantes y reducción a la unidad',
    },
    wedLecturaCrit: {
      topic: 'Mecanismos de cohesión: deixis, anáfora y catáfora',
      subtopic: 'Rastreo de referentes pronominales en párrafos densos',
    },
    thuLogicaEsp: {
      topic: 'Problemas de cortes, estacas, pastillas y campanadas',
      subtopic: 'Modelado discreto de intervalos cerrados y abiertos',
    },
    friLogicaProp: {
      topic: 'Conectores lógicos del discurso vs. conectivos formales',
      subtopic: 'Relaciones de causa-efecto, concesión y condición en enunciados',
    },
    satRepaso: {
      topic: 'Repaso Espaciado (Ciclo +7 días Sem. 1) + Refuerzo Fracciones',
      subtopic: 'Re-ejecución sin ayuda de ítems fallados en aritmética y anáforas',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 1-A (26 preguntas)',
      subtopic: 'Control de ritmo: 2,25 minutos por pregunta en fracciones y cohesión',
    },
  },
  {
    week: 3,
    phase: 1,
    weekTitle: 'Proporcionalidad, Regla de Tres y Tipología Textual I',
    monLectura: {
      topic: 'Tipología textual: el texto expositivo y divulgación científica',
      subtopic: 'Estructura explicativa, definiciones, ejemplificación y causa',
    },
    tueLogicaCuant: {
      topic: 'Razones y proporcionalidad directa e inversa',
      subtopic: 'Repartos proporcionales y constantes de proporcionalidad',
    },
    wedLecturaCrit: {
      topic: 'Sinonimia y antonimia contextual en registros académicos',
      subtopic: 'Sustitución léxica sin alterar la intención comunicativa',
    },
    thuLogicaEsp: {
      topic: 'Engranajes, poleas y transmisión de movimiento',
      subtopic: 'Relación inversa entre número de dientes y vueltas dadas',
    },
    friLogicaProp: {
      topic: 'Gráficos de barras y pictogramas comparativos',
      subtopic: 'Cálculo de razones y variaciones entre categorías gráficas',
    },
    satRepaso: {
      topic: 'Repaso Espaciado (Ciclo 1-2 semanas) + Taller de Razones',
      subtopic: 'Revisión de errores de planteamiento (P) en proporcionalidad',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 1-B (26 preguntas)',
      subtopic: 'Evaluación de textos científicos y proporcionalidad compuesta',
    },
  },
  {
    week: 4,
    phase: 1,
    weekTitle: 'Porcentajes, Variaciones Sucesivas y Texto Argumentativo',
    monLectura: {
      topic: 'Tipología textual: el ensayo y la columna de opinión',
      subtopic: 'Tesis explícita/implícita, contraargumentos y conclusión',
    },
    tueLogicaCuant: {
      topic: 'Porcentajes, descuentos y aumentos sucesivos',
      subtopic: 'Fórmula de variación neta y cálculo sobre valores base cambiantes',
    },
    wedLecturaCrit: {
      topic: 'Etimologías grecolatinas frecuentes en ciencias y medicina',
      subtopic: 'Prefijos, sufijos y raíces cultas para deducir vocabulario técnico',
    },
    thuLogicaEsp: {
      topic: 'Mezclas, aleaciones y concentraciones porcentuales',
      subtopic: 'Balance de cantidades al agregar o evaporar solvente',
    },
    friLogicaProp: {
      topic: 'Diagramas circulares (sectores) y conversión ángulo-porcentaje',
      subtopic: 'Relación 360° = 100% en distribución presupuestal o demográfica',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Mensual (Ciclo 1-2-4 semanas)',
      subtopic: 'Verificación de dominio de errores acumulados del primer mes',
    },
    sunSimulacro: {
      topic: 'Simulacro Mensual Fin de Mes 1 (40 preguntas - 90 min)',
      subtopic: '20 Lectura + 20 Lógica bajo estándar estricto UdeA',
    },
  },
  {
    week: 5,
    phase: 1,
    weekTitle: 'Traducción Verbal a Ecuaciones y Narrativa Literaria',
    monLectura: {
      topic: 'Tipología textual: cuento, microrrelato y crónica literaria',
      subtopic: 'Voz narrativa, tiempo diegético, ironía y simbolismo',
    },
    tueLogicaCuant: {
      topic: 'Lenguaje algebraico y ecuaciones lineales de primer grado',
      subtopic: 'Traducción de enunciados verbales con excesos, déficits y múltiplos',
    },
    wedLecturaCrit: {
      topic: 'Elementos discursivos: conectores adversativos y concesivos',
      subtopic: 'Cómo cambia la orientación argumentativa con "aunque", "no obstante"',
    },
    thuLogicaEsp: {
      topic: 'Problemas clásicos de edades (pasado, presente y futuro)',
      subtopic: 'Invarianza de la diferencia de edades en cuadros temporales',
    },
    friLogicaProp: {
      topic: 'Verdades y mentiras: análisis por contradicción y suposición',
      subtopic: 'Identificación de culpables o veraces entre sospechosos',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 5 + Clínica de Planteo de Ecuaciones',
      subtopic: 'Corrección de errores frecuentes al asignar la incógnita principal',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 1-C (26 preguntas)',
      subtopic: 'Énfasis en narrativa literaria y planteamiento algebraico',
    },
  },
  {
    week: 6,
    phase: 1,
    weekTitle: 'Sistemas de Ecuaciones, Móviles y Textos Filosóficos',
    monLectura: {
      topic: 'Comprensión de textos filosóficos y epistemológicos',
      subtopic: 'Abstracción conceptual, premisas filosóficas y paradojas',
    },
    tueLogicaCuant: {
      topic: 'Sistemas de ecuaciones 2x2 y métodos de sustitución/reducción',
      subtopic: 'Resolución rápida sin despejes largos mediante sumas estratégicas',
    },
    wedLecturaCrit: {
      topic: 'Signos de puntuación con valor semántico y sintáctico',
      subtopic: 'Uso de comillas irónicas, guiones parentéticos, dos puntos y punto y coma',
    },
    thuLogicaEsp: {
      topic: 'Cinemática intuitiva: tiempos de encuentro y alcance',
      subtopic: 'Relación d = v · t con velocidades constantes y salidas diferidas',
    },
    friLogicaProp: {
      topic: 'Gráficas de posición vs. tiempo y velocidad vs. tiempo',
      subtopic: 'Interpretación de pendientes como tasas de cambio',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 6 + Refuerzo Textos Densos',
      subtopic: 'Revisión de inferencias forzadas (I) en fragmentos filosóficos',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 1-D (26 preguntas)',
      subtopic: 'Entrenamiento mixto con énfasis en rapidez algebraica',
    },
  },
  {
    week: 7,
    phase: 1,
    weekTitle: 'Promedios, Trabajo Conjunto y Polifonía Textual',
    monLectura: {
      topic: 'Polifonía, citas directas/indirectas e intertextualidad',
      subtopic: 'Distinción entre la postura del autor y las voces citadas',
    },
    tueLogicaCuant: {
      topic: 'Promedio aritmético y promedio ponderado',
      subtopic: 'Efecto de añadir o retirar datos sobre la media de un grupo',
    },
    wedLecturaCrit: {
      topic: 'Intención comunicativa y tono del discurso',
      subtopic: 'Reconocimiento de tonos sarcástico, apologético, escéptico y neutro',
    },
    thuLogicaEsp: {
      topic: 'Problemas de grifos, desagües y trabajo cooperativo',
      subtopic: 'Suma de tasas de rendimiento por unidad de tiempo (1/t1 + 1/t2)',
    },
    friLogicaProp: {
      topic: 'Ordenamiento lineal y circular de información',
      subtopic: 'Ubicación en filas, edificios y mesas circulares simétricas',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 7 + Descarte de Distractores',
      subtopic: 'Auditoría de preguntas falladas por descuido o lectura rápida (T)',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 1-E (26 preguntas)',
      subtopic: 'Práctica de precisión en tasas de trabajo y polifonía',
    },
  },
  {
    week: 8,
    phase: 1,
    weekTitle: 'Consolidación e Integración de la Fase 1',
    monLectura: {
      topic: 'Síntesis integral de tipologías textuales y macroestructuras',
      subtopic: 'Títulos pertinentes, resúmenes fieles y esquemas de contenido',
    },
    tueLogicaCuant: {
      topic: 'Taller integrador: Aritmética, Porcentajes y Ecuaciones',
      subtopic: 'Problemas multietapa que combinan fracciones y variaciones porcentuales',
    },
    wedLecturaCrit: {
      topic: 'Semántica avanzada: campos semánticos y precisión léxica',
      subtopic: 'Diferenciación de matices entre cuasi-sinónimos académicos',
    },
    thuLogicaEsp: {
      topic: 'Principio del palomar (Dirichlet): certezas, mínimos y máximos',
      subtopic: 'El peor de los casos para garantizar una extracción específica',
    },
    friLogicaProp: {
      topic: 'Tablas de doble entrada y asociación de atributos',
      subtopic: 'Cruce de categorías excluyentes para deducir asignaciones',
    },
    satRepaso: {
      topic: 'Gran Repaso Espaciado de Cierre Fase 1 (Ciclos 1-2-4 sem)',
      subtopic: 'Depuración total de errores de base antes de pasar a Fase 2',
    },
    sunSimulacro: {
      topic: 'Simulacro Integral Cierre Fase 1 (40 preguntas - 90 min)',
      subtopic: 'Evaluación diagnóstica de progreso tras 8 semanas de estudio',
    },
  },

  // ==================== FASE 2 (Semanas 9 - 16) ====================
  {
    week: 9,
    phase: 2,
    weekTitle: 'Relaciones Analógicas y Teoría de Conjuntos',
    monLectura: {
      topic: 'Relaciones analógicas I: horizontales, verticales y de grado',
      subtopic: 'Estructura par base — par análogo en el examen UdeA',
    },
    tueLogicaCuant: {
      topic: 'Teoría de conjuntos: unión, intersección, diferencia y complemento',
      subtopic: 'Resolución con diagramas de Venn para 2 y 3 conjuntos',
    },
    wedLecturaCrit: {
      topic: 'Analogías implícitas y metáforas epistemológicas en textos',
      subtopic: 'Traducción de comparaciones complejas entre dominios distintos',
    },
    thuLogicaEsp: {
      topic: 'Secuencias numéricas y alfanuméricas de primer y segundo orden',
      subtopic: 'Diferencias sucesivas, razones alternadas y leyes de formación',
    },
    friLogicaProp: {
      topic: 'Conjuntos disjuntos y tablas de contingencia (Carroll)',
      subtopic: 'Organización de poblaciones con variables dicotómicas',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 9 + Taller de Diagramas de Venn',
      subtopic: 'Corrección del error común de no restar la intersección central',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 2-A (26 preguntas)',
      subtopic: 'Enfoque en analogías verbales y teoría de conjuntos',
    },
  },
  {
    week: 10,
    phase: 2,
    weekTitle: 'Inferencia Lectora Profunda y Sucesiones / Sumatorias',
    monLectura: {
      topic: 'Lectura inferencial: deducción, inducción y abducción textual',
      subtopic: 'Cómo distinguir una inferencia válida de una extrapolación sin base',
    },
    tueLogicaCuant: {
      topic: 'Progresiones aritméticas y geométricas aplicadas',
      subtopic: 'Término n-ésimo, suma de Gauss y crecimiento exponencial discreto',
    },
    wedLecturaCrit: {
      topic: 'Presuposiciones, sobreentendidos e implícitos pragmáticos',
      subtopic: 'Lo que el texto da por sentado sin enunciarlo literalmente',
    },
    thuLogicaEsp: {
      topic: 'Arreglos triangulares, piramidales y números figurados',
      subtopic: 'Conteo de esferas, palillos y bloques por capas',
    },
    friLogicaProp: {
      topic: 'Razonamiento inductivo: de casos particulares a la regla general',
      subtopic: 'Simplificación de operaciones gigantes mediante casos pequeños',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 10 + Control de Inferencia Forzada (I)',
      subtopic: 'Análisis forense de opciones trampa que suenan plausibles pero falsas',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 2-B (26 preguntas)',
      subtopic: 'Evaluación de lectura inferencial y sucesiones',
    },
  },
  {
    week: 11,
    phase: 2,
    weekTitle: 'Operaciones No Convencionales y Lectura Crítica I',
    monLectura: {
      topic: 'Lectura crítica: evaluación de la validez de argumentos',
      subtopic: 'Detección de falacias de autoridad, generalización apresurada y falsa causa',
    },
    tueLogicaCuant: {
      topic: 'Operaciones no convencionales (operadores arbitrarios simples)',
      subtopic: 'Sustitución algebraica en definiciones con *, #, Δ y tablas de operadores',
    },
    wedLecturaCrit: {
      topic: 'Relaciones analógicas II: causa-efecto, cogeneridad y función',
      subtopic: 'Criterios de refinamiento semántico cuando dos opciones parecen válidas',
    },
    thuLogicaEsp: {
      topic: 'Operadores arbitrarios condicionales y recursivos',
      subtopic: 'Definiciones por tramos y evaluación anidada de operadores',
    },
    friLogicaProp: {
      topic: 'Propiedades de clausura, conmutatividad y elemento neutro en tablas',
      subtopic: 'Lectura rápida de matrices de operaciones finitas',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 11 + Práctica de Operadores',
      subtopic: 'Repaso de errores de signos y jerarquía en operadores arbitrarios',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 2-C (26 preguntas)',
      subtopic: 'Medición de agilidad en operadores no convencionales y falacias',
    },
  },
  {
    week: 12,
    phase: 2,
    weekTitle: 'Técnicas de Conteo: Principio Aditivo y Multiplicativo',
    monLectura: {
      topic: 'Textos comparativos y diálogo entre dos lecturas (Texto A y Texto B)',
      subtopic: 'Puntos de convergencia, divergencia y complementariedad entre autores',
    },
    tueLogicaCuant: {
      topic: 'Principio aditivo y multiplicativo del conteo',
      subtopic: 'Rutas en mallas, códigos, placas y elecciones secuenciales con restricciones',
    },
    wedLecturaCrit: {
      topic: 'Etimologías avanzadas y tecnicismos humanísticos/biomédicos',
      subtopic: 'Morfemas griegos y latinos recurrentes en lecturas de salud pública',
    },
    thuLogicaEsp: {
      topic: 'Conteo de rutas en redes y diagramas de árbol',
      subtopic: 'Método de Pascal en esquinas para caminos sin retroceso',
    },
    friLogicaProp: {
      topic: 'Principio de inclusión-exclusión en conteo y conjuntos',
      subtopic: 'Evitar el doble conteo en eventos que se solapan',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Mensual (Fin Mes 3) + Clínica de Conteo',
      subtopic: 'Distinción clara entre cuándo sumar ("o") y cuándo multiplicar ("y")',
    },
    sunSimulacro: {
      topic: 'Simulacro Mensual Mitad de Fase 2 (40 preguntas - 90 min)',
      subtopic: 'Lectura comparada A/B + Conteo, Conjuntos y Operadores',
    },
  },
  {
    week: 13,
    phase: 2,
    weekTitle: 'Permutaciones, Combinaciones y Crítica Ideológica',
    monLectura: {
      topic: 'Lectura crítica: supuestos ideológicos y contexto sociocultural',
      subtopic: 'Posicionamiento del autor frente a debates éticos y científicos',
    },
    tueLogicaCuant: {
      topic: 'Permutaciones vs. Combinaciones: ¿importa o no el orden?',
      subtopic: 'Formación de comités, podios, anagramas y permutaciones circulares',
    },
    wedLecturaCrit: {
      topic: 'Paráfrasis y reformulación sintáctica equivalente',
      subtopic: 'Identificación de la opción que conserva exactamente el juicio original',
    },
    thuLogicaEsp: {
      topic: 'Conteo de figuras geométricas (segmentos, triángulos, cuadriláteros)',
      subtopic: 'Fórmulas n(n+1)/2 y conteo sistemático por regiones simples/compuestas',
    },
    friLogicaProp: {
      topic: 'Análisis combinatorio con condiciones de adyacencia ("siempre juntos")',
      subtopic: 'Técnica de empaquetamiento de elementos y resta del complemento',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 13 + Árbol de Decisión en Combinatoria',
      subtopic: 'Mapa mental para elegir fórmula o razonamiento directo en 15 segundos',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 2-D (26 preguntas)',
      subtopic: 'Práctica intensiva de combinatoria y paráfrasis crítica',
    },
  },
  {
    week: 14,
    phase: 2,
    weekTitle: 'Probabilidad Clásica, Compuesta y Textos Poéticos/Ensayísticos',
    monLectura: {
      topic: 'Interpretación de textos poéticos, aforismos y prosa lírica',
      subtopic: 'Figuras retóricas (metáfora, metonimia, oxímoron, hipérbole) en la UdeA',
    },
    tueLogicaCuant: {
      topic: 'Probabilidad clásica (Regla de Laplace) y probabilidad del complemento',
      subtopic: 'Espacios muestrales con dados, monedas, urnas y cartas',
    },
    wedLecturaCrit: {
      topic: 'Coherencia global y progresión temática',
      subtopic: 'Detección de oraciones impertinentes o rupturas de hilo conductor',
    },
    thuLogicaEsp: {
      topic: 'Probabilidad de eventos independientes y extracciones sin reposición',
      subtopic: 'Árboles de probabilidad y actualización del denominador',
    },
    friLogicaProp: {
      topic: 'Probabilidad condicional leída desde tablas de contingencia',
      subtopic: 'Reducción del universo muestral ante la cláusula "dado que..."',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 14 + Refuerzo Probabilidad',
      subtopic: 'Revisión de fallos conceptuales (C) en extracciones sucesivas',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 2-E (26 preguntas)',
      subtopic: 'Evaluación de figuras literarias y probabilidad aplicada',
    },
  },
  {
    week: 15,
    phase: 2,
    weekTitle: 'Criptoaritmética, Ciclicidad y Argumentación Científica',
    monLectura: {
      topic: 'Estructura del artículo de divulgación médica y biológica',
      subtopic: 'Hipótesis, diseño experimental, resultados e implicaciones clínicas',
    },
    tueLogicaCuant: {
      topic: 'Criptoaritmética y reconstrucción de operaciones ocultas',
      subtopic: 'Deducción de cifras por paridad, llevadas (acarreos) y unidades',
    },
    wedLecturaCrit: {
      topic: 'Debilitamiento y fortalecimiento de una hipótesis textual',
      subtopic: 'Qué nuevo dato refutaría o respaldaría la conclusión del autor',
    },
    thuLogicaEsp: {
      topic: 'Ciclicidad de cifras terminales, residuos periódicos y calendarios',
      subtopic: 'Aritmética modular intuitiva para hallar el día de la semana o última cifra',
    },
    friLogicaProp: {
      topic: 'Juegos lógicos, pesadas con balanza de dos brazos y trasvases',
      subtopic: 'Optimización del número mínimo de pesadas o movimientos',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 15 + Estrategias de Descarte Rápido',
      subtopic: 'Revisión de preguntas de alta dificultad de las semanas 9 a 15',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 2-F (26 preguntas)',
      subtopic: 'Entrenamiento con textos biomédicos y acertijos deductivos',
    },
  },
  {
    week: 16,
    phase: 2,
    weekTitle: 'Consolidación e Integración de la Fase 2',
    monLectura: {
      topic: 'Taller integrador de Lectura Crítica, Analogías e Inferencias',
      subtopic: 'Resolución comentada de pasajes de alta densidad conceptual',
    },
    tueLogicaCuant: {
      topic: 'Taller integrador: Conjuntos, Conteo, Probabilidad y Operadores',
      subtopic: 'Problemas híbridos de combinatoria con probabilidades y sucesiones',
    },
    wedLecturaCrit: {
      topic: 'Calibración semántica y conectores lógicos de alta complejidad',
      subtopic: 'Repaso de locuciones conjuntivas poco frecuentes en español académico',
    },
    thuLogicaEsp: {
      topic: 'Miscelánea de secuencias, criptoaritmética y certezas',
      subtopic: 'Velocidad de reconocimiento del patrón en los primeros 30 segundos',
    },
    friLogicaProp: {
      topic: 'Interpretación combinada de tablas probabilísticas y conjuntos',
      subtopic: 'Traducción ágil entre lenguaje verbal, simbólico y tabular',
    },
    satRepaso: {
      topic: 'Gran Repaso Espaciado de Cierre Fase 2 (Ciclos 1-2-4 sem)',
      subtopic: 'Limpieza de pendientes del Cuaderno de Errores de mitad de camino',
    },
    sunSimulacro: {
      topic: 'Simulacro Integral Cierre Fase 2 (60 preguntas - 135 min)',
      subtopic: '30 Lectura + 30 Lógica midiendo resistencia de 2 horas y cuarto',
    },
  },

  // ==================== FASE 3 (Semanas 17 - 24) ====================
  {
    week: 17,
    phase: 3,
    weekTitle: 'Geometría Plana I: Perímetros, Triángulos y Teorema de Pitágoras',
    monLectura: {
      topic: 'Textos históricos y sociológicos sobre América Latina y Colombia',
      subtopic: 'Análisis de procesos sociales, causalidad histórica y memoria',
    },
    tueLogicaCuant: {
      topic: 'Geometría plana: ángulos, triángulos notables y Teorema de Pitágoras',
      subtopic: 'Triángulos 30°-60°-90°, 45°-45°-90° y ternas pitagóricas (3-4-5, 5-12-13)',
    },
    wedLecturaCrit: {
      topic: 'Valoración de títulos, epígrafes y conclusiones abiertas',
      subtopic: 'Síntesis simbólica vs. síntesis literal del texto',
    },
    thuLogicaEsp: {
      topic: 'Cálculo de perímetros de regiones compuestas y escalonadas',
      subtopic: 'Proyección de segmentos escalonados y arcos de circunferencia',
    },
    friLogicaProp: {
      topic: 'Lógica proposicional I: proposiciones, conjunción, disyunción y condicional',
      subtopic: 'Condición suficiente vs. condición necesaria ("si p entonces q")',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 17 + Formulario Esencial de Geometría',
      subtopic: 'Consolidación de propiedades de triángulos isósceles y equiláteros',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 3-A (26 preguntas)',
      subtopic: 'Introducción a geometría UdeA y condicionales lógicos',
    },
  },
  {
    week: 18,
    phase: 3,
    weekTitle: 'Geometría Plana II: Áreas Sombreadas por Traslación y Resta',
    monLectura: {
      topic: 'Ensayo humanístico y crítica de la cultura contemporánea',
      subtopic: 'Identificación de ironías sutiles y críticas a la modernidad',
    },
    tueLogicaCuant: {
      topic: 'Áreas de polígonos, círculos, sectores y coronas circulares',
      subtopic: 'Estrategia de resta de áreas (Área Total − Área Blanca)',
    },
    wedLecturaCrit: {
      topic: 'Relaciones semánticas de inclusión: hiperonimia, hiponimia y cohiponimia',
      subtopic: 'Jerarquías conceptuales y definiciones por género próximo',
    },
    thuLogicaEsp: {
      topic: 'Áreas sombreadas por traslación de regiones y simetría',
      subtopic: 'División en cuadrículas congruentes y medianas de triángulos',
    },
    friLogicaProp: {
      topic: 'Lógica proposicional II: contrarrecíproco y Leyes de De Morgan',
      subtopic: 'Equivalencia entre (p → q) y (~q → ~p) en enunciados verbales',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 18 + Galería de Áreas Sombreadas',
      subtopic: 'Práctica visual sin cálculos largos mediante reacomodación de piezas',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 3-B (26 preguntas)',
      subtopic: 'Enfoque en áreas sombreadas y equivalencias lógicas',
    },
  },
  {
    week: 19,
    phase: 3,
    weekTitle: 'Semejanza, Escalas y Cuantificadores Lógicos',
    monLectura: {
      topic: 'Textos discontinuos y mixtos: infografías, mapas y esquemas',
      subtopic: 'Integración de código verbal e icónico en preguntas de lectura',
    },
    tueLogicaCuant: {
      topic: 'Semejanza de triángulos (Tales) y relación entre razón lineal y de área',
      subtopic: 'Si el lado se duplica (k=2), el área se cuadruplica (k²=4)',
    },
    wedLecturaCrit: {
      topic: 'Análisis de falacias formales: afirmación del consecuente y negación del antecedente',
      subtopic: 'Cruce directo entre Competencia Lectora y Lógica Proposicional',
    },
    thuLogicaEsp: {
      topic: 'Plegado de papel, simetría axial y cortes con tijera (punzonado)',
      subtopic: 'Visualización del patrón desplegado tras múltiples dobleces',
    },
    friLogicaProp: {
      topic: 'Cuantificadores universales y existenciales ("Todos", "Algún", "Ningún")',
      subtopic: 'Negación correcta de cuantificadores ("No todos son..." = "Alguno no es...")',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 19 + Cuadro de Oposición de Aristóteles',
      subtopic: 'Revisión de errores frecuentes al negar proposiciones universales',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 3-C (26 preguntas)',
      subtopic: 'Práctica de cuantificadores, semejanza y textos discontinuos',
    },
  },
  {
    week: 20,
    phase: 3,
    weekTitle: 'Geometría del Espacio: Volúmenes, Cubos y Vistas Ortogonales',
    monLectura: {
      topic: 'Lectura de textos sobre bioética, salud pública y medio ambiente',
      subtopic: 'Tensiones entre desarrollo técnico, ética médica y sostenibilidad',
    },
    tueLogicaCuant: {
      topic: 'Geometría espacial: prismas, cilindros, pirámides, conos y esferas',
      subtopic: 'Variación de volumen por escalamiento (k³) y trasvase de líquidos',
    },
    wedLecturaCrit: {
      topic: 'Cohesión léxica: elipsis, sustitución hiperonímica y nominalización',
      subtopic: 'Recuperación de sujetos tácitos o elididos en párrafos extensos',
    },
    thuLogicaEsp: {
      topic: 'Razonamiento espacial: vistas ortogonales (frontal, superior, lateral)',
      subtopic: 'Reconstrucción de sólidos isométricos y conteo de cubos ocultos',
    },
    friLogicaProp: {
      topic: 'Silogismos categóricos e inferencias con diagramas de conjuntos',
      subtopic: 'Validación de conclusiones a partir de premisas con "todos" y "algunos"',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Mensual (Fin Mes 5) + Laboratorio Espacial',
      subtopic: 'Revisión de errores de perspectiva y cubos pintados por caras',
    },
    sunSimulacro: {
      topic: 'Simulacro Mensual Mitad de Fase 3 (60 preguntas - 135 min)',
      subtopic: 'Evaluación profunda de geometría plana/espacial y lógica formal',
    },
  },
  {
    week: 21,
    phase: 3,
    weekTitle: 'Despliegue de Sólidos, Cubos Pintados y Series Gráficas',
    monLectura: {
      topic: 'Textos lingüísticos y metalingüísticos (reflexión sobre el lenguaje)',
      subtopic: 'Funciones del lenguaje (Jakobson), actos de habla y pragmática',
    },
    tueLogicaCuant: {
      topic: 'Problema clásico del cubo pintado y cortado en n×n×n cubitos',
      subtopic: 'Conteo de cubitos con 3, 2, 1 y 0 caras pintadas (vértices, aristas, centros)',
    },
    wedLecturaCrit: {
      topic: 'Analogías complejas de tercer nivel y relaciones arquetípicas',
      subtopic: 'Entrenamiento de velocidad: resolución de analogías en < 45 segundos',
    },
    thuLogicaEsp: {
      topic: 'Despliegue y armado de cubos / dados (caras opuestas y adyacentes)',
      subtopic: 'Orientación de figuras en las caras al plegar la plantilla plana',
    },
    friLogicaProp: {
      topic: 'Series gráficas y matrices de figuras 3×3 (estilo Raven / UdeA)',
      subtopic: 'Rotación horaria/antihoraria, superposición, XOR visual y progresión',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 21 + Trucos de Caras Opuestas en Dados',
      subtopic: 'Regla del salto en Z y en L para descartar opciones imposibles',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 3-D (26 preguntas)',
      subtopic: 'Énfasis en series gráficas, armado de cubos y pragmática',
    },
  },
  {
    week: 22,
    phase: 3,
    weekTitle: 'Análisis Avanzado de Gráficas Estadísticas y Tablas Complejas',
    monLectura: {
      topic: 'Textos económicos y de políticas públicas en contexto académico',
      subtopic: 'Comprensión de indicadores, tesis socioeconómicas y paradojas',
    },
    tueLogicaCuant: {
      topic: 'Estadística descriptiva en gráficas: media, mediana, moda y rango',
      subtopic: 'Cálculo de mediana y media ponderada desde histogramas agrupados',
    },
    wedLecturaCrit: {
      topic: 'Evaluación de contraargumentos y concesiones retóricas',
      subtopic: 'Por qué el autor menciona una postura contraria antes de refutarla',
    },
    thuLogicaEsp: {
      topic: 'Rutas en redes tridimensionales (hormiga sobre las caras de un cubo/cilindro)',
      subtopic: 'Aplanamiento de superficies para aplicar Pitágoras en el camino mínimo',
    },
    friLogicaProp: {
      topic: 'Gráficas de doble eje vertical, líneas de tendencia y tasas relativas',
      subtopic: 'Distinción crucial entre aumento en puntos porcentuales vs. variación porcentual',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 22 + Trampas Visuales en Gráficas',
      subtopic: 'Escalas truncadas, unidades en miles/millones y porcentajes de porcentajes',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 3-E (26 preguntas)',
      subtopic: 'Práctica de precisión en lectura de gráficas multivariables',
    },
  },
  {
    week: 23,
    phase: 3,
    weekTitle: 'Deducción Lógica Multivariable y Textos Literarios Complejos',
    monLectura: {
      topic: 'Literatura hispanoamericana: realismo mágico, parodia y metaficción',
      subtopic: 'Lectura de fragmentos estilo Borges, Cortázar, Rulfo y García Márquez',
    },
    tueLogicaCuant: {
      topic: 'Geometría analítica intuitiva y coordenadas en cuadrículas',
      subtopic: 'Distancias, puntos medios y áreas de polígonos sobre mallas',
    },
    wedLecturaCrit: {
      topic: 'Inferencia léxica y fraseología: locuciones, modismos y latinismos',
      subtopic: 'Significado de expresiones como "ad hoc", "statu quo", "a priori", "sine qua non"',
    },
    thuLogicaEsp: {
      topic: 'Rotación de figuras en el plano y área barrida por segmentos',
      subtopic: 'Ruedas que giran sobre pistas y longitud recorrida por el centro',
    },
    friLogicaProp: {
      topic: 'Rompecabezas deductivos de condicionales encadenados (Silogismo Hipotético)',
      subtopic: 'Extracción de conclusiones necesarias a partir de 4 o 5 reglas condicionales',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 23 + Auditoría de Tiempo por Ítem',
      subtopic: 'Identificación de temas que consumen > 3 minutos para aplicar atajos',
    },
    sunSimulacro: {
      topic: 'Simulacro Cronometrado Bloque Fase 3-F (26 preguntas)',
      subtopic: 'Entrenamiento mixto de alta exigencia deductiva y literaria',
    },
  },
  {
    week: 24,
    phase: 3,
    weekTitle: 'Consolidación e Integración de la Fase 3',
    monLectura: {
      topic: 'Taller integrador de Competencia Lectora: todos los géneros',
      subtopic: 'Transición rápida de registro entre texto poético, científico y filosófico',
    },
    tueLogicaCuant: {
      topic: 'Taller integrador de Geometría Plana, Sombreadas y Volúmenes',
      subtopic: 'Batería de 20 problemas geométricos clásicos de admisión UdeA',
    },
    wedLecturaCrit: {
      topic: 'Taller integrador de Lectura Crítica, Supuestos y Polifonía',
      subtopic: 'Práctica de descarte binario cuando quedan 2 opciones finalistas',
    },
    thuLogicaEsp: {
      topic: 'Taller integrador de Razonamiento Espacial y Series Gráficas',
      subtopic: 'Cubos, vistas, plegados y matrices bajo límite de 90 segundos por ítem',
    },
    friLogicaProp: {
      topic: 'Taller integrador de Lógica Proposicional y Gráficas Estadísticas',
      subtopic: 'Negaciones de cuantificadores, contrarrecíprocos y tablas complejas',
    },
    satRepaso: {
      topic: 'Gran Repaso Espaciado de Cierre Fase 3 (Ciclos 1-2-4 sem)',
      subtopic: 'Verificación de maestría en el 100% del temario antes de la Fase 4',
    },
    sunSimulacro: {
      topic: 'Primer Simulacro Oficial Completo (80 preguntas - 180 min)',
      subtopic: '40 Competencia Lectora + 40 Razonamiento Lógico en condiciones reales',
    },
  },

  // ==================== FASE 4 (Semanas 25 - 32) ====================
  {
    week: 25,
    phase: 4,
    weekTitle: 'Ritmo de Examen I: Bloques Mixtos y Gestión del Tiempo',
    monLectura: {
      topic: 'Batería Mixta Lectura #1: Textos largos con 5 a 7 preguntas asociadas',
      subtopic: 'Técnica de prelectura de enunciados antes de abordar pasajes extensos',
    },
    tueLogicaCuant: {
      topic: 'Batería Mixta Lógica #1: Aritmética, Porcentajes, Proporciones y Álgebra',
      subtopic: 'Resolución por sustitución inversa de opciones (backsolving)',
    },
    wedLecturaCrit: {
      topic: 'Batería Mixta Lectura #2: Analogías, Etimologías y Conectores',
      subtopic: 'Ganar tiempo en preguntas cortas (< 1 min) para ahorrar para textos densos',
    },
    thuLogicaEsp: {
      topic: 'Batería Mixta Lógica #2: Geometría, Áreas Sombreadas y Espacial',
      subtopic: 'Estimación visual de áreas y descarte por cotas superiores/inferiores',
    },
    friLogicaProp: {
      topic: 'Batería Mixta Lógica #3: Conteo, Probabilidad, Conjuntos y Gráficas',
      subtopic: 'Precisión en lectura de enunciados con palabras clave ("al menos", "a lo sumo")',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 25: Análisis Forense del Simulacro #1',
      subtopic: 'Reconstrucción detallada de cada error cometido en el primer simulacro de 80 ítems',
    },
    sunSimulacro: {
      topic: 'Simulacro Oficial Completo #2 (80 preguntas - 180 min)',
      subtopic: 'Estrategia de 2 pasadas: primera vuelta segura + segunda vuelta de ítems marcados',
    },
  },
  {
    week: 26,
    phase: 4,
    weekTitle: 'Alta Complejidad I: Lectura Filosófica y Problemas Multiconcepto',
    monLectura: {
      topic: 'Batería de Alta Dificultad: Epistemología, estética y teoría de la ciencia',
      subtopic: 'Mantenimiento de la concentración en lecturas abstractas sin ejemplos concretos',
    },
    tueLogicaCuant: {
      topic: 'Problemas híbridos: Geometría + Porcentajes y Sucesiones + Álgebra',
      subtopic: 'Descomposición modular de problemas que mezclan dos temas distintos',
    },
    wedLecturaCrit: {
      topic: 'Lectura comparada de alta exigencia (Texto A vs. Texto B)',
      subtopic: 'Matriz mental rápida de tesis, argumentos y tono de ambos textos',
    },
    thuLogicaEsp: {
      topic: 'Operadores no convencionales anidados y sumatorias telescópicas',
      subtopic: 'Identificación de cancelaciones simétricas e invariantes',
    },
    friLogicaProp: {
      topic: 'Lógica proposicional de nivel avanzado y paradojas autorreferenciales',
      subtopic: 'Caballeros y escuderos con condicionales y bicondicionales',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 26 + Clínica de Errores Tipo (I) y (P)',
      subtopic: 'Eliminación de sobreinterpretaciones en lectura y errores de planteo en lógica',
    },
    sunSimulacro: {
      topic: 'Simulacro Oficial Completo #3 (80 preguntas - 180 min)',
      subtopic: 'Objetivo: superar el umbral de 85/100 con gestión limpia del reloj',
    },
  },
  {
    week: 27,
    phase: 4,
    weekTitle: 'Velocidad y Agilidad Mental: Atajos Cuantitativos y Sintácticos',
    monLectura: {
      topic: 'Rastreo veloz de referentes, conectores y función de párrafos',
      subtopic: 'Localización quirúrgica en el texto sin releer todo el documento',
    },
    tueLogicaCuant: {
      topic: 'Cálculo mental rápido: fracciones equivalentes, cuadrados y estimación',
      subtopic: 'Uso de cifras terminales y orden de magnitud para descartar 3 opciones',
    },
    wedLecturaCrit: {
      topic: 'Precisión en preguntas negativas ("EXCEPTO", "NO se infiere", "es FALSO")',
      subtopic: 'Subrayado mental de la negación para evitar marcar una afirmación verdadera',
    },
    thuLogicaEsp: {
      topic: 'Geometría rápida: relaciones de áreas en trapecios, hexágonos y círculos',
      subtopic: 'Propiedades de baricentro y división de polígonos regulares en triángulos',
    },
    friLogicaProp: {
      topic: 'Tablas y gráficas con tasas compuestas, índices y per cápita',
      subtopic: 'Diferenciación entre valor absoluto (total) y valor relativo (tasa o proporción)',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 27 + Simulacro de Errores Históricos',
      subtopic: 'Examen personalizado armado exclusivamente con preguntas antes falladas',
    },
    sunSimulacro: {
      topic: 'Simulacro Oficial Completo #4 (80 preguntas - 180 min)',
      subtopic: 'Monitoreo de fatiga en la tercera hora (preguntas 55 a 80)',
    },
  },
  {
    week: 28,
    phase: 4,
    weekTitle: 'Blindaje en Competencia Lectora para Corte de Medicina',
    monLectura: {
      topic: 'Inmersión en textos biomédicos, epidemiológicos y de historia de la medicina',
      subtopic: 'Familiarización con estructura argumentativa de ciencias de la salud',
    },
    tueLogicaCuant: {
      topic: 'Proporcionalidad en dosificaciones, diluciones y escalas científicas',
      subtopic: 'Conversión de unidades, notación y mezclas en problemas tipo UdeA',
    },
    wedLecturaCrit: {
      topic: 'Perfeccionamiento en analogías y vocabulario culto de alto nivel',
      subtopic: 'Meta de 100% de efectividad en los ítems léxicos y analógicos',
    },
    thuLogicaEsp: {
      topic: 'Secuencias gráficas abstractas y transformaciones topológicas',
      subtopic: 'Conteo de regiones, intersecciones y giros tridimensionales',
    },
    friLogicaProp: {
      topic: 'Inferencia crítica sobre estudios estadísticos y correlación vs. causalidad',
      subtopic: 'Interpretación rigurosa de alcances y límites de los datos presentados',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Mensual (Fin Mes 7) + Cierre de Ciclo +28 días',
      subtopic: 'Graduación de ítems "Superados" en el Cuaderno de Errores',
    },
    sunSimulacro: {
      topic: 'Simulacro Oficial Completo #5 (80 preguntas - 180 min)',
      subtopic: 'Objetivo Medicina: 36+/40 en Lectura y 35+/40 en Razonamiento Lógico',
    },
  },
  {
    week: 29,
    phase: 4,
    weekTitle: 'Blindaje en Razonamiento Lógico: Cero Errores en Ítems Básicos/Medios',
    monLectura: {
      topic: 'Práctica cronometrada de 20 preguntas de Lectura en 42 minutos',
      subtopic: 'Consolidación de ritmo fluido y lectura con propósito claro',
    },
    tueLogicaCuant: {
      topic: 'Blindaje en Aritmética, Conjuntos, Conteo y Probabilidad',
      subtopic: 'Asegurar el 100% de los puntos de dificultad básica e intermedia',
    },
    wedLecturaCrit: {
      topic: 'Duelo de opciones finalistas: análisis micro-semántico de distractores',
      subtopic: 'Por qué una sola palabra ("siempre", "únicamente", "nunca") invalida una opción',
    },
    thuLogicaEsp: {
      topic: 'Blindaje en Geometría, Áreas Sombreadas y Operadores',
      subtopic: 'Repaso de los 15 modelos arquetípicos más preguntados en la UdeA',
    },
    friLogicaProp: {
      topic: 'Blindaje en Lógica Proposicional, Ordenamientos y Verdades/Mentiras',
      subtopic: 'Verificación instantánea por contraejemplo o tabla de verdad abreviada',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 29 + Control de Errores por Descuido (T)',
      subtopic: 'Protocolo de doble verificación de la pregunta antes de marcar la hoja',
    },
    sunSimulacro: {
      topic: 'Simulacro Oficial Completo #6 (80 preguntas - 180 min)',
      subtopic: 'Prueba de consistencia estadística sobre el puntaje objetivo',
    },
  },
  {
    week: 30,
    phase: 4,
    weekTitle: 'Simulación de Escenarios Adversos y Control Emocional',
    monLectura: {
      topic: 'Resolución bajo presión: textos densos al final de la sesión',
      subtopic: 'Técnica de respiración y re-enfoque cuando un texto parece incomprensible',
    },
    tueLogicaCuant: {
      topic: 'Destrabe rápido: cuándo saltar una pregunta en el segundo 45 y volver después',
      subtopic: 'Disciplina táctica: todas las preguntas valen exactamente lo mismo',
    },
    wedLecturaCrit: {
      topic: 'Síntesis relámpago de argumentos y estructura retórica',
      subtopic: 'Mapeo de párrafos en 10 segundos (Introducción - Tesis - Objeción - Cierre)',
    },
    thuLogicaEsp: {
      topic: 'Batería relámpago de series, secuencias y visualización espacial',
      subtopic: 'Agudeza perceptiva sin sobrecarga de cálculo',
    },
    friLogicaProp: {
      topic: 'Batería relámpago de tablas, gráficas y deducción proposicional',
      subtopic: 'Lectura directa de ejes y encabezados antes de leer el contexto largo',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 30 + Revisión de Notas Personales',
      subtopic: 'Repaso de las bitácoras y aprendizajes clave registrados en 30 semanas',
    },
    sunSimulacro: {
      topic: 'Simulacro Oficial Completo #7 (80 preguntas - 180 min)',
      subtopic: 'Penúltimo simulacro integral a horario exacto de citación',
    },
  },
  {
    week: 31,
    phase: 4,
    weekTitle: 'Pulido Fino y Repaso General de Fórmulas y Conceptos Clave',
    monLectura: {
      topic: 'Repaso ejecutivo de conectores, figuras literarias y tipologías',
      subtopic: 'Ficha resumen de Competencia Lectora para consulta rápida',
    },
    tueLogicaCuant: {
      topic: 'Repaso ejecutivo de fórmulas: áreas, volúmenes, conteo y sucesiones',
      subtopic: 'Ficha resumen de Razonamiento Lógico sin saturación de memoria',
    },
    wedLecturaCrit: {
      topic: 'Práctica selectiva de lectura inferencial y analogías de cierre',
      subtopic: 'Mantenimiento del tono lector con precisión quirúrgica',
    },
    thuLogicaEsp: {
      topic: 'Práctica selectiva de razonamiento geométrico y espacial',
      subtopic: 'Ejercicios de confianza para mantener la mente ágil y descansada',
    },
    friLogicaProp: {
      topic: 'Práctica selectiva de lógica proposicional y análisis de datos',
      subtopic: 'Leyes de De Morgan, contrarrecíproco y cuantificadores al 100%',
    },
    satRepaso: {
      topic: 'Repaso Espaciado Semana 31: Cero Pendientes en Cuaderno de Errores',
      subtopic: 'Confirmación final de todos los ítems históricos marcados como Superados',
    },
    sunSimulacro: {
      topic: 'Simulacro Oficial Completo #8 — Cierre General (80 preguntas - 180 min)',
      subtopic: 'Último simulacro de 80 ítems a una semana del examen objetivo',
    },
  },
  {
    week: 32,
    phase: 4,
    weekTitle: 'Semana Pre-Examen: Activación Ligera, Logística y Confianza Plena',
    monLectura: {
      topic: 'Lectura ligera de activación: 10 preguntas comentadas sin estrés',
      subtopic: 'Mantener el hábito de lectura analítica con carga cognitiva reducida',
    },
    tueLogicaCuant: {
      topic: 'Activación lógica suave: 10 acertijos y problemas clásicos elegantes',
      subtopic: 'Repaso visual de estrategias de planteo e intuición numérica',
    },
    wedLecturaCrit: {
      topic: 'Revisión de los 10 principios de oro para descartar distractores UdeA',
      subtopic: 'Evitar extremos absolutos, inferencias no soportadas y trampas léxicas',
    },
    thuLogicaEsp: {
      topic: 'Paseo visual por geometría de traslación y propiedades esenciales',
      subtopic: 'Refuerzo positivo de patrones ya dominados durante las 32 semanas',
    },
    friLogicaProp: {
      topic: 'Protocolo del Día D: logística, tiempos parciales y documentos',
      subtopic: 'Planificación de los 180 minutos (45m / 90m / 135m / 180m) y descanso',
    },
    satRepaso: {
      topic: 'Descanso Cognitivo Activo y Preparación Mental',
      subtopic: 'Higiene del sueño, hidratación y visualización tranquila del examen',
    },
    sunSimulacro: {
      topic: 'Cierre del Plan y Meta Cumplida — ¡Listo para el Examen UdeA!',
      subtopic: 'Revisión final de indicadores globales y confianza en el proceso realizado',
    },
  },
];

const DAY_NAMES: Array<StudySession['dayName']> = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];

function addDaysToIso(baseIso: string, daysToAdd: number): string {
  const [y, m, d] = baseIso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + daysToAdd);
  return dt.toISOString().slice(0, 10);
}

const UTC_DAY_TO_SPANISH: Array<StudySession['dayName']> = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export function getRealDayNameFromIso(isoDate: string): StudySession['dayName'] {
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return UTC_DAY_TO_SPANISH[dt.getUTCDay()] || 'Lunes';
}

export function buildBreakdownForComponent(
  component: SessionComponent,
  dailyHours: number = 1
): StudySession['breakdown'] {
  const totalMinutes = Math.round(dailyHours * 60);
  if (component === 'Simulacro') {
    const theoryMin = Math.max(5, Math.round(totalMinutes * 0.08));
    const practiceMin = Math.round(totalMinutes * 0.75);
    const logMin = Math.max(5, totalMinutes - theoryMin - practiceMin);
    return {
      theoryMin,
      practiceMin,
      logMin,
      description: `${theoryMin} min alistamiento y estrategia + ${practiceMin} min prueba cronometrada (ritmo 2,25 min/preg) + ${logMin} min clasificación en Cuaderno de Errores`,
    };
  }
  if (component === 'Repaso Espaciado') {
    const theoryMin = Math.round(totalMinutes * 0.25);
    const practiceMin = Math.round(totalMinutes * 0.58);
    const logMin = totalMinutes - theoryMin - practiceMin;
    return {
      theoryMin,
      practiceMin,
      logMin,
      description: `${theoryMin} min revisión de bitácora y conceptos (C) + ${practiceMin} min re-ejecución sin ayuda de errores (ciclo 1-2-4 sem) + ${logMin} min actualización de estado`,
    };
  }
  const theoryMin = Math.round(totalMinutes * 0.25); // 15 min for 60m
  const practiceMin = Math.round(totalMinutes * 0.58); // 35 min for 60m
  const logMin = totalMinutes - theoryMin - practiceMin; // 10 min for 60m
  return {
    theoryMin,
    practiceMin,
    logMin,
    description: `${theoryMin} min teoría/esquema conceptual + ${practiceMin} min práctica cronometrada tipo UdeA + ${logMin} min bitácora y registro de errores`,
  };
}

export function generateInitialSessions(
  startDate: string = '2026-11-16',
  dailyHours: number = 1
): StudySession[] {
  const sessions: StudySession[] = [];
  let dayCounter = 0;

  for (const weekItem of WEEKLY_CURRICULUM) {
    const dailyConfigs: Array<{
      dayIndex: number;
      component: SessionComponent;
      topic: string;
      subtopic: string;
    }> = [
      {
        dayIndex: 0,
        component: 'Competencia Lectora',
        topic: weekItem.monLectura.topic,
        subtopic: weekItem.monLectura.subtopic,
      },
      {
        dayIndex: 1,
        component: 'Razonamiento Lógico',
        topic: weekItem.tueLogicaCuant.topic,
        subtopic: weekItem.tueLogicaCuant.subtopic,
      },
      {
        dayIndex: 2,
        component: 'Competencia Lectora',
        topic: weekItem.wedLecturaCrit.topic,
        subtopic: weekItem.wedLecturaCrit.subtopic,
      },
      {
        dayIndex: 3,
        component: 'Razonamiento Lógico',
        topic: weekItem.thuLogicaEsp.topic,
        subtopic: weekItem.thuLogicaEsp.subtopic,
      },
      {
        dayIndex: 4,
        component: 'Razonamiento Lógico',
        topic: weekItem.friLogicaProp.topic,
        subtopic: weekItem.friLogicaProp.subtopic,
      },
      {
        dayIndex: 5,
        component: 'Repaso Espaciado',
        topic: weekItem.satRepaso.topic,
        subtopic: weekItem.satRepaso.subtopic,
      },
      {
        dayIndex: 6,
        component: 'Simulacro',
        topic: weekItem.sunSimulacro.topic,
        subtopic: weekItem.sunSimulacro.subtopic,
      },
    ];

    for (const dCfg of dailyConfigs) {
      const dateStr = addDaysToIso(startDate, dayCounter);
      sessions.push({
        id: `w${weekItem.week}-d${dCfg.dayIndex + 1}`,
        weekNumber: weekItem.week,
        phaseId: weekItem.phase,
        dayIndex: dCfg.dayIndex,
        dayName: getRealDayNameFromIso(dateStr),
        date: dateStr,
        component: dCfg.component,
        topic: dCfg.topic,
        subtopic: dCfg.subtopic,
        breakdown: buildBreakdownForComponent(dCfg.component, dailyHours),
        completed: false,
        score: null,
        notes: '',
      });
      dayCounter++;
    }
  }

  return sessions;
}

export function getDynamicPhaseDates(
  startDate: string,
  targetDate: string
): Record<1 | 2 | 3 | 4, { startDate: string; endDate: string; totalDays: number }> {
  const [sy, sm, sd] = startDate.split('-').map(Number);
  const [ty, tm, td] = targetDate.split('-').map(Number);
  const startMs = Date.UTC(sy, sm - 1, sd);
  const targetMs = Date.UTC(ty, tm - 1, td);
  const totalDays = Math.max(28, Math.round((targetMs - startMs) / (1000 * 60 * 60 * 24)));
  const quarter = Math.floor(totalDays / 4);

  const p1Start = startDate;
  const p1End = addDaysToIso(startDate, quarter - 1);

  const p2Start = addDaysToIso(startDate, quarter);
  const p2End = addDaysToIso(startDate, quarter * 2 - 1);

  const p3Start = addDaysToIso(startDate, quarter * 2);
  const p3End = addDaysToIso(startDate, quarter * 3 - 1);

  const p4Start = addDaysToIso(startDate, quarter * 3);
  const p4End = targetDate;

  return {
    1: { startDate: p1Start, endDate: p1End, totalDays: quarter },
    2: { startDate: p2Start, endDate: p2End, totalDays: quarter },
    3: { startDate: p3Start, endDate: p3End, totalDays: quarter },
    4: {
      startDate: p4Start,
      endDate: p4End,
      totalDays: Math.max(7, totalDays - quarter * 3),
    },
  };
}

