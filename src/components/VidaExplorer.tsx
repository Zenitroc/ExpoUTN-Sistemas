import { useEffect, useState } from 'react'
import { DwellButton } from './DwellButton'

const journey = [
  { year: '01', label: 'Inicio', title: 'Inicio de la trayectoria académica', summary: 'La incorporación a la Facultad comprende la formación de grupos de estudio y la construcción de fundamentos para el abordaje de sistemas.', tags: ['Asignaturas iniciales', 'Comunidad', 'Herramientas'], image: '/media/recursos/vida/cursada.jpg' },
  { year: '02', label: 'Avanzar', title: 'Rendir y crecer', summary: 'Parciales, finales, integradoras y proyectos: cada instancia conecta lo que venís aprendiendo.', tags: ['Parciales', 'Finales', 'Integradoras'], image: '/media/recursos/vida/parcial.jpg' },
  { year: '03', label: 'Egreso', title: 'Proyecto Final y graduación', summary: 'La formación culmina con la aplicación integrada de conocimientos en una solución de sistemas y con la inserción en el ámbito profesional.', tags: ['Proyecto Final', 'Práctica', 'Graduación'], image: '/media/recursos/vida/egresodromo.jpg' },
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
        <div><span className="eyebrow">Vida universitaria</span><h3>Trayectoria académica en Ingeniería en Sistemas.</h3><p>Instancias de formación, participación institucional e integración de conocimientos.</p></div>
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
