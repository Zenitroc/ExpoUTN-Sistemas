import { useCallback } from 'react'
import { useInput } from '../input/InputProvider'
import type { Section } from '../types'
import { MapNode } from './MapNode'

interface InteractiveMapProps {
  sections: Section[]
  onOpen: (section: Section) => void
  disabled?: boolean
}

export function InteractiveMap({ sections, onOpen, disabled = false }: InteractiveMapProps) {
  const { cursor } = useInput()
  const openSection = useCallback((section: Section) => onOpen(section), [onOpen])
  return (
    <main className="interactive-map" aria-label="Mapa interactivo de la carrera">
      {sections.map((section) => (
        <MapNode section={section} cursor={cursor} onOpen={openSection} disabled={disabled} key={section.id} />
      ))}
    </main>
  )
}
