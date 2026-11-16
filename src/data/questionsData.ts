import { Question } from '../types';
import { EXTRA_LECTURA_QUESTIONS } from './questionsLecturaExtra';
import { EXTRA_LOGICA_QUESTIONS } from './questionsLogicaExtra';

export const INITIAL_QUESTIONS_BANK: Question[] = [
  // =========================================================================
  // COMPETENCIA LECTORA (6 preguntas: 2 Básico, 2 Intermedio, 2 Avanzado)
  // =========================================================================
  {
    id: 'cl-01',
    component: 'Competencia Lectora',
    level: 'Básico',
    topic: 'Semántica contextual y elementos discursivos',
    contextText:
      '«La medicina clínica contemporánea enfrenta una paradoja silenciosa: cuanto más sofisticados se vuelven los instrumentos de diagnóstico por imagen y los biomarcadores moleculares, más tenue parece volverse la escucha activa del relato del paciente. No se trata de impugnar el progreso biotecnológico —cuya eficacia para detectar lesiones subclínicas es incuestionable—, sino de advertir que el síntoma narrado posee una dimensión biográfica que ningún escáner logra traducir por completo. Cuando la anamnesis se reduce a un formulario algorítmico, el acto médico corre el riesgo de confundir la cartografía con el territorio».',
    statement:
      'En el contexto del fragmento anterior, el término «impugnar» y la metáfora final «confundir la cartografía con el territorio» aluden, respectivamente, a:',
    options: [
      {
        id: 'A',
        text: 'Rechazar o refutar la validez del avance tecnológico; y tomar la representación técnica de la enfermedad por la totalidad de la experiencia del enfermo.',
      },
      {
        id: 'B',
        text: 'Postergar la inversión económica en equipos diagnósticos; y sustituir el examen físico tradicional por mapas estadísticos epidemiológicos.',
      },
      {
        id: 'C',
        text: 'Regular legalmente el uso de biomarcadores; y priorizar la subjetividad emocional del paciente por encima de la evidencia clínica objetiva.',
      },
      {
        id: 'D',
        text: 'Cuestionar la precisión de los escáneres actuales; y desconocer los límites anatómicos entre un órgano sano y uno patológico.',
      },
    ],
    correctOption: 'A',
    explanation:
      'El verbo «impugnar» significa combatir, contradecir o refutar una idea o práctica; el autor aclara que no pretende negar el valor de la biotecnología («cuya eficacia... es incuestionable»). Por su parte, la metáfora epistemológica «confundir la cartografía (el mapa) con el territorio (la realidad completa)» sintetiza la tesis del texto: los exámenes técnicos son un mapa valioso, pero no agotan la realidad biográfica e integral del paciente.',
    distractorAnalysis: {
      A: 'CORRECTA. Recoge con exactitud el sentido léxico de «impugnar» (refutar/rechazar) y el sentido metafórico de reducir al paciente (territorio) a sus reportes técnicos (cartografía).',
      B: 'INCORRECTA (Inferencia forzada). El texto jamás menciona costos o inversión económica ni mapas epidemiológicos poblacionales.',
      C: 'INCORRECTA (Extrapolación). Ni se habla de regulación jurídica ni se propone descartar la evidencia objetiva a favor de la sola emoción.',
      D: 'INCORRECTA (Contradicción). El autor afirma explícitamente que la eficacia de los instrumentos para detectar lesiones es «incuestionable».',
    },
  },
  {
    id: 'cl-02',
    component: 'Competencia Lectora',
    level: 'Básico',
    topic: 'Estrategias de lectura y tipología textual',
    contextText:
      '«Durante siglos se asumió que el cerebro adulto constituía una estructura rígida e inmutable tras el cierre de los periodos críticos de la infancia. Sin embargo, las investigaciones neurobiológicas de las últimas cuatro décadas demostraron que las redes sinápticas se remodelan continuamente en respuesta al aprendizaje, al ejercicio cognitivo e incluso a lesiones focales. Este fenómeno, denominado neuroplasticidad adaptativa, implica que el hábito intelectual sostenido no solo almacena datos en circuitos preexistentes, sino que modifica físicamente la citoarquitectura cortical».',
    statement:
      'Por su estructura y propósito comunicativo, el fragmento anterior es predominantemente un texto ____________ que emplea una secuencia de ____________ para presentar su idea central.',
    options: [
      {
        id: 'A',
        text: 'narrativo — cronología biográfica de los descubrimientos médicos',
      },
      {
        id: 'B',
        text: 'expositivo-explicativo — contraste entre un paradigma superado y la evidencia científica actual',
      },
      {
        id: 'C',
        text: 'argumentativo-polémico — refutación ideológica contra la neurología clásica del siglo XIX',
      },
      {
        id: 'D',
        text: 'instructivo — prescripción de hábitos de estudio para estimular la corteza cerebral',
      },
    ],
    correctOption: 'B',
    explanation:
      'El texto tiene un carácter expositivo de divulgación científica: busca explicar qué es la neuroplasticidad adaptativa y cómo funciona. Para lograrlo, parte de una creencia antigua («Durante siglos se asumió...») e introduce mediante el conector adversativo «Sin embargo» el hallazgo científico contemporáneo que la corrige.',
    distractorAnalysis: {
      A: 'INCORRECTA. No relata una historia con personajes o peripecias narrativas; la mención temporal solo enmarca el cambio de paradigma.',
      B: 'CORRECTA. Identifica con precisión la tipología expositiva-explicativa y el mecanismo discursivo de contraposición («Durante siglos se asumió... Sin embargo...»).',
      C: 'INCORRECTA. El tono es neutro y divulgativo, no una polémica ideológica ni un ataque panfletario.',
      D: 'INCORRECTA. Aunque menciona que el hábito intelectual modifica la corteza, no da instrucciones ni pasos o recetas al lector.',
    },
  },
  {
    id: 'cl-03',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Relaciones analógicas y estructura conceptual',
    contextText:
      '«Así como el cartógrafo necesita elegir una proyección geométrica —sabiendo que toda representación plana de una esfera introduce inevitablemente alguna deformación en las áreas o en los ángulos—, el historiador selecciona un marco interpretativo que ilumina ciertos procesos sociales mientras deja otros en la penumbra. Pretender una crónica histórica absolutamente exenta de perspectiva equivale a exigir un mapamundi plano sin distorsión métrica».',
    statement:
      'A partir de la relación analógica construida por el autor en el fragmento, es válido inferir que:',
    options: [
      {
        id: 'A',
        text: 'La historia carece de rigor académico porque sus relatos dependen del capricho subjetivo de quien escribe.',
      },
      {
        id: 'B',
        text: 'La selección de una perspectiva en la investigación histórica no es un defecto accidental, sino una condición estructural del conocimiento histórico.',
      },
      {
        id: 'C',
        text: 'Los cartógrafos han superado las limitaciones geométricas gracias a la tecnología digital, mientras que los historiadores siguen atados al pasado.',
      },
      {
        id: 'D',
        text: 'Para eliminar el sesgo interpretativo en la historia basta con recopilar la totalidad de los archivos documentales disponibles.',
      },
    ],
    correctOption: 'B',
    explanation:
      'La analogía compara la geometría de la proyección cartográfica (donde la deformación al pasar de 3D a 2D es matemáticamente inevitable, no un error por descuido) con el marco interpretativo del historiador. Por lo tanto, tener un enfoque o perspectiva no invalida la historia, sino que es inherente al acto de representar e interpretar procesos complejos.',
    distractorAnalysis: {
      A: 'INCORRECTA (Inferencia extrema). La proyección cartográfica sigue leyes geométricas rigurosas; equipararla con la historia no implica «capricho» ni falta de rigor.',
      B: 'CORRECTA. Captura la esencia de la analogía: así como toda proyección implica elegir qué preservar, toda historia requiere un marco interpretativo.',
      C: 'INCORRECTA (Falsa oposición). El texto se apoya en una propiedad geométrica invariante (teorema egregium de Gauss), no en atraso tecnológico.',
      D: 'INCORRECTA (Contradice la tesis). El autor sostiene que pretender una crónica sin perspectiva es tan imposible como un mapa plano sin distorsión.',
    },
  },
  {
    id: 'cl-04',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Cohesión, referentes anafóricos y conectores lógicos',
    contextText:
      '«La resistencia bacteriana a los antimicrobianos no constituye una anomalía imprevista de la biología, sino la consecuencia predecible de la presión selectiva darwiniana. Cuando un antibiótico se administra de forma indiscriminada, elimina a las cepas susceptibles y despeja el nicho ecológico para que proliferen aquellas portadoras de mutaciones de resistencia. No obstante, atribuir esta crisis sanitaria exclusivamente a la autoprescripción ciudadana resulta reduccionista; su uso masivo como promotor de crecimiento en la ganadería industrial aporta un volumen aún mayor de presión selectiva global».',
    statement:
      'En el fragmento anterior, el pronombre demostrativo «aquellas» (segundo enunciado) y el adjetivo posesivo «su» en «su uso masivo» (tercer enunciado) remiten, respectivamente, a:',
    options: [
      {
        id: 'A',
        text: 'Las mutaciones de resistencia — la crisis sanitaria.',
      },
      {
        id: 'B',
        text: 'Las cepas bacterianas — el antibiótico (o los antimicrobianos).',
      },
      {
        id: 'C',
        text: 'Las presiones selectivas — la autoprescripción ciudadana.',
      },
      {
        id: 'D',
        text: 'Las anomalías biológicas — la ganadería industrial.',
      },
    ],
    correctOption: 'B',
    explanation:
      'En «elimina a las cepas susceptibles y despeja el nicho ecológico para que proliferen aquellas portadoras de mutaciones», «aquellas» sustituye anafóricamente a «cepas [bacterianas]» para no repetir el sustantivo. En el último enunciado, «su uso masivo como promotor de crecimiento en la ganadería» se refiere al uso masivo de los antibióticos/antimicrobianos.',
    distractorAnalysis: {
      A: 'INCORRECTA. «Aquellas» es anterior a «mutaciones» (dice «aquellas portadoras de mutaciones»), y lo que se usa como promotor de crecimiento animal es el antibiótico, no la crisis.',
      B: 'CORRECTA. Rastrea con exactitud gramatical y semántica ambos referentes anafóricos.',
      C: 'INCORRECTA. Ni las presiones selectivas portan mutaciones ni la autoprescripción ciudadana se administra al ganado.',
      D: 'INCORRECTA. Discordancia semántica total con los antecedentes del párrafo.',
    },
  },
  {
    id: 'cl-05',
    component: 'Competencia Lectora',
    level: 'Avanzado',
    topic: 'Lectura crítica, presuposiciones e intertextualidad (Texto A vs. Texto B)',
    contextText:
      'TEXTO A: «La divulgación científica genuina exige traducir sin traicionar. Sin embargo, cuando los medios masivos convierten cada hallazgo preliminar en una promesa terapéutica inminente, erosionan la alfabetización epistemológica del público: la ciudadanía, acostumbrada a titulares categóricos, interpreta luego la rectificación inherente al método científico como incompetencia o fraude».\n\nTEXTO B: «Reprochar al periodismo científico el uso de metáforas entusiastas y simplificaciones pasa por alto que la ciencia compite hoy en un ecosistema informativo saturado. Sin una narrativa cautivadora que despierte el asombro público, el financiamiento estatal de la ciencia básica perdería legitimidad democrática frente a demandas más inmediatas».',
    statement:
      'Al contrastar la postura del Texto A con la del Texto B, se concluye que ambos autores coinciden en que la comunicación pública de la ciencia incide en la percepción social de esta, pero discrepan fundamentalmente en torno a:',
    options: [
      {
        id: 'A',
        text: 'Si los científicos deben redactar directamente las noticias o delegar esa tarea en periodistas profesionales.',
      },
      {
        id: 'B',
        text: 'El costo epistemológico frente al beneficio político-comunicativo de simplificar y magnificar los hallazgos científicos ante el público.',
      },
      {
        id: 'C',
        text: 'La validez del método experimental frente a las disciplinas humanísticas en la asignación de presupuesto público.',
      },
      {
        id: 'D',
        text: 'La necesidad de prohibir la difusión de estudios preliminares hasta que cuenten con aprobación clínica definitiva.',
      },
    ],
    correctOption: 'B',
    explanation:
      'El Texto A advierte sobre el daño epistemológico del sensacionalismo y la simplificación excesiva (el público no comprende la provisionalidad y rectificación de la ciencia). En cambio, el Texto B justifica pragmáticamente las simplificaciones y narrativas entusiastas como necesarias para captar atención y asegurar legitimidad y financiación pública.',
    distractorAnalysis: {
      A: 'INCORRECTA. Ninguno de los dos textos debate quién debe firmar la nota periodística (científicos vs. periodistas).',
      B: 'CORRECTA. Sintetiza con precisión la tensión dialéctica entre ambos pasajes: rigor/cultura epistemológica (Texto A) vs. impacto comunicativo/legitimidad financiera (Texto B).',
      C: 'INCORRECTA. No hay disputa entre ciencias exactas y humanidades en ninguno de los fragmentos.',
      D: 'INCORRECTA. El Texto A critica los titulares categóricos desproporcionados, pero no propone censura o prohibición legal de publicar avances.',
    },
  },
  {
    id: 'cl-06',
    component: 'Competencia Lectora',
    level: 'Avanzado',
    topic: 'Etimologías grecolatinas e inferencia filosófica',
    contextText:
      '«Frente a la hipertrofia del presente perpetuo que caracteriza a la hipermodernidad digital —donde todo suceso caduca en horas—, el ejercicio de la memoria histórica opera como un antídoto contra la agnosia colectiva. No recordamos el pasado por un prurito anticuario de coleccionar efemérides inertes, sino porque comprender la génesis de nuestras instituciones desnaturaliza lo que hoy parece inevitable y restituye a los ciudadanos su condición de sujetos políticos».',
    statement:
      'Atendiendo a las raíces etimológicas griegas de «hipertrofia» (hyper + trophé) y «agnosia» (a- + gnosis), y al sentido global del texto, el autor sostiene que la memoria histórica permite:',
    options: [
      {
        id: 'A',
        text: 'Frenar el crecimiento desmedido de la tecnología digital y recuperar el conocimiento enciclopédico de fechas patrias.',
      },
      {
        id: 'B',
        text: 'Contrarrestar la incapacidad de reconocer y comprender la realidad social, mostrando que el orden actual es fruto de procesos históricos contingentes y transformables.',
      },
      {
        id: 'C',
        text: 'Sustituir la velocidad de la información moderna por el estudio nostálgico de las tradiciones antiguas.',
      },
      {
        id: 'D',
        text: 'Evitar el olvido biológico asociado al envejecimiento poblacional mediante el debate político constante.',
      },
    ],
    correctOption: 'B',
    explanation:
      'Etimológicamente, «hipertrofia» denota desarrollo o nutrición excesiva (un presente desbordado que eclipsa todo lo demás) y «agnosia» (del griego a- "sin" y gnosis "conocimiento/reconocimiento") significa incapacidad de reconocer o comprender. El texto afirma que la memoria histórica «desnaturaliza lo que hoy parece inevitable», es decir, revela que las instituciones tienen una génesis histórica y, por ende, los ciudadanos pueden transformarlas.',
    distractorAnalysis: {
      A: 'INCORRECTA. El autor rechaza explícitamente el «prurito anticuario de coleccionar efemérides inertes» (fechas patrias memorizadas sin crítica).',
      B: 'CORRECTA. Integra tanto el valor etimológico de «agnosia» (incapacidad de comprender/reconocer) como la tesis sobre «desnaturalizar lo inevitable».',
      C: 'INCORRECTA. El texto descarta la nostalgia anticuaria y apunta a la agencia política presente.',
      D: 'INCORRECTA. «Agnosia colectiva» se usa como metáfora sociopolítica y epistemológica, no como patología geriátrica literal.',
    },
  },

  // =========================================================================
  // RAZONAMIENTO LÓGICO (6 preguntas: 2 Básico, 2 Intermedio, 2 Avanzado)
  // =========================================================================
  {
    id: 'rl-01',
    component: 'Razonamiento Lógico',
    level: 'Básico',
    topic: 'Porcentajes, fracciones y variaciones sucesivas',
    contextText:
      'En un laboratorio de microbiología de la Universidad de Antioquia se cultiva una colonia bacteriana. Durante la primera fase del experimento, la población inicial aumenta en un 25 %. En la segunda fase, tras aplicar un agente bacteriostático experimental, la población resultante disminuye en un 20 %. Finalmente, en la tercera fase, se retira exactamente la cuarta parte de las bacterias que habían sobrevivido a la segunda fase.',
    statement:
      'Respecto a la cantidad inicial de bacterias al comenzar el experimento, la cantidad que queda en el cultivo al finalizar la tercera fase equivale al:',
    options: [
      { id: 'A', text: '75 % de la población inicial.' },
      { id: 'B', text: '80 % de la población inicial.' },
      { id: 'C', text: '82,5 % de la población inicial.' },
      { id: 'D', text: '70 % de la población inicial.' },
    ],
    correctOption: 'A',
    explanation:
      'Estrategia rápida UdeA (Base 100): Supongamos que la población inicial es de 100 bacterias.\n1) Primera fase (+25 %): 100 × 1,25 = 125 bacterias.\n2) Segunda fase (−20 % de 125): El 20 % (1/5) de 125 es 25. Quedan 125 − 25 = 100 bacterias (nótese que +25 % seguido de −20 % restaura el 100 % inicial porque 5/4 × 4/5 = 1).\n3) Tercera fase (se retira 1/4 de las 100 restantes): Se retiran 25 bacterias y quedan 3/4 de 100 = 75 bacterias, lo que corresponde exactamente al 75 % de la población inicial.',
    distractorAnalysis: {
      A: 'CORRECTA. 100 → 125 → 100 → 75, equivalente al 75 % del valor inicial.',
      B: 'INCORRECTA (Error de planteamiento P). Ocurre al sumar algebraicamente +25 % − 20 % = +5 % y luego restar 25 % de forma aditiva (105 − 25 = 80).',
      C: 'INCORRECTA (Error de cálculo). Ocurre al aplicar el descuento del 20 % sobre 100 en lugar de aplicarlo sobre 125.',
      D: 'INCORRECTA (Error de lectura T). Ocurre al restar 30 % sin considerar las bases multiplicativas sucesivas.',
    },
  },
  {
    id: 'rl-02',
    component: 'Razonamiento Lógico',
    level: 'Básico',
    topic: 'Teoría de conjuntos y diagramas de Venn',
    contextText:
      'En una encuesta aplicada a 120 aspirantes al programa de Medicina de la UdeA sobre sus métodos de estudio diario, se encontró que:\n• 78 utilizan simulacros cronometrados.\n• 64 utilizan el cuaderno de errores.\n• 18 aspirantes no utilizan ninguno de estos dos métodos.',
    statement:
      'Si se elige al azar uno de los aspirantes que utilizan simulacros cronometrados, ¿cuál es la fracción de ellos que utilizan EXCLUSIVAMENTE simulacros cronometrados (sin usar cuaderno de errores)?',
    options: [
      { id: 'A', text: '19 / 39' },
      { id: 'B', text: '20 / 39' },
      { id: 'C', text: '19 / 60' },
      { id: 'D', text: '7 / 13' },
    ],
    correctOption: 'A',
    explanation:
      '1) Total de aspirantes que usan al menos uno de los dos métodos: n(S ∪ E) = 120 − 18 = 102.\n2) Por principio de inclusión-exclusión: n(S ∩ E) = n(S) + n(E) − n(S ∪ E) = 78 + 64 − 102 = 142 − 102 = 40 aspirantes usan ambos métodos.\n3) Aspirantes que usan EXCLUSIVAMENTE simulacros: n(Solo S) = 78 − 40 = 38.\n4) ¡Atención a la condición de la pregunta! Se pide la fracción respecto a «los aspirantes que utilizan simulacros cronometrados» (denominador = 78, no 120): 38 / 78 = 19 / 39.',
    distractorAnalysis: {
      A: 'CORRECTA. 38 de los 78 usuarios de simulacros usan solo simulacros: 38/78 simplificado entre 2 es 19/39.',
      B: 'INCORRECTA (Descuido en lectura T). 40/78 = 20/39 corresponde a quienes usan AMBOS métodos dentro del grupo de simulacros.',
      C: 'INCORRECTA (Error de universo muestral P). Calcula 38/120 = 19/60 tomando como denominador el total de encuestados en vez de quienes usan simulacros.',
      D: 'INCORRECTA (Error de resta en intersección). Resulta de olvidar restar los 18 que no usan ningún método.',
    },
  },
  {
    id: 'rl-03',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Operaciones no convencionales y secuencias cíclicas',
    contextText:
      'Para cualquier par de números reales positivos a y b, se define el operador binario «Δ» mediante la regla:\n\na Δ b = (a + b) / (a · b), si a ≤ b\na Δ b = (a² − b²) / (a − b), si a > b',
    statement:
      'De acuerdo con la definición anterior, el valor numérico de la expresión [(2 Δ 2) Δ (5 Δ 3)] es:',
    options: [
      { id: 'A', text: '9 / 8' },
      { id: 'B', text: '9' },
      { id: 'C', text: '7 / 8' },
      { id: 'D', text: '5 / 4' },
    ],
    correctOption: 'A',
    explanation:
      'Resolvemos paso a paso de adentro hacia afuera verificando la condición de orden en cada caso:\n1) Para (2 Δ 2): como 2 ≤ 2, usamos la primera rama:\n   2 Δ 2 = (2 + 2) / (2 · 2) = 4 / 4 = 1.\n2) Para (5 Δ 3): como 5 > 3, usamos la segunda rama (nótese que (a² − b²)/(a − b) se simplifica algebraicamente a a + b):\n   5 Δ 3 = (25 − 9) / (5 − 3) = 16 / 2 = 8.\n3) Finalmente evaluamos (1 Δ 8): como 1 ≤ 8, aplicamos nuevamente la primera rama:\n   1 Δ 8 = (1 + 8) / (1 · 8) = 9 / 8.',
    distractorAnalysis: {
      A: 'CORRECTA. Evalúa correctamente 2 Δ 2 = 1, luego 5 Δ 3 = 8, y finalmente 1 Δ 8 = 9/8.',
      B: 'INCORRECTA (Error de rama condicional T). En el último paso (1 Δ 8) aplica por error la segunda rama (1 + 8 = 9) ignorando que 1 ≤ 8.',
      C: 'INCORRECTA (Error aritmético). Resta en lugar de sumar en el numerador del último paso: (8 − 1)/8 = 7/8.',
      D: 'INCORRECTA (Error en igualdad). Aplica la segunda rama a 2 Δ 2 o evalúa mal 5 Δ 3.',
    },
  },
  {
    id: 'rl-04',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Geometría plana: áreas sombreadas y razones de semejanza',
    contextText:
      'Considere un cuadrado ABCD de lado 12 cm. Se ubican los puntos medios M y N sobre los lados AB y BC, respectivamente. Luego se trazan los segmentos MD, ND y MN, quedando determinado en el interior del cuadrado el triángulo MND.',
    statement:
      'El área del triángulo MND, en cm², es:',
    options: [
      { id: 'A', text: '48 cm²' },
      { id: 'B', text: '54 cm²' },
      { id: 'C', text: '60 cm²' },
      { id: 'D', text: '72 cm²' },
    ],
    correctOption: 'B',
    explanation:
      'Estrategia clásica UdeA de Resta de Áreas (Área Cuadrado − 3 Triángulos Rectángulos de las esquinas):\n• Área total del cuadrado ABCD = 12 × 12 = 144 cm².\n• Como M y N son puntos medios, AM = MB = BN = NC = 6 cm.\n• Triángulo esquina 1 (△AMD): rectángulo en A, base AD = 12 y altura AM = 6 → Área = (12 × 6) / 2 = 36 cm².\n• Triángulo esquina 2 (△CND): rectángulo en C, base CD = 12 y altura CN = 6 → Área = (12 × 6) / 2 = 36 cm².\n• Triángulo esquina 3 (△MBN): rectángulo en B, catetos MB = 6 y BN = 6 → Área = (6 × 6) / 2 = 18 cm².\n• Suma de las 3 esquinas blancas = 36 + 36 + 18 = 90 cm².\n• Área del triángulo central MND = 144 − 90 = 54 cm² (que equivale siempre a 3/8 del área del cuadrado: 3/8 × 144 = 54).',
    distractorAnalysis: {
      A: 'INCORRECTA. Equivale a 1/3 del cuadrado (48 cm²), resultado de suponer erróneamente que los tres triángulos exteriores tienen igual área de 32 cm².',
      B: 'CORRECTA. 144 − (36 + 36 + 18) = 54 cm² (exactamente 3/8 del cuadrado).',
      C: 'INCORRECTA. Error al calcular el triángulo menor MBN como 6×2 en vez de (6×6)/2 = 18.',
      D: 'INCORRECTA (Concepto faltante C). Asume que el triángulo inscrito con vértices en dos puntos medios ocupa la mitad del cuadrado (72 cm²), lo cual solo ocurre si la base coincide con un lado completo.',
    },
  },
  {
    id: 'rl-05',
    component: 'Razonamiento Lógico',
    level: 'Avanzado',
    topic: 'Lógica proposicional, cuantificadores y contrarrecíproco',
    contextText:
      'En el reglamento de un comité de bioética hospitalaria se establecen dos premisas verdaderas:\n\nPremisa 1: «Todos los protocolos clínicos aprobados fueron auditados por el comité de ética».\nPremisa 2: «Si un protocolo clínico fue auditado por el comité de ética, entonces cuenta con consentimiento informado o es un estudio observacional anónimo».',
    statement:
      'Si se sabe con certeza que cierto protocolo clínico X NO cuenta con consentimiento informado y NO es un estudio observacional anónimo, ¿cuál de las siguientes conclusiones se deduce lógicamente sin lugar a dudas?',
    options: [
      {
        id: 'A',
        text: 'El protocolo X fue auditado por el comité de ética, pero su aprobación quedó aplazada.',
      },
      {
        id: 'B',
        text: 'El protocolo X no fue aprobado.',
      },
      {
        id: 'C',
        text: 'Ningún estudio observacional anónimo requiere ser auditado por el comité de ética.',
      },
      {
        id: 'D',
        text: 'Si otro protocolo Y cuenta con consentimiento informado, entonces necesariamente fue aprobado.',
      },
    ],
    correctOption: 'B',
    explanation:
      'Formalicemos las premisas para el protocolo X:\n• P1: Aprobado(X) → Auditado(X)\n• P2: Auditado(X) → (Consentimiento(X) ∨ Observacional(X))\nPor transitividad (silogismo hipotético): Aprobado(X) → Auditado(X) → (Consentimiento(X) ∨ Observacional(X)).\nEl enunciado afirma que X cumple: ~Consentimiento(X) ∧ ~Observacional(X), lo cual por Ley de De Morgan es exactamente la negación del consecuente: ~(Consentimiento(X) ∨ Observacional(X)).\nAplicando Modus Tollens (contrarrecíproco) en cadena:\n1) ~Auditado(X) (no fue auditado)\n2) ~Aprobado(X) (por lo tanto, el protocolo X NO fue aprobado).',
    distractorAnalysis: {
      A: 'INCORRECTA. Contradice directamente el Modus Tollens de la Premisa 2, pues X tampoco pudo haber sido auditado.',
      B: 'CORRECTA. Aplicación impecable de Ley de De Morgan y doble Modus Tollens (contrarrecíproco).',
      C: 'INCORRECTA. Invierte inválidamente la relación de condición suficiente de la Premisa 2.',
      D: 'INCORRECTA (Falacia de afirmación del consecuente). Que Aprobado → Consentimiento no implica que Consentimiento → Aprobado.',
    },
  },
  {
    id: 'rl-06',
    component: 'Razonamiento Lógico',
    level: 'Avanzado',
    topic: 'Principios de conteo, combinatoria y probabilidad con restricciones',
    contextText:
      'Para una guardia nocturna en el Hospital Universitario San Vicente Fundación se debe conformar un equipo de 4 personas seleccionadas entre 5 médicos generales y 4 enfermeros jefes. Por protocolo asistencial, el equipo de guardia debe contar con AL MENOS 2 médicos generales y AL MENOS 1 enfermero jefe.',
    statement:
      '¿De cuántas maneras diferentes se puede conformar dicho equipo de 4 personas cumpliendo el protocolo?',
    options: [
      { id: 'A', text: '100 maneras' },
      { id: 'B', text: '105 maneras' },
      { id: 'C', text: '120 maneras' },
      { id: 'D', text: '80 maneras' },
    ],
    correctOption: 'A',
    explanation:
      'Como no hay cargos jerárquicos distintos dentro de los 4 integrantes elegidos, el orden no importa (usamos combinaciones C(n, k)) y separamos por casos excluyentes según el número de médicos (M) y enfermeros (E) para sumar 4 personas cumpliendo M ≥ 2 y E ≥ 1:\n\n• Caso 1: Exactamente 2 Médicos y 2 Enfermeros:\n  Elegimos 2 de 5 médicos Y 2 de 4 enfermeros:\n  C(5, 2) × C(4, 2) = [5×4 / 2] × [4×3 / 2] = 10 × 6 = 60 maneras.\n\n• Caso 2: Exactamente 3 Médicos y 1 Enfermero:\n  Elegimos 3 de 5 médicos Y 1 de 4 enfermeros:\n  C(5, 3) × C(4, 1) = 10 × 4 = 40 maneras.\n\n(Nota: 4 Médicos y 0 Enfermeros no es válido porque debe haber al menos 1 enfermero).\n\nTotal de equipos válidos = 60 + 40 = 100 maneras.',
    distractorAnalysis: {
      A: 'CORRECTA. Suma de los dos únicos casos posibles: (2M, 2E) = 60 más (3M, 1E) = 40 → 100 maneras.',
      B: 'INCORRECTA (Olvido de restricción P). Incluye el caso de 4 médicos y 0 enfermeros: C(5,4) = 5 → 100 + 5 = 105.',
      C: 'INCORRECTA (Doble conteo). Toma C(9, 4) = 126 o multiplica secuencialmente sin corregir por orden.',
      D: 'INCORRECTA (Error aritmético en C(5,2)). Calcula C(5,2) como 8 en lugar de 10.',
    },
  },
  ...EXTRA_LECTURA_QUESTIONS,
  ...EXTRA_LOGICA_QUESTIONS,
];

