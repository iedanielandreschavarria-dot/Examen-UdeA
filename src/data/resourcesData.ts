import { ErrorNotebookEntry, SimulacroRecord } from '../types';

export interface VerifiedResource {
  id: string;
  category:
    | 'Portal Oficial UdeA'
    | 'Bancos de Guías y Talleres'
    | 'Estrategia y Simulacros';
  title: string;
  institution: string;
  url: string;
  badge: string;
  purpose: string;
  dailyIntegration: string;
  highlights: string[];
}

export interface AIPromptTemplate {
  id: string;
  title: string;
  category: 'Competencia Lectora' | 'Razonamiento Lógico' | 'Método Socrático' | 'Simulacro Mixto';
  targetWeakness: string;
  promptText: string;
  usageTip: string;
}

export const VERIFIED_RESOURCES: VerifiedResource[] = [
  {
    id: 'res-portal-admisiones',
    category: 'Portal Oficial UdeA',
    title: 'Portal Oficial de Admisiones Pregrado — Universidad de Antioquia',
    institution: 'Departamento de Admisiones y Registro UdeA',
    url: 'https://www.udea.edu.co/wps/portal/udea/web/inicio/estudiar-udea/quiero-estudiar-udea/pregrado',
    badge: 'Fuente Oficial Primaria',
    purpose:
      'Consulta directa del cronograma oficial de cada convocatoria semestral (2027-1 / 2027-2), guía de inscripción, costos de derechos de inscripción, oferta de cupos por programa en Medellín y regiones, e instructivos oficiales de la prueba.',
    dailyIntegration:
      'Revisa este portal una vez cada dos semanas (los domingos al cerrar tu simulacro) para verificar la publicación oficial de la resolución de convocatoria y confirmar fechas definitivas.',
    highlights: [
      'Calendario oficial de inscripción, citación y publicación de resultados',
      'Tabla oficial de cupos ofertados por programa y seccional',
      'Reglamento del examen presencial y modalidad virtual asistida cuando aplica',
    ],
  },
  {
    id: 'res-programa-preparacion-udea',
    category: 'Portal Oficial UdeA',
    title: 'Programa Institucional de Preparación para la Vida Universitaria / Noticias UdeA',
    institution: 'Vicerrectoría de Docencia — Universidad de Antioquia',
    url: 'https://www.udea.edu.co/wps/portal/udea/web/inicio/udea-noticias',
    badge: 'Gratuito / Institucional',
    purpose:
      'Acceso a las convocatorias del curso virtual gratuito de preparación y orientación vocacional ofrecido por la propia Universidad de Antioquia para aspirantes nuevos (en Competencia Lectora, Razonamiento Lógico y orientación profesional).',
    dailyIntegration:
      'Sustituye los 15 minutos iniciales de teoría (Lunes a Viernes) por los módulos de fundamentación del entorno virtual de la UdeA cuando la cohorte esté abierta.',
    highlights: [
      'Material diseñado por docentes de la Vicerrectoría de Docencia UdeA',
      'Talleres sincrónicos y asincrónicos sin costo para aspirantes inscritos',
      'Orientación vocacional para carreras de alta demanda como Medicina',
    ],
  },
  {
    id: 'res-universate-guias',
    category: 'Bancos de Guías y Talleres',
    title: 'Banco de Guías y Cuadernillos de Práctica — Univérsate',
    institution: 'Referencia Externa de Entrenamiento UdeA',
    url: 'https://universate.co/',
    badge: 'Talleres y Simulacros',
    purpose:
      'Repositorio externo de referencia para descargar guías temáticas, talleres por componente y simulacros calibrados con la estructura de 80 preguntas del examen de admisión de la UdeA.',
    dailyIntegration:
      'Utiliza sus talleres en el bloque de 35 minutos de práctica diaria (Martes, Jueves y Viernes para Razonamiento Lógico; Lunes y Miércoles para Competencia Lectora) mapeando cada ejercicio con el subtema de la semana.',
    highlights: [
      'Ejercicios clasificados por ejes temáticos de Lógica y Lectura',
      'Ideal para alimentar tu registro de Simulacros Externos en el Módulo 4',
    ],
  },
  {
    id: 'res-escolaria-talleres',
    category: 'Bancos de Guías y Talleres',
    title: 'Guías UdeA No. 01 a No. 04 y Simulacros — Escolaria',
    institution: 'Referencia Externa Especializada en UdeA',
    url: 'https://escolaria.co/simulacros-examen-de-admision-udea-universidad-de-antioquia/',
    badge: 'Guías 02 y 04 con Solución Paso a Paso',
    purpose:
      'Fuente complementaria de talleres prácticos en PDF desde nivel básico hasta avanzado. La Guía No. 02 incluye soluciones explicadas paso a paso y la Guía No. 04 incluye respuestas explicadas con análisis de cada pregunta.',
    dailyIntegration:
      'Selecciona 10 preguntas del subtema del día para resolver en 22,5 minutos exactos con el Reloj de Estudio lateral y registra cualquier fallo en el Cuaderno de Errores (Módulo 5).',
    highlights: [
      'Guías 01 a 04 descargables gratuitamente (Guías 02 y 04 con desarrollo explicado)',
      'Enfoque específico en problemas tipo UdeA sin calculadora',
      'Útil para reforzar Fase 2 (Conteo/Probabilidad) y Fase 3 (Geometría/Gráficas)',
    ],
  },
  {
    id: 'res-examenes-lat',
    category: 'Estrategia y Simulacros',
    title: 'Simulador Web UdeA 80 Preguntas — Exámenes.lat',
    institution: 'Simulador Interactivo Externo Verificado',
    url: 'https://examenes.lat/co/universidades/udea/',
    badge: '80 Ítems + Pistas y Explicación',
    purpose:
      'Cuestionario interactivo gratuito de 80 preguntas originales (40 Competencia Lectora y 40 Razonamiento Lógico, o modalidad solo Razonamiento Lógico) que entrega pista por pregunta, respuesta correcta y explicación del tema evaluado.',
    dailyIntegration:
      'Como este portal no incluye cronómetro límite automático para las 3 horas, actívalo junto con el Reloj de Estudio Flotante de UdeA Prep (fijado en 60m o 180m) los domingos de simulacro.',
    highlights: [
      'Gratuito y con explicación escrita que identifica el tema evaluado en cada ítem',
      'Registra tu puntaje final (/40 Lectura y /40 Lógica) en la pestaña "Simulacro Externo" del Módulo 4',
    ],
  },
  {
    id: 'res-iasimulacros',
    category: 'Estrategia y Simulacros',
    title: 'Simulacro Formato Real UdeA (79 ítems) — IAsimulacros',
    institution: 'Plataforma Externa con Modo Cronometrado',
    url: 'https://www.iasimulacros.com/simulacros/udea',
    badge: 'Modo Práctica / Modo Serio con Reloj',
    purpose:
      'Simulacro transversal de 79 preguntas (39 de Competencia Lectora y 40 de Razonamiento Lógico sin fórmulas memorísticas), con explicación escrita por pregunta y apoyo socrático.',
    dailyIntegration:
      'En cuenta gratuita permite 1 prueba diaria de práctica; evita el cuestionario secundario de 200 preguntas (que evalúa áreas ICFES Saber 11) y concéntrate exclusivamente en el simulacro de formato transversal UdeA.',
    highlights: [
      'Cuenta con Modo Serio (reloj activo sin ayudas) y Modo Práctica (retroalimentación inmediata)',
      'Alineado con el estándar sin calculadora ni asignaturas memorísticas',
    ],
  },
  {
    id: 'res-youtube-solucionarios',
    category: 'Bancos de Guías y Talleres',
    title: 'Solucionarios en Video Paso a Paso (Preu Conocerte / Clases con Juan)',
    institution: 'Canales Educativos en YouTube Verificados',
    url: 'https://www.youtube.com/watch?v=Xul68oDDM8Q',
    badge: 'Resolución Comentada en Video',
    purpose:
      'Sesiones grabadas de ~2 horas donde docentes desarrollan paso a paso exámenes de admisión y simulacros UdeA, permitiendo observar los atajos geométricos y el descarte de distractores en tiempo real.',
    dailyIntegration:
      'Pausa el video apenas aparezca el enunciado en pantalla, resuélvelo en máximo 2 minutos y 15 segundos con el temporizador lateral, y luego reproduce la explicación docente para comparar tu método.',
    highlights: [
      'Solución Examen UdeA (Preu Conocerte) y sesiones en vivo de Escolaria / Clases con Juan',
      'Ideal para aprender trucos visuales en áreas sombreadas, conteo y lectura crítica',
    ],
  },
  {
    id: 'res-protocolo-60min',
    category: 'Estrategia y Simulacros',
    title: 'Protocolo de Alto Rendimiento: La Hora Sagrada UdeA (15 + 35 + 10)',
    institution: 'Metodología UdeA Prep',
    url: '#plan',
    badge: 'Estrategia Core',
    purpose:
      'Maximizar la retención a largo plazo estudiando 60 minutos diarios de alta intensidad durante 32 semanas consecutivas (224 horas acumuladas), evitando el agotamiento y la lectura pasiva.',
    dailyIntegration:
      'Min 00-15: Esquema conceptual activo (sin subrayar pasivamente). Min 15-50: Resolución de 14 a 16 ítems con cronómetro a 2,25 min/preg. Min 50-60: Registro de fallos con códigos C, I, P, T en el Cuaderno de Errores.',
    highlights: [
      '15 min: Teoría enfocada y fórmulas/atajos clave',
      '35 min: Práctica deliberada bajo presión de reloj',
      '10 min: Bitácora metacognitiva y programación de repaso espaciado 1-2-4',
    ],
  },
];

