export interface CareerProfile {
  id: string
  nombre: string
  color: string
  resumen: string
  descripcion: string
  materias: number[]
  ambitos: string[]
}

export interface CareerTestimonial {
  nombre: string
  rol: string
  empresaOAmbito: string
  frase: string
  foto?: string
}

export const careerProfiles: CareerProfile[] = [
  { id: 'desarrollo', nombre: 'Desarrollo de software', color: '#d46541', resumen: 'Construir el sistema: una salida conocida y muy amplia.', descripcion: 'Traduce problemas en código mantenible. Incluye backend, frontend, mobile, sistemas embebidos e infraestructura. La carrera aporta paradigmas, algoritmos y arquitectura que siguen sirviendo cuando cambian las tecnologías.', materias: [6, 14, 20, 23, 25], ambitos: ['Empresas de tecnología', 'Fintech', 'Bancos', 'Startups', 'Software factories'] },
  { id: 'analista', nombre: 'Analista funcional', color: '#4b7fb8', resumen: 'Conectar a quienes tienen un problema con quienes construyen la solución.', descripcion: 'Releva necesidades, las modela y documenta para que el equipo técnico pueda construir. Es un rol de escucha, modelado y negociación que define alcances y prioridades.', materias: [8, 16, 23], ambitos: ['Consultoras de sistemas', 'Bancos y aseguradoras', 'Organismos públicos', 'Retail y logística'] },
  { id: 'qa', nombre: 'QA y QC', color: '#9b6bb7', resumen: 'Comprobar calidad antes de que los problemas lleguen a las personas usuarias.', descripcion: 'QC verifica el producto terminado; QA trabaja sobre el proceso para prevenir fallas. Incluye casos de prueba, automatización, pruebas de carga, seguridad y métricas de calidad.', materias: [20, 25], ambitos: ['Empresas de testing', 'Fintech', 'Áreas de calidad de bancos', 'Software factories'] },
  { id: 'datos', nombre: 'Ingeniería de datos, machine learning y ciencia de datos', color: '#278d83', resumen: 'Convertir datos en decisiones y productos inteligentes.', descripcion: 'Ingeniería de datos construye pipelines y disponibilidad; ciencia de datos modela y explica; machine learning lleva esos modelos a producción. Las tres se apoyan en estadística y bases de datos.', materias: [17, 19, 28, 31, 32], ambitos: ['Empresas de tecnología', 'Telecomunicaciones', 'Bancos', 'Consultoras de analítica', 'Startups de IA'] },
  { id: 'ciberseguridad', nombre: 'Ciberseguridad y peritaje informático', color: '#c05072', resumen: 'Proteger sistemas y reconstruir qué ocurrió ante un incidente.', descripcion: 'Abarca pentesting, defensa de infraestructura crítica e informática forense. El peritaje informático combina criterio técnico con la comprensión del marco legal.', materias: [15, 21, 26, 35, 24], ambitos: ['Bancos y fintech', 'Empresas de ciberseguridad', 'Poder Judicial', 'Consultoras de auditoría', 'Telecomunicaciones'] },
  { id: 'gestion', nombre: 'Liderazgo de proyectos y producto', color: '#d46541', resumen: 'Coordinar personas, plazos y prioridades para que el sistema exista.', descripcion: 'El liderazgo de proyecto se ocupa del equipo, cronograma, riesgos y presupuesto. Producto define qué construir, para quién y en qué orden. Son roles que suelen crecer desde la experiencia técnica.', materias: [30, 34, 25], ambitos: ['Software factories', 'Áreas de sistemas', 'Startups', 'Consultoras'] },
  { id: 'arquitectura', nombre: 'Arquitectura de software y hardware', color: '#4b7fb8', resumen: 'Decidir la forma del sistema antes de construirlo.', descripcion: 'Define estructura, patrones, tecnologías y restricciones que condicionan el desarrollo. Requiere justificar decisiones técnicas y convivir con sus consecuencias.', materias: [23, 25, 7, 26], ambitos: ['Empresas de tecnología', 'Bancos', 'Telecomunicaciones', 'Consultoras cloud'] },
  { id: 'diseno', nombre: 'Diseño de experiencia e interacción', color: '#9b6bb7', resumen: 'Diseño de sistemas comprensibles, accesibles y centrados en las personas usuarias.', descripcion: 'Integra diseño de interacción, arquitectura de información y experiencia de usuario. Considera criterios de usabilidad, accesibilidad y evaluación de la interacción.', materias: [23, 16], ambitos: ['Estudios de diseño de producto', 'Áreas de producto digital', 'Agencias', 'Startups'] },
  { id: 'docencia', nombre: 'Docencia universitaria', color: '#278d83', resumen: 'Formar a quienes vienen después.', descripcion: 'Muchos graduados vuelven a la Facultad como auxiliares, ayudantes o docentes. La conexión entre industria y aula mantiene a las materias cerca de la práctica profesional.', materias: [], ambitos: ['Universidades nacionales', 'Institutos terciarios', 'Formación corporativa'] },
  { id: 'investigacion', nombre: 'Investigación y desarrollo', color: '#c05072', resumen: 'Producir conocimiento nuevo, además de aplicar el existente.', descripcion: 'Incluye grupos de investigación, becas, extensión y publicaciones. Es un camino que puede comenzar durante la carrera con convocatorias y experiencias para estudiantes.', materias: [], ambitos: ['Grupos de investigación UTN', 'CONICET', 'Áreas de I+D', 'Universidades del exterior'] },
]

// Agregá testimonios reales con: nombre, rol, empresaOAmbito, frase y foto opcional.
export const careerTestimonials: CareerTestimonial[] = []
