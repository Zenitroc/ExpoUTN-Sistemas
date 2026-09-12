export interface VidaEspacio {
  id: string
  titulo: string
  pie: string
  /** Se completa únicamente cuando la foto está disponible como asset local. */
  imagen?: string
}

export interface VidaTestimonio {
  id: string
  persona: string
  rol: string
  respaldo: string
  url?: string
  urn?: string
  autorizado: boolean
}

// Datos centralizados. Se excluye todo testimonio o graduación sin autorización.
export const vidaEspacios: VidaEspacio[] = [
  {
    id: 'clase-teorica',
    titulo: 'Clase teórica',
    pie: 'Aula grande de la Facultad, en plena cursada.',
  },
  {
    id: 'dia-de-parcial',
    titulo: 'Día de parcial',
    pie: 'Aula de comisión, evaluación en curso.',
  },
]

const testimonios: VidaTestimonio[] = [
  {
    id: 'designaciones-docentes',
    persona: 'Publicación institucional UTN Buenos Aires',
    rol: 'Designaciones docentes',
    respaldo: 'La Facultad impulsa las designaciones docentes.',
    urn: 'urn:li:activity:7479892072527826946',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7479892072527826946/',
    autorizado: true,
  },
]

export const vidaTestimonios = testimonios.filter((testimonio) => testimonio.autorizado)
