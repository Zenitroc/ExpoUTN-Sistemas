import { useCallback } from 'react'
import { useInput } from '../input/InputProvider'
import type { Section } from '../types'
import { MapNode } from './MapNode'

interface InteractiveMapProps {
  sections: Section[]
  onOpen: (section: Section) => void
}

export function InteractiveMap({ sections, onOpen }: InteractiveMapProps) {
  const { cursor } = useInput()
  const openSection = useCallback((section: Section) => onOpen(section), [onOpen])
  const center = sections.find((section) => section.id === 'proyectos') ?? sections[0]

  return (
    <main className="interactive-map" aria-label="Mapa interactivo de la carrera">
      <svg className="connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {sections.filter((section) => section.id !== center.id).map((section) => (
          <line
            key={section.id}
            x1={center.position.x}
            y1={center.position.y}
            x2={section.position.x}
            y2={section.position.y}
          />
        ))}
        <circle cx={center.position.x} cy={center.position.y} r="2.6" />
      </svg>
      {sections.map((section) => (
        <MapNode section={section} cursor={cursor} onOpen={openSection} key={section.id} />
      ))}
    </main>
  )
}
