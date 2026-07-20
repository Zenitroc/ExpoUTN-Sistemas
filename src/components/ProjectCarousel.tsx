import { useState } from 'react'
import type { ContentBlock } from '../types'
import { DwellButton } from './DwellButton'

type ProjectCarouselBlock = Extract<ContentBlock, { type: 'project-carousel' }>

export function ProjectCarousel({ items }: { items: ProjectCarouselBlock['items'] }) {
  const [active, setActive] = useState(0)
  const project = items[active]
  const goTo = (index: number) => setActive((index + items.length) % items.length)

  if (!project) return null

  return (
    <section className="project-carousel" aria-label="Carrusel de proyectos finales">
      <div className="project-carousel__viewport">
        <div className="project-carousel__media">
          {project.media.type === 'video' ? (
            <iframe
              src={project.media.src}
              title={project.media.alt ?? project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img src={project.media.src} alt={project.media.alt ?? project.title} />
          )}
          <span>{project.media.type === 'video' ? 'Video del proyecto' : 'Vista del proyecto'}</span>
        </div>

        <div className="project-carousel__info">
          <span className="eyebrow">Proyecto final · {String(active + 1).padStart(2, '0')}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <footer>
            <div>
              <small>Autores</small>
              <strong>{project.authors.join(' · ')}</strong>
            </div>
            <a href={project.projectUrl} target="_blank" rel="noreferrer" className="project-carousel__qr">
              {project.qrSrc ? <img src={project.qrSrc} alt={`QR de ${project.title}`} /> : <span aria-hidden="true">QR</span>}
              <small>Ver proyecto ↗</small>
            </a>
          </footer>
        </div>
      </div>

      <nav className="project-carousel__controls" aria-label="Navegación de proyectos">
        <DwellButton onActivate={() => goTo(active - 1)} ariaLabel="Proyecto anterior">←</DwellButton>
        <div className="project-carousel__dots">
          {items.map((item, index) => (
            <button
              key={item.title}
              className={index === active ? 'is-active' : ''}
              onClick={() => goTo(index)}
              aria-label={`Ver ${item.title}`}
              aria-current={index === active ? 'true' : undefined}
            />
          ))}
        </div>
        <span>{active + 1} / {items.length}</span>
        <DwellButton onActivate={() => goTo(active + 1)} ariaLabel="Proyecto siguiente">→</DwellButton>
      </nav>
    </section>
  )
}
