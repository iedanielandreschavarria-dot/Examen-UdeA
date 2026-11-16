# 🎓 UdeA Prep — Sistema Integral de Admisión

**UdeA Prep** es una plataforma web interactiva de preparación académica (EdTech) diseñada específicamente para estructurar, medir y optimizar el estudio hacia el **Examen de Admisión de Pregrado de la Universidad de Antioquia (UdeA)**, con énfasis personalizable en carreras de alta demanda como **Medicina**.

Funciona 100 % en el navegador sin necesidad de servidores externos ni bases de datos en la nube: todo el progreso, bitácoras, simulacros y cuaderno de errores se guardan automáticamente en `localStorage`, con opción de exportar e importar copias de seguridad en formato `.json`.

---

## 🎯 Contexto y Metodología del Proyecto

El examen de admisión de la Universidad de Antioquia consta de **80 preguntas de selección múltiple con única respuesta** para resolver en un máximo de **3 horas (180 minutos)**, lo que exige un ritmo promedio de **2,25 minutos (135 segundos) por pregunta**:
- **Competencia Lectora:** 40 preguntas (50 %)
- **Razonamiento Lógico:** 40 preguntas (50 %)

Para aspirantes a programas de altísima demanda como **Medicina en Medellín** (donde la franja histórica de referencia oscila alrededor de **~85.38 a 89.25 / 100**, sujeto a la cohorte y cupos de cada convocatoria oficial), estudiar de forma desordenada o pasiva no es suficiente.

**UdeA Prep** implementa el protocolo de **"La Hora Sagrada (60 min/día)"** a lo largo de un plan estructurado de **32 semanas (224 sesiones diarias)** dividido en 4 fases progresivas:
1. **15 minutos — Teoría y Esquema Activo:** Conceptos clave, fórmulas, atajos deductivos y trampas frecuentes del examen UdeA.
2. **35 minutos — Práctica Deliberada con Reloj:** Resolución de ejercicios tipo UdeA bajo presión controlada de tiempo (`2,25 min/pregunta`).
3. **10 minutos — Bitácora Metacognitiva y Cuaderno de Errores:** Clasificación forense de cada fallo y programación de repaso espaciado.

---

## 🧩 Módulos Principales de la Aplicación

### 1. 📊 Dashboard de Progreso (Inicio)
- **KPIs en tiempo real:** Porcentaje de avance global (`sesiones completadas / 224`), horas efectivas acumuladas, cuenta regresiva editable hacia la fecha objetivo del examen, promedio de acierto global y desglosado (**Competencia Lectora %** vs. **Razonamiento Lógico %**) y racha de días consecutivos estudiando.
- **Curva de Evolución (Recharts):** Gráfico comparativo de la progresión en simulacros y semanas frente a la línea de meta de corte del programa elegido.
- **Acción Rápida del Día:** Tarjeta destacada con la sesión correspondiente al día actual, botón para abrir el **Aula del Día** y marcado directo de completado.

### 2. 🛡️ Guía del Examen UdeA (Base de Conocimiento Verificada)
- Distinción explícita mediante etiquetas visuales y filtros entre:
  - **Información Oficial** (estructura de 80 ítems, 3 horas, asignación por orden de mérito según cupo).
  - **Patrones Observados** (frecuencia de subtemas, tipos de distractores).
  - **Estimaciones / Referencias Históricas** (franja histórica de puntajes de corte por carrera, con aviso metodológico claro de que no constituyen garantía para futuras convocatorias).
- **Temario desglosado y filtrable** con etiquetas de prioridad (`Alta`, `Media-Alta`, `Media`, `Baja`) y estrategias tácticas por subtema.

### 3. 🗓️ Plan de Estudio Interactivo (Calendario de 32 Semanas y 4 Fases)
- **Parámetros configurables:** Carrera objetivo, puntaje meta, fecha de inicio, fecha del examen e intensidad diaria (`1h`, `1.5h`, `2h`, `3h`), recalculando dinámicamente las fechas de las fases y los tiempos por bloque.
- **4 Fases Progresivas:**
  - *Fase 1 (Semanas 1–8):* Base y Diagnóstico (Aritmética, porcentajes, proporcionalidad, ecuaciones, tipología textual y semántica).
  - *Fase 2 (Semanas 9–16):* Inferencia y Abstracción (Analogías, lectura crítica, conjuntos, secuencias, conteo, probabilidad y operadores no convencionales).
  - *Fase 3 (Semanas 17–24):* Geometría, Gráficas y Deducción (Áreas sombreadas, volúmenes, razonamiento espacial, series gráficas, tablas/gráficas y lógica proposicional).
  - *Fase 4 (Semanas 25–32):* Simulacros Integrales y Cierre (Bancos mixtos de 80 ítems, ritmo de examen y depuración final).
