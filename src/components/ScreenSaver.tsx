import { useEffect, useState, type CSSProperties } from 'react'
import { UtnLogo } from './UtnLogo'

const nodes = [
  { label: 'Desarrollo', group: 'build', x: '18%', y: '28%', color: '#ef3340' },
  { label: 'Datos', group: 'data', x: '24%', y: '63%', color: '#ff5a64' },
  { label: 'Inteligencia artificial', group: 'data', x: '43%', y: '16%', color: '#ef3340' },
  { label: 'Ciberseguridad', group: 'safe', x: '78%', y: '27%', color: '#d92531' },
  { label: 'Diseño', group: 'build', x: '78%', y: '68%', color: '#ff5a64' },
  { label: 'Gestión', group: 'build', x: '59%', y: '79%', color: '#ef3340' },
  { label: 'Arquitectura', group: 'safe', x: '66%', y: '15%', color: '#d92531' },
  { label: 'Investigación', group: 'data', x: '35%', y: '82%', color: '#ff5a64' },
]

const sequences = [
  { id: 'all', label: 'Todo está conectado', facts: ['36 materias', '5 años', 'Proyecto Final'] },
  { id: 'build', label: 'Ideas que se convierten en sistemas', facts: ['Desarrollo de software', 'Diseño de Sistemas', 'Proyectos reales'] },
  { id: 'data', label: 'Datos que se convierten en decisiones', facts: ['Ciencia de Datos', 'Inteligencia Artificial', 'Machine Learning'] },
  { id: 'safe', label: 'Tecnología que escala y se protege', facts: ['Ciberseguridad', 'Redes', 'Arquitectura'] },
]

export function ScreenSaver() {
  const [sequenceIndex, setSequenceIndex] = useState(0)
  const sequence = sequences[sequenceIndex]

  useEffect(() => {
    const interval = window.setInterval(() => setSequenceIndex((current) => (current + 1) % sequences.length), 6200)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className={`screensaver screensaver--${sequence.id}`} aria-label="Conocé Ingeniería en Sistemas de Información">
      <div className="screensaver__noise" aria-hidden="true" />
      <header className="screensaver__header">
        <UtnLogo />
        <span>UTN Buenos Aires · Ingeniería en Sistemas de Información</span>
      </header>

      <main className="screensaver__ecosystem">
        <svg className="screensaver__links" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
          <path d="M180 175 L500 310 L430 95 M500 310 L780 165 M500 310 L780 420 M500 310 L590 490 M500 310 L245 390 M500 310 L350 510 M430 95 L660 90 M660 90 L780 165" />
          <path className="screensaver__link--soft" d="M180 175 L245 390 L350 510 M590 490 L780 420 M660 90 L590 490" />
        </svg>
        <div className="screensaver__packets" aria-hidden="true"><i /><i /><i /><i /></div>
        {nodes.map((node, index) => <span className={`screensaver__node screensaver__node--${node.group}`} key={node.label} style={{ '--node-x': node.x, '--node-y': node.y, '--node-color': node.color, '--node-delay': `${index * -.8}s` } as CSSProperties}><i /><b>{node.label}</b></span>)}

        <section className="screensaver__core">
          <span>Conocé</span>
        <h1>Ingeniería en<br /><span>Sistemas de Información</span></h1>
          <p>Experiencia interactiva</p>
        </section>

        <div className="screensaver__signal" key={sequence.id} aria-hidden="true">
          <span>{sequence.label}</span>
          <div>{sequence.facts.map((fact) => <b key={fact}>{fact}</b>)}</div>
        </div>
      </main>

      <footer className="screensaver__footer"><i aria-hidden="true" /><strong>Mové el cursor o tocá la pantalla para explorar</strong><span>Todo está conectado</span></footer>
    </div>
  )
}
