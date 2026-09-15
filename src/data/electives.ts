export interface ElectiveCategory {
  id: string
  nombre: string
  subtitulo: string
  materias: string[]
}

export interface ElectiveVideo {
  id: string
  materia: string
  categoria: string
  video?: string
  poster?: string
}

export const electiveCategories: ElectiveCategory[] = [
  {
    id: 'software',
    nombre: 'Construcción de software',
    subtitulo: 'Profundización en métodos y tecnologías de desarrollo de software.',
    materias: ['Técnicas Avanzadas de Programación', 'Tecnologías Avanzadas en la Construcción de Software', 'Patrones Algorítmicos', 'Ingeniería de Requisitos'],
  },
  {
    id: 'datos',
    nombre: 'Datos, IA y cómputo',
    subtitulo: 'Métodos de procesamiento, análisis y aplicación de datos.',
    materias: ['Procesamiento del Lenguaje Natural', 'Técnicas de Gráficos por Computadora', 'IA Generativa en Sistemas Agénticos'],
  },
  {
    id: 'seguridad',
    nombre: 'Seguridad',
    subtitulo: 'Protección de sistemas, información y comunicaciones.',
    materias: ['Seguridad Defensiva', 'Criptografía'],
  },
  {
    id: 'personas',
    nombre: 'Personas y producto',
    subtitulo: 'Diseño de soluciones tecnológicas centradas en las personas usuarias.',
    materias: ['Experiencia de Usuario y Accesibilidad', 'Comunicación Gráfica y Visual', 'Creatividad e Innovación'],
  },
  {
    id: 'gestion',
    nombre: 'Gestión y organizaciones',
    subtitulo: 'Gestión tecnológica, organizacional y de equipos.',
    materias: ['Gerenciamiento de Proyectos de Sistemas de Información', 'Metodología de la Conducción de Equipos de Trabajo', 'Administración Estratégica del Capital Humano', 'Gestión del Talento Humano', 'Transformación Digital', 'Tendencias y Escenarios Tecnológicos', 'Gestión de las Arquitecturas de Implementación Tecnológica'],
  },
  {
    id: 'investigacion',
    nombre: 'Investigación',
    subtitulo: 'Convertir preguntas en conocimiento.',
    materias: ['Metodología de Investigación Científico-Tecnológica'],
  },
  {
    id: 'ambiente',
    nombre: 'Ambiente y tecnología',
    subtitulo: 'Una mirada tecnológica sobre los desafíos ambientales.',
    materias: ['Química Ambiental'],
  },
]

export const electiveCount = electiveCategories.reduce((total, category) => total + category.materias.length, 0)

// Solo se publican en el catálogo las electivas que cuentan con video disponible.
export const electiveVideos: ElectiveVideo[] = [
  {
    id: 'direccion-estrategica',
    materia: 'Dirección Estratégica',
    categoria: 'Gestión y organizaciones',
    video: '/media/recursos/videos-materias/Electivas%20Videos/DireccionEstrategicaProfe.mp4',
  },
  {
    id: 'ia-generativa',
    materia: 'IA Generativa en Sistemas Agénticos',
    categoria: 'Datos, IA y cómputo',
    video: '/media/recursos/videos-materias/Electivas%20Videos/IA%20Generativa.mp4',
  },
  {
    id: 'tasd',
    materia: 'Tecnologías Aplicadas a las Soluciones de Datos',
    categoria: 'Datos, IA y cómputo',
    video: '/media/recursos/videos-materias/Electivas%20Videos/TASD.mp4',
  },
  {
    id: 'ddapdm',
    materia: 'Desarrollo de Aplicaciones para Dispositivos Móviles',
    categoria: 'Construcción de software',
    video: '/media/recursos/videos-materias/Electivas%20Videos/DDAPDM.mp4',
  },
]
