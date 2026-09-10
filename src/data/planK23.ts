export interface PlanMateria {
  id: number
  nombre: string
  nivel: number
  integradora: boolean
  correlativasCursadas: number[]
  correlativasAprobadas: number[]
  descripcion: string
}

export const planK23: PlanMateria[] = [
  { id: 1, nombre: 'Análisis Matemático I', nivel: 1, integradora: false, correlativasCursadas: [], correlativasAprobadas: [], descripcion: 'Funciones, límites, derivadas e integrales de una variable. La base matemática de todo lo que viene después.' },
  { id: 2, nombre: 'Álgebra y Geometría Analítica', nivel: 1, integradora: false, correlativasCursadas: [], correlativasAprobadas: [], descripcion: 'Vectores, matrices, sistemas de ecuaciones y geometría en el espacio. Aparece después en gráficos, simulación y machine learning.' },
  { id: 3, nombre: 'Física I', nivel: 1, integradora: false, correlativasCursadas: [], correlativasAprobadas: [], descripcion: 'Mecánica: cinemática, dinámica y energía. Modelar el mundo físico con matemática.' },
  { id: 4, nombre: 'Inglés I', nivel: 1, integradora: false, correlativasCursadas: [], correlativasAprobadas: [], descripcion: 'Lectura técnica en inglés. Casi toda la documentación que vas a usar en tu vida profesional está en este idioma.' },
  { id: 5, nombre: 'Lógica y Estructuras Discretas', nivel: 1, integradora: false, correlativasCursadas: [], correlativasAprobadas: [], descripcion: 'Lógica proposicional, conjuntos, relaciones, grafos y recursión. Cómo piensa una computadora.' },
  { id: 6, nombre: 'Algoritmos y Estructuras de Datos', nivel: 1, integradora: false, correlativasCursadas: [], correlativasAprobadas: [], descripcion: 'Tu primera materia de programación: listas, árboles, ordenamiento, búsqueda y costo de los algoritmos.' },
  { id: 7, nombre: 'Arquitectura de Computadoras', nivel: 1, integradora: false, correlativasCursadas: [], correlativasAprobadas: [], descripcion: 'Procesador, memoria, buses y lenguaje ensamblador: qué hay dentro de la máquina.' },
  { id: 8, nombre: 'Sistemas y Procesos de Negocio', nivel: 1, integradora: false, correlativasCursadas: [], correlativasAprobadas: [], descripcion: 'Cómo funciona una organización por dentro y cómo se modelan sus procesos.' },
  { id: 9, nombre: 'Análisis Matemático II', nivel: 2, integradora: false, correlativasCursadas: [1, 2], correlativasAprobadas: [], descripcion: 'Cálculo en varias variables, series y ecuaciones diferenciales.' },
  { id: 10, nombre: 'Física II', nivel: 2, integradora: false, correlativasCursadas: [1, 3], correlativasAprobadas: [], descripcion: 'Electricidad, magnetismo y ondas: el fundamento físico de las comunicaciones y del hardware.' },
  { id: 11, nombre: 'Ingeniería y Sociedad', nivel: 2, integradora: false, correlativasCursadas: [], correlativasAprobadas: [], descripcion: 'El rol social del ingeniero, ética profesional e impacto de la tecnología.' },
  { id: 12, nombre: 'Inglés II', nivel: 2, integradora: false, correlativasCursadas: [4], correlativasAprobadas: [], descripcion: 'Inglés técnico avanzado: producción escrita y comprensión de documentación compleja.' },
  { id: 13, nombre: 'Sintaxis y Semántica de los Lenguajes', nivel: 2, integradora: false, correlativasCursadas: [5, 6], correlativasAprobadas: [], descripcion: 'Gramáticas, autómatas, parsers y compiladores.' },
  { id: 14, nombre: 'Paradigmas de Programación', nivel: 2, integradora: false, correlativasCursadas: [5, 6], correlativasAprobadas: [], descripcion: 'Programación orientada a objetos, funcional y lógica.' },
  { id: 15, nombre: 'Sistemas Operativos', nivel: 2, integradora: false, correlativasCursadas: [7], correlativasAprobadas: [], descripcion: 'Procesos, concurrencia, gestión de memoria, sistemas de archivos y virtualización.' },
  { id: 16, nombre: 'Análisis de Sistemas de Información', nivel: 2, integradora: true, correlativasCursadas: [6, 8], correlativasAprobadas: [], descripcion: 'Modelado conceptual de sistemas y negocio, ciclos de vida, requisitos y análisis orientado a objetos.' },
  { id: 17, nombre: 'Probabilidad y Estadística', nivel: 3, integradora: false, correlativasCursadas: [1, 2], correlativasAprobadas: [], descripcion: 'Probabilidad, distribuciones, inferencia y test de hipótesis.' },
  { id: 18, nombre: 'Economía', nivel: 3, integradora: false, correlativasCursadas: [], correlativasAprobadas: [1, 2], descripcion: 'Micro y macroeconomía aplicadas a la evaluación de proyectos tecnológicos.' },
  { id: 19, nombre: 'Bases de Datos', nivel: 3, integradora: false, correlativasCursadas: [13, 16], correlativasAprobadas: [5, 6], descripcion: 'Modelo relacional, SQL, normalización, transacciones e índices.' },
  { id: 20, nombre: 'Desarrollo de Software', nivel: 3, integradora: false, correlativasCursadas: [14, 16], correlativasAprobadas: [5, 6], descripcion: 'Arquitectura por capas, frameworks, control de versiones y trabajo en equipo.' },
  { id: 21, nombre: 'Comunicación de Datos', nivel: 3, integradora: false, correlativasCursadas: [], correlativasAprobadas: [3, 7], descripcion: 'Señales, modulación, medios de transmisión y protocolos de bajo nivel.' },
  { id: 22, nombre: 'Análisis Numérico', nivel: 3, integradora: false, correlativasCursadas: [9], correlativasAprobadas: [1, 2], descripcion: 'Aproximación, error e iteración para resolver problemas con computadora.' },
  { id: 23, nombre: 'Diseño de Sistemas de Información', nivel: 3, integradora: true, correlativasCursadas: [14, 16], correlativasAprobadas: [4, 6, 8], descripcion: 'Arquitectura, patrones de diseño, persistencia, experiencia de usuario e integración de sistemas.' },
  { id: 24, nombre: 'Legislación', nivel: 4, integradora: false, correlativasCursadas: [11], correlativasAprobadas: [], descripcion: 'Contratos, propiedad intelectual y protección de datos personales.' },
  { id: 25, nombre: 'Ingeniería y Calidad de Software', nivel: 4, integradora: false, correlativasCursadas: [19, 20, 23], correlativasAprobadas: [13, 14], descripcion: 'Procesos de desarrollo, testing, métricas, normas de calidad y configuración.' },
  { id: 26, nombre: 'Redes de Datos', nivel: 4, integradora: false, correlativasCursadas: [15, 21], correlativasAprobadas: [], descripcion: 'TCP/IP, ruteo, conmutación, diseño de redes y servicios de infraestructura.' },
  { id: 27, nombre: 'Investigación Operativa', nivel: 4, integradora: false, correlativasCursadas: [17, 22], correlativasAprobadas: [], descripcion: 'Optimización, programación lineal, colas y grafos para decisiones reales.' },
  { id: 28, nombre: 'Simulación', nivel: 4, integradora: false, correlativasCursadas: [17], correlativasAprobadas: [9], descripcion: 'Modelar sistemas complejos y experimentar con ellos mediante computadora.' },
  { id: 29, nombre: 'Tecnologías para la Automatización', nivel: 4, integradora: false, correlativasCursadas: [10, 22], correlativasAprobadas: [9], descripcion: 'Control, sensores, actuadores y sistemas embebidos.' },
  { id: 30, nombre: 'Administración de Sistemas de Información', nivel: 4, integradora: true, correlativasCursadas: [18, 23], correlativasAprobadas: [16], descripcion: 'Gestión de proyectos, planificación estratégica, presupuesto y gobierno de TI.' },
  { id: 31, nombre: 'Inteligencia Artificial', nivel: 5, integradora: false, correlativasCursadas: [28], correlativasAprobadas: [17, 22], descripcion: 'Búsqueda, representación del conocimiento, aprendizaje automático y redes neuronales.' },
  { id: 32, nombre: 'Ciencia de Datos', nivel: 5, integradora: false, correlativasCursadas: [28], correlativasAprobadas: [17, 19], descripcion: 'Exploración, modelado, visualización y comunicación de resultados a partir de datos.' },
  { id: 33, nombre: 'Sistemas de Gestión', nivel: 5, integradora: false, correlativasCursadas: [18, 27], correlativasAprobadas: [23], descripcion: 'ERP, CRM y sistemas de gestión empresarial: implementación e integración.' },
  { id: 34, nombre: 'Gestión Gerencial', nivel: 5, integradora: false, correlativasCursadas: [24, 30], correlativasAprobadas: [18], descripcion: 'Estrategia, finanzas, liderazgo y gestión de personas en organizaciones tecnológicas.' },
  { id: 35, nombre: 'Seguridad en los Sistemas de Información', nivel: 5, integradora: false, correlativasCursadas: [26, 30], correlativasAprobadas: [20, 21], descripcion: 'Criptografía, gestión de riesgos, hardening, incidentes y normativa de seguridad.' },
  { id: 36, nombre: 'Proyecto Final', nivel: 5, integradora: true, correlativasCursadas: [25, 26, 30], correlativasAprobadas: [12, 20, 23], descripcion: 'Un sistema completo, de punta a punta, en equipo y con un cliente real.' },
]
