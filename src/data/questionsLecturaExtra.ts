import { Question } from '../types';

export const EXTRA_LECTURA_QUESTIONS: Question[] = [
  {
    id: 'cl-07',
    component: 'Competencia Lectora',
    level: 'Básico',
    topic: 'Lectura literal e inferencial: paráfrasis de moraleja en relato tradicional',
    contextText:
      '«Según un antiguo relato persa, un joven campesino escuchó a su anciano padre advertirle antes de partir al bosque: "Hijo, el ser humano suele temer a las garras del tigre, pero olvida que la verdadera ruina nace de confiar sus armas a quien finge admirar su fuerza". Días después, el joven se topó con un tigre hambriento que, en lugar de atacarlo, alabó con voz meliflua la destreza del muchacho con el arco y le rogó que le dejara atar sus manos un instante para comprobar si el valor humano residía en los músculos o en las flechas. Halagado en su vanidad, el joven entregó las cuerdas; una vez inmovilizado, el felino lo devoró sin prisa, recordándole que ningún colmillo iguala la eficacia de la adulación aceptada sin recelo».',
    statement:
      '¿Cuál de los siguientes enunciados constituye una paráfrasis fiel de la enseñanza central (moraleja) del relato anterior?',
    options: [
      {
        id: 'A',
        text: 'La fuerza física de los animales salvajes siempre resulta superior a cualquier herramienta fabricada por el ingenio humano.',
      },
      {
        id: 'B',
        text: 'Quien cede sus defensas seducido por el halago del adversario se vuelve cómplice de su propia destrucción.',
      },
      {
        id: 'C',
        text: 'Los jóvenes campesinos jamás deben adentrarse en el bosque sin la compañía y supervisión directa de sus padres.',
      },
      {
        id: 'D',
        text: 'La diplomacia y el diálogo pacífico constituyen el único camino seguro para domesticar la naturaleza violenta de los depredadores.',
      },
    ],
    correctOption: 'B',
    explanation:
      'Tanto la advertencia inicial del padre («confiar sus armas a quien finge admirar su fuerza») como el desenlace del relato muestran que el tigre no venció al joven por superioridad física, sino porque el campesino, cegado por la vanidad ante el elogio («voz meliflua», «halagado»), entregó voluntariamente su capacidad de defensa.',
    distractorAnalysis: {
      A: 'INCORRECTA (Cuantificador absoluto + Contradicción). Usa «siempre» y contradice el relato, pues el tigre necesitó engañar al joven porque temía su arco.',
      B: 'CORRECTA. Parafrasea con exactitud la relación causal entre aceptar la adulación sin juicio crítico, entregar las defensas y sufrir la ruina.',
      C: 'INCORRECTA (Literalismo reductor / Cuantificador absoluto). Usa «jamás» y reduce una fábula moral sobre la prudencia ante la adulación a una regla doméstica de paseo.',
      D: 'INCORRECTA (Ironía no comprendida / Extrapolación). El diálogo del tigre no fue diplomacia sincera, sino un ardid retórico para desarmar a su presa.',
    },
  },
  {
    id: 'cl-08',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Lectura inferencial: motivación y contraste de personajes',
    contextText:
      '«Según un antiguo relato persa, un joven campesino escuchó a su anciano padre advertirle antes de partir al bosque: "Hijo, el ser humano suele temer a las garras del tigre, pero olvida que la verdadera ruina nace de confiar sus armas a quien finge admirar su fuerza". Días después, el joven se topó con un tigre hambriento que, en lugar de atacarlo, alabó con voz meliflua la destreza del muchacho con el arco y le rogó que le dejara atar sus manos un instante para comprobar si el valor humano residía en los músculos o en las flechas. Halagado en su vanidad, el joven entregó las cuerdas; una vez inmovilizado, el felino lo devoró sin prisa, recordándole que ningún colmillo iguala la eficacia de la adulación aceptada sin recelo».',
    statement:
      'Del contraste entre la advertencia previa del padre y la conducta posterior del joven en el bosque, se puede inferir válidamente que el padre:',
    options: [
      {
        id: 'A',
        text: 'Sabía que la vulnerabilidad psicológica ante el elogio suele desactivar la cautela más rápido que una amenaza abierta.',
      },
      {
        id: 'B',
        text: 'Había pactado previamente con el tigre para poner a prueba la obediencia filial de su hijo en el bosque.',
      },
      {
        id: 'C',
        text: 'Consideraba que el arco y las flechas eran instrumentos inútiles frente a cualquier ataque cuerpo a cuerpo.',
      },
      {
        id: 'D',
        text: 'Desconocía por completo la existencia de tigres reales en la región donde trabajaba su familia.',
      },
    ],
    correctOption: 'A',
    explanation:
      'El padre contrapone el temor instintivo a la agresión directa («las garras del tigre») con un peligro menos evidente pero más letal («confiar sus armas a quien finge admirar su fuerza»). Esto permite deducir que el padre comprendía cómo la vanidad desarma el juicio preventivo.',
    distractorAnalysis: {
      A: 'CORRECTA. Deduce lógicamente el fundamento psicológico de la sentencia paterna confirmada por los hechos del relato.',
      B: 'INCORRECTA (Extrapolación fantasiosa). Inventa una conspiración entre el padre y el tigre sin ningún respaldo en el texto.',
      C: 'INCORRECTA (Contradicción). Las armas sí eran eficaces; precisamente por eso el peligro consistía en «confiar sus armas» al adversario.',
      D: 'INCORRECTA (Contradicción). El padre menciona expresamente las garras del tigre en su consejo inicial.',
    },
  },
  {
    id: 'cl-09',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Polifonía, voces citadas y quiebre argumentativo (Caso Helicobacter pylori)',
    contextText:
      '«Durante gran parte del siglo XX, la gastroenterología académica sostuvo como dogma casi incuestionable que la úlcera péptica era provocada exclusivamente por el exceso de acidez gástrica derivado del estrés emocional y la dieta irritante, puesto que se creía imposible que una bacteria sobreviviera en un medio tan ácido. Sin embargo, en 1982 Robin Warren y Barry Marshall demostraron que el bacilo Helicobacter pylori coloniza la mucosa estomacal neutralizando localmente el ácido mediante la enzima ureasa, y que la erradicación bacteriana con antibióticos cura de raíz la inmensa mayoría de las úlceras recurrentes. Este giro demostró cómo el consenso de autoridad puede retrasar décadas una terapia curativa».',
    statement:
      'En la estructura argumentativa del texto, la mención inicial al estrés emocional y a la dieta irritante cumple la función de:',
    options: [
      {
        id: 'A',
        text: 'Presentar la tesis central que el autor defiende como causa única y definitiva de las enfermedades digestivas modernas.',
      },
      {
        id: 'B',
        text: 'Exponer el paradigma médico tradicional que posteriormente es refutado por la evidencia microbiológica introducida tras el conector «Sin embargo».',
      },
      {
        id: 'C',
        text: 'Demostrar que el uso de antibióticos resulta siempre ineficaz si el paciente no abandona primero el estrés laboral.',
      },
      {
        id: 'D',
        text: 'Criticar a Warren y Marshall por haber ignorado los factores psicológicos en el diseño de sus experimentos clínicos.',
      },
    ],
    correctOption: 'B',
    explanation:
      'El texto emplea polifonía contrastiva: primero introduce una voz ajena («la gastroenterología académica sostuvo como dogma...») y luego utiliza el conector adversativo de quiebre «Sin embargo» para presentar el hallazgo científico que desmintió dicho dogma y sustentar la conclusión del autor sobre el peso del consenso de autoridad.',
    distractorAnalysis: {
      A: 'INCORRECTA (Confusión entre voz citada y tesis del autor). Atribuye al autor la creencia antigua que el propio texto califica de dogma superado.',
      B: 'CORRECTA. Identifica con precisión el rol retórico del paradigma previo y la función refutadora del conector «Sin embargo».',
      C: 'INCORRECTA (Cuantificador absoluto «siempre» + Contradicción). El texto afirma que los antibióticos curan de raíz la inmensa mayoría de las úlceras recurrentes.',
      D: 'INCORRECTA (Inversión del sentido). El autor elogia el descubrimiento de Warren y Marshall como una superación de un prejuicio de autoridad.',
    },
  },
  {
    id: 'cl-10',
    component: 'Competencia Lectora',
    level: 'Avanzado',
    topic: 'Concesiones argumentativas (Aunque / Si bien) y postura del autor',
    contextText:
      '«Si bien la automatización algorítmica en la lectura de radiografías de tórax alcanza hoy tasas de sensibilidad comparables —y en ciertos nódulos milimétricos superiores— a las del ojo humano entrenado, delegar el juicio clínico final en una red neuronal opaca entraña un extravío ético inaceptable. La máquina correlaciona píxeles con probabilidades estadísticas, pero carece de comprensión fisiopatológica y no puede asumir responsabilidad moral ni jurídica ante un falso negativo. Por ello, la inteligencia artificial debe operar como una segunda lectura de apoyo y nunca como sustituto de la deliberación médica».',
    statement:
      'Al analizar la cláusula encabezada por el conector «Si bien» en el primer enunciado, es correcto afirmar que el autor:',
    options: [
      {
        id: 'A',
        text: 'Se contradice a sí mismo, pues primero afirma que la inteligencia artificial es infalible y luego sostiene que no sirve para detectar nódulos.',
      },
      {
        id: 'B',
        text: 'Realiza una concesión retórica reconociendo la eficacia técnica del algoritmo en la detección visual, antes de defender su tesis sobre la indelegabilidad del juicio ético y clínico.',
      },
      {
        id: 'C',
        text: 'Demuestra que los médicos radiólogos deben ser reemplazados únicamente en los hospitales que cuenten con redes neuronales de última generación.',
      },
      {
        id: 'D',
        text: 'Sostiene que las probabilidades estadísticas carecen de toda utilidad en la medicina contemporánea.',
      },
    ],
    correctOption: 'B',
    explanation:
      'En la estructura concesiva «Si bien [A], [B]», el autor admite de buena fe un punto verdadero de la postura contraria ([A]: la alta sensibilidad técnica del algoritmo en imágenes) para mostrar objetividad, pero subordina ese dato a su tesis principal ([B]: que la responsabilidad ética y fisiopatológica del médico es insustituible).',
    distractorAnalysis: {
      A: 'INCORRECTA (Incomprensión del mecanismo concesivo). Reconocer una virtud técnica mientras se señala un límite ético no es contradicción, sino matiz argumentativo.',
      B: 'CORRECTA. Distingue con rigor la idea concedida (eficacia estadística visual) de la tesis central defendida por el autor.',
      C: 'INCORRECTA (Contradicción directa). El cierre del texto afirma expresamente que la IA «nunca» debe operar como sustituto de la deliberación médica.',
      D: 'INCORRECTA (Cuantificador absoluto «toda utilidad»). El autor propone usar la IA como «segunda lectura de apoyo», lo que reconoce su utilidad instrumental.',
    },
  },
  {
    id: 'cl-11',
    component: 'Competencia Lectora',
    level: 'Básico',
    topic: 'Ceguera a la negación: preguntas tipo EXCEPTO / NO es compatible',
    contextText:
      '«El sueño profundo de ondas lentas no es un simple estado de pasividad metabólica destinado al reposo muscular. Investigaciones recientes sobre el sistema glinfático revelan que, durante esta fase, el espacio intersticial del cerebro se expande hasta en un sesenta por ciento, permitiendo que el líquido cefalorraquídeo barra neurotoxinas acumuladas en la vigilia, como los péptidos beta-amiloides asociados al deterioro neurodegenerativo. En consecuencia, la privación crónica de sueño interfiere directamente con la higiene bioquímica cerebral y acelera el envejecimiento sináptico».',
    statement:
      'Todas las siguientes afirmaciones son compatibles con la información suministrada en el texto, EXCEPTO:',
    options: [
      {
        id: 'A',
        text: 'Durante la fase de sueño profundo se facilita el drenaje de desechos metabólicos acumulados mientras estamos despiertos.',
      },
      {
        id: 'B',
        text: 'El aumento del espacio intersticial cerebral en el sueño de ondas lentas favorece la circulación del líquido cefalorraquídeo.',
      },
      {
        id: 'C',
        text: 'La función exclusiva del sueño profundo consiste en relajar la musculatura esquelética mediante la inactividad total del cerebro.',
      },
      {
        id: 'D',
        text: 'Dormir de manera insuficiente durante periodos prolongados obstaculiza los mecanismos de limpieza bioquímica del tejido nervioso.',
      },
    ],
    correctOption: 'C',
    explanation:
      '¡Atención al marcador negativo «EXCEPTO»! Buscamos la única afirmación FALSA o incompatible con el texto. Las opciones A, B y D parafrasean fielmente el pasaje. En cambio, la opción C contradice la primera línea del texto («no es un simple estado de pasividad metabólica destinado al reposo muscular») e introduce el cuantificador absoluto «exclusiva».',
    distractorAnalysis: {
      A: 'INCORRECTA (Ceguera a la negación). Es una afirmación verdadera según el texto; marcarla ocurre por olvidar que la pregunta pide el EXCEPTO.',
      B: 'INCORRECTA (Ceguera a la negación). Es verdadera: el texto indica que el espacio intersticial se expande hasta un 60 % permitiendo el barrido.',
      C: 'CORRECTA (Es el EXCEPTO). Contradice directamente la tesis del texto y emplea los absolutos «exclusiva» e «inactividad total».',
      D: 'INCORRECTA (Ceguera a la negación). Es verdadera según la oración final («la privación crónica de sueño interfiere...»).',
    },
  },
  {
    id: 'cl-12',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Función de párrafos y progresión temática',
    contextText:
      '«[1] Suele afirmarse en los manuales escolares que la imprenta de tipos móviles de Gutenberg democratizó instantáneamente el saber en toda Europa a mediados del siglo XV. [2] No obstante, los registros de alfabetización y el costo del papel de trapo muestran que, durante sus primeras cinco décadas, el libro impreso siguió siendo un objeto suntuario restringido a élites eclesiásticas, juristas y mercaderes acaudalados. [3] Fue recién en el siglo XVI, con la proliferación de panfletos baratos en lenguas vernáculas durante las disputas religiosas, cuando la cultura impresa permeó realmente a los artesanos y campesinos urbanos».',
    statement:
      '¿Qué relación lógica y estructural guardan entre sí las tres oraciones numeradas que componen el párrafo anterior?',
    options: [
      {
        id: 'A',
        text: '[1] formula una hipótesis científica vigente; [2] aporta pruebas que la confirman; y [3] propone predecir el futuro del libro digital.',
      },
      {
        id: 'B',
        text: '[1] enuncia un lugar común historiográfico; [2] lo refuta parcialmente señalando sus límites materiales iniciales; y [3] precisa el momento y mecanismo histórico real del fenómeno.',
      },
      {
        id: 'C',
        text: '[1] describe la biografía de Gutenberg; [2] critica la religión medieval; y [3] demuestra que los campesinos nunca aprendieron a leer.',
      },
      {
        id: 'D',
        text: '[1], [2] y [3] enumeran tres causas simultáneas e independientes que ocurrieron exactamente en el mismo año del siglo XV.',
      },
    ],
    correctOption: 'B',
    explanation:
      'La oración [1] introduce una creencia generalizada («Suele afirmarse... democratizó instantáneamente»); la oración [2], encabezada por «No obstante», desmiente esa inmediatez mostrando la barrera económica y de alfabetización en el siglo XV; y la oración [3] establece cuándo y cómo ocurrió efectivamente esa difusión amplia en el siglo XVI.',
    distractorAnalysis: {
      A: 'INCORRECTA. [2] no confirma [1], sino que la corrige; además, en ningún momento se menciona el libro digital.',
      B: 'CORRECTA. Describe con exactitud la arquitectura tripartita: mito común → objeción empírica → precisión histórica.',
      C: 'INCORRECTA (Cuantificador absoluto «nunca» + distorsión). [3] dice precisamente que en el siglo XVI la cultura impresa sí permeó a artesanos y campesinos urbanos.',
      D: 'INCORRECTA. No son simultáneas del mismo año: el texto contrasta mediados del siglo XV con el siglo XVI.',
    },
  },
  {
    id: 'cl-13',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Etimologías grecolatinas y precisión conceptual en texto académico',
    contextText:
      '«El dolor crónico neuropático difiere sustancialmente del dolor nociceptivo agudo. Mientras este último opera como una alarma fisiológica adaptativa ante una lesión tisular real, el primero persiste de forma autónoma tras la cicatrización del tejido, convirtiéndose en una patología en sí misma. En esta condición, el paciente suele experimentar alodinia —la percepción dolorosa frente a un estímulo táctil inocuo, como el roce de una sábana— debido a una sensibilización anómala de las vías aferentes del sistema nervioso central».',
    statement:
      'Considerando las raíces griegas de «alodinia» (állos: "otro, diferente, extraño" + odýne: "dolor") y la explicación del fragmento, este término designa clínicamente:',
    options: [
      {
        id: 'A',
        text: 'La ausencia total de sensibilidad frente a quemaduras o heridas profundas por destrucción de los nervios periféricos.',
      },
      {
        id: 'B',
        text: 'Una respuesta dolorosa anómala desencadenada por un estímulo distinto a los que normalmente producen daño o dolor.',
      },
      {
        id: 'C',
        text: 'El dolor empático que una persona sana siente al observar el sufrimiento físico de otro individuo cercano.',
      },
      {
        id: 'D',
        text: 'La curación espontánea e inmediata de una lesión tisular gracias al reposo absoluto en cama.',
      },
    ],
    correctOption: 'B',
    explanation:
      'Etimológicamente, állos ("otro/distinto") + odýne ("dolor") alude a un dolor provocado por un estímulo "otro" (distinto al estímulo nocivo habitual). El texto lo define explícitamente entre guiones como «la percepción dolorosa frente a un estímulo táctil inocuo, como el roce de una sábana».',
    distractorAnalysis: {
      A: 'INCORRECTA (Confusión conceptual C). La ausencia de sensibilidad al dolor se denomina analgesia o anestesia, lo opuesto a la alodinia.',
      B: 'CORRECTA. Articula con precisión la raíz állos (estímulo diferente/inocuo) y odýne (respuesta de dolor) según el cotexto.',
      C: 'INCORRECTA (Falsa interpretación etimológica). Interpreta «állos» como "otra persona" (empatía social) ignorando la definición clínica dada entre guiones.',
      D: 'INCORRECTA (Descuido T). Toma la palabra «sábana» del ejemplo para inventar una supuesta curación por reposo en cama.',
    },
  },
  {
    id: 'cl-14',
    component: 'Competencia Lectora',
    level: 'Básico',
    topic: 'Semántica contextual y sentido figurado',
    contextText:
      '«En las democracias contemporáneas, la inflación legislativa —esa tendencia febril de los parlamentos a promulgar una ley nueva cada vez que un problema social ocupa los titulares matutinos— suele producir un espejismo de eficacia gubernamental. Sin presupuesto operativo, sin instituciones fiscalizadoras ni pedagogía ciudadana, los códigos jurídicos se convierten en cementerios de buenas intenciones: textos solemnes que apaciguan momentáneamente la indignación pública mientras la realidad permanece intacta».',
    statement:
      'En el contexto del fragmento, las expresiones «inflación legislativa» y «cementerios de buenas intenciones» significan, respectivamente:',
    options: [
      {
        id: 'A',
        text: 'El aumento del salario de los congresistas debido al costo de vida; y los archivos históricos donde reposan las constituciones del siglo pasado.',
      },
      {
        id: 'B',
        text: 'La proliferación excesiva de normas que pierden valor práctico por falta de respaldo real; y compilaciones de leyes bienintencionadas pero inoperantes.',
      },
      {
        id: 'C',
        text: 'La prohibición económica de emitir moneda sin permiso del parlamento; y la pena de muerte aplicada en los códigos penales antiguos.',
      },
      {
        id: 'D',
        text: 'La necesidad urgente de redactar más leyes todos los días; y los tribunales donde siempre se castiga a los funcionarios corruptos.',
      },
    ],
    correctOption: 'B',
    explanation:
      'Así como la inflación monetaria consiste en emitir mucho dinero que pierde poder adquisitivo, la «inflación legislativa» es definida por el autor como promulgar leyes febrilmente sin presupuesto ni ejecución. Consecuentemente, los códigos se vuelven «cementerios de buenas intenciones», es decir, lugares donde yacen muertas (sin aplicación real) normas con propósitos nobles.',
    distractorAnalysis: {
      A: 'INCORRECTA (Literalismo económico/histórico). Confunde la metáfora de «inflación» con sueldos e interpreta «cementerio» como archivo antiguo.',
      B: 'CORRECTA. Captura con exactitud ambas metáforas conceptuales en función de la crítica del autor a la ineficacia normativa.',
      C: 'INCORRECTA (Literalismo extremo). Asocia «inflación» con bancos centrales y «cementerios» con pena capital, ajenos al tema del texto.',
      D: 'INCORRECTA (Contradicción + Cuantificador absoluto «siempre»). El autor critica precisamente la promulgación febril de leyes sin respaldo.',
    },
  },
  {
    id: 'cl-15',
    component: 'Competencia Lectora',
    level: 'Avanzado',
    topic: 'Lectura literaria: ironía, narrador y subtexto crítico',
    contextText:
      '«Don Anselmo se enorgullecía de poseer la biblioteca más vasta de la provincia: cuatro mil volúmenes encuadernados en piel de becerro con cantos dorados, ordenados rigurosamente por la estatura del lomo y la armonía cromática de las cubiertas para que ningún matiz discordante perturbara la vista de sus visitantes ilustres. Jamás permitía que alguien abriera un ejemplar, pues, según explicaba con gravedad doctoral, el roce vulgar de los dedos fatigaba la nobleza del papel y las ideas, una vez leídas, perdían el misterio intacto de los objetos sagrados».',
    statement:
      'A través del tono irónico del relato, el narrador pone en evidencia fundamentalmente:',
    options: [
      {
        id: 'A',
        text: 'El admirable celo científico de don Anselmo por preservar los manuscritos antiguos frente a la humedad ambiental de la provincia.',
      },
      {
        id: 'B',
        text: 'La reducción del libro a un fetiche de ostentación estética y estatus social, vaciado de su función esencial como vehículo de lectura y pensamiento.',
      },
      {
        id: 'C',
        text: 'Que todos los coleccionistas de libros encuadernados en piel son personas analfabetas que odian la literatura universal.',
      },
      {
        id: 'D',
        text: 'La conveniencia de ordenar las bibliotecas públicas por el tamaño y color de las portadas en lugar de usar catálogos temáticos.',
      },
    ],
    correctOption: 'B',
    explanation:
      'El narrador construye una sátira sutil: don Anselmo ordena los libros por tamaño y color («para la vista de sus visitantes») y prohíbe abrirlos y leerlos bajo excusas solemnes («gravedad doctoral»). La ironía desenmascara la vanidad de quien convierte la cultura en pura decoración de prestigio.',
    distractorAnalysis: {
      A: 'INCORRECTA (Lectura ingenua / Ceguera a la ironía). Toma en serio la excusa pomposa de don Anselmo como si fuera celo científico genuino.',
      B: 'CORRECTA. Identifica el subtexto crítico de la ironía: la apariencia ornamental suplanta la función intelectual de la lectura.',
      C: 'INCORRECTA (Generalización con cuantificador absoluto «todos»). Extrapola el retrato satírico de un personaje a una ley absoluta sobre todo coleccionista.',
      D: 'INCORRECTA (Contradicción del sentido irónico). Ordenar libros por altura y color es precisamente el síntoma de superficialidad ridiculizado en el cuento.',
    },
  },
  {
    id: 'cl-16',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Elementos discursivos: deixis, anáfora y signos de puntuación',
    contextText:
      '«En el debate ambiental contemporáneo suelen enfrentarse dos posturas ante la escasez hídrica: el "optimismo tecnocrático" y la "frugalidad ecológica". Mientras que aquel confía en que la desalinización masiva y la geoingeniería compensarán cualquier incremento en la demanda industrial sin alterar nuestros hábitos de consumo, esta sostiene que ninguna innovación técnica bastará si no se transforma la lógica extractiva que agota las cuencas hidrográficas».',
    statement:
      'En el fragmento anterior, el pronombre demostrativo «aquel», el demostrativo «esta» y el uso de comillas en ambas denominaciones cumplen, respectivamente, la función de:',
    options: [
      {
        id: 'A',
        text: 'Remitir al «optimismo tecnocrático»; remitir a la «frugalidad ecológica»; y delimitar etiquetas conceptuales que sintetizan las dos corrientes en disputa.',
      },
      {
        id: 'B',
        text: 'Remitir a la «frugalidad ecológica»; remitir al «optimismo tecnocrático»; y señalar que ambas expresiones son errores ortográficos del autor.',
      },
      {
        id: 'C',
        text: 'Referirse al «debate ambiental»; referirse a la «escasez hídrica»; y citar textualmente las palabras de un campesino afectado por la sequía.',
      },
      {
        id: 'D',
        text: 'Sustituir a la «geoingeniería»; sustituir a la «desalinización»; y expresar burla sarcástica hacia todas las ciencias de la tierra.',
      },
    ],
    correctOption: 'A',
    explanation:
      'En español académico, cuando se mencionan dos referentes («optimismo tecnocrático» en primer lugar y «frugalidad ecológica» en segundo lugar), el demostrativo de lejanía «aquel» remite al primero nombrado (el más lejano hacia atrás) y el de cercanía «esta» remite al último nombrado (el más cercano). Las comillas enmarcan las dos categorías conceptuales analizadas.',
    distractorAnalysis: {
      A: 'CORRECTA. Aplica con exactitud la regla deíctica de «aquel» (primer referente) y «esta» (segundo referente), así como la función metalingüística/conceptual de las comillas.',
      B: 'INCORRECTA (Inversión anafórica T). Invierte el orden de los pronombres «aquel» y «esta».',
      C: 'INCORRECTA (Error de concordancia y referente). «Debate ambiental» no confía en la desalinización ni hay citas de un campesino.',
      D: 'INCORRECTA (Referente posterior imposible). «Aquel» aparece antes de que se mencionen la desalinización y la geoingeniería.',
    },
  },
  {
    id: 'cl-17',
    component: 'Competencia Lectora',
    level: 'Avanzado',
    topic: 'Inferencia lógica estricta vs. extrapolación en texto científico',
    contextText:
      '«Un estudio longitudinal realizado durante diez años con 4.500 adultos mayores en tres ciudades andinas encontró una correlación estadística inversa entre el hábito diario de caminata al aire libre y la incidencia de deterioro cognitivo leve. Sin embargo, los propios autores del estudio advirtieron en sus conclusiones que el diseño observacional de la investigación no permite descartar la causalidad inversa: es plausible que los individuos cuyos circuitos frontales permanecen más íntegros conserven mayor iniciativa motora para salir a caminar, en lugar de que la caminata por sí sola prevenga el deterioro».',
    statement:
      'Con base EXCLUSIVAMENTE en la información del fragmento anterior, ¿cuál de las siguientes conclusiones se infiere válidamente?',
    options: [
      {
        id: 'A',
        text: 'Caminar al aire libre está completamente contraindicado para los adultos mayores porque desgasta los circuitos frontales del cerebro.',
      },
      {
        id: 'B',
        text: 'La existencia de una correlación estadística entre dos variables en un estudio observacional no basta por sí misma para establecer cuál de las dos es la causa y cuál el efecto.',
      },
      {
        id: 'C',
        text: 'Los adultos mayores que viven en ciudades costeras presentan siempre un menor deterioro cognitivo que quienes habitan en ciudades andinas.',
      },
      {
        id: 'D',
        text: 'El estudio fracasó porque una muestra de 4.500 personas durante diez años es demasiado pequeña para aplicar cualquier cálculo estadístico.',
      },
    ],
    correctOption: 'B',
    explanation:
      'El núcleo epistemológico del texto radica en que, pese a hallar una correlación estadística inversa entre caminata y deterioro cognitivo, el carácter observacional del estudio impide afirmar unidireccionalmente que A causa B, pues también es plausible que B (integridad frontal previa) facilite A (salir a caminar).',
    distractorAnalysis: {
      A: 'INCORRECTA (Contradicción absurda). La correlación observada fue inversa con el deterioro (quienes caminaban tenían menos deterioro, no más).',
      B: 'CORRECTA. Es una deducción rigurosa directamente sustentada por la advertencia metodológica sobre correlación vs. causalidad inversa.',
      C: 'INCORRECTA (Extrapolación geográfica + absoluto «siempre»). El texto jamás menciona ciudades costeras ni hace comparaciones de altitud.',
      D: 'INCORRECTA (Falsa causa). La limitación señalada no se debe al tamaño de la muestra, sino al diseño observacional (no experimental) del estudio.',
    },
  },
  {
    id: 'cl-18',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Relaciones analógicas en comprensión de lectura',
    contextText:
      '«Pretender erradicar la desinformación digital mediante la censura previa de plataformas equivale a intentar suprimir la fiebre rompiendo el termómetro clínico: se elimina el registro visible del síntoma, pero el proceso infeccioso subyacente continúa propagándose en la clandestinidad, ahora privado de vigilancia pública. La verdadera inmunidad frente al bulo no proviene del silenciamiento administrativo, sino de fortalecer los anticuerpos críticos de los lectores».',
    statement:
      'Dentro de la analogía médica desarrollada por el autor a lo largo del párrafo, los «anticuerpos críticos de los lectores» guardan con el «bulo (desinformación)» una relación equivalente a la que existe entre:',
    options: [
      {
        id: 'A',
        text: 'El termómetro roto y la fiebre alta.',
      },
      {
        id: 'B',
        text: 'La defensa inmunológica interna del organismo y el agente infeccioso patógeno.',
      },
      {
        id: 'C',
        text: 'La censura administrativa y la vigilancia epidemiológica pública.',
      },
      {
        id: 'D',
        text: 'La clandestinidad digital y el hospital universitario.',
      },
    ],
    correctOption: 'B',
    explanation:
      'El autor establece una correspondencia término a término entre el dominio médico y el comunicativo: la desinformación/bulo equivale al proceso infeccioso (patógeno), la censura equivale a romper el termómetro, y la capacidad crítica de los lectores equivale a los anticuerpos (defensa inmunológica interna) que neutralizan la infección.',
    distractorAnalysis: {
      A: 'INCORRECTA. El termómetro roto equivale a la censura previa ineficaz, no a la capacidad crítica de los lectores.',
      B: 'CORRECTA. Respeta el orden y la función exacta dentro de la metáfora estructural (defensa activa interna : amenaza infecciosa).',
      C: 'INCORRECTA. Mezcla un término del dominio político (censura) con uno médico que además son opuestos en el texto.',
      D: 'INCORRECTA. Asociación arbitraria de palabras sin relación análoga con el par consultado.',
    },
  },
  {
    id: 'cl-19',
    component: 'Competencia Lectora',
    level: 'Avanzado',
    topic: 'Lectura crítico-intertextual: convergencia y divergencia entre Texto A y Texto B',
    contextText:
      'TEXTO A: «El crecimiento exponencial del turismo masivo en los centros históricos latinoamericanos ha desencadenado una museificación estéril: las viviendas tradicionales son reemplazadas por franquicias efímeras, el costo del arriendo expulsa a los residentes originarios y la vida barrial auténtica se convierte en una escenografía pintoresca diseñada exclusivamente para el visitante foráneo».\n\nTEXTO B: «Demonizar el turismo urbano como simple depredación cultural ignora que, antes de su auge, numerosos centros históricos permanecían sumidos en el abandono arquitectónico y la precariedad fiscal. El flujo turístico aporta los recursos tributarios indispensables para restaurar el patrimonio edilicio; el desafío real no es clausurar la ciudad al viajero, sino regular el suelo habitacional para evitar el desplazamiento vecinal».',
    statement:
      'Del contraste entre el Texto A y el Texto B se deduce que ambos autores reconocen el riesgo de desplazamiento de los habitantes tradicionales, pero difieren en que el autor del Texto B:',
    options: [
      {
        id: 'A',
        text: 'Niega que el patrimonio arquitectónico tenga valor histórico y propone demoler los edificios antiguos para construir hoteles modernos.',
      },
      {
        id: 'B',
        text: 'Introduce una valoración del aporte económico del turismo para la conservación patrimonial y plantea que la expulsión residencial es corregible mediante regulación pública.',
      },
      {
        id: 'C',
        text: 'Afirma que todos los turistas extranjeros buscan destruir deliberadamente las costumbres de los barrios latinoamericanos.',
      },
      {
        id: 'D',
        text: 'Coincide plenamente con el Texto A en que el turismo no aporta ningún beneficio tributario a los municipios receptores.',
      },
    ],
    correctOption: 'B',
    explanation:
      'Ambos textos admiten el fenómeno del desplazamiento vecinal («expulsa a los residentes originarios» en A; «evitar el desplazamiento vecinal» en B). La diferencia estriba en que el Texto A presenta el turismo como una fuerza puramente degradante («museificación estéril»), mientras que el Texto B rescata su necesidad financiera para restaurar el patrimonio y propone encauzarlo con regulación del suelo.',
    distractorAnalysis: {
      A: 'INCORRECTA (Contradicción total). El Texto B defiende el turismo precisamente porque aporta recursos para «restaurar el patrimonio edilicio».',
      B: 'CORRECTA. Identifica con precisión el matiz económico-regulatorio que el Texto B contrapone al diagnóstico del Texto A.',
      C: 'INCORRECTA (Cuantificador absoluto «todos» + Falsa atribución). Ni siquiera el Texto A atribuye mala fe individual a todos los turistas, sino un efecto estructural.',
      D: 'INCORRECTA (Contradicción). El Texto B afirma explícitamente que el flujo turístico aporta recursos tributarios indispensables.',
    },
  },
  {
    id: 'cl-20',
    component: 'Competencia Lectora',
    level: 'Básico',
    topic: 'Identificación de idea central y título pertinente',
    contextText:
      '«A diferencia de los antibióticos de amplio espectro, que eliminan indiscriminadamente tanto a las bacterias patógenas como a la microbiota intestinal benéfica, la fagoterapia utiliza virus bacteriófagos capaces de reconocer y destruir únicamente a una especie o cepa bacteriana específica. Aunque esta terapia fue descubierta hace más de un siglo en Europa oriental, cayó en el olvido en Occidente tras el hallazgo de la penicilina. Hoy, ante el avance global de las superbacterias multirresistentes, la medicina investiga de nuevo a los bacteriófagos como una alternativa quirúrgica y ecológica para tratar infecciones intratables».',
    statement:
      '¿Cuál de los siguientes títulos sintetiza con mayor fidelidad y precisión el contenido global del texto anterior?',
    options: [
      {
        id: 'A',
        text: 'Historia biográfica de Alexander Fleming y el fracaso definitivo de la penicilina en el siglo XX.',
      },
      {
        id: 'B',
        text: 'La fagoterapia: especificidad biológica y resurgimiento médico frente a la resistencia bacteriana.',
      },
      {
        id: 'C',
        text: 'Peligros mortales de los virus bacteriófagos para las células humanas y la flora intestinal.',
      },
      {
        id: 'D',
        text: 'Por qué todos los hospitales europeos prohibieron el uso de antibióticos desde hace un siglo.',
      },
    ],
    correctOption: 'B',
    explanation:
      'Un buen título macroestructural debe recoger el tema eje (la fagoterapia) y los dos predicados fundamentales desarrollados en el párrafo: su mecanismo selectivo (especificidad frente a la microbiota) y su renacimiento actual ante la crisis de las superbacterias multirresistentes.',
    distractorAnalysis: {
      A: 'INCORRECTA (Extrapolación + Contradicción). Ni se narra la vida de Fleming ni la penicilina fue un fracaso en el siglo XX.',
      B: 'CORRECTA. Recoge de manera equilibrada el mecanismo biológico y el contexto histórico-actual del texto.',
      C: 'INCORRECTA (Contradicción directa). El texto destaca que los fagos atacan únicamente a la bacteria diana respetando la microbiota benéfica.',
      D: 'INCORRECTA (Cuantificador absoluto «todos» + Falsedad). En Occidente no se prohibieron los antibióticos; por el contrario, desplazaron a los fagos.',
    },
  },
  {
    id: 'cl-21',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Conectores lógicos y reconstrucción de coherencia argumentativa',
    contextText:
      '«La divulgación histórica rigurosa exige consultar las fuentes primarias en su idioma y contexto originales; ____________, cuando el investigador proyecta acríticamente los valores morales del siglo XXI sobre las mentalidades antiguas, incurre en el vicio metodológico del anacronismo. ____________ dicho sesgo resulte comprensible en el debate cotidiano, la academia debe explicitar la distancia temporal ____________ comprender las acciones humanas sin caricaturizarlas».',
    statement:
      'Seleccione la secuencia de conectores que completa los espacios en blanco manteniendo la coherencia lógica y gramatical del fragmento:',
    options: [
      {
        id: 'A',
        text: 'de lo contrario — Aunque — con el fin de',
      },
      {
        id: 'B',
        text: 'gracias a ello — Puesto que — a pesar de',
      },
      {
        id: 'C',
        text: 'sin embargo — Por lo tanto — en contra de',
      },
      {
        id: 'D',
        text: 'además — Debido a que — sin',
      },
    ],
    correctOption: 'A',
    explanation:
      '1) En el primer espacio se introduce la consecuencia negativa de NO cumplir la exigencia previa (consultar las fuentes en su contexto): «de lo contrario» (o «en efecto / pues»), si proyecta valores actuales, cae en anacronismo.\n2) En el segundo espacio hay un verbo en subjuntivo («resulte comprensible») que introduce una concesión antes de la obligación académica: «Aunque».\n3) En el tercer espacio se expresa el propósito o finalidad («comprender las acciones»): «con el fin de».',
    distractorAnalysis: {
      A: 'CORRECTA. Articula con precisión la advertencia condicional negativa («de lo contrario»), la concesión con subjuntivo («Aunque») y la finalidad («con el fin de»).',
      B: 'INCORRECTA. «Puesto que» no rige subjuntivo («resulte») ni «a pesar de» expresa la finalidad de comprender sin caricaturizar.',
      C: 'INCORRECTA. «En contra de comprender» invierte absurdamente el propósito del historiador.',
      D: 'INCORRECTA. «Debido a que resulte» es agramatical y «sin comprender» contradice la tesis del párrafo.',
    },
  },
  {
    id: 'cl-22',
    component: 'Competencia Lectora',
    level: 'Avanzado',
    topic: 'Presuposiciones e implícitos pragmáticos en discurso filosófico',
    contextText:
      '«Quienes celebran que la hiperconectividad digital haya abolido por fin la soledad confunden el aislamiento físico con la indigencia existencial. Estar permanentemente disponible en una red de notificaciones incesantes no garantiza el encuentro dialógico con el otro; con frecuencia, solo suministra un ruido blanco social que nos dispensa de habitar nuestro propio silencio interior. Y quien es incapaz de sostener un soliloquio fecundo consigo mismo rara vez aporta algo más que ecos prestados a la conversación pública».',
    statement:
      '¿Cuál de los siguientes supuestos filosóficos subyace necesariamente a la argumentación del autor en las dos últimas oraciones del fragmento?',
    options: [
      {
        id: 'A',
        text: 'La autenticidad del diálogo con los demás requiere como condición previa la capacidad de reflexión solitaria e interioridad personal.',
      },
      {
        id: 'B',
        text: 'El ser humano es una criatura biológicamente antisocial que alcanza la felicidad únicamente cuando rompe todo vínculo con la comunidad.',
      },
      {
        id: 'C',
        text: 'Las telecomunicaciones modernas fueron diseñadas por filósofos clásicos para fomentar el soliloquio y el silencio meditativo.',
      },
      {
        id: 'D',
        text: 'La conversación pública carece de importancia política y debe ser reemplazada por el voto electrónico silencioso.',
      },
    ],
    correctOption: 'A',
    explanation:
      'Al afirmar que «quien es incapaz de sostener un soliloquio fecundo consigo mismo rara vez aporta algo más que ecos prestados a la conversación pública», el autor presupone que la vida interior (la soledad reflexiva) no es enemiga de la vida social, sino la fuente que nutre un diálogo genuino y no repetitivo con los otros.',
    distractorAnalysis: {
      A: 'CORRECTA. Explicita el supuesto que conecta la necesidad del silencio interior con la calidad del encuentro dialógico público.',
      B: 'INCORRECTA (Cuantificador absoluto «únicamente» + Extrapolación). El autor valora el «encuentro dialógico con el otro» y la «conversación pública»; no predica la misantropía.',
      C: 'INCORRECTA (Contradicción). El texto afirma que las notificaciones suelen operar como un «ruido blanco» que impide el silencio interior.',
      D: 'INCORRECTA (Extrapolación ajena al texto). En ningún momento se menciona el voto electrónico ni se desprecia la conversación pública.',
    },
  },
  {
    id: 'cl-23',
    component: 'Competencia Lectora',
    level: 'Básico',
    topic: 'Sinonimia contextual en textos de ciencias sociales',
    contextText:
      '«La paz territorial no puede concebirse como un decreto **perentorio** redactado en los despachos ministeriales de la capital y aplicado de forma homogénea sobre geografías dispares. Cuando el Estado ignora las economías campesinas locales y las formas consuetudinarias de resolución de conflictos, las reformas institucionales resultan **inocuas** frente a las violencias estructurales que pretendían desactivar».',
    statement:
      'En el fragmento anterior, las palabras resaltadas «perentorio» e «inocuas» pueden sustituirse sin alterar el sentido contextual por:',
    options: [
      {
        id: 'A',
        text: 'provisional — letales',
      },
      {
        id: 'B',
        text: 'tajante / inapelable — ineficaces / inofensivas',
      },
      {
        id: 'C',
        text: 'participativo — violentas',
      },
      {
        id: 'D',
        text: 'antiguo — indispensables',
      },
    ],
    correctOption: 'B',
    explanation:
      'Un decreto «perentorio» es aquel concluyente, urgente, tajante o que no admite discusión ni demora (impuesto verticalmente desde la capital). Por su parte, «inocuo» significa literalmente que no hace daño; en el contexto de una reforma frente a la violencia estructural, decir que resulta «inocua» frente al problema significa que no le hace mella, es decir, resulta inofensiva o ineficaz para desactivarlo.',
    distractorAnalysis: {
      A: 'INCORRECTA (Antónimos contextuales). «Perentorio» no es provisional, e «inocuo» es exactamente lo contrario de letal.',
      B: 'CORRECTA. Conserva tanto el significado léxico como el matiz crítico sobre la imposición centralista y la falta de efecto de las reformas.',
      C: 'INCORRECTA. El texto critica precisamente que el decreto NO sea participativo.',
      D: 'INCORRECTA. Sustituciones arbitrarias sin relación semántica con los vocablos originales.',
    },
  },
  {
    id: 'cl-24',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Debilitamiento y fortalecimiento de hipótesis en textos científicos',
    contextText:
      '«Para explicar la extinción masiva de la megafauna pleistocénica en América del Sur —como los megaterios y gliptodontes—, la hipótesis del "sobreexterminio humano" (blitzkrieg) sostiene que la llegada de los primeros grupos de cazadores-recolectores hace unos trece mil años provocó el colapso rápido de estas especies debido a que los grandes herbívoros carecían de reflejos defensivos frente a un nuevo depredador bípedo armado con puntas de proyectil líticas».',
    statement:
      '¿Cuál de los siguientes hallazgos paleontológicos, de comprobarse como verdadero, DEBILITARÍA con mayor fuerza la hipótesis del «sobreexterminio humano» expuesta en el texto?',
    options: [
      {
        id: 'A',
        text: 'El descubrimiento de huesos de megaterio con marcas de corte producidas por herramientas de piedra junto a fogones humanos antiguos.',
      },
      {
        id: 'B',
        text: 'La datación por radiocarbono que demuestre que el 85 % de las especies de megafauna sudamericana ya habían desaparecido dos mil años antes del arribo de los primeros humanos a esas regiones.',
      },
      {
        id: 'C',
        text: 'La confirmación de que las puntas de lanza de cuarzo y obsidiana eran capaces de perforar la piel gruesa de los grandes mamíferos.',
      },
      {
        id: 'D',
        text: 'El hallazgo de pinturas rupestres que representan escenas de caza colectiva de grandes herbívoros en la Patagonia.',
      },
    ],
    correctOption: 'B',
    explanation:
      'Para debilitar o refutar una relación causal (A causó B), la prueba más contundente consiste en demostrar que el efecto (B: la extinción de la megafauna) ocurrió cronológicamente ANTES de que apareciera la supuesta causa (A: la llegada de los cazadores humanos). Las opciones A, C y D, por el contrario, fortalecerían la hipótesis.',
    distractorAnalysis: {
      A: 'INCORRECTA (Ceguera al verbo «DEBILITARÍA»). Este hallazgo fortalecería la hipótesis de caza humana.',
      B: 'CORRECTA. Rompe el requisito básico de toda causalidad: una causa no puede ser posterior en el tiempo a su efecto.',
      C: 'INCORRECTA. Fortalece la viabilidad técnica del exterminio por proyectiles líticos.',
      D: 'INCORRECTA. Respalda la interacción cinegética entre humanos y megafauna.',
    },
  },
  {
    id: 'cl-25',
    component: 'Competencia Lectora',
    level: 'Avanzado',
    topic: 'Tono discursivo y actitud crítica del autor',
    contextText:
      '«Resulta enternecedor observar cómo las grandes corporaciones petroquímicas, tras medio siglo de financiar campañas para sembrar dudas sobre el calentamiento global, descubren súbitamente su vocación ecológica en los anuncios televisivos de primavera. Basta con teñir de verde el logotipo institucional, reemplazar los pitillos de plástico en la cafetería ejecutiva y prometer una neutralidad de carbono para el lejano año 2070 —cuando ninguno de los directivos actuales ocupe ya su sillón— para lavar la conciencia accionaria sin reducir un solo barril de extracción presente».',
    statement:
      'El tono predominante que emplea el autor en el fragmento anterior para caracterizar la publicidad ambiental de ciertas corporaciones puede definirse como:',
    options: [
      {
        id: 'A',
        text: 'Apologético y laudatorio, pues celebra la conversión sincera de los directivos empresariales hacia el ambientalismo.',
      },
      {
        id: 'B',
        text: 'Sarcástico y desmitificador, pues utiliza la ironía («Resulta enternecedor...») para denunciar la hipocresía del lavado de imagen ecológica (greenwashing).',
      },
      {
        id: 'C',
        text: 'Neutro e imparcial, ya que se limita a transcribir balances financieros sin emitir ningún juicio de valor.',
      },
      {
        id: 'D',
        text: 'Pesimista y resignado, porque concluye que el planeta Tierra se extinguirá inevitablemente antes del año 2070.',
      },
    ],
    correctOption: 'B',
    explanation:
      'El adjetivo inicial «enternecedor» aplicado a empresas que financiaron el negacionismo climático, junto con el contraste entre gestos cosméticos («pitillos en la cafetería ejecutiva», promesas para 2070) y la realidad («sin reducir un solo barril»), configura un tono claramente sarcástico y crítico destinado a desenmascarar el oportunismo publicitario.',
    distractorAnalysis: {
      A: 'INCORRECTA (Lectura literal de la ironía). Confunde el sarcasmo de «Resulta enternecedor» con un elogio real.',
      B: 'CORRECTA. Identifica con precisión el mecanismo irónico-sarcástico y su propósito de denuncia crítica.',
      C: 'INCORRECTA. El texto está cargado de adjetivación valorativa («vocación súbita», «lavar la conciencia»).',
      D: 'INCORRECTA (Extrapolación apocalíptica). El año 2070 se menciona como plazo evasivo de los directivos, no como fecha de extinción planetaria.',
    },
  },
  {
    id: 'cl-26',
    component: 'Competencia Lectora',
    level: 'Básico',
    topic: 'Tipología textual y propósito comunicativo',
    contextText:
      '«La fiebre amarilla es una enfermedad viral aguda, hemorrágica, transmitida por mosquitos infectados de los géneros Aedes y Haemagogus. El término "amarilla" alude a la ictericia que presentan algunos pacientes cuando el virus compromete el tejido hepático. Su periodo de incubación oscila entre 3 y 6 días. Aunque no existe un tratamiento antiviral específico para destruir el virus una vez contraído, la vacuna antiamarílica de dosis única confiere inmunidad efectiva y duradera en más del 95 % de las personas vacunadas a los diez días de su aplicación».',
    statement:
      'De acuerdo con sus rasgos lingüísticos y el tratamiento de la información, el texto anterior pertenece a la tipología ____________ y su intención primordial es ____________:',
    options: [
      {
        id: 'A',
        text: 'expositiva-informativa — describir objetivamente la etiología, sintomatología y prevención de una patología viral.',
      },
      {
        id: 'B',
        text: 'argumentativa-filosófica — cuestionar la obligatoriedad ética de las campañas de vacunación estatal.',
      },
      {
        id: 'C',
        text: 'narrativa-testimonial — relatar en primera persona la agonía de un explorador enfermo de ictericia en la selva.',
      },
      {
        id: 'D',
        text: 'publicitaria-comercial — persuadir a los lectores para que compren medicamentos antivirales de marca privada.',
      },
    ],
    correctOption: 'A',
    explanation:
      'El pasaje utiliza tercera persona gramatical, léxico técnico preciso (etiología viral, vectores Aedes/Haemagogus, ictericia, periodo de incubación, inmunogenicidad vacunal) y oraciones declarativas sin juicios subjetivos, rasgos propios del texto expositivo-informativo de carácter médico-epidemiológico.',
    distractorAnalysis: {
      A: 'CORRECTA. Clasifica acertadamente la superestructura expositiva y su función referencial informativa.',
      B: 'INCORRECTA. No hay debate ético ni controversia filosófica sobre leyes de vacunación.',
      C: 'INCORRECTA. Carece de narrador literario, personajes o trama anecdótica.',
      D: 'INCORRECTA (Contradicción). El texto aclara expresamente que «no existe un tratamiento antiviral específico».',
    },
  },
  {
    id: 'cl-27',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Inferencia en textos literarios breves (Microrrelato y paradoja)',
    contextText:
      '«El emperador ordenó levantar una muralla circular tan alta y espesa que ningún ejército extranjero pudiera jamás contemplar los jardines del palacio. Tres generaciones de albañiles agotaron las canteras del reino hasta cerrar el último bloque de granito sobre las nubes. Aquella misma tarde, al subir a la torre mayor para celebrar su invulnerabilidad, el nieto del emperador descubrió con espanto que el imperio entero había quedado afuera y que él era el único prisionero de una celda perfecta».',
    statement:
      'La paradoja central sobre la cual se construye el desenlace del microrrelato anterior consiste en que:',
    options: [
      {
        id: 'A',
        text: 'Los albañiles traicionaron al emperador construyendo la muralla con materiales frágiles que se derrumbaron el primer día.',
      },
      {
        id: 'B',
        text: 'La obsesión desmedida por alcanzar una seguridad excluyente terminó convirtiendo el refugio del soberano en su propio encierro y aislamiento.',
      },
      {
        id: 'C',
        text: 'Los ejércitos extranjeros lograron saltar la muralla utilizando escaleras más altas que las torres del palacio.',
      },
      {
        id: 'D',
        text: 'El nieto del emperador prefería la arquitectura de madera en lugar de las construcciones de piedra de granito.',
      },
    ],
    correctOption: 'B',
    explanation:
      'Una paradoja envuelve una contradicción aparente con sentido profundo: la obra concebida como máxima expresión de poder e invulnerabilidad frente al exterior («que ningún ejército pudiera contemplar los jardines») se revela, al completarse en extremo, como una cárcel solitaria que aísla al gobernante de su propio reino.',
    distractorAnalysis: {
      A: 'INCORRECTA (Contradicción literal). La muralla no se derrumbó; era una «celda perfecta» de granito cerrada sobre las nubes.',
      B: 'CORRECTA. Sintetiza la inversión irónica y paradójica entre protección absoluta y autosecuestro.',
      C: 'INCORRECTA (Extrapolación). Ningún ejército extranjero invadió el palacio en el relato.',
      D: 'INCORRECTA (Trivialización absurda). El espanto del nieto proviene de la toma de conciencia del encierro, no de un gusto decorativo.',
    },
  },
  {
    id: 'cl-28',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Jerarquía semántica: hiperonimia, hiponimia y cohiponimia',
    contextText:
      '«Dentro del vasto arsenal de los psicofármacos modernos, los ansiolíticos benzodiacepínicos —como el diazepam, el clonazepam y el lorazepam— actúan potenciando el efecto inhibidor del neurotransmisor GABA en el sistema nervioso central. Si bien su eficacia a corto plazo para mitigar crisis de pánico agudas está ampliamente documentada, su prescripción prolongada exige cautela clínica debido al riesgo de desarrollar tolerancia farmacológica y dependencia física».',
    statement:
      'Desde el punto de vista de las relaciones semánticas de inclusión jerárquica presentes en el primer enunciado, es correcto afirmar que:',
    options: [
      {
        id: 'A',
        text: '«Diazepam» es el hiperónimo general que engloba a todos los «psicofármacos modernos».',
      },
      {
        id: 'B',
        text: '«Psicofármacos» es hiperónimo de «ansiolíticos benzodiacepínicos», mientras que «diazepam», «clonazepam» y «lorazepam» son cohipónimos entre sí.',
      },
      {
        id: 'C',
        text: '«Neurotransmisor GABA» y «crisis de pánico» son sinónimos absolutos intercambiables en cualquier contexto médico.',
      },
      {
        id: 'D',
        text: '«Clonazepam» es hiperónimo de «sistema nervioso central».',
      },
    ],
    correctOption: 'B',
    explanation:
      'En semántica léxica, el hiperónimo es la categoría superior más amplia («psicofármacos»), que incluye como subcategoría (hipónimo) a los «ansiolíticos benzodiacepínicos». A su vez, los ejemplares específicos que comparten ese mismo nivel de inclusión («diazepam», «clonazepam», «lorazepam») son hipónimos de benzodiacepinas y cohipónimos entre sí.',
    distractorAnalysis: {
      A: 'INCORRECTA (Inversión jerárquica C). Confunde el hipónimo específico (diazepam) con el hiperónimo general (psicofármacos).',
      B: 'CORRECTA. Aplica con rigor técnico las categorías de hiperónimo, hipónimo y cohipónimos al árbol conceptual del texto.',
      C: 'INCORRECTA. Uno es una molécula neurotransmisora y el otro un cuadro clínico; no guardan relación de sinonimia.',
      D: 'INCORRECTA. Relación semántica inexistente entre el nombre de un fármaco y una estructura anatómica.',
    },
  },
  {
    id: 'cl-29',
    component: 'Competencia Lectora',
    level: 'Avanzado',
    topic: 'Polifonía y refutación de falacias en ensayo sociológico',
    contextText:
      '«Quienes defienden la reducción del presupuesto para las universidades públicas suelen esgrimir el argumento meritocrático según el cual "quien realmente posee talento triunfa por sí solo sin importar la cuna ni las becas estatales, como lo prueban los genios autodidactas de la historia". Tal razonamiento incurre en el clásico sesgo del superviviente: exhibe como regla general la excepción estadística de unos pocos individuos extraordinarios que lograron sortear barreras abismales, mientras silencia los miles de talentos equivalentes que se malograron en el anonimato por carecer de libros, nutrición o tiempo libre para estudiar».',
    statement:
      '¿Qué estrategia argumentativa emplea el autor del texto para refutar la tesis de quienes proponen recortar el financiamiento de la universidad pública?',
    options: [
      {
        id: 'A',
        text: 'Niega que hayan existido personas autodidactas talentosas a lo largo de la historia universal.',
      },
      {
        id: 'B',
        text: 'Desmonta la validez lógica de la premisa contraria demostrando que generaliza a partir de casos excepcionales visibles e ignora la evidencia oculta de quienes quedaron excluidos.',
      },
      {
        id: 'C',
        text: 'Ataca personalmente la vida privada de los ministros de hacienda sin analizar sus argumentos sobre el mérito.',
      },
      {
        id: 'D',
        text: 'Sostiene que el esfuerzo individual carece por completo de valor y que los exámenes académicos deben eliminarse para siempre.',
      },
    ],
    correctOption: 'B',
    explanation:
      'El autor cita entre comillas la postura adversaria y la refuta identificando su fallo metodológico («sesgo del superviviente»): tomar una muestra sesgada (solo los pocos que sobrevivieron a la adversidad) como si representara el universo total, ignorando la población invisible que fracasó por falta de condiciones materiales.',
    distractorAnalysis: {
      A: 'INCORRECTA (Contradicción). El autor no niega que existan esos «pocos individuos extraordinarios»; señala que son una excepción estadística.',
      B: 'CORRECTA. Describe con exactitud la anatomía lógica del «sesgo del superviviente» explicada en el texto.',
      C: 'INCORRECTA. No hay falacia ad hominem ni ataques personales a funcionarios; la crítica es estrictamente epistemológica y estadística.',
      D: 'INCORRECTA (Cuantificadores absolutos «por completo», «para siempre» + Extrapolación). Defender condiciones materiales de acceso no implica negar el esfuerzo ni abolir exámenes.',
    },
  },
  {
    id: 'cl-30',
    component: 'Competencia Lectora',
    level: 'Básico',
    topic: 'Valor semántico de los signos de puntuación',
    contextText:
      '«La expedición botánica del Nuevo Reino de Granada no fue una simple empresa de recolección herbolaria: constituyó un verdadero laboratorio político donde la juventud criolla aprendió a cartografiar su propio territorio. Al clasificar quinas, orquídeas y minerales —bajo la dirección rigurosa de José Celestino Mutis—, aquellos naturalistas descubrieron que la riqueza geográfica del virreinato contrastaba dramáticamente con la administración colonial».',
    statement:
      'En el fragmento anterior, los dos puntos (`:`) del primer enunciado y los guiones largos (`— ... —`) del segundo enunciado cumplen, respectivamente, la función de:',
    options: [
      {
        id: 'A',
        text: 'Introducir una enumeración de plantas medicinales; y señalar el diálogo directo entre dos personajes de ficción.',
      },
      {
        id: 'B',
        text: 'Introducir una explicación o ampliación que fundamenta la afirmación precedente; e intercalar un inciso aclaratorio con precisión histórica.',
      },
      {
        id: 'C',
        text: 'Indicar que la oración quedó inconclusa por falta de datos; y tachar una información falsa que el lector debe ignorar.',
      },
      {
        id: 'D',
        text: 'Separar dos párrafos que tratan temas opuestos; y encerrar una traducción de otro idioma.',
      },
    ],
    correctOption: 'B',
    explanation:
      'Los dos puntos tras «no fue una simple empresa de recolección herbolaria:» introducen la explicación afirmativa de lo que sí fue («constituyó un verdadero laboratorio político...»). Los guiones largos o rayas dobles («—bajo la dirección rigurosa de José Celestino Mutis—») aíslan un inciso explicativo parentético dentro de la oración principal.',
    distractorAnalysis: {
      A: 'INCORRECTA. Después de los dos puntos no hay una lista de plantas, ni los guiones introducen parlamento teatral.',
      B: 'CORRECTA. Define con precisión gramatical el valor conectivo-explicativo de los dos puntos y el valor parentético de las rayas.',
      C: 'INCORRECTA. Los signos que indican interrupción son los puntos suspensivos (`...`), y los guiones no tachan información.',
      D: 'INCORRECTA. Ambos signos operan en el nivel intraoracional y en español.',
    },
  },
  {
    id: 'cl-31',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Lectura inferencial y paradoja de Jevons (Eficiencia y consumo)',
    contextText:
      '«En 1865, el economista William Stanley Jevons observó un fenómeno contraintuitivo tras la invención de máquinas de vapor mucho más eficientes que requerían menos carbón por unidad de trabajo: lejos de disminuir el consumo nacional de carbón en Inglaterra, la demanda total del mineral se disparó. Al abaratarse el costo energético de cada proceso industrial, el carbón se volvió rentable para decenas de nuevas aplicaciones y multiplicó la escala de las fábricas. Esta paradoja advierte hoy que la sola eficiencia tecnológica, sin límites al volumen de producción, suele estimular el agotamiento de los recursos que prometía ahorrar».',
    statement:
      'De acuerdo con el mecanismo de la «paradoja de Jevons» expuesto en el texto, si se duplica la eficiencia en el consumo de agua de los sistemas de riego agrícola en una región árida sin establecer topes de extracción, es previsible que:',
    options: [
      {
        id: 'A',
        text: 'El consumo total de agua del acuífero se reduzca automáticamente a la mitad de manera permanente.',
      },
      {
        id: 'B',
        text: 'El menor costo hídrico por hectárea incentive la ampliación de la frontera de cultivo hacia variedades más intensivas, incrementando o manteniendo alta la extracción total de agua.',
      },
      {
        id: 'C',
        text: 'Los agricultores abandonen de inmediato la tecnología eficiente y regresen a los métodos manuales del siglo XIX.',
      },
      {
        id: 'D',
        text: 'Las máquinas de vapor reemplacen por completo a los sistemas de riego eléctrico en todas las zonas rurales.',
      },
    ],
    correctOption: 'B',
    explanation:
      'El ejercicio evalúa la transferencia inferencial de un principio explicado en el texto a un caso análogo: según la paradoja de Jevons, cuando una tecnología reduce el insumo necesario por unidad (carbón por trabajo, o agua por hectárea) sin topes regulatorios, abarata la actividad y estimula la expansión de la escala productiva, elevando la demanda global del recurso.',
    distractorAnalysis: {
      A: 'INCORRECTA (Intuición lineal refutada por el texto). Es exactamente la creencia ingenua que la paradoja de Jevons desmiente.',
      B: 'CORRECTA. Aplica rigurosamente la lógica económica y ecológica del texto al escenario del riego agrícola.',
      C: 'INCORRECTA (Contradicción). Los productores adoptan masivamente la tecnología eficiente precisamente porque resulta más rentable.',
      D: 'INCORRECTA (Literalismo mecánico + absoluto «todas»). Confunde el ejemplo histórico del siglo XIX (vapor) con la ley general.',
    },
  },
  {
    id: 'cl-32',
    component: 'Competencia Lectora',
    level: 'Avanzado',
    topic: 'Epistemología y método científico: falsabilidad popperiana',
    contextText:
      '«Para Karl Popper, la marca distintiva de una teoría auténticamente científica no reside en acumular miles de observaciones favorables que parezcan confirmarla —pues cualquier doctrina dogmática encuentra siempre ejemplos que se acomoden a sus premisas si las formula con suficiente ambigüedad—, sino en su falsabilidad: el hecho de arriesgar predicciones precisas y prohibir ciertos sucesos observables, de tal modo que un solo experimento adverso bien controlado baste para refutarla. Una hipótesis que lo explica todo, pase lo que pase, no explica en realidad nada».',
    statement:
      'Según el criterio epistemológico de Popper expuesto en el fragmento, ¿cuál de los siguientes enunciados carecería de carácter científico?',
    options: [
      {
        id: 'A',
        text: '«A presión atmosférica normal al nivel del mar, el agua pura hierve a 100 °C».',
      },
      {
        id: 'B',
        text: '«Si este nuevo fármaco mejora al paciente, demuestra su eficacia activa; y si el paciente empeora, también demuestra su eficacia porque está provocando una crisis curativa invisible».',
      },
      {
        id: 'C',
        text: '«La luz procedente de una estrella distante sufre una desviación medible de 1,75 segundos de arco al pasar cerca del campo gravitatorio solar».',
      },
      {
        id: 'D',
        text: '«Ningún mamífero placentario posee reproducción ovípara».',
      },
    ],
    correctOption: 'B',
    explanation:
      'Popper señala que una proposición es científica solo si es falsable, es decir, si existe algún resultado observable capaz de desmentirla. En la opción B, tanto si el paciente mejora como si empeora, la hipótesis se declara triunfante; al ser inmune a cualquier refutación empírica («lo explica todo, pase lo que pase»), carece de estatus científico.',
    distractorAnalysis: {
      A: 'INCORRECTA. Es altamente falsable: bastaría medir agua pura hirviendo a 70 °C al nivel del mar para refutarla.',
      B: 'CORRECTA. Ilustra perfectamente una formulación blindada e infalsable que acomoda cualquier resultado opuesto a su favor.',
      C: 'INCORRECTA. Es el ejemplo histórico clásico de Popper (la predicción riesgosa y medible de Einstein en el eclipse de 1919).',
      D: 'INCORRECTA. Es falsable: el hallazgo de un solo mamífero placentario que ponga huevos refutaría el enunciado.',
    },
  },
  {
    id: 'cl-33',
    component: 'Competencia Lectora',
    level: 'Básico',
    topic: 'Rastreo de referentes y cohesión léxica',
    contextText:
      '«Entre los murciélagos frugívoros del bosque húmedo tropical y las palmas silvestres existe un mutualismo coevolutivo indispensable para la regeneración selvática. Mientras las segundas ofrecen pulpas ricas en lípidos como recompensa energética nocturna, los primeros dispersan las semillas intactas en claros distantes donde la competencia por la luz solar es menor. Si la fragmentación del hábitat extingue a estos quirópteros, el reclutamiento de nuevas plántulas colapsa inevitablemente».',
    statement:
      'En el fragmento anterior, las expresiones «las segundas», «los primeros» y «estos quirópteros» aluden, en su orden respectivo, a:',
    options: [
      {
        id: 'A',
        text: 'Las palmas silvestres — los murciélagos frugívoros — los murciélagos frugívoros.',
      },
      {
        id: 'B',
        text: 'Los murciélagos frugívoros — las palmas silvestres — las semillas intactas.',
      },
      {
        id: 'C',
        text: 'Las pulpas ricas en lípidos — los claros distantes — las nuevas plántulas.',
      },
      {
        id: 'D',
        text: 'Las regeneraciones selváticas — las competencias por la luz — los bosques húmedos.',
      },
    ],
    correctOption: 'A',
    explanation:
      'En la primera oración se presentan dos actores en orden: 1.º «los murciélagos frugívoros» y 2.º «las palmas silvestres». Por tanto, «las segundas» remite a las palmas silvestres (femenino plural) y «los primeros» a los murciélagos frugívoros (masculino plural). Finalmente, «estos quirópteros» es una sustitución léxica por hiperónimo científico (orden Chiroptera = murciélagos).',
    distractorAnalysis: {
      A: 'CORRECTA. Mantiene la correspondencia exacta de orden, género, número y taxonomía biológica.',
      B: 'INCORRECTA (Inversión de orden T). Invierte primero/segundo y desconoce que «quirópteros» significa murciélagos.',
      C: 'INCORRECTA. Toma sustantivos posteriores que aún no habían sido introducidos como antecedentes.',
      D: 'INCORRECTA. Concordancia gramatical y semántica incompatible con las acciones de ofrecer pulpa y dispersar semillas.',
    },
  },
  {
    id: 'cl-34',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Lectura crítica: identificación de presupuestos y ambigüedad',
    contextText:
      '«Cuando los informes económicos celebran que el Producto Interno Bruto (PIB) de un país creció un cuatro por ciento anual, suelen omitir que dicho indicador contabiliza con signo positivo cualquier transacción monetaria sin preguntarse por su valor humano o ecológico. Si un derrame petrolero contamina un río y obliga a gastar millones en limpieza y hospitalizaciones, el PIB aumenta; si una selva milenaria se mantiene en pie regulando gratuitamente el clima, el PIB registra cero. Medir el bienestar social exclusivamente con esa brújula equivale a evaluar la salud de un paciente contando únicamente el volumen de facturas de su farmacia».',
    statement:
      'A partir de la crítica formulada en el texto, se concluye que la limitación estructural del Producto Interno Bruto (PIB) como indicador de bienestar radica en que:',
    options: [
      {
        id: 'A',
        text: 'Es incapaz de sumar números decimales cuando ocurren desastres naturales en las zonas petroleras.',
      },
      {
        id: 'B',
        text: 'Registra el flujo bruto de gasto monetario sin distinguir entre actividades que generan prosperidad y aquellas que solo reparan daños, ni valorar los bienes no mercantilizados.',
      },
      {
        id: 'C',
        text: 'Prohíbe que los hospitales y las farmacias cobren por la atención de pacientes afectados por la contaminación.',
      },
      {
        id: 'D',
        text: 'Demuestra que todos los países con alto crecimiento económico tienen siempre la peor calidad de vida del planeta.',
      },
    ],
    correctOption: 'B',
    explanation:
      'El autor demuestra mediante dos contraejemplos (el derrame que suma al PIB por gastos de limpieza/hospital y la selva en pie que suma cero por ser gratuita) y una analogía final (facturas de farmacia vs. salud) que el PIB mide volumen transaccional monetario, confundiendo gastos defensivos/reparadores con bienestar y omitiendo la riqueza ecológica sin precio de mercado.',
    distractorAnalysis: {
      A: 'INCORRECTA (Trivialización aritmética). El problema del PIB no es de cálculo matemático, sino de ceguera cualitativa y ecológica.',
      B: 'CORRECTA. Recoge con exactitud las dos fallas señaladas: sumar gastos reparadores de daños como crecimiento y omitir servicios gratuitos de la naturaleza.',
      C: 'INCORRECTA (Contradicción). Precisamente porque los hospitales y empresas de limpieza cobran dinero es que el derrame hace subir el PIB.',
      D: 'INCORRECTA (Cuantificadores absolutos «todos» y «siempre» + Extrapolación). Criticar el uso exclusivo del PIB no equivale a afirmar que todo crecimiento produzca siempre la peor calidad de vida.',
    },
  },
  {
    id: 'cl-35',
    component: 'Competencia Lectora',
    level: 'Avanzado',
    topic: 'Etimologías cultas y latinismos en textos jurídicos y humanísticos',
    contextText:
      '«En el derecho penal garantista, la presunción de inocencia no constituye una concesión graciosa del juez, sino un principio **sine qua non** de la legitimidad procesal. Pretender invertir la carga de la prueba mediante decretos redactados **ad hoc** para satisfacer el clamor punitivo de una coyuntura mediática vulnera la seguridad jurídica: el acusado no está obligado a demostrar su probidad **a priori**, sino que corresponde al Estado desvirtuarla con pruebas obtenidas lícitamente».',
    statement:
      'De acuerdo con el sentido jurídico y contextual del párrafo, las locuciones latinas «sine qua non», «ad hoc» y «a priori» significan, respectivamente:',
    options: [
      {
        id: 'A',
        text: 'Condición indispensable sin la cual algo no es válido; diseñado específicamente para un caso o fin determinado; y de antemano o antes de toda verificación.',
      },
      {
        id: 'B',
        text: 'Norma opcional y secundaria; heredado desde tiempos inmemoriales; y después de haberse dictado la sentencia definitiva.',
      },
      {
        id: 'C',
        text: 'Por la fuerza de las armas; en contra de la voluntad popular; y mediante confesión involuntaria del sospechoso.',
      },
      {
        id: 'D',
        text: 'Sin límite de tiempo; de manera universal y permanente; y con base en experimentos de laboratorio.',
      },
    ],
    correctOption: 'A',
    explanation:
      '• «Sine qua non» (literalmente "sin la cual no"): condición esencial e indispensable.\n• «Ad hoc» ("para esto"): creado o improvisado a medida para una situación particular (en el texto, decretos hechos a la medida de una coyuntura mediática).\n• «A priori» ("previo a"): de antemano, antes de examinar la experiencia o las pruebas del proceso.',
    distractorAnalysis: {
      A: 'CORRECTA. Define con total rigor etimológico y contextual los tres latinismos académicos.',
      B: 'INCORRECTA (Antónimos). «Sine qua non» es lo opuesto a opcional, «ad hoc» no es inmemorial y «a priori» es lo opuesto a «a posteriori» (después).',
      C: 'INCORRECTA. Invenciones semánticas sin correspondencia con el latín jurídico.',
      D: 'INCORRECTA. «Ad hoc» denota especificidad coyuntural, exactamente lo contrario de una ley universal y permanente.',
    },
  },
  {
    id: 'cl-36',
    component: 'Competencia Lectora',
    level: 'Básico',
    topic: 'Paráfrasis y síntesis de textos expositivos sobre lingüística',
    contextText:
      '«Suele creerse que las lenguas indígenas ágrafas —aquellas que tradicionalmente se transmiten por vía oral sin un alfabeto escrito— poseen una gramática elemental y un vocabulario rudimentario. La lingüística descriptiva moderna ha demostrado todo lo contrario: idiomas amazónicos como el tuyuca cuentan con sistemas de "evidencialidad" verbal tan complejos que obligan al hablante, mediante un sufijo en cada verbo, a precisar si lo que afirma lo vio con sus propios ojos, lo escuchó, lo dedujo por huellas o lo sabe por tradición oral».',
    statement:
      '¿Cuál de las siguientes afirmaciones resume adecuadamente la tesis demostrada por la lingüística moderna en el fragmento?',
    options: [
      {
        id: 'A',
        text: 'La ausencia de escritura alfabética en una lengua no implica simplicidad estructural; por el contrario, las lenguas orales pueden poseer categorías gramaticales de altísima precisión epistemológica.',
      },
      {
        id: 'B',
        text: 'El idioma español y el inglés son las únicas lenguas del mundo que exigen conjugar los verbos según las huellas observadas en la selva.',
      },
      {
        id: 'C',
        text: 'Para que una lengua indígena adquiera una gramática compleja es indispensable que primero adopte el alfabeto latino impreso.',
      },
      {
        id: 'D',
        text: 'Los hablantes del idioma tuyuca nunca pueden conversar sobre el pasado porque sus verbos solo admiten lo que se ve en el instante presente.',
      },
    ],
    correctOption: 'A',
    explanation:
      'El texto contrasta un prejuicio común (lengua sin escritura = gramática simple) con la evidencia científica (el sistema de evidencialidad morfológica del tuyuca exige especificar la fuente de conocimiento en cada verbo, algo incluso más estricto que en las lenguas europeas).',
    distractorAnalysis: {
      A: 'CORRECTA. Sintetiza la refutación del prejuicio sobre las lenguas ágrafas y el valor del ejemplo del tuyuca.',
      B: 'INCORRECTA (Falsa atribución + absoluto «únicas»). Esa propiedad morfológica se ejemplifica con el tuyuca amazónico, no con el español ni el inglés.',
      C: 'INCORRECTA (Contradicción). El texto demuestra que las lenguas ágrafas ya poseen esa complejidad sin necesidad de escritura.',
      D: 'INCORRECTA (Cuantificador absoluto «nunca» + Falsa lectura). El texto dice expresamente que tienen sufijos para lo deducido por huellas o recibido por tradición oral.',
    },
  },
  {
    id: 'cl-37',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Ceguera a la negación y distinción entre premisa y conclusión',
    contextText:
      '«El hallazgo de herramientas de piedra tallada con una antigüedad de 3,3 millones de años en Lomekwi (Kenia) obligó a revisar la cronología clásica de la evolución humana. Hasta entonces, la paleoantropología asumía que la fabricación intencional de utensilios líticos había comenzado únicamente con el género Homo (Homo habilis) hace unos 2,6 millones de años. El yacimiento de Lomekwi sugiere que homínidos anteriores, como Australopithecus o Kenyanthropus, ya poseían la coordinación biomecánica y la previsión cognitiva necesarias para golpear núcleos de roca con precisión».',
    statement:
      'De acuerdo con el texto anterior, ¿cuál de las siguientes afirmaciones NO se puede concluir válidamente?',
    options: [
      {
        id: 'A',
        text: 'Antes del descubrimiento de Lomekwi, se asociaba el origen de la talla intencional de piedra con la aparición del género Homo.',
      },
      {
        id: 'B',
        text: 'La fabricación de herramientas líticas requiere tanto destreza motora como capacidad cognitiva de planificación.',
      },
      {
        id: 'C',
        text: 'Las herramientas halladas en Lomekwi son aproximadamente 700.000 años más antiguas que los registros atribuidos tradicionalmente a Homo habilis.',
      },
      {
        id: 'D',
        text: 'El género Homo habilis nunca fabricó ninguna herramienta de piedra y todas sus piezas fueron compradas a los Australopithecus.',
      },
    ],
    correctOption: 'D',
    explanation:
      '¡Cuidado con el «NO se puede concluir»! Las opciones A, B y C son verdaderas (3,3 − 2,6 = 0,7 millones de años = 700.000 años). La opción D es absurda e incompatible con el texto: que homínidos anteriores ya tallaran piedra hace 3,3 millones de años refuta que Homo habilis fuera el *primero* o el *único*, pero no niega que Homo habilis también fabricara herramientas.',
    distractorAnalysis: {
      A: 'INCORRECTA (Ceguera al NO). Es una afirmación verdadera explícita en el segundo enunciado.',
      B: 'INCORRECTA (Ceguera al NO). Es verdadera según la frase final («coordinación biomecánica y previsión cognitiva»).',
      C: 'INCORRECTA (Ceguera al NO). Es una deducción aritmética exacta: 3,3 millones − 2,6 millones = 700.000 años.',
      D: 'CORRECTA (Es la que NO se puede concluir). Incurre en cuantificadores absolutos («nunca», «ninguna», «todas») y anacronismo comercial absurdo.',
    },
  },
  {
    id: 'cl-38',
    component: 'Competencia Lectora',
    level: 'Intermedio',
    topic: 'Relaciones analógicas de segundo orden (Par base verbal)',
    contextText:
      'En las pruebas de Competencia Lectora de la UdeA, las analogías verbales evalúan la capacidad de abstraer la relación lógica exacta entre un par base de conceptos (A : B) e identificar el único par que replica esa misma estructura y dirección semántica.',
    statement:
      'Seleccione el par de palabras que presenta una relación analógica equivalente a la del par base:\n\nVACUNA : INMUNIDAD ::',
    options: [
      {
        id: 'A',
        text: 'Veneno : Antídoto',
      },
      {
        id: 'B',
        text: 'Lectura : Comprensión',
      },
      {
        id: 'C',
        text: 'Cicatriz : Herida',
      },
      {
        id: 'D',
        text: 'Anestesia : Dolor',
      },
    ],
    correctOption: 'B',
    explanation:
      'Oración relacional del par base (VACUNA : INMUNIDAD): «La aplicación o ejercicio de A (vacuna) tiene como propósito generar o desarrollar el estado benéfico/capacidad B (inmunidad)». Aplicando la misma dirección:\n• En B: «El ejercicio de la Lectura (A) tiene como propósito generar o desarrollar la Comprensión (B)».',
    distractorAnalysis: {
      A: 'INCORRECTA (Relación de oposición neutralizadora). El veneno no se aplica para producir el antídoto; el antídoto neutraliza al veneno.',
      B: 'CORRECTA. Conserva la relación medio formativo/preventivo → capacidad o estado benéfico adquirido.',
      C: 'INCORRECTA (Orden invertido T). La cicatriz es el efecto posterior de la herida (Efecto : Causa), además de tratarse de una lesión.',
      D: 'INCORRECTA (Relación de supresión). La anestesia suprime o bloquea el dolor, mientras que la vacuna produce la inmunidad.',
    },
  },
  {
    id: 'cl-39',
    component: 'Competencia Lectora',
    level: 'Avanzado',
    topic: 'Lectura crítica: el dilema del tranvía y ética deontológica vs. utilitarista',
    contextText:
      '«Cuando se programa el software de frenado de emergencia de un vehículo autónomo, la ingeniería se topa de frente con la filosofía moral. Si ante un fallo mecánico inevitable el automóvil solo puede elegir entre atropellar a cinco peatones imprudentes o desviar su trayectoria hacia un muro sacrificando la vida de su único pasajero inocente, el utilitarismo clásico ordenaría minimizar el número total de muertes salvando a los cinco. Sin embargo, la ética deontológica kantiana objetaría que programar el coche para matar deliberadamente a su ocupante convierte a una persona inocente en un simple medio instrumental para salvar a otros, lo que destruiría por completo la confianza de cualquier comprador en dichos vehículos».',
    statement:
      'Al exponer la objeción de la ética deontológica kantiana en la segunda mitad del párrafo, el autor muestra que este dilema tecnológico:',
    options: [
      {
        id: 'A',
        text: 'Se resuelve fácilmente instalando mejores frenos para que nunca ocurran accidentes de tránsito en ninguna ciudad.',
      },
      {
        id: 'B',
        text: 'Entraña una tensión irreductible entre el cálculo cuantitativo de vidas salvadas, el principio moral de no instrumentalizar al inocente y la viabilidad práctica del mercado.',
      },
      {
        id: 'C',
        text: 'Demuestra que Immanuel Kant diseñó personalmente los primeros algoritmos de conducción autónoma en el siglo XVIII.',
      },
      {
        id: 'D',
        text: 'Obliga legalmente a todos los fabricantes a programar los vehículos para que siempre atropellen al mayor número posible de peatones.',
      },
    ],
    correctOption: 'B',
    explanation:
      'El pasaje articula tres planos en conflicto: 1) la aritmética utilitarista (5 vidas > 1 vida), 2) el principio deontológico kantiano (prohibición de usar a un inocente como medio para un fin) y 3) la paradoja práctica de adopción comercial (nadie compraría un auto programado para sacrificar a su propio dueño).',
    distractorAnalysis: {
      A: 'INCORRECTA (Evasión de la premisa + absoluto «nunca»). El dilema parte explícitamente de la condición «ante un fallo mecánico inevitable».',
      B: 'CORRECTA. Sintetiza con precisión las tres dimensiones ética, filosófica y pragmática contrapuestas en el texto.',
      C: 'INCORRECTA (Anacronismo absurdo). Se aplican los principios éticos de Kant a un problema moderno, no se afirma que Kant programara software.',
      D: 'INCORRECTA (Cuantificadores absolutos «todos» y «siempre» + Distorsión). Ni existe tal obligación legal ni nadie propone maximizar muertes.',
    },
  },
  {
    id: 'cl-40',
    component: 'Competencia Lectora',
    level: 'Avanzado',
    topic: 'Lectura crítico-intertextual y metacognición en la ciencia médica',
    contextText:
      '«La medicina basada en la evidencia (MBE), formulada a finales del siglo XX por David Sackett, suele malinterpretarse como una tiranía estadística que obliga al médico a aplicar mecánicamente el promedio de los ensayos clínicos aleatorizados sin escuchar al individuo. No obstante, el propio Sackett definió la MBE como la integración consciente de tres pilares inseparables: la mejor evidencia científica disponible en la literatura, la pericia clínica acumulada por el profesional y los valores y preferencias particulares del paciente. Amputar cualquiera de estos tres vértices no es practicar medicina basada en la evidencia, sino traicionar su espíritu fundacional».',
    statement:
      'De acuerdo con la argumentación del autor, quien acusa a la Medicina Basada en la Evidencia (MBE) de deshumanizar la consulta aplicándole al paciente únicamente promedios estadísticos incurre en el error de:',
    options: [
      {
        id: 'A',
        text: 'Confundir una aplicación reduccionista y deformada de la MBE con la verdadera definición tripartita formulada por su propio creador.',
      },
      {
        id: 'B',
        text: 'Otorgar demasiada importancia a las preferencias emocionales del paciente por encima de los ensayos clínicos.',
      },
      {
        id: 'C',
        text: 'Desconocer que los ensayos clínicos aleatorizados nunca han servido para probar ningún medicamento en la historia.',
      },
      {
        id: 'D',
        text: 'Seguir al pie de la letra los tres pilares inseparables propuestos por David Sackett a finales del siglo XX.',
      },
    ],
    correctOption: 'A',
    explanation:
      'El autor emplea una estructura de desmitificación: primero expone un malentendido común («suele malinterpretarse como una tiranía estadística...») y, tras el conector «No obstante», cita la definición original de Sackett (Evidencia + Pericia clínica + Valores del paciente) para demostrar que prescindir de la experiencia médica o de los valores del paciente es una deformación ajena a la verdadera MBE.',
    distractorAnalysis: {
      A: 'CORRECTA. Identifica que la crítica popular ataca a un "hombre de paja" (el reduccionismo estadístico) que el propio fundador de la MBE rechazaba.',
      B: 'INCORRECTA (Contradicción). El malentendido descrito consiste en ignorar al individuo, no en darle demasiada importancia.',
      C: 'INCORRECTA (Cuantificadores absolutos «nunca» y «ningún»). El texto valora «la mejor evidencia científica disponible» como uno de los tres pilares esenciales.',
      D: 'INCORRECTA (Contradicción directa). Quien aplica solo estadística está amputando dos de los tres pilares de Sackett.',
    },
  },
];