export const AI_PROMPT_TEMPLATES: AIPromptTemplate[] = [
  {
    id: 'prompt-logica-generador',
    title: 'Generador de Problemas Originales de Razonamiento Lógico Tipo UdeA',
    category: 'Razonamiento Lógico',
    targetWeakness: 'Para practicar un subtema débil (ej. Áreas sombreadas, Conteo, Operadores, Conjuntos)',
    usageTip:
      'Copia este prompt, reemplaza [SUBTEMA] por el tema de hoy en tu calendario y pégalo en tu asistente de IA.',
    promptText: `Actúa como profesor experto en el examen de admisión de la Universidad de Antioquia (UdeA). Diseña 3 preguntas ORIGINALES de selección múltiple con única respuesta (opciones A, B, C, D) sobre el subtema: [SUBTEMA, ej: Áreas sombreadas por traslación / Probabilidad condicional / Operadores no convencionales].

Requisitos estrictos de formato UdeA:
1. Los problemas deben poder resolverse SIN calculadora en un promedio de 2,25 minutos mediante razonamiento deductivo, atajos visuales o aritmética limpia.
2. Incluye 1 pregunta de nivel Básico, 1 de nivel Intermedio y 1 de nivel Avanzado (nivel corte de Medicina).
3. NO muestres las respuestas correctas inmediatamente debajo de cada pregunta: primero entrégame solo los 3 enunciados con sus opciones A, B, C, D para que yo los resuelva con cronómetro, y al final incluye una sección oculta o separada con la solución paso a paso y el análisis de por qué cada uno de los 3 distractores es engañoso (clasificando si el distractor explota un error de Concepto C, Planteamiento P o Descuido T).`,
  },
  {
    id: 'prompt-lectura-critica',
    title: 'Generador de Pasaje Académico + Preguntas de Competencia Lectora UdeA',
    category: 'Competencia Lectora',
    targetWeakness: 'Para entrenar Lectura Inferencial, Semántica Contextual, Analogías e Intertextualidad',
    usageTip:
      'Ideal para los Lunes y Miércoles en tu bloque de 35 minutos de práctica activa.',
    promptText: `Actúa como diseñador de pruebas de Competencia Lectora del examen de admisión de la Universidad de Antioquia (UdeA). Redacta un texto original de alta densidad conceptual (aproximadamente 320 palabras) de corte [ELEGIR: ensayístico-filosófico / divulgación biomédica / crítica literaria] y formula 4 preguntas de selección múltiple (A, B, C, D) con el estándar riguroso de la UdeA:

- Pregunta 1 (Semántica contextual): significado preciso de una palabra culta o metáfora según el cotexto.
- Pregunta 2 (Cohesión y elementos discursivos): rastreo de un referente anafórico ("aquel", "cuyo", "su") o función lógica de un conector adversativo/concesivo.
- Pregunta 3 (Inferencia global/crítica): deducción válida que no sea literal ni caiga en inferencia forzada (extrapolación).
- Pregunta 4 (Relación analógica o postura del autor): identificación de la tesis central o una analogía estructural con el argumento del texto.

Al final, explica detalladamente por qué la opción correcta se sostiene en la evidencia textual y por qué cada distractor incurre en inferencia forzada (I), contradicción o generalización indebida.`,
  },
  {
    id: 'prompt-tutor-socratico',
    title: 'Tutor Socrático para Auditar un Fallo del Cuaderno de Errores',
    category: 'Método Socrático',
    targetWeakness: 'Cuando fallas una pregunta en un simulacro y no entiendes cómo llegar a la respuesta sin ver la solución',
    usageTip:
      'Úsalo en los últimos 10 minutos de tu sesión diaria o los Sábados de Repaso Espaciado.',
    promptText: `Estoy preparándome para el examen de admisión de la UdeA (objetivo: Medicina) y acabo de fallar la siguiente pregunta:

[PEGAR ENUNCIADO Y OPCIONES A, B, C, D]
- Opción que yo marqué: [TU OPCIÓN]
- Opción correcta oficial: [OPCIÓN CORRECTA]

Por favor, NO me des la respuesta resuelta de inmediato. Actúa como un tutor socrático experto:
1. Analiza qué sesgo o trampa cognitiva me llevó a marcar mi opción incorrecta y ayúdame a clasificar mi fallo en el sistema UdeA Prep: (C) Concepto faltante, (I) Inferencia forzada, (P) Planteamiento matemático o (T) Tiempo/descuido.
2. Hazme 2 preguntas guía breves que me permitan descubrir por mí mismo el paso lógico o la pista textual que pasé por alto.
3. Dame una regla mnemotécnica o "heurística de 15 segundos" para no volver a caer en este mismo patrón de error el día del examen.`,
  },
  {
    id: 'prompt-texto-comparado',
    title: 'Entrenador de Lectura Comparada (Texto A vs. Texto B) — Nivel Medicina',
    category: 'Simulacro Mixto',
    targetWeakness: 'Para dominar las preguntas más exigentes de contraste de posturas e intertextualidad',
    usageTip:
      'Úsalo a partir de la Fase 2 y Fase 3 para blindar las preguntas de nivel Avanzado.',
    promptText: `Diseña un ejercicio de Lectura Crítica Comparada estilo examen de admisión UdeA compuesto por dos fragmentos contrapuestos (Texto A y Texto B, de ~180 palabras cada uno) que aborden desde perspectivas filosóficas o científicas distintas un mismo dilema sobre [TEMA, ej: ética de la inteligencia artificial en el diagnóstico médico / determinismo genético vs. epigenética social].

Formula 3 preguntas de nivel Avanzado que evalúen:
1. El presupuesto oculto que ambos autores comparten a pesar de sus diferencias.
2. El punto exacto de divergencia argumentativa entre el Texto A y el Texto B.
3. Cómo respondería el autor del Texto A a una objeción planteada en el Texto B.

Incluye el desglose forense de las opciones A, B, C y D al final.`,
  },
];

