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
