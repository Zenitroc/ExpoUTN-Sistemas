export type ContentBlock =
  | { type: 'text'; heading?: string; body: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'video'; url: string; title: string }
  | { type: 'links'; items: Array<{ label: string; url: string; description?: string }> }
  | { type: 'highlights'; items: string[] }
  | {
      type: 'project-carousel'
      items: Array<{
        title: string
        description: string
        authors: string[]
        media: { type: 'image' | 'video'; src: string; alt?: string }
        projectUrl: string
        qrSrc?: string
      }>
    }

export interface SectionTab {
  id: string
  label: string
  content: ContentBlock[]
  subjectDetail?: SubjectDetail
  projectGallery?: boolean
  electiveExplorer?: boolean
  researchExplorer?: boolean
}

export interface SubjectVideo {
  src: string
  poster?: string
  titulo: string
  pie?: string
}

export interface SubjectDetail {
  id: string
  nombre: string
  anio: string
  integradora?: string
  subtitulo: string
  descripcion: string
  video?: SubjectVideo
}

export interface MapPosition {
  x: number
  y: number
}

export interface Section {
  id: string
  index: string
  title: string
  shortDescription: string
  description: string
  position: MapPosition
  accent: string
  tabs: SectionTab[]
}
