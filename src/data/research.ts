export interface ResearchEntry {
  titulo: string
  descripcion: string
  meta?: string
}

export interface ResearchCategory {
  id: string
  titulo: string
  subtitulo: string
  entries: ResearchEntry[]
}

export const researchCategories: ResearchCategory[] = [
  {
    id: 'investigacion',
    titulo: 'Investigación',
    subtitulo: 'Problemas de estudio que se abordan mediante producción de conocimiento.',
    entries: [
      { titulo: 'Pobreza del tiempo en estudiantes universitarios de ingeniería', meta: 'CICE 2026 · Póster', descripcion: 'Un estudio sobre trayectorias, deserción y posibilidades pedagógicas en la formación de ingeniería.' },
      { titulo: 'Neurodiversidad y accesibilidad en la educación híbrida', meta: 'CICE 2026 · Póster', descripcion: 'Una propuesta de estrategias inclusivas para contextos de aprendizaje híbrido.' },
    ],
  },
  {
    id: 'congresos',
    titulo: 'Congresos',
    subtitulo: 'Ámbitos de intercambio, formación y divulgación académica.',
    entries: [
      { titulo: 'CICE', meta: 'Innovación y creatividad educativa', descripcion: 'Docentes, estudiantes e investigadores comparten experiencias de enseñanza tecnológica.' },
      { titulo: 'CoNaIISI', meta: 'Ingeniería informática y sistemas', descripcion: 'Investigación y tecnología aplicada, con espacio de presentación para estudiantes.' },
      { titulo: 'CNEISI', meta: 'Congreso nacional estudiantil', descripcion: 'Charlas, workshops, proyectos y competencias creadas por y para estudiantes.' },
    ],
  },
  {
    id: 'publicaciones',
    titulo: 'Publicaciones',
    subtitulo: 'De la elaboración académica a la publicación científica.',
    entries: [
      { titulo: 'Propuesta de proceso para el Diseño de Sistemas basado en Design Thinking', meta: 'CoNaIISI 2017', descripcion: 'Un trabajo de la cátedra de Diseño de Sistemas presentado en el congreso nacional.' },
      { titulo: 'Actas académicas UTN', meta: 'ISSN y DOI', descripcion: 'Las ponencias pueden quedar publicadas en actas académicas del repositorio AJEA de UTN.' },
    ],
  },
  {
    id: 'extension',
    titulo: 'Extensión',
    subtitulo: 'Universidad, comunidad y experiencia profesional conectadas.',
    entries: [
      { titulo: 'Graduados que vuelven', descripcion: 'Graduados de la Facultad regresan a las cátedras y conectan el aula con la experiencia profesional.' },
      { titulo: 'Universidad + comunidad', descripcion: 'La vinculación recupera trayectorias y aporta información para mejorar la carrera.' },
      { titulo: 'Trayectorias que enseñan', descripcion: 'La experiencia profesional vuelve al aula y ayuda a mantener actualizada la formación.' },
    ],
  },
  {
    id: 'global',
    titulo: 'Conexión global',
    subtitulo: 'Cooperación académica e internacionalización de la formación.',
    entries: [
      { titulo: 'Clases espejo', descripcion: 'Cursadas en simultáneo con estudiantes de universidades del exterior.' },
      { titulo: 'Proyectos COIL', descripcion: 'Aprendizaje colaborativo internacional en línea dentro de las materias.' },
      { titulo: 'Equipos internacionales', descripcion: 'Intercambios, idiomas y competencias como el Rally Latinoamericano de Innovación.' },
    ],
  },
]
