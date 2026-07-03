import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { CursorInput } from '../input/types'
import type { Section } from '../types'
import experienceConfig from '../data/experience.json'

const DWELL_TIME = experienceConfig.dwellDurationSeconds * 1000

interface MapNodeProps {
  section: Section
  cursor: CursorInput
  onOpen: (section: Section) => void
}

export function MapNode({ section, cursor, onOpen }: MapNodeProps) {
  const nodeRef = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)
  const [progress, setProgress] = useState(0)
  const openedRef = useRef(false)

  useEffect(() => {
    const rect = nodeRef.current?.getBoundingClientRect()
    if (!rect || !cursor.active) {
      setHovered(false)
      return
    }
    const x = cursor.x * window.innerWidth
    const y = cursor.y * window.innerHeight
    setHovered(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)
  }, [cursor])

  useEffect(() => {
    if (!hovered) {
      setProgress(0)
      openedRef.current = false
      return
    }
    const started = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const next = Math.min(1, (now - started) / DWELL_TIME)
      setProgress(next)
      if (next === 1 && !openedRef.current) {
        openedRef.current = true
        onOpen(section)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [hovered, onOpen, section])

  const style = {
    '--node-x': `${section.position.x}%`,
    '--node-y': `${section.position.y}%`,
    '--accent': section.accent,
    '--dwell-progress': progress,
  } as CSSProperties

  return (
    <button
      ref={nodeRef}
      className={`map-node ${hovered ? 'map-node--active' : ''} ${section.id === 'proyectos' ? 'map-node--core' : ''}`}
      style={style}
      onClick={() => onOpen(section)}
      aria-label={`Abrir ${section.title}`}
    >
      <svg className="map-node__progress" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="47" pathLength="1" />
      </svg>
      <span className="map-node__index">{section.index}</span>
      <span className="map-node__copy">
        <strong>{section.title}</strong>
        <small>{section.shortDescription}</small>
      </span>
      <span className="map-node__arrow" aria-hidden="true">↗</span>
    </button>
  )
}
