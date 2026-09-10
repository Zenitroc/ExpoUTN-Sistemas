export interface ElectiveCategory {
  id: string
  nombre: string
  subtitulo: string
  materias: string[]
}

export const electiveCategories: ElectiveCategory[] = [
  {
    id: 'software',
    nombre: 'Construcción de software',
    subtitulo: 'Para programar mejor, no solo más.',
    materias: ['Técnicas Avanzadas de Programación', 'Tecnologías Avanzadas en la Construcción de Software', 'Patrones Algorítmicos', 'Ingeniería de Requisitos'],
  },
  {
    id: 'datos',
    nombre: 'Datos, IA y cómputo',
    subtitulo: 'Datos, algoritmos y nuevas formas de resolver problemas.',
    materias: ['Procesamiento del Lenguaje Natural', 'Técnicas de Gráficos por Computadora'],
  },
  {
    id: 'seguridad',
    nombre: 'Seguridad',
    subtitulo: 'Proteger sistemas, información y comunicaciones.',
    materias: ['Ciberseguridad', 'Criptografía'],
  },
  {
    id: 'personas',
    nombre: 'Personas y producto',
    subtitulo: 'Diseñar tecnología que las personas realmente puedan usar.',
    materias: ['Experiencia de Usuario y Accesibilidad', 'Comunicación Gráfica y Visual', 'Creatividad e Innovación'],
  },
  {
    id: 'gestion',
    nombre: 'Gestión y organizaciones',
    subtitulo: 'Tecnología, equipos y decisiones.',
    materias: ['Gerenciamiento de Proyectos de Sistemas de Información', 'Metodología de la Conducción de Equipos de Trabajo', 'Administración Estratégica del Capital Humano', 'Gestión del Talento Humano', 'Transformación Digital', 'Tendencias y Escenarios Tecnológicos'],
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
