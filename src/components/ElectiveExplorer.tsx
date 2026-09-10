import { useState } from 'react'
import { electiveCategories, electiveCount } from '../data/electives'
import { DwellButton } from './DwellButton'

export function ElectiveExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = electiveCategories.find((category) => category.id === selectedId)

  return (
    <section className={`elective-explorer ${selected ? 'elective-explorer--selected' : ''}`} aria-label="Electivas de la carrera">
      <header className="elective-explorer__intro">
        <div>
          <span className="eyebrow">Electivas</span>
          <h3>Armá tu propio recorrido</h3>
          <p>Elegí qué áreas de Sistemas querés profundizar.</p>
        </div>
        <div className="elective-explorer__facts" aria-label="Datos de las electivas">
          <strong><b>{electiveCount}</b> electivas</strong>
          <strong><b>3.º y 4.º</b> nivel</strong>
          <strong><b>Un título</b> distintos perfiles</strong>
        </div>
      </header>

      <div className="elective-explorer__stage">
        <div className="elective-explorer__categories" aria-label="Áreas de profundización">
          {electiveCategories.map((category) => (
            <DwellButton
              key={category.id}
              className={`elective-category ${selectedId === category.id ? 'elective-category--selected' : ''}`}
              onActivate={() => setSelectedId((current) => current === category.id ? null : category.id)}
              ariaLabel={`${selectedId === category.id ? 'Cerrar' : 'Ver'} ${category.nombre}`}
              ariaSelected={selectedId === category.id}
            >
              <span className="elective-category__index">{String(electiveCategories.indexOf(category) + 1).padStart(2, '0')}</span>
              <strong>{category.nombre}</strong>
              <small>{category.materias.length} {category.materias.length === 1 ? 'electiva' : 'electivas'}</small>
            </DwellButton>
          ))}
        </div>

        <aside className={`elective-explorer__detail ${selected ? 'elective-explorer__detail--open' : ''}`} aria-live="polite">
          {selected ? (
            <>
              <span className="eyebrow">{selected.nombre}</span>
              <h4>{selected.subtitulo}</h4>
              <div className="elective-explorer__chips">
                {selected.materias.map((materia) => <span key={materia}>{materia}</span>)}
              </div>
              <DwellButton className="elective-explorer__back" onActivate={() => setSelectedId(null)} ariaLabel="Volver a todas las áreas">Ver todas las áreas</DwellButton>
            </>
          ) : (
            <div className="elective-explorer__empty">
              <span>Elegí un área</span>
              <p>Una misma carrera, recorridos distintos.</p>
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}
