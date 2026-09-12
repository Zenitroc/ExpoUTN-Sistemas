export interface UsefulLink {
  titulo: string
  descripcion: string
  url: string
  qr: string
  leyenda: string
  tags?: string[]
}

export const usefulLinks: UsefulLink[] = [
  { titulo: 'Todo el stand en tu celular', descripcion: 'Escaneá y llevate todos los enlaces del stand.', url: 'https://expocarrerassistemas.taplink.site/', qr: '/media/recursos/qr/taplink-expo.svg', leyenda: 'Página de enlaces del stand de Sistemas.' },
  { titulo: 'Cómo ingresar a la UTN.BA', descripcion: 'Requisitos, inscripción y Seminario Universitario de Ingreso.', url: 'https://frba.utn.edu.ar/ingreso/ingresa/', qr: '/media/recursos/qr/frba-ingreso.svg', leyenda: 'Ingreso a la Facultad Regional Buenos Aires.', tags: ['Inscripción', 'Calendario', 'Seminario de ingreso'] },
  { titulo: 'Aulas virtuales', descripcion: 'El campus para cursar, recibir material, entregar trabajos y seguir avisos.', url: 'https://aulasvirtuales.frba.utn.edu.ar/', qr: '/media/recursos/qr/frba-aulas-virtuales.svg', leyenda: 'Campus virtual de UTN.BA.' },
  { titulo: 'Volvé a recorrer la Expo', descripcion: 'Explorá todo el contenido del stand desde tu casa.', url: 'https://expoisi.com.ar/', qr: '/media/recursos/qr/expoisi-sitio.svg', leyenda: 'El sitio del stand, online.' },
]
