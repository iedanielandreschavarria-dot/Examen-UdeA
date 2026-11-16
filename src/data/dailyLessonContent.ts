import { StudySession, Question } from '../types';

export interface DailyLessonGuide {
  title: string;
  component: StudySession['component'];
  coreConcept: string;
  keyRulesAndFormulas: string[];
  udeaTrapsToAvoid: string[];
  workedExample: {
    prompt: string;
    stepByStep: string;
    takeaway: string;
  };
  practiceQuestions: Question[];
}

export function getLessonGuideForSession(
  session: StudySession,
  allQuestions: Question[]
): DailyLessonGuide {
  const textKey = `${session.topic} ${session.subtopic}`.toLowerCase();

  // Select matching questions from bank + generate topic-specific questions so every lesson has at least 3 interactive questions
  const compQuestions = allQuestions.filter((q) =>
    session.component === 'Competencia Lectora'
      ? q.component === 'Competencia Lectora'
      : session.component === 'Razonamiento Lógico'
      ? q.component === 'Razonamiento Lógico'
      : true
  );

  // Match by topic keywords first
  const keywordMatches = compQuestions.filter((q) => {
    const qText = `${q.topic} ${q.statement}`.toLowerCase();
    if (textKey.includes('porcentaje') || textKey.includes('fracci')) {
      return qText.includes('porcentaje') || qText.includes('fracci') || q.id === 'rl-01';
    }
    if (textKey.includes('conjunto') || textKey.includes('venn') || textKey.includes('tabla')) {
      return qText.includes('conjunto') || qText.includes('encuesta') || q.id === 'rl-02';
    }
    if (textKey.includes('operador') || textKey.includes('no convencional') || textKey.includes('secuencia')) {
      return qText.includes('operador') || q.id === 'rl-03';
    }
    if (textKey.includes('geometr') || textKey.includes('área') || textKey.includes('perímetro') || textKey.includes('espacial')) {
      return qText.includes('geometr') || qText.includes('área') || q.id === 'rl-04';
    }
    if (textKey.includes('proposicional') || textKey.includes('cuantificador') || textKey.includes('verdad')) {
      return qText.includes('proposicional') || qText.includes('premisa') || q.id === 'rl-05';
    }
    if (textKey.includes('conteo') || textKey.includes('permuta') || textKey.includes('combin') || textKey.includes('probabilidad')) {
      return qText.includes('conteo') || qText.includes('maneras') || q.id === 'rl-06';
    }
    if (textKey.includes('semántica') || textKey.includes('cohesión') || textKey.includes('anáfora') || textKey.includes('conector')) {
      return q.id === 'cl-01' || q.id === 'cl-04';
    }
    if (textKey.includes('analogía') || textKey.includes('analógica')) {
      return q.id === 'cl-03' || q.id === 'cl-01';
    }
    if (textKey.includes('crítica') || textKey.includes('inferencia') || textKey.includes('comparad') || textKey.includes('etimolog')) {
      return q.id === 'cl-05' || q.id === 'cl-06';
    }
    return false;
  });

  // Dedicated high-yield extra questions per theme so the student always has tailored exercises
  const extraQuestions: Question[] = buildTopicSpecificQuestions(session);
  const combined = [...extraQuestions, ...keywordMatches, ...compQuestions];
  const uniqueQuestions: Question[] = [];
  const seenIds = new Set<string>();
  for (const item of combined) {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      uniqueQuestions.push(item);
    }
    if (uniqueQuestions.length >= 3) break;
  }

  // Build tailored theoretical synthesis based on session topic
  if (session.component === 'Competencia Lectora') {
    if (textKey.includes('analog') || textKey.includes('semántica') || textKey.includes('etimolog')) {
      return {
        title: session.topic,
        component: session.component,
        coreConcept:
          'En el examen de la UdeA, el significado de una palabra o relación analógica NUNCA se evalúa de forma aislada, sino gobernada por el cotexto (las oraciones que la rodean) y la intención argumentativa del autor.',
        keyRulesAndFormulas: [
          'Regla de Sustitución Conservadora: al reemplazar un término por un sinónimo contextual, debe conservarse tanto el significado conceptual como el tono valorativo (neutro, irónico o crítico).',
          'Fórmula de Analogías (Par Base A : B): construye una oración breve y unidireccional con A y B (ej. "A es la causa necesaria de B") y aplícala en el mismo orden exacto (izquierda → derecha) a las 4 opciones.',
          'Raíces Grecolatinas Clave: a-/an- (privación), hiper- (exceso), hipo- (defecto), gnosis (conocimiento), morfo (forma), pato (afección), lisis (ruptura/disolución).',
        ],
        udeaTrapsToAvoid: [
          'Trampa de Primera Acepción (C): elegir el significado literal de diccionario cuando el autor usa el término en sentido metafórico o disciplinar.',
          'Trampa de Inversión Analógica (T): elegir una opción que tiene la misma relación que el par base pero en orden invertido (B : A en lugar de A : B).',
        ],
        workedExample: {
          prompt:
            'Si en un ensayo sobre salud pública se afirma: «Las medidas paliativas solo maquillan la patología estructural del sistema», ¿qué función cumple el verbo "maquillar"?',
          stepByStep:
            '1) Literalmente "maquillar" es aplicar cosméticos.\n2) En el cotexto se opone a resolver la "patología estructural" y se asocia con medidas meramente paliativas.\n3) Por tanto, significa "encubrir o disimular superficialmente un problema grave sin atacar su raíz".',
          takeaway:
            'Lee siempre un renglón antes y un renglón después de la palabra subrayada antes de mirar las opciones A, B, C y D.',
        },
        practiceQuestions: uniqueQuestions,
      };
    }

    if (textKey.includes('cohesión') || textKey.includes('anáfora') || textKey.includes('conector') || textKey.includes('puntuación')) {
      return {
        title: session.topic,
        component: session.component,
        coreConcept:
          'Los mecanismos de cohesión (pronombres anafóricos como "este", "aquel", "cuyo", "su" y conectores lógicos) son el esqueleto sintáctico del texto. La UdeA evalúa si puedes rastrear exactamente a qué sustantivo previo se refiere un pronombre y qué giro lógico introduce cada conector.',
        keyRulesAndFormulas: [
          'Anáfora de Proximidad: "este/esta" señala al referente nombrado más recientemente; "aquel/aquella" señala al referente mencionado en primer lugar o más lejano en la oración.',
          'Conectores Concesivos ("aunque", "a pesar de que", "si bien"): introducen una objeción real que NO impide que se cumpla la tesis principal.',
          'Conectores Adversativos ("sin embargo", "no obstante", "pero"): restringen o invierten la orientación argumentativa de lo dicho antes; la idea que el autor defiende suele ir DESPUÉS del conector.',
        ],
        udeaTrapsToAvoid: [
          'Asociar un posesivo ("su") con el sustantivo más cercano sin verificar concordancia lógica (¿quién realiza realmente la acción?).',
          'Confundir un conector causal ("ya que", "puesto que" → introduce la causa) con uno consecutivo ("por consiguiente", "de ahí que" → introduce el efecto).',
        ],
        workedExample: {
          prompt:
            '«La quimioterapia ataca las células de división rápida; no obstante, su baja selectividad afecta también tejidos sanos». ¿A qué remite "su"?',
          stepByStep:
            '1) Candidatos nominales previos: "la quimioterapia" (femenino singular) y "las células" (femenino plural).\n2) ¿Quién tiene "baja selectividad" al atacar? El tratamiento ("la quimioterapia").\n3) Por tanto, "su" remite anafóricamente a la quimioterapia.',
          takeaway:
            'Haz siempre la prueba de reescritura: cambia el pronombre por el sustantivo candidato y verifica que la oración tenga pleno sentido lógico.',
        },
        practiceQuestions: uniqueQuestions,
      };
    }

    // Default Competencia Lectora (Estrategias, Tipología, Inferencia y Lectura Crítica)
    return {
      title: session.topic,
      component: session.component,
      coreConcept:
        'El examen de la UdeA distingue tres niveles de lectura: 1) Literal (lo que el texto afirma explícitamente), 2) Inferencial (lo que se deduce necesariamente de las premisas del texto sin agregar fantasías) y 3) Crítico-Intertextual (la intención del autor, su tono, la estructura del texto y el diálogo con otras posturas).',
      keyRulesAndFormulas: [
        'Mapeo Macroestructural en 10 segundos: al terminar cada párrafo, identifica su función: ¿Define el tema?, ¿Plantea la tesis?, ¿Cita una postura contraria?, ¿Refuta? o ¿Concluye?',
        'Prueba del Cuantificador Absoluto: desconfía de opciones de respuesta que contengan palabras como "siempre", "nunca", "únicamente", "todos" o "imposible", a menos que el texto las respalde de manera explícita.',
        'Distinción Autor vs. Voz Citada (Polifonía): cuando el autor cita una creencia común ("Suele pensarse que...") para luego decir "Sin embargo...", esa primera idea NO es la postura del autor.',
      ],
      udeaTrapsToAvoid: [
        'Error tipo (I) Inferencia Forzada / Extrapolación: elegir una opción que suena muy inteligente o verdadera en la vida real, pero que el autor jamás sugirió ni se sigue de sus premisas.',
        'Error tipo (T) Ceguera a la Negación: en preguntas con "EXCEPTO", "NO es compatible" o "es FALSO", marcar por prisa la primera opción verdadera que encuentras en el primer párrafo.',
      ],
      workedExample: {
        prompt:
          'Fragmento: «Aunque la telemedicina amplía la cobertura en zonas rurales apartadas, difícilmente sustituirá la riqueza semiológica de la palpación presencial». ¿Cuál es la tesis del autor?',
        stepByStep:
          '1) La cláusula con "Aunque" es una concesión (reconoce una ventaja real de la telemedicina: cobertura rural).\n2) La cláusula principal es la que sigue a la coma: "difícilmente sustituirá la riqueza semiológica de la palpación presencial".\n3) Conclusión: la telemedicina es un complemento valioso, pero no reemplaza el examen clínico presencial.',
        takeaway:
          'En toda oración con "Aunque A, B", el centro de gravedad de la tesis del autor está en B, no en A.',
      },
      practiceQuestions: uniqueQuestions,
    };
  }

  if (session.component === 'Razonamiento Lógico') {
    if (textKey.includes('geometr') || textKey.includes('área') || textKey.includes('perímetro') || textKey.includes('espacial') || textKey.includes('cubo')) {
      return {
        title: session.topic,
        component: session.component,
        coreConcept:
          'La geometría en el examen de la UdeA es visual y deductiva, no calculadora-dependiente. El 90 % de los problemas de áreas sombreadas se resuelven mediante 1) Resta de áreas (Área Total − Regiones Blancas), 2) Traslación por simetría, o 3) Razón de semejanza.',
        keyRulesAndFormulas: [
          'Estrategia de Resta: Área Sombreada = Área de la figura exterior (cuadrado/círculo) − Suma de triángulos o sectores blancos fáciles de calcular.',
          'Escalamiento Cuadrático y Cúbico: si las dimensiones lineales de una figura se multiplican por k, su Perímetro se multiplica por k, su Área por k² y su Volumen por k³.',
          'Cubo Pintado de n × n × n cubitos: Vértices (3 caras pintadas) = siempre 8; Aristas (2 caras pintadas) = 12(n − 2); Centros de cara (1 cara pintada) = 6(n − 2)²; Internos (0 caras pintadas) = (n − 2)³.',
        ],
        udeaTrapsToAvoid: [
          'Confundir longitud de circunferencia (L = 2πr) con área del círculo (A = πr²), o usar el diámetro en lugar del radio.',
          'Asumir que al duplicar el lado de un cuadrado o el radio de un círculo su área se duplica (en realidad se cuadruplica: 2² = 4).',
        ],
        workedExample: {
          prompt:
            'Si el radio de un cilindro circular recto se duplica y su altura se reduce a la mitad, ¿qué ocurre con su volumen?',
          stepByStep:
            '1) Volumen original: V₁ = π · r² · h.\n2) Nuevo radio R = 2r y nueva altura H = h/2.\n3) Nuevo volumen: V₂ = π · (2r)² · (h/2) = π · 4r² · (h/2) = 2 · (πr²h) = 2V₁.\n4) Conclusión: el volumen se duplica (aumenta en un 100 %).',
          takeaway:
            'Como el radio está elevado al cuadrado (r²), duplicarlo aporta un factor ×4 que supera la reducción a la mitad (×1/2) de la altura.',
        },
        practiceQuestions: uniqueQuestions,
      };
    }

    if (textKey.includes('conteo') || textKey.includes('permuta') || textKey.includes('combin') || textKey.includes('probabilidad') || textKey.includes('conjunto')) {
      return {
        title: session.topic,
        component: session.component,
        coreConcept:
          'En combinatoria, conjuntos y probabilidad todo parte de dos preguntas de control: 1) ¿Los eventos ocurren uno después de otro ("Y" → multiplicar) o son casos mutuamente excluyentes ("O" → sumar)? y 2) ¿Cambiar el orden de los elementos elegidos genera un resultado distinto (Permutación) o el mismo grupo (Combinación)?',
        keyRulesAndFormulas: [
          'Principio de Inclusión-Exclusión (2 conjuntos): n(A ∪ B) = n(A) + n(B) − n(A ∩ B). Dibuja siempre el diagrama de Venn empezando desde la intersección central hacia afuera.',
          'Permutación vs. Combinación: para cargos distintos o códigos (Presidente y Tesorero) importa el orden → n × (n−1); para comités o grupos de personas iguales NO importa el orden → C(n, k) = n! / [k!(n−k)!].',
          'Probabilidad del Complemento: cuando el enunciado pide la probabilidad de obtener "AL MENOS UNO", es mucho más rápido calcular: P(al menos 1) = 1 − P(ninguno).',
        ],
        udeaTrapsToAvoid: [
          'En diagramas de Venn, olvidar restar la intersección central al escribir los que pertenecen "solo a A".',
          'En probabilidad condicional ("Si se elige al azar entre los que aprueban lógica..."), dividir entre el total general de personas en vez de dividir entre el subgrupo condicionante.',
        ],
        workedExample: {
          prompt:
            'En una urna hay 4 esferas rojas y 3 azules. Si se extraen 2 esferas al azar SIN reposición, ¿cuál es la probabilidad de que ambas sean rojas?',
          stepByStep:
            '1) Primera extracción: hay 4 rojas de 7 totales → P₁ = 4/7.\n2) Segunda extracción (sin devolver la primera): quedan 3 rojas de 6 esferas restantes → P₂ = 3/6 = 1/2.\n3) Probabilidad conjunta: (4/7) × (1/2) = 4/14 = 2/7.',
          takeaway:
            'En extracciones sin reposición, disminuye en 1 tanto el numerador (si salió favorable) como el denominador total en cada paso.',
        },
        practiceQuestions: uniqueQuestions,
      };
    }

    // Default Razonamiento Lógico (Aritmética, Proporcionalidad, Porcentajes, Ecuaciones, Patrones, Proposicional)
    return {
      title: session.topic,
      component: session.component,
      coreConcept:
        'El núcleo cuantitativo del examen UdeA premia la traducción limpia del lenguaje verbal al lenguaje matemático y el uso de números convenientes (como Base 100 en porcentajes o el MCM de los denominadores en fracciones) para evitar decimales engorrosos.',
      keyRulesAndFormulas: [
        'Método Base 100 para Porcentajes: si el problema no da una cantidad fija y solo habla de porcentajes o fracciones, asigna al total inicial el valor 100 (o un múltiplo de los denominadores).',
        'Variaciones Porcentuales Sucesivas: un aumento del a % seguido de un descuento del b % NO es (a − b) %. Multiplica los factores: Factor Final = (1 + a/100) × (1 − b/100).',
        'Contrarrecíproco en Lógica Proposicional: la proposición condicional "Si p, entonces q" (p → q) es 100 % equivalente a "Si NO q, entonces NO p" (~q → ~p).',
      ],
      udeaTrapsToAvoid: [
        'Error tipo (P): sumar o restar porcentajes que están calculados sobre bases distintas (ej. subir 20 % y bajar 20 % deja el 96 %, no el 100 %).',
        'Error tipo (T): despejar la incógnita x correctamente en una ecuación, pero olvidar que la pregunta pedía "el doble de lo que le quedó al segundo día" (2x − k).',
      ],
      workedExample: {
        prompt:
          'Un estudiante gasta 1/3 de su tiempo en teoría, luego gasta 2/5 de lo que le quedaba en práctica y los 18 minutos restantes en bitácora. ¿Cuánto duró la sesión?',
        stepByStep:
            '1) Tras gastar 1/3, le quedan 2/3 del tiempo total.\n2) Luego gasta 2/5 de ese resto, por lo que le quedan 3/5 de esos 2/3:\n   Fracción restante = (3/5) × (2/3) = 2/5 del total.\n3) Como esos 2/5 equivalen a 18 minutos, entonces 1/5 son 9 minutos y el total (5/5) es 9 × 5 = 45 minutos.',
        takeaway:
          'En problemas de reducciones sucesivas ("del resto"), enfócate directamente en multiplicar las fracciones de LO QUE QUEDA en cada etapa.',
      },
      practiceQuestions: uniqueQuestions,
    };
  }

  // Repaso Espaciado o Simulacro
  return {
    title: session.topic,
    component: session.component,
    coreConcept:
      'Las sesiones de Repaso Espaciado (Sábados) y Simulacro Cronometrado (Domingos) son el motor donde conviertes tus errores pasados en puntos seguros para alcanzar el corte de Medicina (>88/100).',
    keyRulesAndFormulas: [
      'Regla de Oro del Repaso Espaciado (1-2-4 semanas): tapa la solución de la pregunta que fallaste hace 7 días y resuélvela desde cero en papel limpio. Solo si llegas a la respuesta y puedes explicar por qué las otras 3 opciones son falsas, avanza su ciclo.',
      'Ritmo Oficial de Simulacro: 2,25 minutos (135 segundos) por pregunta. Cada bloque de 20 preguntas debe completarse en máximo 45 minutos.',
      'Técnica de Dos Pasadas: en la primera vuelta resuelve todas las preguntas de dificultad básica e intermedia; si una pregunta te bloquea más de 60 segundos sin rumbo claro, márcala y sigue adelante.',
    ],
    udeaTrapsToAvoid: [
      'Hacer "repaso pasivo" (releer la explicación diciendo "sí, ya entendí") sin resolver el problema con la solución oculta.',
      'Engancharse por orgullo durante 8 minutos en un solo problema de geometría o texto denso, sacrificando 4 preguntas fáciles de más adelante.',
    ],
    workedExample: {
      prompt:
        'Auditoría de un fallo tipo (T): obtuviste 32/40 en Lógica, pero 4 de tus 8 fallos fueron en preguntas que sí sabías hacer.',
      stepByStep:
        '1) Al revisar esos 4 fallos por descuido (T), conviertes 32/40 (80 %) en 36/40 (90 %) de inmediato sin siquiera aprender teoría nueva.\n2) Protocolo anti-T: antes de marcar el óvalo definitivo, lee las últimas 5 palabras de la pregunta (¿pide "cuántos quedan" o "cuántos salieron"?; ¿pide "verdadero" o "EXCEPTO"?).',
      takeaway:
        'Eliminar los errores por descuido (T) y las inferencias forzadas (I) es la vía más rápida para subir +10 puntos en el puntaje global.',
    },
    practiceQuestions: uniqueQuestions,
  };
}

