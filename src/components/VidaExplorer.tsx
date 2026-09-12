import { useEffect, useState } from 'react'
import { DwellButton } from './DwellButton'

const journey = [
  { year: '01', label: 'Empezar', title: 'Inicio y clases', summary: 'Conocés la Facultad, armás tu grupo y empezás a construir las bases para pensar sistemas.', tags: ['Primeras materias', 'Comunidad', 'Herramientas'], image: '/media/recursos/vida/cursada.jpg' },
  { year: '02', label: 'Avanzar', title: 'Rendir y crecer', summary: 'Parciales, finales, integradoras y proyectos: cada instancia conecta lo que venís aprendiendo.', tags: ['Parciales', 'Finales', 'Integradoras'], image: '/media/recursos/vida/parcial.jpg' },
  { year: '03', label: 'Llegar', title: 'Proyecto final y recibirse', summary: 'Aplicás todo lo aprendido en una solución propia y das el paso hacia tu vida profesional.', tags: ['Proyecto final', 'Práctica', 'Graduación'], image: '/media/recursos/vida/egresodromo.jpg' },
]

export function VidaExplorer() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = journey[activeIndex]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % journey.length), 6500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="journey-explorer" aria-label="Recorrido por la carrera">
      <header className="journey-explorer__intro">
        <div><span className="eyebrow">Vida en Sistemas</span><h3>Tu recorrido por la carrera.</h3><p>Empezar, avanzar y transformar lo aprendido en un proyecto propio.</p></div>
        <span className="journey-explorer__counter">{String(activeIndex + 1).padStart(2, '0')} / 03</span>
      </header>

      <div className="journey-explorer__timeline" role="tablist" aria-label="Momentos de la carrera">
        {journey.map((stage, index) => <DwellButton key={stage.year} className={`journey-step ${index === activeIndex ? 'journey-step--active' : ''}`} onActivate={() => setActiveIndex(index)} role="tab" ariaSelected={index === activeIndex} ariaLabel={`${stage.label}: ${stage.title}`}><b>{stage.year}</b><span>{stage.label}</span><i /></DwellButton>)}
      </div>

      <article className="journey-stage" key={active.year} aria-live="polite">
        <div className="journey-stage__signal"><img src={active.image} alt={active.title} /><span>{active.year}</span></div>
        <div className="journey-stage__content"><span className="eyebrow">{active.label}</span><h4>{active.title}</h4><p>{active.summary}</p><div className="journey-stage__tags">{active.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      </article>
    </section>
  )
}
