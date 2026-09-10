import { useState } from 'react'
import { researchCategories, type ResearchCategory } from '../data/research'
import { DwellButton } from './DwellButton'

export function ResearchExplorer() {
  const [selectedId, setSelectedId] = useState('investigacion')
  const selected = researchCategories.find((category) => category.id === selectedId) ?? researchCategories[0]

  return (
    <section className="research-explorer" aria-label="Investigación y extensión">
      <header className="research-explorer__intro">
        <div>
          <span className="eyebrow">Más allá del aula</span>
          <h3>La carrera también produce conocimiento</h3>
          <p>Investigación, congresos, publicaciones y experiencias que llevan Sistemas más allá del aula.</p>
        </div>
        <span className="research-explorer__signal"><i /> conocimiento en movimiento</span>
      </header>

      <div className="research-explorer__stage">
        <nav className="research-explorer__nav" aria-label="Áreas de investigación y extensión">
          {researchCategories.map((category, index) => (
            <DwellButton
              key={category.id}
              className={`research-category ${category.id === selected.id ? 'research-category--selected' : ''}`}
              onActivate={() => setSelectedId(category.id)}
              ariaLabel={`Ver ${category.titulo}`}
              ariaSelected={category.id === selected.id}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{category.titulo}</strong>
            </DwellButton>
          ))}
        </nav>
        <ResearchPanel category={selected} />
      </div>
    </section>
  )
}

function ResearchPanel({ category }: { category: ResearchCategory }) {
  return (
    <article className={`research-panel research-panel--${category.id}`} key={category.id}>
      <header>
        <span className="eyebrow">{category.titulo}</span>
        <h4>{category.subtitulo}</h4>
      </header>

      {category.id === 'publicaciones' && (
        <div className="research-panel__path" aria-label="Recorrido de una publicación">
          {['Idea', 'Investigación', 'Congreso', 'Publicación'].map((step) => <span key={step}>{step}</span>)}
        </div>
      )}

      {category.id === 'global' ? (
        <div className="research-panel__network">
          <b>UTN<br />Buenos Aires</b>
          {category.entries.map((entry) => <span key={entry.titulo}>{entry.titulo}</span>)}
        </div>
      ) : (
        <div className={`research-panel__entries research-panel__entries--${category.id}`}>
          {category.entries.map((entry, index) => (
            <article className="research-entry" key={entry.titulo}>
              <span>{entry.meta ?? `0${index + 1}`}</span>
              <strong>{entry.titulo}</strong>
              <small>{entry.descripcion}</small>
            </article>
          ))}
        </div>
      )}
    </article>
  )
}
