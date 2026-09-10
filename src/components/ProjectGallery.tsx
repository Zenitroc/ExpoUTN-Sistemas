import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { finalProjects, type FinalProject } from '../data/projects'
import { DwellButton } from './DwellButton'

function useCardsPerView() {
  const getCount = () => window.innerWidth < 700 ? 1 : window.innerWidth < 1050 ? 2 : 4
  const [count, setCount] = useState(getCount)
  useEffect(() => {
    const update = () => setCount(getCount())
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return count
}

export function ProjectGallery() {
  const [start, setStart] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const cardsPerView = useCardsPerView()
  const pointerStart = useRef<number | null>(null)
  const projects = useMemo(() => [...finalProjects].sort((first, second) => (second.anio ?? -1) - (first.anio ?? -1)), [])
  const visible = useMemo(() => Array.from({ length: cardsPerView }, (_, offset) =>
    projects[(start + offset) % projects.length],
  ), [cardsPerView, projects, start])
  const current = selected === null ? null : projects[selected]

  const move = (direction: number) => setStart((value) => (value + direction + projects.length) % projects.length)
  const select = (project: FinalProject) => setSelected(projects.findIndex((item) => item.id === project.id))
  const moveViewer = (direction: number) => setSelected((value) => value === null ? null : (value + direction + projects.length) % projects.length)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (selected === null) return
      if (event.key === 'Escape') { event.preventDefault(); setSelected(null) }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setSelected((value) => value === null ? null : (value - 1 + projects.length) % projects.length) }
      if (event.key === 'ArrowRight') { event.preventDefault(); setSelected((value) => value === null ? null : (value + 1) % projects.length) }
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [projects, selected])

  useEffect(() => {
    window.dispatchEvent(new Event('dwell-overlay-change'))
  }, [selected])

  return (
    <section className="project-gallery" aria-label="Muestrario de Proyectos Finales">
      <header className="project-gallery__intro">
        <div>
          <span className="eyebrow">Proyecto Final</span>
          <h3>Proyectos que integran la carrera</h3>
          <p>Soluciones creadas en equipo.</p>
        </div>
        <span className="project-gallery__count">{String(start + 1).padStart(2, '0')}–{String(Math.min(start + cardsPerView, projects.length)).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
      </header>

      <div
        className="project-gallery__viewport"
        onPointerDown={(event) => { pointerStart.current = event.clientX }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return
          const distance = event.clientX - pointerStart.current
          if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1)
          pointerStart.current = null
        }}
      >
        <div className="project-gallery__cards" key={start} style={{ '--cards': cardsPerView } as CSSProperties}>
          {visible.map((project) => <ProjectCard project={project} key={project.id} onOpen={() => select(project)} />)}
        </div>
      </div>

      <footer className="project-gallery__controls">
        <DwellButton className="project-gallery__control dwell-control--ring" onActivate={() => move(-1)} ariaLabel="Proyecto anterior">←</DwellButton>
        <div className="project-gallery__progress" aria-hidden="true"><i style={{ width: `${((start + 1) / projects.length) * 100}%` }} /></div>
        <DwellButton className="project-gallery__control dwell-control--ring" onActivate={() => move(1)} ariaLabel="Proyecto siguiente">→</DwellButton>
      </footer>

      {current && (
        <div className="project-viewer" data-dwell-overlay="true" role="dialog" aria-modal="true" aria-label={`Póster de ${current.titulo}`} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null) }}>
          <DwellButton className="project-viewer__close dwell-control--ring" onActivate={() => setSelected(null)} ariaLabel="Cerrar visor" allowDuringOverlay>×</DwellButton>
          <DwellButton className="project-viewer__nav project-viewer__nav--previous dwell-control--ring" onActivate={() => moveViewer(-1)} ariaLabel="Póster anterior" allowDuringOverlay>←</DwellButton>
          <figure className="project-viewer__poster">
            <img src={current.poster} alt={`Póster del proyecto ${current.titulo}`} />
            <figcaption>
              <span>{[current.anio, current.comision].filter(Boolean).join(' · ') || 'Proyecto Final'}</span>
              <h3>{current.titulo}</h3>
              <p>{current.descripcion}</p>
            </figcaption>
          </figure>
          <DwellButton className="project-viewer__nav project-viewer__nav--next dwell-control--ring" onActivate={() => moveViewer(1)} ariaLabel="Póster siguiente" allowDuringOverlay>→</DwellButton>
        </div>
      )}
    </section>
  )
}

function ProjectCard({ project, onOpen }: { project: FinalProject; onOpen: () => void }) {
  return (
    <DwellButton className="project-card" onActivate={onOpen} ariaLabel={`Abrir póster de ${project.titulo}`}>
      <img src={project.poster} alt={`Póster del proyecto ${project.titulo}`} loading="lazy" />
      <span className="project-card__meta">{[project.anio, project.comision].filter(Boolean).join(' · ') || 'Proyecto Final'}</span>
      <strong>{project.titulo}</strong>
    </DwellButton>
  )
}