function buildTopicSpecificQuestions(session: StudySession): Question[] {
  const isLectura = session.component === 'Competencia Lectora';

  if (isLectura) {
    return [
      {
        id: `lesson-q-${session.id}-1`,
        component: 'Competencia Lectora',
        level: 'Básico',
        topic: session.topic,
        contextText:
          '«Comprender un texto académico no consiste en decodificar pasivamente una sucesión de vocablos ni en memorizar datos aislados para repetirlos literalmente. Leer de manera crítica implica interrogar las premisas del autor, advertir qué supuestos da por descontados, reconocer la función argumentativa de cada párrafo y distinguir con rigor entre lo que el texto afirma, lo que permite inferir válidamente y lo que corre por cuenta de los prejuicios del lector».',
        statement:
          'De acuerdo con la estructura argumentativa del fragmento anterior, el autor define la lectura crítica mediante un procedimiento retórico que consiste en:',
        options: [
          {
            id: 'A',
            text: 'Contrastar lo que NO es leer (decodificación pasiva y memorización) con las operaciones intelectuales activas que sí exige la comprensión profunda.',
          },
          {
            id: 'B',
            text: 'Narrar cronológicamente la evolución histórica de los métodos de lectura en las universidades.',
          },
          {
            id: 'C',
            text: 'Proponer que la opinión subjetiva del lector tiene mayor validez que las premisas explícitas del autor.',
          },
          {
            id: 'D',
            text: 'Demostrar que la memoria carece por completo de utilidad en el aprendizaje de las ciencias.',
          },
        ],
        correctOption: 'A',
        explanation:
          'El primer enunciado establece una definición negativa («no consiste en decodificar pasivamente... ni en memorizar...») y el segundo enunciado expone de manera afirmativa las operaciones que constituyen la lectura crítica («interrogar las premisas, advertir supuestos...»).',
        distractorAnalysis: {
          A: 'CORRECTA. Describe exactamente el contraste entre lectura pasiva/literal y lectura activa/crítica.',
          B: 'INCORRECTA. No hay relato histórico ni secuencia cronológica.',
          C: 'INCORRECTA (Contradicción). El texto pide no confundir lo que dice el texto con los prejuicios del lector.',
          D: 'INCORRECTA (Inferencia extrema I). Critica "memorizar datos aislados para repetirlos literalmente", no toda forma de memoria.',
        },
      },
    ];
  }

  return [
    {
      id: `lesson-q-${session.id}-1`,
      component: 'Razonamiento Lógico',
      level: 'Básico',
      topic: session.topic,
      contextText:
        'Durante su preparación para la UdeA, Camila resuelve un taller de Razonamiento Lógico en tres bloques. En el primer bloque resuelve la tercera parte del total de ejercicios del taller; en el segundo bloque resuelve la mitad de los ejercicios que le faltaban por resolver; y en el tercer bloque resuelve los 12 ejercicios restantes, completando así la totalidad del taller.',
      statement:
        '¿Cuántos ejercicios en total tenía el taller que resolvió Camila?',
      options: [
        { id: 'A', text: '36 ejercicios' },
        { id: 'B', text: '24 ejercicios' },
        { id: 'C', text: '48 ejercicios' },
        { id: 'D', text: '30 ejercicios' },
      ],
      correctOption: 'A',
      explanation:
        'Razonamiento hacia atrás o por fracciones restantes:\n1) En el primer bloque hace 1/3 del taller, por lo que le quedan por hacer 2/3 del taller.\n2) En el segundo bloque hace la mitad (1/2) de esos 2/3 restantes, es decir, hace 1/3 adicional y le queda el otro 1/3 del taller.\n3) Como los 12 ejercicios finales corresponden exactamente a ese 1/3 restante, el total del taller es 12 × 3 = 36 ejercicios.',
      distractorAnalysis: {
        A: 'CORRECTA. 1/3 (12) + 1/3 (12) + 12 = 36 ejercicios totales.',
        B: 'INCORRECTA (T). Calcula 2/3 del taller (24) en lugar del total.',
        C: 'INCORRECTA (P). Restó 1/3 + 1/2 = 5/6 sin notar que el 1/2 se calculaba sobre lo que faltaba (el resto), no sobre el total inicial.',
        D: 'INCORRECTA. Error aritmético al despejar la fracción.',
      },
    },
  ];
}

