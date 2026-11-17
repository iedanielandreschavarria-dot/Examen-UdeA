import { VocabularyEntry } from '../types';

export const INITIAL_VOCABULARY: VocabularyEntry[] = [
  {
    id: 'voc-01',
    word: 'Impugnar',
    meaning:
      'Combatir, contradecir, refutar o cuestionar la validez de una idea, argumento, norma o decisión mediante razones.',
    category: 'Léxico Académico',
    synonyms: 'Refutar, rebatir, objetar, controvertir (Antónimo: respaldar, ratificar)',
    example:
      '«El autor no pretende impugnar el avance tecnológico, sino advertir sus límites éticos».',
    mastered: false,
    createdAt: '2026-11-16',
  },
  {
    id: 'voc-02',
    word: 'Perentorio',
    meaning:
      'Concluyente, decisivo, urgente o que no admite demora, prórroga ni discusión; dicho de un plazo o mandato, que es el último o inapelable.',
    category: 'Léxico Académico',
    synonyms: 'Apremiante, inaplazable, tajante, imperativo (Antónimo: prorrogable, opcional)',
    example:
      '«El comité fijó un plazo perentorio para entregar los resultados del ensayo clínico».',
    mastered: false,
    createdAt: '2026-11-16',
  },
  {
    id: 'voc-03',
    word: 'Inocuo',
    meaning:
      'Que no hace daño físico ni moral; en textos argumentativos, aquello que resulta inofensivo o ineficaz para alterar una situación.',
    category: 'Científico / Médico',
    synonyms: 'Inofensivo, anodino, ineficaz (Antónimo: nocivo, pernicioso, letal)',
    example:
      '«El paciente con alodinia percibe como doloroso un estímulo táctil completamente inocuo».',
    mastered: false,
    createdAt: '2026-11-16',
  },
  {
    id: 'voc-04',
    word: 'Melifluo',
    meaning:
      'Que tiene miel o es parecido a ella; en sentido figurado, trato o discurso excesivamente dulce, suave, delicado o adulador (a menudo con intención engañosa).',
    category: 'Léxico Académico',
    synonyms: 'Dulzón, zalamero, empalagoso, halagador (Antónimo: áspero, hosco)',
    example:
      '«El tigre alabó con voz meliflua la destreza del campesino para que entregara sus armas».',
    mastered: false,
    createdAt: '2026-11-16',
  },
  {
    id: 'voc-05',
    word: 'Agnosia (a- + gnosis)',
    meaning:
      'Del griego a- ("sin, privación") y gnosis ("conocimiento"): incapacidad perceptiva o intelectual para reconocer estímulos o comprender una realidad.',
    category: 'Raíz / Etimología',
    synonyms: 'Desconocimiento, incomprensión, ceguera cognitiva',
    example:
      '«La memoria histórica actúa como un antídoto contra la agnosia colectiva».',
    mastered: false,
    createdAt: '2026-11-16',
  },
  {
    id: 'voc-06',
    word: 'Alodinia (állos + odýne)',
    meaning:
      'Del griego állos ("otro, diferente") y odýne ("dolor"): percepción anormal del dolor provocada por un estímulo que habitualmente es indoloro.',
    category: 'Raíz / Etimología',
    synonyms: 'Hipersensibilidad dolorosa al tacto leve (Antónimo: analgesia)',
    example:
      '«El simple roce de una sábana desencadenaba alodinia en la zona afectada».',
    mastered: false,
    createdAt: '2026-11-16',
  },
  {
    id: 'voc-07',
    word: 'Sine qua non',
    meaning:
      'Locución latina que significa literalmente «sin la cual no». Designa una condición o requisito absolutamente indispensable para que algo sea válido o posible.',
    category: 'Locución Latina',
    synonyms: 'Requisito indispensable, condición esencial, forzoso',
    example:
      '«El consentimiento informado es una condición sine qua non de la investigación médica».',
    mastered: false,
    createdAt: '2026-11-16',
  },
  {
    id: 'voc-08',
    word: 'Ad hoc',
    meaning:
      'Locución latina («para esto»): diseñado, dispuesto o improvisado específicamente para un fin o situación particular.',
    category: 'Locución Latina',
    synonyms: 'A medida, específico, circunstancial',
    example:
      '«Se conformó una comisión ad hoc para investigar el brote epidemiológico».',
    mastered: false,
    createdAt: '2026-11-16',
  },
  {
    id: 'voc-09',
    word: 'A priori / A posteriori',
    meaning:
      '«A priori» significa de antemano o antes de examinar la experiencia empírica; «A posteriori» significa después de observar los hechos o las pruebas.',
    category: 'Locución Latina',
    synonyms: 'Previo a la experiencia / Posterior a la verificación empírica',
    example:
      '«En ciencia experimental ninguna hipótesis debe descartarse a priori sin contrastar los datos».',
    mastered: false,
    createdAt: '2026-11-16',
  },
  {
    id: 'voc-10',
    word: 'Concesión (Si bien / Aunque / Aun cuando)',
    meaning:
      'Operación argumentativa mediante la cual el autor admite provisionalmente un punto válido de la tesis contraria antes de reafirmar su propia postura principal.',
    category: 'Conector / Discurso',
    synonyms: 'Objeción admitida, matiz concesivo',
    example:
      '«Si bien la telemedicina amplía la cobertura (concesión), no reemplaza la exploración física (tesis)».',
    mastered: false,
    createdAt: '2026-11-16',
  },
  {
    id: 'voc-11',
    word: 'Anacronismo (ana- + khrónos)',
    meaning:
      'Error consistente en situar un hecho, objeto o mentalidad en una época histórica a la que no corresponde (ej. juzgar el pasado con categorías del presente).',
    category: 'Raíz / Etimología',
    synonyms: 'Desfase temporal, incongruencia histórica',
    example:
      '«Exigir conceptos de microbiología moderna a un médico medieval es un anacronismo».',
    mastered: false,
    createdAt: '2026-11-16',
  },
  {
    id: 'voc-12',
    word: 'Paliativo',
    meaning:
      'Que mitiga, suaviza o atenúa el dolor o los efectos negativos de un problema o enfermedad, pero sin curar ni eliminar su causa de raíz.',
    category: 'Científico / Médico',
    synonyms: 'Mitigador, atenuante, sintomático (Antónimo: curativo, radical)',
    example:
      '«Los subsidios transitorios operaron como un paliativo que no resolvió el desempleo estructural».',
    mastered: false,
    createdAt: '2026-11-16',
  },
];