export const INITIAL_SIMULACROS: SimulacroRecord[] = [
  {
    id: 'sim-init-1',
    date: '2026-11-15',
    title: 'Diagnóstico Basal Semana 1 (Línea Base)',
    lecturaCorrect: 27,
    logicaCorrect: 25,
    totalQuestionsPerComp: 40,
    durationMinutes: 175,
    source: 'Diagnóstico Inicial',
    notes: 'Punto de partida antes de iniciar Fase 1. Buen nivel literal en lectura; por reforzar planteo de ecuaciones y geometría sombreada.',
  },
];

export const INITIAL_ERROR_NOTEBOOK: ErrorNotebookEntry[] = [
  {
    id: 'err-sample-1',
    questionId: 'rl-02',
    questionTitle: 'Fracción condicional en encuesta de 120 aspirantes (Diagrama de Venn)',
    component: 'Razonamiento Lógico',
    topic: 'Teoría de conjuntos y diagramas de Venn',
    errorCode: 'T',
    userOption: 'C',
    correctOption: 'A',
    personalNote:
      'Hallé bien que 38 usan solo simulacros, pero dividí entre el total de 120 encuestados (38/120 = 19/60) en vez de dividir entre los 78 que utilizan simulacros (38/78 = 19/39). Subrayar siempre cuál es el conjunto de referencia del denominador.',
    createdAt: '2026-11-15',
    reviewStage: 1,
    nextReviewDate: '2026-11-22',
    lastReviewedAt: null,
    mastered: false,
    reviewCount: 0,
  },
  {
    id: 'err-sample-2',
    questionId: 'cl-03',
    questionTitle: 'Analogía entre la proyección cartográfica y el marco del historiador',
    component: 'Competencia Lectora',
    topic: 'Relaciones analógicas y estructura conceptual',
    errorCode: 'I',
    userOption: 'A',
    correctOption: 'B',
    personalNote:
      'Caí en una inferencia forzada extrema al pensar que tener perspectiva equivale a subjetividad caprichosa. La analogía con la geometría cartográfica demuestra que es una condición estructural inevitable y rigurosa.',
    createdAt: '2026-11-15',
    reviewStage: 1,
    nextReviewDate: '2026-11-22',
    lastReviewedAt: null,
    mastered: false,
    reviewCount: 0,
  },
  {
    id: 'err-sample-3',
    questionId: 'rl-04',
    questionTitle: 'Área del triángulo MND inscrito en cuadrado de lado 12 cm con puntos medios',
    component: 'Razonamiento Lógico',
    topic: 'Geometría plana: áreas sombreadas',
    errorCode: 'P',
    userOption: 'D',
    correctOption: 'B',
    personalNote:
      'Asumí intuitivamente que el triángulo ocupaba la mitad del cuadrado (72 cm²). La técnica segura es restar al cuadrado total (144) los 3 triángulos rectángulos de las esquinas: 144 - (36 + 36 + 18) = 54 cm² (3/8 del cuadrado).',
    createdAt: '2026-11-15',
    reviewStage: 1,
    nextReviewDate: '2026-11-22',
    lastReviewedAt: null,
    mastered: false,
    reviewCount: 0,
  },
];