- **Aula del Día integrada en cada tarjeta (`Lunes a Domingo`):** Modal interactivo con resumen teórico del tema del día, ejemplo resuelto paso a paso, mini-taller práctico calificable al instante y bitácora personal de apuntes.

### 4. ⏱️ Entrenador y Mini-Simulacros (Práctica Activa)
- Banco inicial de **12 preguntas originales** calibradas con el estilo exacto de la UdeA (6 de Competencia Lectora y 6 de Razonamiento Lógico en niveles *Básico*, *Intermedio* y *Avanzado*).
- **Modo Práctica con Cronómetro Oficial (`2,25 min/pregunta`) o Modo Libre**, con revisión paso a paso, análisis forense de distractores (`A, B, C, D`) y envío directo de fallos al Cuaderno de Errores.
- Formularios para **agregar preguntas propias** al banco y **registrar simulacros externos** (`/40` en Lectura y `/40` en Lógica).

### 5. 📓 Cuaderno de Errores y Repaso Espaciado (Ciclo 1-2-4 Semanas)
- Taxonomía de errores UdeA en 4 códigos accionables:
  - `(C) Concepto faltante`
  - `(I) Inferencia forzada / extrapolación`
  - `(P) Planteamiento matemático`
  - `(T) Tiempo / descuido de lectura`
- **Algoritmo de Repaso Espaciado (`+7 días`, `+14 días`, `+28 días`):** Programa automáticamente la próxima revisión de cada fallo hasta que el estudiante lo resuelva sin ayuda y lo marque como **Superado**.

### 6. 📚 Recursos Verificados y Plantillas para Tutor IA
- Directorio de fuentes oficiales de la UdeA (Portal de Admisiones, Programa de Preparación Institucional) y bancos de talleres de referencia.
- **Plantillas de Prompts con botón «Copiar Prompt»** listas para generar nuevos ejercicios originales en un asistente de IA o auditar errores mediante el método socrático sin spoilers.

### ⏲️ Reloj de Estudio Flotante (Siempre visible a la derecha)
- Widget lateral derecho minimizable con alerta sonora opcional, barra de progreso y botones rápidos para los bloques del método (`15m Teoría`, `35m Práctica`, `10m Bitácora`, `60m Total`, `2:15 por pregunta`) además de configuración personalizada en minutos y segundos.

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Estilos:** Tailwind CSS (Paleta institucional verde UdeA `#026937`, soporte nativo de **Modo Claro / Oscuro**)
- **Visualización de Datos:** Recharts
- **Iconografía:** Lucide React
- **Persistencia:** `localStorage` (`udea_prep_state_v1`) + Exportación/Importación de respaldo `.json`

---

## 🚀 Instalación y Ejecución Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Luego abre en tu navegador la dirección local indicada (por defecto `http://localhost:5173/`).

3. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 📁 Estructura del Proyecto

```text
Examen UDEA/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx                        # Layout principal, navegación, estado global y respaldo JSON
    ├── main.tsx                       # Punto de entrada React
    ├── index.css                      # Directivas Tailwind y estilos globales
    ├── types/
    │   └── index.ts                   # Interfaces TypeScript de todo el sistema
    ├── utils/
    │   └── dateAndStats.ts            # Cálculos de fechas, rachas, promedios y códigos C/I/P/T
    ├── data/
    │   ├── studyPlanData.ts           # Currículo completo de 32 semanas (224 sesiones) y 4 fases
    │   ├── dailyLessonContent.ts      # Contenido teórico, ejemplos y talleres del Aula del Día
    │   ├── examGuideData.ts           # Estructura oficial, prioridades y cortes históricos
    │   ├── questionsData.ts           # Banco inicial de 12 preguntas originales comentadas
    │   └── resourcesData.ts           # Recursos verificados, prompts IA y datos semilla
    └── components/
        ├── DashboardModule.tsx        # Módulo 1: KPIs, gráfica de evolución y acción del día
        ├── ExamGuideModule.tsx        # Módulo 2: Guía verificada del examen y tabla de cortes
        ├── StudyPlanModule.tsx        # Módulo 3: Calendario interactivo de 32 semanas y fases
        ├── TrainerModule.tsx          # Módulo 4: Simulador cronometrado y registro externo
        ├── ErrorNotebookModule.tsx    # Módulo 5: Cuaderno de errores y repaso 1-2-4 semanas
        ├── ResourcesModule.tsx        # Módulo 6: Recursos oficiales y prompts para Tutor IA
        ├── DailyLessonModal.tsx       # Modal interactivo "Aula del Día" (Teoría + Taller + Bitácora)
        └── FloatingStudyTimer.tsx     # Temporizador flotante configurable en el borde derecho
```

