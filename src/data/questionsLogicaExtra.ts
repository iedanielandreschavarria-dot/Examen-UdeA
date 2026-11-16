import { Question } from '../types';

export const EXTRA_LOGICA_QUESTIONS: Question[] = [
  // ==================== LÓGICA PROPOSICIONAL (rl-07 a rl-11) ====================
  {
    id: 'rl-07',
    component: 'Razonamiento Lógico',
    level: 'Básico',
    topic: 'Lógica proposicional: negación de cuantificadores universales y existenciales',
    contextText:
      'Durante una auditoría de calidad en una clínica universitaria, el director médico afirma la siguiente proposición:\n\n«Todos los pacientes hospitalizados en el tercer piso recibieron valoración nutricional y al menos uno de ellos requirió soporte suplementario».',
    statement:
      'Si tras revisar las historias clínicas se demuestra que la afirmación del director médico es FALSA, ¿cuál de las siguientes proposiciones es necesariamente VERDADERA?',
    options: [
      {
        id: 'A',
        text: 'Ningún paciente del tercer piso recibió valoración nutricional y ninguno requirió soporte suplementario.',
      },
      {
        id: 'B',
        text: 'Al menos un paciente del tercer piso no recibió valoración nutricional, o ningún paciente de ese piso requirió soporte suplementario.',
      },
      {
        id: 'C',
        text: 'Todos los pacientes del tercer piso no recibieron valoración nutricional o todos requirieron soporte suplementario.',
      },
      {
        id: 'D',
        text: 'Al menos un paciente del tercer piso no recibió valoración nutricional y al menos uno no requirió soporte suplementario.',
      },
    ],
    correctOption: 'B',
    explanation:
      'La proposición original tiene la estructura de una conjunción (P ∧ Q), donde:\n• P: «Todos recibieron valoración» (∀x V(x))\n• Q: «Al menos uno requirió soporte» (∃x S(x))\nPor Ley de De Morgan, la negación de (P ∧ Q) es (~P ∨ ~Q) (cambia el «y» por «o»):\n• ~P (negación de "Todos"): «Al menos un paciente NO recibió valoración».\n• ~Q (negación de "Al menos uno"): «Ningún paciente requirió soporte».\nUniendo con «o»: «Al menos un paciente no recibió valoración nutricional, O ningún paciente requirió soporte suplementario».',
    distractorAnalysis: {
      A: 'INCORRECTA (Trampa de cuantificador absoluto C). Niega erróneamente «Todos» como «Ninguno» y mantiene el conectivo «y» en lugar de cambiarlo a «o».',
      B: 'CORRECTA. Aplica con exactitud la Ley de De Morgan ~(P ∧ Q) ≡ (~P ∨ ~Q) y las negaciones exactas de ∀ y ∃.',
      C: 'INCORRECTA. Confunde la negación universal con «Todos no...» y no niega correctamente el cuantificador existencial.',
      D: 'INCORRECTA (Olvido de Ley de De Morgan P). No transforma la conjunción «y» en disyunción «o» al negar la proposición compuesta.',
    },
  },
  {
    id: 'rl-08',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Lógica deductiva: acertijos de verdades y mentiras por contradicción',
    contextText:
      'Cuatro estudiantes de medicina (Andrés, Beatriz, Carlos y Diana) son interrogados acerca de quién dejó encendido el microscopio del laboratorio durante la noche. Se sabe con certeza que SOLO UNO de ellos dejó encendido el microscopio y que, de las cuatro declaraciones siguientes, EXACTAMENTE UNA es verdadera y las otras tres son falsas:\n\n• Andrés: «Fue Beatriz».\n• Beatriz: «Fue Diana».\n• Carlos: «Yo no fui».\n• Diana: «Beatriz miente cuando dice que fui yo».',
    statement:
      '¿Quién dejó encendido el microscopio y quién dijo la única verdad, respectivamente?',
    options: [
      {
        id: 'A',
        text: 'Diana dejó encendido el microscopio — Beatriz dijo la verdad.',
      },
      {
        id: 'B',
        text: 'Carlos dejó encendido el microscopio — Diana dijo la verdad.',
      },
      {
        id: 'C',
        text: 'Beatriz dejó encendido el microscopio — Andrés dijo la verdad.',
      },
      {
        id: 'D',
        text: 'Andrés dejó encendido el microscopio — Carlos dijo la verdad.',
      },
    ],
    correctOption: 'B',
    explanation:
      'Método UdeA de proposiciones contradictorias:\n1) Observemos las declaraciones de Beatriz («Fue Diana») y de Diana («Beatriz miente cuando dice que fui yo», es decir, «No fue Diana»).\n2) Como Beatriz y Diana se contradicen directamente, una de las dos tiene que ser VERDADERA y la otra FALSA.\n3) Como el enunciado garantiza que en total hay EXACTAMENTE UNA verdad entre los cuatro, esa única verdad está entre Beatriz y Diana. Por consiguiente, las declaraciones de Andrés y de Carlos son necesariamente FALSAS.\n4) Como Carlos dice «Yo no fui» y eso es FALSO, se deduce que ¡CARLOS FUE quien dejó encendido el microscopio!\n5) Al haber sido Carlos (y no Diana), Beatriz mintió y Diana dijo la única verdad.',
    distractorAnalysis: {
      A: 'INCORRECTA. Si hubiera sido Diana, entonces tanto Beatriz («Fue Diana») como Carlos («Yo no fui») estarían diciendo la verdad (habría 2 verdades, contradiciendo el enunciado).',
      B: 'CORRECTA. Si fue Carlos: Andrés (F), Beatriz (F), Carlos (F) y Diana (V) → exactamente 1 verdad y 1 culpable.',
      C: 'INCORRECTA. Si hubiera sido Beatriz, dirían la verdad Andrés, Carlos y Diana (3 verdades).',
      D: 'INCORRECTA. Si hubiera sido Andrés, dirían la verdad Carlos y Diana (2 verdades).',
    },
  },
  {
    id: 'rl-09',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Lógica proposicional: equivalencia del condicional y su negación',
    contextText:
      'Un profesor de Razonamiento Lógico escribe en el tablero la siguiente regla condicional para aprobar el curso:\n\n«Si un estudiante asiste al menos al 80 % de las sesiones y entrega la bitácora de errores, entonces aprueba el simulacro final».',
    statement:
      '¿Cuál de los siguientes casos bastaría observar para demostrar que la regla escrita por el profesor es FALSA?',
    options: [
      {
        id: 'A',
        text: 'Un estudiante que no asistió al 80 % de las sesiones, no entregó la bitácora y reprobó el simulacro final.',
      },
      {
        id: 'B',
        text: 'Un estudiante que asistió al 85 % de las sesiones, entregó la bitácora de errores, pero reprobó el simulacro final.',
      },
      {
        id: 'C',
        text: 'Un estudiante que asistió al 70 % de las sesiones, entregó la bitácora y aun así aprobó el simulacro final.',
      },
      {
        id: 'D',
        text: 'Un estudiante que asistió al 90 % de las sesiones, entregó la bitácora y aprobó el simulacro final.',
      },
    ],
    correctOption: 'B',
    explanation:
      'En lógica proposicional, una implicación condicional (P → Q) SOLO es falsa en un único caso: cuando el antecedente P es VERDADERO y el consecuente Q es FALSO; es decir, su negación es ~(P → Q) ≡ (P ∧ ~Q). Aquí el antecedente P es («asiste ≥ 80 % Y entrega bitácora») y el consecuente Q es («aprueba el simulacro»). Por tanto, la regla se refuta encontrando un estudiante que sí cumplió ambos requisitos (85 % ≥ 80 % y entregó bitácora) pero NO aprobó.',
    distractorAnalysis: {
      A: 'INCORRECTA. Cuando el antecedente es falso (~P), el condicional (P → Q) es lógicamente verdadero (verdad vacua).',
      B: 'CORRECTA. Cumple exactamente la negación del condicional (P ∧ ~Q): antecedente verdadero y consecuente falso.',
      C: 'INCORRECTA (Confusión entre condición suficiente y necesaria). La regla no prohíbe aprobar con menos asistencia; solo garantiza aprobar si se cumplen ambos requisitos.',
      D: 'INCORRECTA. Este caso ejemplifica y confirma la regla (P ∧ Q), no la refuta.',
    },
  },
  {
    id: 'rl-10',
    component: 'Razonamiento Lógico',
    level: 'Básico',
    topic: 'Ordenamiento lineal y circular de información',
    contextText:
      'Seis médicos residentes (F, G, H, J, K y L) se sientan alrededor de una mesa circular con seis sillas distribuidas simétricamente para analizar un caso clínico. Se sabe que:\n• F se sienta exactamente frente a G.\n• H se sienta junto y a la izquierda de F.\n• J no se sienta frente a H ni junto a F.\n• L se sienta junto y a la derecha de G.',
    statement:
      'Con base en las condiciones anteriores, ¿quién se sienta exactamente frente a K?',
    options: [
      { id: 'A', text: 'H' },
      { id: 'B', text: 'J' },
      { id: 'C', text: 'L' },
      { id: 'D', text: 'F' },
    ],
    correctOption: 'A',
    explanation:
      'Numeremos los 6 asientos en sentido antihorario (de modo que la derecha e izquierda miran al centro de la mesa): 1 (abajo), 2, 3, 4 (arriba, frente a 1), 5, 6.\n1) Ubicamos a F en el asiento 1 → como G está frente a F, G ocupa el asiento 4.\n2) Para quien está en el asiento 1 mirando al centro, su izquierda es el asiento 6 y su derecha es el asiento 2. Como H está junto y a la izquierda de F, H va en el asiento 6.\n3) Para G (en el asiento 4 mirando al centro), su derecha es el asiento 5 y su izquierda es el asiento 3. Como L está junto y a la derecha de G, L ocupa el asiento 5.\n4) Quedan libres los asientos 2 y 3 para J y K. Como J NO se sienta junto a F (asiento 2 está junto a F en 1) ni frente a H (asiento 3 está frente a 6), verificamos orientación: si miramos desde adentro, las parejas opuestas son (1-4), (6-3) y (5-2). Como L está en 5 y H en 6, los asientos libres son 2 (frente a L) y 3 (frente a H). Dado que J NO se sienta frente a H, J debe ir en el asiento 2 (frente a L) y K queda obligatoriamente en el asiento 3 (frente a H). Por tanto, frente a K se sienta H.',
    distractorAnalysis: {
      A: 'CORRECTA. Como J no puede sentarse frente a H, J se sienta frente a L y K ocupa el asiento exactamente opuesto a H.',
      B: 'INCORRECTA. J queda frente a L, no frente a K.',
      C: 'INCORRECTA. Frente a L se ubica J.',
      D: 'INCORRECTA. Frente a F se sienta G por la primera condición explícita del problema.',
    },
  },
  {
    id: 'rl-11',
    component: 'Razonamiento Lógico',
    level: 'Avanzado',
    topic: 'Deducción lógica con condicionales encadenados y contrarrecíproco',
    contextText:
      'En un centro de investigación genómica se cumplen estrictamente las siguientes tres reglas:\n1. Si la muestra procede del paciente alfa, entonces se refrigera a −80 °C.\n2. Si la muestra se refrigera a −80 °C o contiene ARN viral, entonces debe procesarse en la cabina de bioseguridad nivel 3.\n3. En el turno del martes, ninguna muestra fue procesada en la cabina de bioseguridad nivel 3.',
    statement:
      'De las tres reglas anteriores se deduce con absoluta certeza que, respecto a cualquier muestra recibida en el turno del martes:',
    options: [
      {
        id: 'A',
        text: 'Procedía del paciente alfa, pero no contenía ARN viral.',
      },
      {
        id: 'B',
        text: 'No procedía del paciente alfa y no contenía ARN viral.',
      },
      {
        id: 'C',
        text: 'Se refrigeró a −80 °C, aunque no procedía del paciente alfa.',
      },
      {
        id: 'D',
        text: 'Contenía ARN viral únicamente si procedía del paciente alfa.',
      },
    ],
    correctOption: 'B',
    explanation:
      'Formalicemos para cualquier muestra del martes:\n• Por regla 3: ~Cabina3.\n• Aplicando Modus Tollens (contrarrecíproco) a la regla 2 [(Refrig ∨ ARN) → Cabina3]: como ~Cabina3, entonces ~(Refrig ∨ ARN). Por Ley de De Morgan, esto equivale a: ~Refrig ∧ ~ARN (NO se refrigeró a −80 °C Y NO contenía ARN viral).\n• Aplicando ahora Modus Tollens a la regla 1 (Alfa → Refrig): como ~Refrig, entonces ~Alfa (NO procedía del paciente alfa).\nConclusión necesaria: No procedía del paciente alfa y no contenía ARN viral.',
    distractorAnalysis: {
      A: 'INCORRECTA. Si hubiera procedido del paciente alfa, habría tenido que refrigerarse y entrar a la cabina 3.',
      B: 'CORRECTA. Encadena impecablemente Modus Tollens y Ley de De Morgan sobre la disyunción del antecedente.',
      C: 'INCORRECTA. Si se hubiera refrigerado a −80 °C, la regla 2 habría obligado a procesarla en la cabina 3.',
      D: 'INCORRECTA. Invierte inválidamente las implicaciones; en el martes ambas proposiciones son falsas.',
    },
  },

  // ==================== ARITMÉTICA BÁSICA (rl-12 a rl-16) ====================
  {
    id: 'rl-12',
    component: 'Razonamiento Lógico',
    level: 'Básico',
    topic: 'Aritmética básica: Mínimo Común Múltiplo (MCM) y coincidencias periódicas',
    contextText:
      'En una unidad de cuidados intermedios, a un paciente se le toma la presión arterial cada 45 minutos, se le controla la glucometría cada 60 minutos y se le administra un nebulizador cada 90 minutos. A las 6:00 a. m. en punto se le realizaron los tres procedimientos de manera simultánea.',
    statement:
      '¿A qué hora volverán a coincidir exactamente los tres procedimientos por primera vez después de las 6:00 a. m.?',
    options: [
      { id: 'A', text: 'A las 8:30 a. m.' },
      { id: 'B', text: 'A las 9:00 a. m.' },
      { id: 'C', text: 'A las 9:30 a. m.' },
      { id: 'D', text: 'A las 12:00 m.' },
    ],
    correctOption: 'B',
    explanation:
      'El tiempo hasta la próxima coincidencia simultánea es el Mínimo Común Múltiplo (MCM) de los intervalos (45, 60 y 90 minutos):\n• Notemos que 90 ya es el doble de 45 (múltiplo de 45), así que basta hallar MCM(60, 90).\n• El menor múltiplo común de 60 y 90 es 180 minutos (pues 60 × 3 = 180 y 90 × 2 = 180, y 45 × 4 = 180).\n• Convertimos 180 minutos a horas: 180 / 60 = 3 horas.\n• Sumando 3 horas a las 6:00 a. m., obtenemos las 9:00 a. m.',
    distractorAnalysis: {
      A: 'INCORRECTA. 8:30 a. m. son 150 minutos, que no es múltiplo de 45 ni de 60 ni de 90.',
      B: 'CORRECTA. MCM(45, 60, 90) = 180 min = 3 horas → 6:00 a. m. + 3 h = 9:00 a. m.',
      C: 'INCORRECTA (Error de suma T). Suma 45 + 60 + 90 = 195 min o calcula 210 min.',
      D: 'INCORRECTA. Toma 360 minutos (6 horas) sin advertir que el mínimo común múltiplo es 180 minutos (3 horas).',
    },
  },
  {
    id: 'rl-13',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Aritmética modular intuitiva: ciclicidad y residuos periódicos',
    contextText:
      'Un investigador realiza guardias rotativas siguiendo una secuencia estricta de 5 colores de carpeta clínica (Verde, Azul, Roja, Amarilla, Blanca) que se repite indefinidamente en ese mismo orden de lunes a domingo sin interrupción. La guardia n.º 1 se realizó un día miércoles con carpeta Verde.',
    statement:
      '¿Qué día de la semana y con qué color de carpeta se realizará la guardia n.º 148 (suponiendo que se hace exactamente una guardia por día)?',
    options: [
      { id: 'A', text: 'Miércoles con carpeta Amarilla' },
      { id: 'B', text: 'Miércoles con carpeta Roja' },
      { id: 'C', text: 'Jueves con carpeta Roja' },
      { id: 'D', text: 'Martes con carpeta Azul' },
    ],
    correctOption: 'B',
    explanation:
      'Desde la guardia n.º 1 hasta la guardia n.º 148 transcurren exactamente 148 − 1 = 147 días (o alternativamente usamos el residuo de la posición):\n1) Día de la semana (ciclo de 7 días): dividimos los 147 días transcurridos entre 7:\n   147 ÷ 7 = 21 semanas exactas con residuo 0.\n   Como el residuo es 0, cae exactamente el mismo día de la semana que la guardia n.º 1: MIÉRCOLES.\n2) Color de carpeta (ciclo de 5 colores): miramos el residuo de 148 al dividir entre 5 (donde residuo 1 = Verde, 2 = Azul, 3 = Roja, 4 = Amarilla, 0 = Blanca):\n   148 = 5 × 29 + 3 → Residuo 3 → Carpeta ROJA.',
    distractorAnalysis: {
      A: 'INCORRECTA (Error de desfase P). Calcula el color con 149 en vez de 148.',
      B: 'CORRECTA. 147 es múltiplo exacto de 7 (Miércoles) y 148 deja residuo 3 módulo 5 (3.er color = Roja).',
      C: 'INCORRECTA (Error clásico del +1 T). Divide 148 entre 7 (residuo 1) y suma 1 día al miércoles sin notar que el día 1 ya fue miércoles (transcurren 147 días, no 148).',
      D: 'INCORRECTA. Resta un día en ambos ciclos por error en el índice inicial.',
    },
  },
  {
    id: 'rl-14',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Aritmética: promedios aritméticos y efecto de datos extremos',
    contextText:
      'El puntaje promedio de un grupo de 8 estudiantes en un simulacro de la UdeA fue de 79 puntos. Al revisar las hojas de calificación, el coordinador descubrió que a dos de esos estudiantes se les había digitado por error 68 y 74 puntos, cuando sus calificaciones reales eran 80 y 86 puntos, respectivamente.',
    statement:
      'Una vez corregidos ambos errores en el sistema, ¿cuál es el nuevo puntaje promedio real de los 8 estudiantes?',
    options: [
      { id: 'A', text: '81 puntos' },
      { id: 'B', text: '82 puntos' },
      { id: 'C', text: '83 puntos' },
      { id: 'D', text: '85 puntos' },
    ],
    correctOption: 'B',
    explanation:
      'Atajo UdeA sin multiplicar 79 × 8 (Variación marginal del promedio):\n1) Calculamos cuántos puntos le faltaban a cada nota mal digitada:\n   • Estudiante 1: pasó de 68 a 80 → aumentó +12 puntos.\n   • Estudiante 2: pasó de 74 a 86 → aumentó +12 puntos.\n2) En total, la bolsa común de puntos del grupo aumentó en: 12 + 12 = +24 puntos.\n3) Esos +24 puntos se reparten equitativamente entre los 8 estudiantes del grupo: +24 ÷ 8 = +3 puntos para el promedio.\n4) Nuevo promedio = 79 + 3 = 82 puntos.',
    distractorAnalysis: {
      A: 'INCORRECTA. Suma solo +2 al promedio por dividir 16 entre 8.',
      B: 'CORRECTA. El incremento total de +24 puntos dividido entre 8 estudiantes sube el promedio exactamente en +3 puntos (79 + 3 = 82).',
      C: 'INCORRECTA. Promedia las dos notas nuevas (83) ignorando a los otros 6 estudiantes del grupo.',
      D: 'INCORRECTA (Error de denominador T). Divide el incremento de +24 entre los 2 estudiantes corregidos (+12) o entre 4 en vez de dividir entre los 8 integrantes.',
    },
  },
  {
    id: 'rl-15',
    component: 'Razonamiento Lógico',
    level: 'Básico',
    topic: 'Aritmética: Máximo Común Divisor (MCD) para partición exacta sin sobrantes',
    contextText:
      'Una brigada médica de la UdeA dispone de tres cajas con insumos: la primera contiene 120 sobres de suero oral, la segunda 168 paquetes de gasas estériles y la tercera 216 blísteres de analgésicos. Se desea armar el MAYOR número posible de botiquines idénticos utilizando la totalidad de los insumos sin que sobre ningún elemento.',
    statement:
      '¿Cuántos botiquines idénticos se podrán armar y cuántos sobres de suero oral contendrá cada botiquín, respectivamente?',
    options: [
      { id: 'A', text: '24 botiquines — 5 sobres de suero en cada uno' },
      { id: 'B', text: '12 botiquines — 10 sobres de suero en cada uno' },
      { id: 'C', text: '24 botiquines — 7 sobres de suero en cada uno' },
      { id: 'D', text: '48 botiquines — 5 sobres de suero en cada uno' },
    ],
    correctOption: 'A',
    explanation:
      '1) Para obtener el MAYOR número de botiquines idénticos que dividan exactamente a 120, 168 y 216, calculamos el Máximo Común Divisor: MCD(120, 168, 216).\n2) Observemos la diferencia entre números consecutivos: 168 − 120 = 48 y 216 − 168 = 48. El MCD debe ser un divisor de 48.\n3) Como 120 no es divisible por 48 (48 × 2 = 96, 48 × 3 = 144), probamos con el siguiente divisor mayor de 48, que es 24:\n   • 120 ÷ 24 = 5 (exacto)\n   • 168 ÷ 24 = 7 (exacto)\n   • 216 ÷ 24 = 9 (exacto)\n4) Por tanto, se arman 24 botiquines y cada uno lleva 120 ÷ 24 = 5 sobres de suero oral (además de 7 gasas y 9 analgésicos).',
    distractorAnalysis: {
      A: 'CORRECTA. MCD(120, 168, 216) = 24 botiquines, y 120 / 24 = 5 sobres de suero por botiquín.',
      B: 'INCORRECTA. 12 es un divisor común, pero NO es el máximo (se pide el mayor número posible de botiquines).',
      C: 'INCORRECTA (Descuido en pregunta T). Halla bien los 24 botiquines, pero reporta los paquetes de gasas (168/24 = 7) en vez de los sobres de suero (5).',
      D: 'INCORRECTA. Toma la diferencia 48 sin verificar que 120 no es divisible exactamente entre 48.',
    },
  },
  {
    id: 'rl-16',
    component: 'Razonamiento Lógico',
    level: 'Avanzado',
    topic: 'Aritmética de fracciones: extracciones sucesivas con gasto fijo intermedio',
    contextText:
      'Un estudiante lleva cierta cantidad de dinero para la feria del libro universitario. En el primer pabellón gasta la mitad de lo que llevaba más 10.000 pesos. En el segundo pabellón gasta la mitad de lo que le quedaba más 10.000 pesos. Al salir del segundo pabellón observa que le quedaron exactamente 10.000 pesos.',
    statement:
      '¿Cuánto dinero llevaba el estudiante al ingresar a la feria del libro?',
    options: [
      { id: 'A', text: '80.000 pesos' },
      { id: 'B', text: '100.000 pesos' },
      { id: 'C', text: '90.000 pesos' },
      { id: 'D', text: '60.000 pesos' },
    ],
    correctOption: 'B',
    explanation:
      'Método del Cangrejo (Operaciones inversas desde el final hacia el inicio):\n• En cada pabellón, como gasta «la mitad más 10.000», lo que le queda es «la mitad menos 10.000». Por tanto, la operación inversa en cada paso consiste en: primero SUMAR 10.000 y luego MULTIPLICAR por 2.\n1) Al salir del 2.º pabellón tiene: 10.000 pesos.\n2) Antes de entrar al 2.º pabellón tenía: (10.000 + 10.000) × 2 = 20.000 × 2 = 40.000 pesos.\n3) Antes de entrar al 1.er pabellón (al inicio) tenía: (40.000 + 10.000) × 2 = 50.000 × 2 = 100.000 pesos.\nVerificación hacia adelante: de 100.000 gasta (50.000 + 10.000 = 60.000) y le quedan 40.000; luego gasta (20.000 + 10.000 = 30.000) y le quedan 10.000 pesos.',
    distractorAnalysis: {
      A: 'INCORRECTA (Inversión de jerarquía en el cangrejo P). Multiplica primero por 2 y luego suma 10.000 en lugar de sumar primero los 10.000.',
      B: 'CORRECTA. [(10.000 + 10.000) × 2 + 10.000] × 2 = 100.000 pesos.',
      C: 'INCORRECTA. Error aritmético al duplicar en el segundo paso.',
      D: 'INCORRECTA. Aplica la operación inversa solo para un pabellón o resta en lugar de sumar.',
    },
  },

  // ==================== PROPORCIONALIDAD Y PORCENTAJES (rl-17 a rl-21) ====================
  {
    id: 'rl-17',
    component: 'Razonamiento Lógico',
    level: 'Básico',
    topic: 'Proporcionalidad inversa y regla de tres con cambio en mitad de obra',
    contextText:
      'Un equipo de 6 auxiliares de laboratorio tarda exactamente 12 días trabajando al mismo ritmo para digitalizar el archivo completo de biopsias de un hospital. Tras haber trabajado juntos durante los primeros 4 días, se incorporan al equipo 2 auxiliares adicionales con la misma eficiencia que los anteriores.',
    statement:
      '¿Cuántos días en total (incluyendo los 4 primeros días) tardará en completarse toda la digitalización del archivo?',
    options: [
      { id: 'A', text: '9 días en total' },
      { id: 'B', text: '10 días en total' },
      { id: 'C', text: '6 días en total' },
      { id: 'D', text: '8 días en total' },
    ],
    correctOption: 'B',
    explanation:
      '1) Calculamos el trabajo restante tras los primeros 4 días: si la obra entera tomaba 12 días a los 6 auxiliares, en 4 días ya hicieron 4/12 = 1/3 del trabajo y faltan 8 días de trabajo para los 6 auxiliares (equivalente a 6 × 8 = 48 "días-auxiliar").\n2) Al sumarse 2 auxiliares más, ahora hay 6 + 2 = 8 auxiliares.\n3) Como el número de trabajadores es inversamente proporcional al tiempo: Días restantes = 48 días-auxiliar ÷ 8 auxiliares = 6 días adicionales.\n4) ¡Atención a la pregunta! Pide los días EN TOTAL (incluyendo los 4 primeros): 4 días iniciales + 6 días restantes = 10 días en total.',
    distractorAnalysis: {
      A: 'INCORRECTA. Aplica regla de tres inversa sobre los 12 días completos (6×12/8 = 9) olvidando que los primeros 4 días solo trabajaron 6 personas.',
      B: 'CORRECTA. 4 días iniciales (con 6 auxiliares) + 6 días finales (con 8 auxiliares) = 10 días totales.',
      C: 'INCORRECTA (Ceguera al enunciado T). Reporta únicamente los 6 días restantes y olvida sumar los 4 primeros días ya trabajados.',
      D: 'INCORRECTA. Error de proporcionalidad directa en lugar de inversa.',
    },
  },
  {
    id: 'rl-18',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Porcentajes y mezclas: evaporación y cambio de concentración',
    contextText:
      'Se tienen 200 mililitros de una solución antiséptica que contiene un 15 % de principio activo puro disuelto en agua. Por calentamiento controlado se evapora exclusivamente agua pura (sin que se pierda nada del principio activo) hasta que el volumen total de la solución se reduce a 120 mililitros.',
    statement:
      '¿Cuál es el nuevo porcentaje de concentración del principio activo en los 120 mililitros restantes?',
    options: [
      { id: 'A', text: '20 %' },
      { id: 'B', text: '25 %' },
      { id: 'C', text: '30 %' },
      { id: 'D', text: '18 %' },
    ],
    correctOption: 'B',
    explanation:
      'Principio de invarianza del soluto:\n1) Cantidad de principio activo al inicio: el 15 % de 200 mL = (15 / 100) × 200 = 30 mL de principio activo puro.\n2) Como solo se evapora agua, en los 120 mL finales siguen estando exactamente los mismos 30 mL de principio activo.\n3) Nueva concentración porcentual = (Soluto / Nuevo Volumen Total) × 100 % = (30 / 120) × 100 % = (1 / 4) × 100 % = 25 %.',
    distractorAnalysis: {
      A: 'INCORRECTA. Suma un 5 % arbitrario sin calcular la razón 30/120.',
      B: 'CORRECTA. 30 mL de principio activo dentro de 120 mL totales equivalen exactamente a 1/4 = 25 %.',
      C: 'INCORRECTA. Duplica el porcentaje inicial asumiendo que el volumen se redujo a la mitad (cuando pasó de 200 a 120, no a 100).',
      D: 'INCORRECTA (Proporcionalidad invertida P). Multiplica 15 % × (120/200) o aplica mal la relación inversa.',
    },
  },
  {
    id: 'rl-19',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Porcentajes: variación porcentual inversa para restaurar el valor inicial',
    contextText:
      'Debido a una escasez estacional de reactivos químicos, el precio de un kit de diagnóstico aumentó en un 25 % respecto a su valor de enero. En marzo, una vez superada la escasez, el proveedor desea aplicar un descuento porcentual sobre el precio actual para que el kit vuelva a costar exactamente lo mismo que en enero.',
    statement:
      '¿De qué porcentaje debe ser dicho descuento?',
    options: [
      { id: 'A', text: 'Del 25 %' },
      { id: 'B', text: 'Del 20 %' },
      { id: 'C', text: 'Del 15 %' },
      { id: 'D', text: 'Del 22,5 %' },
    ],
    correctOption: 'B',
    explanation:
      'Método Base 100:\n1) Supongamos que en enero el kit costaba 100 pesos.\n2) Tras subir un 25 %, su precio actual es de 125 pesos.\n3) Para regresar de 125 pesos a 100 pesos, se deben descontar 25 pesos.\n4) Pero el descuento ahora se calcula sobre la nueva base (125 pesos):\n   % Descuento = (25 / 125) × 100 % = (1 / 5) × 100 % = 20 %.',
    distractorAnalysis: {
      A: 'INCORRECTA (Trampa clásica de simetría aditiva P). Si a 125 le descuentas el 25 % (31,25), baja a 93,75 en lugar de volver a 100.',
      B: 'CORRECTA. Subir 1/4 (+25 %) se compensa exactamente bajando 1/5 (−20 %) sobre el nuevo valor.',
      C: 'INCORRECTA. Con 15 % de descuento sobre 125 solo bajaría 18,75 pesos.',
      D: 'INCORRECTA. Estimación intermedia sin sustento en la fracción 25/125.',
    },
  },
  {
    id: 'rl-20',
    component: 'Razonamiento Lógico',
    level: 'Avanzado',
    topic: 'Proporcionalidad compuesta: obreros, tiempo y obra',
    contextText:
      'En una planta farmacéutica, 4 máquinas encapsuladoras idénticas trabajando 6 horas diarias logran producir 12.000 cápsulas en 5 días. Para atender un pedido urgente de 24.000 cápsulas en solo 4 días, la planta pone a funcionar 5 de esas mismas máquinas.',
    statement:
      '¿Cuántas horas diarias deberán trabajar las 5 máquinas para cumplir exactamente con el nuevo pedido?',
    options: [
      { id: 'A', text: '10 horas diarias' },
      { id: 'B', text: '12 horas diarias' },
      { id: 'C', text: '8 horas diarias' },
      { id: 'D', text: '9,6 horas diarias' },
    ],
    correctOption: 'B',
    explanation:
      'Método de Tasa de Producción por Hora-Máquina:\n1) En el caso base, el total de "horas-máquina" empleadas fue: 4 máquinas × 5 días × 6 h/día = 120 horas-máquina.\n2) Esas 120 horas-máquina produjeron 12.000 cápsulas, lo que significa que cada hora-máquina produce exactamente: 12.000 ÷ 120 = 100 cápsulas.\n3) Para el nuevo pedido de 24.000 cápsulas (el doble de producción) se necesitan: 24.000 ÷ 100 = 240 horas-máquina en total.\n4) Como se dispone de 5 máquinas durante 4 días (5 × 4 = 20 "máquinas-día"), las horas diarias requeridas son: 240 ÷ 20 = 12 horas diarias.',
    distractorAnalysis: {
      A: 'INCORRECTA. Olvida que los días se redujeron de 5 a 4 y calcula 240 / 24 = 10.',
      B: 'CORRECTA. 5 máquinas × 4 días × 12 h/día = 240 horas-máquina → 24.000 cápsulas.',
      C: 'INCORRECTA (Inversión de razón en producción P). No duplica las horas-máquina requeridas al duplicarse las cápsulas.',
      D: 'INCORRECTA. Invierte la relación de los días (multiplica por 4/5 en lugar de 5/4).',
    },
  },
  {
    id: 'rl-21',
    component: 'Razonamiento Lógico',
    level: 'Básico',
    topic: 'Razones y repartos directamente proporcionales',
    contextText:
      'Tres investigadores (P, Q y R) reciben un incentivo académico de 7.200.000 pesos que debe repartirse de forma directamente proporcional al número de artículos publicados por cada uno durante el año: P publicó 2 artículos, Q publicó 3 artículos y R publicó 4 artículos.',
    statement:
      '¿Cuánto dinero más recibe el investigador R en comparación con el investigador P?',
    options: [
      { id: 'A', text: '800.000 pesos' },
      { id: 'B', text: '1.600.000 pesos' },
      { id: 'C', text: '2.400.000 pesos' },
      { id: 'D', text: '3.200.000 pesos' },
    ],
    correctOption: 'B',
    explanation:
      '1) Total de partes proporcionales = 2 + 3 + 4 = 9 partes iguales.\n2) Valor de cada parte (constante de proporcionalidad k) = 7.200.000 ÷ 9 = 800.000 pesos por artículo.\n3) En lugar de calcular por separado cuánto recibe R (4k) y cuánto recibe P (2k), hallamos directamente su diferencia:\n   R − P = 4k − 2k = 2k = 2 × 800.000 = 1.600.000 pesos.',
    distractorAnalysis: {
      A: 'INCORRECTA (Descuido T). 800.000 es el valor de 1 parte (lo que R supera a Q), no la diferencia entre R y P (2 partes).',
      B: 'CORRECTA. La diferencia de 2 artículos (4 − 2) equivale a 2 × 800.000 = 1.600.000 pesos.',
      C: 'INCORRECTA. 2.400.000 es lo que recibe Q (3 partes).',
      D: 'INCORRECTA (Ceguera a la pregunta T). 3.200.000 es el monto total que recibe R (4 partes), pero la pregunta pide cuánto MÁS recibe R que P.',
    },
  },

  // ==================== TABLAS Y GRÁFICAS (rl-22 a rl-25) ====================
  {
    id: 'rl-22',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Análisis de gráficas y tablas: variación porcentual vs. puntos porcentuales',
    contextText:
      'En el boletín epidemiológico de un municipio se reportó la tasa de cobertura de vacunación infantil durante dos años consecutivos:\n• Año 2024: cobertura del 60 % de la población objetivo.\n• Año 2025: cobertura del 75 % de la población objetivo.\n(Suponga que el tamaño total de la población infantil objetivo permaneció exactamente constante en ambos años).',
    statement:
      'Al comparar la cobertura de 2025 respecto a la de 2024, es correcto concluir que la cobertura aumentó en:',
    options: [
      {
        id: 'A',
        text: '15 puntos porcentuales, lo que representa un incremento relativo del 25 % respecto al número de niños vacunados en 2024.',
      },
      {
        id: 'B',
        text: '25 puntos porcentuales, lo que representa un incremento relativo del 15 % respecto al número de niños vacunados en 2024.',
      },
      {
        id: 'C',
        text: '15 puntos porcentuales y un incremento relativo que también es exactamente del 15 %.',
      },
      {
        id: 'D',
        text: '75 puntos porcentuales respecto al año 2024.',
      },
    ],
    correctOption: 'A',
    explanation:
      'Distinción fundamental en el examen de la UdeA:\n1) Variación en PUNTOS PORCENTUALES (resta directa de dos porcentajes): 75 % − 60 % = +15 puntos porcentuales.\n2) VARIACIÓN PORCENTUAL RELATIVA (cuánto creció la cifra respecto al valor inicial de 60):\n   [(75 − 60) / 60] × 100 % = (15 / 60) × 100 % = (1 / 4) × 100 % = +25 %.',
    distractorAnalysis: {
      A: 'CORRECTA. Distingue con total rigor la diferencia absoluta en puntos porcentuales (15 pp) de la tasa de variación relativa (15/60 = 25 %).',
      B: 'INCORRECTA (Inversión conceptual C). Intercambia los puntos porcentuales con la variación porcentual relativa.',
      C: 'INCORRECTA (Error clásico P). Asume que restar dos porcentajes da el porcentaje de crecimiento relativo.',
      D: 'INCORRECTA. Confunde el valor final (75 %) con el incremento.',
    },
  },
  {
    id: 'rl-23',
    component: 'Razonamiento Lógico',
    level: 'Básico',
    topic: 'Interpretación de tablas de contingencia (Doble entrada)',
    contextText:
      'La siguiente tabla resume los resultados de una prueba diagnóstica rápida aplicada a 200 pacientes de urgencias:\n\n| Condición Real \\ Resultado Prueba | Prueba Positiva | Prueba Negativa | Total |\n| :--- | :---: | :---: | :---: |\n| Enfermo (Con infección) | 72 | 8 | 80 |\n| Sano (Sin infección) | 18 | 102 | 120 |\n| **Total** | **90** | **110** | **200** |',
    statement:
      'Si se define el «Valor Predictivo Positivo» como la proporción de personas realmente enfermas entre todas aquellas cuya prueba arrojó un resultado positivo, ¿cuál es dicho valor según la tabla?',
    options: [
      { id: 'A', text: '90 % (72 de 80)' },
      { id: 'B', text: '80 % (72 de 90)' },
      { id: 'C', text: '36 % (72 de 200)' },
      { id: 'D', text: '85 % (102 de 120)' },
    ],
    correctOption: 'B',
    explanation:
      'Leemos con precisión qué subgrupo va en el denominador:\n• «entre todas aquellas cuya prueba arrojó un resultado positivo» → miramos el total de la columna "Prueba Positiva", que es 90 personas.\n• De esas 90 personas con prueba positiva, las realmente enfermas son 72.\n• Proporción = 72 / 90 = 8 / 10 = 80 %.',
    distractorAnalysis: {
      A: 'INCORRECTA (Confusión fila vs. columna T). 72/80 = 90 % es la sensibilidad (positivos entre los enfermos), no la proporción entre quienes dieron positivo.',
      B: 'CORRECTA. Toma la intersección (72) dividida entre el total de la columna "Prueba Positiva" (90) → 80 %.',
      C: 'INCORRECTA. Divide entre el gran total de la tabla (200) ignorando la condición restrictiva del enunciado.',
      D: 'INCORRECTA. Calcula la especificidad de los sanos (102/120 = 85 %).',
    },
  },
  {
    id: 'rl-24',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Diagramas circulares (Sectores) y conversión ángulo-porcentaje',
    contextText:
      'El presupuesto anual de investigación de una facultad se representa en un gráfico circular (de sectores de 360°) dividido en cuatro rubros:\n• Equipos de laboratorio: 40 % del presupuesto.\n• Reactivos e insumos: ángulo central de 90°.\n• Publicaciones científicas: 15 % del presupuesto.\n• Becas de posgrado: el resto del presupuesto, equivalente a 140 millones de pesos.',
    statement:
      '¿Cuál es el ángulo central que le corresponde al sector de «Becas de posgrado» y cuál es el presupuesto total de la facultad, respectivamente?',
    options: [
      { id: 'A', text: '72° — 700 millones de pesos' },
      { id: 'B', text: '72° — 560 millones de pesos' },
      { id: 'C', text: '90° — 700 millones de pesos' },
      { id: 'D', text: '60° — 840 millones de pesos' },
    ],
    correctOption: 'A',
    explanation:
      '1) Convertimos el ángulo de "Reactivos" (90°) a porcentaje: como 360° = 100 %, un ángulo recto de 90° es exactamente la cuarta parte: 90° / 360° = 25 %.\n2) Sumamos los porcentajes de los tres primeros rubros: 40 % (Equipos) + 25 % (Reactivos) + 15 % (Publicaciones) = 80 %.\n3) Porcentaje restante para "Becas de posgrado": 100 % − 80 % = 20 % (es decir, 1/5 del total).\n4) Ángulo central de Becas (20 % de 360°): 0,20 × 360° = 72°.\n5) Como ese 20 % (1/5 del presupuesto) equivale a 140 millones de pesos, el presupuesto total (100 %) es: 140 millones × 5 = 700 millones de pesos.',
    distractorAnalysis: {
      A: 'CORRECTA. 20 % de 360° = 72° y 140 millones × 5 = 700 millones.',
      B: 'INCORRECTA. Multiplica 140 × 4 = 560 confundiendo el 20 % con el 25 %.',
      C: 'INCORRECTA. Asigna 90° a Becas en lugar de 72°.',
      D: 'INCORRECTA. Error al convertir 90° a porcentaje.',
    },
  },
  {
    id: 'rl-25',
    component: 'Razonamiento Lógico',
    level: 'Avanzado',
    topic: 'Estadística en tablas de frecuencias: cálculo de mediana y media ponderada',
    contextText:
      'Se registró el número de guardias nocturnas realizadas durante el mes por un grupo de 25 médicos internos:\n\n| Número de guardias en el mes | Cantidad de internos (Frecuencia) |\n| :---: | :---: |\n| 4 guardias | 5 internos |\n| 5 guardias | 7 internos |\n| 6 guardias | 8 internos |\n| 8 guardias | 5 internos |',
    statement:
      '¿Cuáles son la MEDIANA y la MEDIA ARITMÉTICA (promedio) del número de guardias realizadas por los 25 internos, respectivamente?',
    options: [
      { id: 'A', text: 'Mediana = 6 guardias — Media = 5,72 guardias' },
      { id: 'B', text: 'Mediana = 5 guardias — Media = 5,75 guardias' },
      { id: 'C', text: 'Mediana = 6 guardias — Media = 6,00 guardias' },
      { id: 'D', text: 'Mediana = 5,5 guardias — Media = 5,72 guardias' },
    ],
    correctOption: 'A',
    explanation:
      '1) Cálculo de la MEDIANA (dato central de los 25 internos ordenados de menor a mayor):\n   • La posición central para n = 25 datos es la posición (25 + 1) / 2 = 13.º interno.\n   • Frecuencias acumuladas: los primeros 5 tienen 4 guardias (posiciones 1 a 5); los siguientes 7 tienen 5 guardias (posiciones 6 a 12, pues 5 + 7 = 12); y los siguientes 8 tienen 6 guardias (posiciones 13 a 20).\n   • Como el interno n.º 13 cae en el tercer grupo, la Mediana es exactamente 6 guardias.\n2) Cálculo de la MEDIA PONDERADA:\n   • Total de guardias = (4 × 5) + (5 × 7) + (6 × 8) + (8 × 5) = 20 + 35 + 48 + 40 = 143 guardias.\n   • Media = 143 ÷ 25 = (143 × 4) ÷ 100 = 572 ÷ 100 = 5,72 guardias.',
    distractorAnalysis: {
      A: 'CORRECTA. Posición 13 = 6 guardias; y 143/25 = 5,72 guardias (usando el truco de multiplicar por 4 para dividir entre 100).',
      B: 'INCORRECTA. Mira la posición 12 en lugar de la 13 para la mediana, y promedia sin ponderar (4+5+6+8)/4 = 5,75.',
      C: 'INCORRECTA. Confunde la moda/mediana (6) con la media ponderada.',
      D: 'INCORRECTA. Promedia los dos valores centrales de la columna izquierda (5 y 6 → 5,5) ignorando las frecuencias acumuladas.',
    },
  },

  // ==================== ECUACIONES Y MODELACIÓN (rl-26 a rl-29) ====================
  {
    id: 'rl-26',
    component: 'Razonamiento Lógico',
    level: 'Básico',
    topic: 'Planteamiento de ecuaciones: problemas de edades e invarianza de diferencias',
    contextText:
      'Actualmente la edad de una profesora titular es el triple de la edad de su monitora de investigación. Hace 6 años, la edad de la profesora era cinco veces la edad que tenía la monitora en ese entonces.',
    statement:
      '¿Cuál será la suma de las edades de ambas dentro de 4 años a partir de hoy?',
    options: [
      { id: 'A', text: '48 años' },
      { id: 'B', text: '52 años' },
      { id: 'C', text: '56 años' },
      { id: 'D', text: '44 años' },
    ],
    correctOption: 'C',
    explanation:
      '1) Sea x la edad actual de la monitora → la edad actual de la profesora es 3x.\n2) Hace 6 años, sus edades eran (x − 6) y (3x − 6). Por condición del problema:\n   3x − 6 = 5(x − 6)\n   3x − 6 = 5x − 30\n   24 = 2x → x = 12 años.\n3) Edades actuales: Monitora = 12 años y Profesora = 3(12) = 36 años (Suma actual = 48 años).\n4) ¡Atención a la pregunta final! Pide la suma de las edades de AMBAS dentro de 4 años: como el tiempo pasa para las dos personas, cada una suma +4 años:\n   Suma futura = 48 + 4 + 4 = 56 años.',
    distractorAnalysis: {
      A: 'INCORRECTA (Ceguera al cierre del enunciado T). 48 años es la suma de sus edades HOY, olvidando sumar los 4 años futuros.',
      B: 'INCORRECTA (Error clásico T). Suma solo +4 años (48 + 4 = 52) olvidando que los 4 años transcurren tanto para la profesora como para la monitora (+8 en total).',
      C: 'CORRECTA. (12 + 4) + (36 + 4) = 16 + 40 = 56 años.',
      D: 'INCORRECTA. Error al distribuir el 5 en el paréntesis 5(x − 6).',
    },
  },
  {
    id: 'rl-27',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Sistemas de ecuaciones 2x2: errores que restan puntos en pruebas',
    contextText:
      'En una olimpiada regional de matemáticas de 30 preguntas, cada respuesta correcta suma 5 puntos, cada respuesta incorrecta resta 2 puntos y las preguntas dejadas en blanco suman 0 puntos. Un participante respondió todas las 30 preguntas (no dejó ninguna en blanco) y obtuvo un puntaje final de 94 puntos.',
    statement:
      '¿Cuántas preguntas respondió correctamente dicho participante?',
    options: [
      { id: 'A', text: '20 preguntas correctas' },
      { id: 'B', text: '22 preguntas correctas' },
      { id: 'C', text: '24 preguntas correctas' },
      { id: 'D', text: '18 preguntas correctas' },
    ],
    correctOption: 'B',
    explanation:
      'Método Rápido de Falsa Suposición (sin despejes largos):\n1) Si hubiera respondido las 30 preguntas correctamente, habría obtenido: 30 × 5 = 150 puntos.\n2) Sin embargo, obtuvo 94 puntos; es decir, perdió en total: 150 − 94 = 56 puntos respecto al máximo.\n3) Cada vez que cambia 1 respuesta correcta por 1 incorrecta, deja de ganar 5 puntos y además le restan 2 puntos, por lo que pierde en total 5 + 2 = 7 puntos por cada fallo.\n4) Número de respuestas incorrectas = 56 puntos perdidos ÷ 7 = 8 incorrectas.\n5) Número de respuestas correctas = 30 − 8 = 22 correctas (Verificación: 22×5 − 8×2 = 110 − 16 = 94).',
    distractorAnalysis: {
      A: 'INCORRECTA. Con 20 correctas y 10 incorrectas tendría 100 − 20 = 80 puntos.',
      B: 'CORRECTA. 22 correctas (110 pts) y 8 incorrectas (−16 pts) dan exactamente 94 puntos.',
      C: 'INCORRECTA. Con 24 correctas y 6 incorrectas tendría 120 − 12 = 108 puntos.',
      D: 'INCORRECTA (Error de planteo P). Divide 56 entre 5 en lugar de dividir entre la brecha de 7 puntos (5 + 2).',
    },
  },
  {
    id: 'rl-28',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Trabajo conjunto y tasas de llenado/vaciado (Grifos y desagües)',
    contextText:
      'Un tanque de agua destilada cuenta con una llave de suministro A que, funcionando sola, puede llenarlo por completo en 4 horas, y con una válvula de drenaje inferior B que, estando el tanque lleno y sin entrada de agua, lo vacía por completo en 6 horas. Estando el tanque completamente vacío, un operario abre la llave A pero deja abierta por descuido la válvula de drenaje B de manera simultánea.',
    statement:
      'Si ambas válvulas permanecen abiertas simultáneamente, ¿en cuántas horas se llenará por completo el tanque?',
    options: [
      { id: 'A', text: 'En 10 horas' },
      { id: 'B', text: 'En 12 horas' },
      { id: 'C', text: 'En 8 horas' },
      { id: 'D', text: 'En 2,4 horas' },
    ],
    correctOption: 'B',
    explanation:
      'Análisis por fracción de tanque en 1 hora (o asignando una capacidad conveniente igual al MCM(4, 6) = 12 litros):\n• Imaginemos que el tanque tiene una capacidad total de 12 litros.\n• La llave A lo llena en 4 horas → mete 12 ÷ 4 = +3 litros por hora.\n• El desagüe B lo vacía en 6 horas → saca 12 ÷ 6 = −2 litros por hora.\n• Funcionando juntas, el balance neto en cada hora es: +3 − 2 = +1 litro acumulado por hora.\n• Para llenar los 12 litros del tanque a razón de 1 litro por hora se requieren exactamente: 12 ÷ 1 = 12 horas.',
    distractorAnalysis: {
      A: 'INCORRECTA. Suma los tiempos 4 + 6 = 10 sin usar tasas inversas.',
      B: 'CORRECTA. 1/4 − 1/6 = (3 − 2)/12 = 1/12 de tanque por hora → 12 horas en total.',
      C: 'INCORRECTA. Duplica las 4 horas sin base proporcional.',
      D: 'INCORRECTA (Ceguera al signo negativo P). Suma 1/4 + 1/6 = 5/12 (12/5 = 2,4 h) como si el desagüe ayudara a llenar el tanque en vez de vaciarlo.',
    },
  },
  {
    id: 'rl-29',
    component: 'Razonamiento Lógico',
    level: 'Avanzado',
    topic: 'Sistemas de ecuaciones lineales: truco de suma simétrica',
    contextText:
      'En una droguería hospitalaria se compraron tres lotes de insumos quirúrgicos (suturas S, catéteres C y vendas V) a precios unitarios constantes:\n• Comprar 2 suturas, 3 catéteres y 4 vendas cuesta 53.000 pesos.\n• Comprar 4 suturas, 3 catéteres y 2 vendas cuesta 55.000 pesos.',
    statement:
      '¿Cuánto costará comprar exactamente 1 sutura, 1 catéter y 1 venda?',
    options: [
      { id: 'A', text: '18.000 pesos' },
      { id: 'B', text: '16.000 pesos' },
      { id: 'C', text: '19.000 pesos' },
      { id: 'D', text: 'No se puede determinar porque hay 3 incógnitas y solo 2 ecuaciones.' },
    ],
    correctOption: 'A',
    explanation:
      'Atajo clásico UdeA de Suma Simétrica (¡no intentes despejar S, C y V por separado!):\n• Ecuación 1: 2S + 3C + 4V = 53.000\n• Ecuación 2: 4S + 3C + 2V = 55.000\nSumamos miembro a miembro ambas ecuaciones:\n(2S + 4S) + (3C + 3C) + (4V + 2V) = 53.000 + 55.000\n6S + 6C + 6V = 108.000\nFactorizamos el 6:\n6(S + C + V) = 108.000\nDividimos ambos lados entre 6:\nS + C + V = 108.000 ÷ 6 = 18.000 pesos.',
    distractorAnalysis: {
      A: 'CORRECTA. La suma simétrica da 6(S + C + V) = 108.000 → S + C + V = 18.000 pesos.',
      B: 'INCORRECTA. Error al dividir 108.000 entre 6.',
      C: 'INCORRECTA. Promedia de forma incorrecta sin dividir entre 6.',
      D: 'INCORRECTA (Trampa conceptual C). Aunque no se puede hallar el precio individual de cada artículo, la combinación lineal (S + C + V) sí está unívocamente determinada.',
    },
  },

  // ==================== GEOMETRÍA Y RAZONAMIENTO ESPACIAL (rl-30 a rl-35) ====================
  {
    id: 'rl-30',
    component: 'Razonamiento Lógico',
    level: 'Básico',
    topic: 'Geometría plana: perímetro de figuras escalonadas por proyección',
    contextText:
      'Se tiene una lámina rectangular de cartulina de 18 cm de base por 12 cm de altura. En la esquina superior derecha se recorta un escalón rectangular entrante de 5 cm de ancho horizontal por 4 cm de profundidad vertical (sin dividir la lámina en dos pedazos, quedando una figura en forma de "L" gruesa de 6 lados con todos sus ángulos rectos).',
    statement:
      '¿Cuál es el perímetro exterior de la figura resultante tras realizar el recorte en la esquina?',
    options: [
      { id: 'A', text: '51 cm' },
      { id: 'B', text: '60 cm' },
      { id: 'C', text: '69 cm' },
      { id: 'D', text: '56 cm' },
    ],
    correctOption: 'B',
    explanation:
      'Propiedad geométrica de proyección de escalones ortogonales:\n• Al recortar una esquina rectangular entrante, el segmento horizontal nuevo (de 5 cm) reemplaza exactamente los 5 cm que se quitaron arriba, y el segmento vertical nuevo (de 4 cm) reemplaza exactamente los 4 cm que se quitaron a la derecha.\n• Por traslación de segmentos hacia afuera, ¡el perímetro de cualquier figura escalonada en esquina es EXACTAMENTE IGUAL al perímetro del rectángulo original!\n• Perímetro = 2 × (18 cm + 12 cm) = 2 × 30 cm = 60 cm.',
    distractorAnalysis: {
      A: 'INCORRECTA (Confusión área vs. perímetro P). Resta 5 + 4 = 9 cm pensando que como se quitó cartulina el perímetro disminuye.',
      B: 'CORRECTA. Los dos lados internos del escalón compensan exactamente los tramos recortados: 2(18 + 12) = 60 cm.',
      C: 'INCORRECTA. Suma 5 + 4 = 9 cm adicionales (eso ocurriría si fuera una muesca en la mitad de un lado, no en la esquina).',
      D: 'INCORRECTA. Resta solo uno de los lados del escalón.',
    },
  },
  {
    id: 'rl-31',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Geometría plana: áreas sombreadas con sectores circulares inscritos',
    contextText:
      'En el interior de un cuadrado de lado 6 cm se trazan dos cuartos de circunferencia con centro en dos vértices opuestos del cuadrado y radio igual a la mitad del lado del cuadrado (3 cm). Asimismo, en los otros dos vértices opuestos se trazan otros dos cuartos de circunferencia del mismo radio (3 cm), de modo que los cuatro sectores circulares son tangentes en los puntos medios de los lados del cuadrado. La región central interior no cubierta por los cuatro sectores se pinta de color gris.',
    statement:
      'El área de la región central pintada de gris, en cm², es:',
    options: [
      { id: 'A', text: '36 − 9π' },
      { id: 'B', text: '36 − 6π' },
      { id: 'C', text: '18 − 9π' },
      { id: 'D', text: '9(4 − 2π)' },
    ],
    correctOption: 'A',
    explanation:
      'Estrategia de Resta y Reacomodación de Piezas:\n1) Área total del cuadrado de lado 6 cm = 6² = 36 cm².\n2) En las 4 esquinas del cuadrado hay 4 cuartos de círculo, cada uno de radio r = 3 cm.\n3) Al juntar los 4 cuartos de círculo de igual radio (4 × 1/4 = 1), ¡forman exactamente 1 círculo completo de radio r = 3 cm!\n4) Área de ese círculo completo = π · r² = π · (3)² = 9π cm².\n5) Área de la región gris central = Área Cuadrado − Área de los 4 sectores = 36 − 9π cm².',
    distractorAnalysis: {
      A: 'CORRECTA. 36 cm² del cuadrado menos 1 círculo completo de radio 3 (9π cm²) = 36 − 9π.',
      B: 'INCORRECTA (Confusión fórmula de longitud vs. área C). Calcula el área del círculo como 2πr = 6π en vez de πr² = 9π.',
      C: 'INCORRECTA. Toma la mitad del área del cuadrado (18) en lugar de 36.',
      D: 'INCORRECTA. 9(4 − 2π) = 36 − 18π (equivale a restar dos círculos completos).',
    },
  },
  {
    id: 'rl-32',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Razonamiento espacial: el problema clásico del cubo pintado y cortado',
    contextText:
      'Un cubo compacto de madera de 4 cm de arista se pinta completamente de color verde por todas sus 6 caras exteriores. Una vez seca la pintura, el cubo se corta mediante cortes paralelos a sus caras en cubitos pequeños idénticos de 1 cm de arista cada uno.',
    statement:
      '¿Cuántos de los cubitos pequeños obtenidos tienen EXACTAMENTE DOS de sus caras pintadas de verde?',
    options: [
      { id: 'A', text: '8 cubitos' },
      { id: 'B', text: '16 cubitos' },
      { id: 'C', text: '24 cubitos' },
      { id: 'D', text: '32 cubitos' },
    ],
    correctOption: 'C',
    explanation:
      'Anatomía espacial de un cubo de n × n × n (aquí n = 4, total 4³ = 64 cubitos):\n• 3 caras pintadas: son siempre los 8 vértices (esquinas).\n• 2 caras pintadas: están ubicados a lo largo de las 12 aristas (bordes) del cubo, excluyendo las 2 esquinas de cada arista.En cada una de las 12 aristas hay (n − 2) = (4 − 2) = 2 cubitos centrales.\n• Total con exactamente 2 caras pintadas = 12 aristas × 2 cubitos/arista = 24 cubitos.\n(Nota de control: 3 caras = 8; 2 caras = 24; 1 cara = 6(4−2)² = 24; 0 caras = (4−2)³ = 8 → Suma = 8+24+24+8 = 64).',
    distractorAnalysis: {
      A: 'INCORRECTA. 8 corresponde a los cubitos de las esquinas (que tienen 3 caras pintadas) o a los internos (0 caras pintadas).',
      B: 'INCORRECTA. Multiplica por 8 aristas en lugar de las 12 aristas que tiene todo cubo.',
      C: 'CORRECTA. 12 aristas × (4 − 2) cubitos por arista = 24 cubitos con exactamente 2 caras pintadas.',
      D: 'INCORRECTA. Suma los de 2 caras (24) más los de 3 caras (8) = 32 (eso respondería a "al menos dos caras pintadas").',
    },
  },
  {
    id: 'rl-33',
    component: 'Razonamiento Lógico',
    level: 'Básico',
    topic: 'Geometría: escalamiento de área y volumen en sólidos semejantes',
    contextText:
      'En una facultad de medicina veterinaria se tiene una maqueta anatómica maciza de bronce de un corazón equino. Se desea fundir un segundo modelo exactamente semejante al primero en todas sus proporciones, pero cuyas dimensiones lineales (largo, ancho y alto) sean el TRIPLE de las de la maqueta original.',
    statement:
      'Si para pintar la superficie exterior de la maqueta original se necesitaron 20 mililitros de barniz y su peso es de 200 gramos, ¿cuánto barniz (proporcional al área superficial) y cuánto bronce (proporcional al volumen) requerirá el nuevo modelo triplicado?',
    options: [
      { id: 'A', text: '60 mL de barniz y 600 gramos de bronce' },
      { id: 'B', text: '180 mL de barniz y 1.800 gramos de bronce' },
      { id: 'C', text: '180 mL de barniz y 5.400 gramos de bronce' },
      { id: 'D', text: '60 mL de barniz y 5.400 gramos de bronce' },
    ],
    correctOption: 'C',
    explanation:
      'Ley de escalamiento geométrico con razón lineal k = 3:\n1) La cantidad de pintura/barniz depende del ÁREA SUPERFICIAL, la cual escala con el cuadrado de la razón lineal (k² = 3² = 9 veces):\n   Barniz nuevo = 20 mL × 9 = 180 mL.\n2) El peso de un sólido macizo homogéneo depende de su VOLUMEN, el cual escala con el cubo de la razón lineal (k³ = 3³ = 27 veces):\n   Peso nuevo = 200 g × 27 = 5.400 gramos.',
    distractorAnalysis: {
      A: 'INCORRECTA (Trampa de linealidad C). Multiplica ambos por 3 ignorando que el área es bidimensional (3²) y el volumen tridimensional (3³).',
      B: 'INCORRECTA. Escala bien el área por 3² = 9, pero también multiplica el volumen por 9 en lugar de 3³ = 27.',
      C: 'CORRECTA. Área × 9 (180 mL) y Volumen × 27 (5.400 g).',
      D: 'INCORRECTA. Escala el volumen por 27 pero deja el área multiplicada solo por 3.',
    },
  },
  {
    id: 'rl-34',
    component: 'Razonamiento Lógico',
    level: 'Avanzado',
    topic: 'Razonamiento espacial: despliegue de dados y caras opuestas',
    contextText:
      'Se tiene una plantilla plana en forma de cruz formada por 6 cuadrados congruentes para armar un cubo:\n• La fila vertical central tiene 4 cuadrados numerados de arriba hacia abajo con las letras: [P], [Q], [R], [S].\n• Adosado al lado izquierdo del cuadrado [Q] está el cuadrado [T], y adosado al lado derecho del cuadrado [R] está el cuadrado [U].\nAl doblar la plantilla en ángulos de 90° por sus líneas de unión se forma un dado cúbico cerrado.',
    statement:
      'En el cubo ya armado, ¿cuáles son las tres parejas de caras que quedan ubicadas en posiciones exactamente OPUESTAS entre sí?',
    options: [
      { id: 'A', text: '(P con R), (Q con S) y (T con U)' },
      { id: 'B', text: '(P con S), (Q con R) y (T con U)' },
      { id: 'C', text: '(P con T), (Q con U) y (R con S)' },
      { id: 'D', text: '(P con U), (Q con S) y (R con T)' },
    ],
    correctOption: 'A',
    explanation:
      'Regla del Salto Alternado en plantillas de cubos (UdeA):\n1) En cualquier hilera recta de cuadrados contiguos ([P] - [Q] - [R] - [S]), dos caras son opuestas si y solo si están separadas por exactamente UN cuadrado intermedio:\n   • [P] salta sobre [Q] y queda opuesta a [R] → Pareja 1: (P con R).\n   • [Q] salta sobre [R] y queda opuesta a [S] → Pareja 2: (Q con S).\n2) Las dos aletas laterales restantes ([T] a la izquierda y [U] a la derecha), al doblarse hacia arriba desde lados opuestos de la tira central, quedan enfrentadas entre sí → Pareja 3: (T con U).',
    distractorAnalysis: {
      A: 'CORRECTA. Aplica la regla del salto de 1 casilla en la columna (P-R y Q-S) y enfrenta las dos caras laterales (T-U).',
      B: 'INCORRECTA. P y S están separadas por dos casillas; al plegarse quedan adyacentes (se tocan en una arista), no opuestas.',
      C: 'INCORRECTA. Q y R comparten arista en la plantilla, por lo que jamás pueden ser caras opuestas.',
      D: 'INCORRECTA. R y T quedan perpendiculares (adyacentes) al plegar.',
    },
  },
  {
    id: 'rl-35',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Geometría: relaciones de áreas mediante medianas y baricentro en triángulos',
    contextText:
      'Considere un triángulo cualquiera ABC cuya área total es de 72 cm². Se ubica el punto medio M del lado BC y se traza la mediana AM. Posteriormente, se ubica el punto medio N de dicha mediana AM y se traza el segmento BN, formándose en el interior el triángulo ABN.',
    statement:
      '¿Cuál es el área del triángulo ABN, en cm²?',
    options: [
      { id: 'A', text: '12 cm²' },
      { id: 'B', text: '18 cm²' },
      { id: 'C', text: '24 cm²' },
      { id: 'D', text: '36 cm²' },
    ],
    correctOption: 'B',
    explanation:
      'Propiedad fundamental de la mediana en cualquier triángulo (sin importar su forma):\n1) Toda mediana (segmento que va de un vértice al punto medio del lado opuesto) divide al triángulo en dos triángulos de IGUAL ÁREA (porque tienen igual base BM = MC y la misma altura desde A).\n   Por tanto, como AM es mediana de △ABC (área 72 cm²), el triángulo ABM tiene exactamente la mitad del área: Área(△ABM) = 72 ÷ 2 = 36 cm².\n2) Ahora miramos dentro del triángulo ABM: como N es el punto medio del lado AM, el segmento BN es a su vez la mediana del triángulo ABM.\n   Por tanto, BN divide a △ABM en dos partes de igual área: Área(△ABN) = 36 ÷ 2 = 18 cm² (es decir, 1/4 del triángulo original).',
    distractorAnalysis: {
      A: 'INCORRECTA. 12 cm² sería 1/6 del área (eso ocurre con el baricentro, que divide la mediana en razón 2:1, no en el punto medio N).',
      B: 'CORRECTA. La primera mediana divide entre 2 (36 cm²) y la segunda mediana vuelve a dividir entre 2 (18 cm²).',
      C: 'INCORRECTA. Equivale a 1/3 del área total.',
      D: 'INCORRECTA (Paso incompleto T). 36 cm² es el área del triángulo ABM; faltó dividir nuevamente entre 2 por el punto medio N.',
    },
  },

  // ==================== CONJUNTOS, SECUENCIAS, CONTEO Y PROBABILIDAD (rl-36 a rl-40) ====================
  {
    id: 'rl-36',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Principio del palomar (Dirichlet): problemas de certezas (Peor de los casos)',
    contextText:
      'En una caja opaca hay guardados 10 pares de guantes quirúrgicos de talla S (es decir, 10 guantes para la mano izquierda y 10 guantes para la mano derecha, todos del mismo color) y 8 pares de guantes quirúrgicos de talla M (8 izquierdos y 8 derechos). Un médico extrae guantes de la caja uno por uno, al azar y sin mirar.',
    statement:
      '¿Cuál es el MÍNIMO número de guantes que debe extraer para tener la CERTEZA absoluta de haber sacado al menos un par utilizable (un guante izquierdo y uno derecho) de la MISMA talla?',
    options: [
      { id: 'A', text: '3 guantes' },
      { id: 'B', text: '11 guantes' },
      { id: 'C', text: '19 guantes' },
      { id: 'D', text: '20 guantes' },
    ],
    correctOption: 'C',
    explanation:
      '¡Atención a la diferencia entre medias y guantes en el examen de la UdeA! Los guantes tienen lateralidad (mano izquierda vs. mano derecha). Para garantizar un par utilizable de la misma talla, analizamos el PEOR DE LOS CASOS (la máxima "mala suerte" antes de lograr el objetivo):\n1) El peor escenario es que todos los guantes que saquemos sean de UNA SOLA MANO (por ejemplo, todos de la mano izquierda) de ambas tallas.\n2) ¿Cuántos guantes izquierdos hay en total en la caja?: 10 izquierdos de talla S + 8 izquierdos de talla M = 18 guantes izquierdos (con esos 18 aún NO tenemos ningún par completo porque falta un guante derecho).\n3) El siguiente guante extraído (el n.º 19) será obligatoriamente de la mano DERECHA (ya sea talla S o talla M) y hará pareja con uno de los izquierdos que ya teníamos.\nTotal mínimo para tener certeza = 10 + 8 + 1 = 19 guantes.',
    distractorAnalysis: {
      A: 'INCORRECTA (Confusión guantes vs. medias P). Con 3 extracciones podrías sacar 3 guantes izquierdos y no tendrías ningún guante derecho.',
      B: 'INCORRECTA. Considera solo los 10 izquierdos de talla S + 1, olvidando que después podrían salir los 8 izquierdos de talla M.',
      C: 'CORRECTA. Peor caso: agotar los 10 izquierdos S + 8 izquierdos M = 18 guantes de una misma mano; el 19.º completa el par con certeza.',
      D: 'INCORRECTA. Suma una extracción de más tras haber agotado todas las manos izquierdas.',
    },
  },
  {
    id: 'rl-37',
    component: 'Razonamiento Lógico',
    level: 'Básico',
    topic: 'Secuencias numéricas de segundo orden y patrones inductivos',
    contextText:
      'En un cultivo celular experimental se registra el número de microcolonias activas al finalizar cada una de las primeras cinco horas siguiendo una ley de formación regular:\n\nHora 1: 3\nHora 2: 8\nHora 3: 15\nHora 4: 24\nHora 5: 35',
    statement:
      'Si el patrón se mantiene exactamente igual, ¿cuántas microcolonias activas habrá al finalizar la Hora 10?',
    options: [
      { id: 'A', text: '99' },
      { id: 'B', text: '120' },
      { id: 'C', text: '100' },
      { id: 'D', text: '143' },
    ],
    correctOption: 'B',
    explanation:
      'Dos caminos rápidos UdeA:\n• Camino 1 (Reconocimiento de cuadrados perfectos − 1): Observa cada término comparado con los cuadrados (4, 9, 16, 25, 36):\n  Hora 1: 2² − 1 = 3 (o 1 × 3)\n  Hora 2: 3² − 1 = 8 (o 2 × 4)\n  Hora 3: 4² − 1 = 15 (o 3 × 5)\n  Hora 4: 5² − 1 = 24 (o 4 × 6)\n  Hora n: n(n + 2) = (n + 1)² − 1.\n  Para la Hora n = 10: 10 × (10 + 2) = 10 × 12 = 120 (o 11² − 1 = 121 − 1 = 120).\n• Camino 2 (Diferencias sucesivas impares): +5, +7, +9, +11, +13, +15, +17, +19, +21 → 35 + 13 + 15 + 17 + 19 + 21 = 120.',
    distractorAnalysis: {
      A: 'INCORRECTA (Desfase de índice n T). Calcula 10² − 1 = 99 (que corresponde a la Hora 9, no a la Hora 10).',
      B: 'CORRECTA. Para n = 10, la ley n(n + 2) = 10 × 12 = 120.',
      C: 'INCORRECTA. Eleva 10² = 100 ignorando el desplazamiento de la secuencia.',
      D: 'INCORRECTA. Calcula 12² − 1 = 143 (que corresponde a la Hora 11).',
    },
  },
  {
    id: 'rl-38',
    component: 'Razonamiento Lógico',
    level: 'Intermedio',
    topic: 'Principio multiplicativo y permutaciones con restricción de adyacencia',
    contextText:
      'Cinco conferencistas (3 médicos infectólogos y 2 epidemiólogos) van a sentarse en una fila de 5 sillas numeradas en el auditorio principal de la UdeA. Por organización del panel, los 2 epidemiólogos deben sentarse SIEMPRE JUNTOS (en sillas contiguas).',
    statement:
      '¿De cuántas maneras diferentes pueden ubicarse los 5 conferencistas en la fila cumpliendo dicha condición?',
    options: [
      { id: 'A', text: '24 maneras' },
      { id: 'B', text: '48 maneras' },
      { id: 'C', text: '120 maneras' },
      { id: 'D', text: '60 maneras' },
    ],
    correctOption: 'B',
    explanation:
      'Técnica de Empaquetamiento (Elementos que van siempre juntos):\n1) "Atamos" a los 2 epidemiólogos en un solo bloque inseparable [E₁E₂].\n2) Ahora tenemos 4 elementos para ordenar en la fila: los 3 infectólogos (I₁, I₂, I₃) y el bloque [E₁E₂].\n3) Número de formas de ordenar esos 4 elementos = 4! = 4 × 3 × 2 × 1 = 24 formas.\n4) Pero dentro del bloque [E₁E₂], los dos epidemiólogos pueden intercambiar su asiento entre sí de 2! = 2 formas ([E₁E₂] o [E₂E₁]).\n5) Por principio multiplicativo: Total = 24 × 2 = 48 maneras.',
    distractorAnalysis: {
      A: 'INCORRECTA (Olvido de permutación interna P). Calcula 4! = 24 pero olvida multiplicar por 2 por el intercambio entre los dos epidemiólogos.',
      B: 'CORRECTA. 4! × 2! = 24 × 2 = 48 maneras.',
      C: 'INCORRECTA. 5! = 120 es el total de permutaciones sin ninguna restricción.',
      D: 'INCORRECTA. Divide 120 entre 2 sin justificación combinatoria.',
    },
  },
  {
    id: 'rl-39',
    component: 'Razonamiento Lógico',
    level: 'Avanzado',
    topic: 'Probabilidad compuesta sin reposición y probabilidad del complemento',
    contextText:
      'En una caja refrigerada hay 6 viales de vacuna perfectamente sellados y 4 viales con defecto en el sello. Una enfermera selecciona al azar 2 viales de la caja, uno tras otro y SIN reposición.',
    statement:
      '¿Cuál es la probabilidad de que AL MENOS UNO de los dos viales seleccionados esté perfectamente sellado?',
    options: [
      { id: 'A', text: '13 / 15' },
      { id: 'B', text: '2 / 15' },
      { id: 'C', text: '1 / 3' },
      { id: 'D', text: '4 / 5' },
    ],
    correctOption: 'A',
    explanation:
      'Estrategia de la Probabilidad del Complemento (mucho más rápida que sumar 3 casos):\n1) El evento opuesto (complemento) de sacar «AL MENOS UNO bueno» es sacar «NINGUNO bueno» (es decir, que AMBOS viales salgan defectuosos).\n2) Probabilidad de que el 1.er vial sea defectuoso: hay 4 defectuosos de 10 totales → 4 / 10.\n3) Probabilidad de que el 2.º vial también sea defectuoso (sin reposición): quedan 3 defectuosos de 9 viales restantes → 3 / 9.\n4) Probabilidad de que ambos sean defectuosos:\n   P(ninguno bueno) = (4 / 10) × (3 / 9) = 12 / 90 = 2 / 15.\n5) Restamos de 1 (el 100 %):\n   P(al menos 1 bueno) = 1 − (2 / 15) = 13 / 15.',
    distractorAnalysis: {
      A: 'CORRECTA. 1 − (4/10 × 3/9) = 1 − 2/15 = 13/15.',
      B: 'INCORRECTA (Olvido de restar al complemento T). 2/15 es la probabilidad de que AMBOS salgan defectuosos.',
      C: 'INCORRECTA. 1/3 (30/90) es la probabilidad de que AMBOS salgan buenos (6/10 × 5/9 = 30/90 = 1/3), olvidando los casos donde sale 1 bueno y 1 defectuoso.',
      D: 'INCORRECTA (Cálculo con reposición P). Calcula como si los viales se devolvieran a la caja.',
    },
  },
  {
    id: 'rl-40',
    component: 'Razonamiento Lógico',
    level: 'Avanzado',
    topic: 'Operaciones no convencionales con propiedad telescópica',
    contextText:
      'Para todo número entero positivo n, se define el operador unitario «[n]» mediante la expresión:\n\n[n] = 1 / [n · (n + 1)]\n\n(Recuerde la identidad algebraica de fracciones parciales: 1 / [n(n + 1)] = (1 / n) − [1 / (n + 1)]).',
    statement:
      'De acuerdo con la definición anterior, el valor exacto de la suma:\nS = [1] + [2] + [3] + ... + [19] + [20]\nes igual a:',
    options: [
      { id: 'A', text: '19 / 20' },
      { id: 'B', text: '20 / 21' },
      { id: 'C', text: '21 / 20' },
      { id: 'D', text: '1 / 420' },
    ],
    correctOption: 'B',
    explanation:
      'Aplicamos la descomposición telescópica a cada término de la suma:\n• [1] = 1/1 − 1/2\n• [2] = 1/2 − 1/3\n• [3] = 1/3 − 1/4\n...\n• [20] = 1/20 − 1/21\nAl sumar todos los términos, los elementos intermedios se cancelan por parejas simétricas (−1/2 + 1/2 = 0, −1/3 + 1/3 = 0, ..., −1/20 + 1/20 = 0), sobreviviendo únicamente el primer término positivo y el último negativo:\nS = 1 − (1 / 21) = 20 / 21.',
    distractorAnalysis: {
      A: 'INCORRECTA (Error en el último denominador T). Detiene la suma en 1 − 1/20 = 19/20 olvidando que [n] llega hasta 1/(n+1) = 1/21.',
      B: 'CORRECTA. Por suma telescópica: 1 − 1/(20 + 1) = 1 − 1/21 = 20/21.',
      C: 'INCORRECTA. Suma 1 + 1/20 en lugar de restar.',
      D: 'INCORRECTA. Evalúa únicamente el último término individual [20] = 1/(20×21) = 1/420 en lugar de toda la sumatoria.',
    },
  },
];
