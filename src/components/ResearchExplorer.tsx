import { useState, type CSSProperties } from 'react'
import { researchCategories, type ResearchCategory } from '../data/research'
import { gemis } from '../data/gemis'
import { DwellButton } from './DwellButton'
import { Tabs } from './Tabs'

const explorerTabs = [
  { id: 'investigacion', label: 'Investigación', content: [] },
  { id: 'gemis', label: 'GEMIS', content: [] },
]

export function ResearchExplorer() {
  const [selectedId, setSelectedId] = useState('investigacion')
  const [explorerTab, setExplorerTab] = useState('investigacion')
  const [gemisSlide, setGemisSlide] = useState(0)
  const selected = researchCategories.find((category) => category.id === selectedId) ?? researchCategories[0]

  return (
    <section className="research-explorer" aria-label="Investigación y extensión">
      <Tabs tabs={explorerTabs} activeId={explorerTab} onChange={(next) => { setExplorerTab(next); setGemisSlide(0) }} />
      {explorerTab === 'gemis' ? <GemisExperience slide={gemisSlide} onSlideChange={setGemisSlide} /> : <div className="research-explorer__research">
        <header className="research-explorer__intro">
          <div>
            <span className="eyebrow">Más allá del aula</span>
            <h3>La carrera también produce conocimiento</h3>
            <p>Investigación, congresos, publicaciones y experiencias que llevan Sistemas más allá del aula.</p>
          </div>
        </header>

        <div className="research-explorer__stage">
        <nav className="research-explorer__nav" aria-label="Áreas de investigación y extensión">
          {researchCategories.map((category, index) => (
            <DwellButton
              key={category.id}
              className={`research-category ${category.id === selected.id ? 'research-category--selected' : ''}`}
              onActivate={() => { setSelectedId(category.id); setGemisSlide(0) }}
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
      </div>}
    </section>
  )
}

function GemisExperience({ slide, onSlideChange }: { slide: number; onSlideChange: (slide: number) => void }) {
  const [transferPage, setTransferPage] = useState(0)
  const [teamPage, setTeamPage] = useState(0)
  const transferItems = gemis.transfers.slice(transferPage * 3, transferPage * 3 + 3)
  const teamPageSize = 24
  const teamItems = gemis.team.members.slice(teamPage * teamPageSize, teamPage * teamPageSize + teamPageSize)
  const teamPages = Math.ceil(gemis.team.members.length / teamPageSize)
  const slides = [
    <div className="gemis-intro" key="intro"><div className="gemis-intro__copy"><span className="eyebrow">Grupo GEMIS · referente de investigación y extensión</span><h4>{gemis.intro.title}</h4><p>{gemis.intro.description}</p></div><div className="gemis-intro__side"><img className="gemis-intro__logo" src="/media/gemis/logo-gemis.png" alt="Grupo GEMIS" /><aside className="gemis-qr"><img src="/media/gemis/qr-gemis.png" alt="Código QR para visitar Grupo GEMIS" /><strong>Conocé más sobre GEMIS</strong><small>Escaneá para visitar expoisi.com.ar/Gemis/index</small></aside></div></div>,
    <div className="gemis-areas" key="areas">{gemis.areas.map((area) => <article key={area.title} style={{ '--gemis-image': `url(${area.image})` } as CSSProperties}><span>{area.title}</span><p>{area.description}</p></article>)}</div>,
    <div className="gemis-projects" key="projects">{gemis.projects.map((project) => <article key={project.title}><img src={project.image} alt="" /><div><span>{project.period}</span><strong>{project.title}</strong><p>{project.description}</p></div></article>)}</div>,
    <div className="gemis-transfer-view" key="transfers"><div className="gemis-transfers">{transferItems.map((item) => <article key={item.title}><img src={item.image} alt="" /><div><span>{item.organization}</span><strong>{item.title}</strong><p>{item.description}</p></div></article>)}</div><div className="gemis-transfer-controls"><DwellButton className="gemis-transfer-controls__arrow dwell-control--ring" onActivate={() => setTransferPage(transferPage - 1)} disabled={transferPage === 0} ariaLabel="Proyectos anteriores">‹</DwellButton><span>{transferPage + 1} / 2</span><DwellButton className="gemis-transfer-controls__arrow dwell-control--ring" onActivate={() => setTransferPage(transferPage + 1)} disabled={transferPage === 1} ariaLabel="Más proyectos">›</DwellButton></div></div>,
    <div className="gemis-team" key="team"><div className="gemis-team__leaders"><span className="eyebrow">Dirección y liderazgo</span><div>{gemis.team.leadership.map((person) => <article key={person.name}><img src={person.image} alt="" /><strong>{person.name}</strong><small>{person.role}</small></article>)}</div></div><div className="gemis-team__members"><header><div><span className="eyebrow">Equipo actual</span><h4>Un equipo, múltiples perspectivas.</h4></div><div className="gemis-transfer-controls"><DwellButton className="gemis-transfer-controls__arrow dwell-control--ring" onActivate={() => setTeamPage(teamPage - 1)} disabled={teamPage === 0} ariaLabel="Integrantes anteriores">‹</DwellButton><span>{teamPage + 1} / {teamPages}</span><DwellButton className="gemis-transfer-controls__arrow dwell-control--ring" onActivate={() => setTeamPage(teamPage + 1)} disabled={teamPage === teamPages - 1} ariaLabel="Más integrantes">›</DwellButton></div></header><div>{teamItems.map((person) => <article key={person.name}>{person.image ? <img src={person.image} alt="" /> : <i aria-hidden="true">{person.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</i>}<span><strong>{person.name}</strong><small>{person.role}</small></span></article>)}</div></div></div>,
    <div className="gemis-publications" key="publications"><header><span className="eyebrow">Publicaciones e impacto</span><h4>La investigación también se publica.</h4><p><strong>{gemis.publicationCount} publicaciones</strong> disponibles en el repositorio local.</p></header><div>{gemis.publications.map((publication) => <article key={publication.title}><span>{publication.category}</span><strong>{publication.title}</strong><small>{publication.event}</small></article>)}</div></div>,
  ]
  const titles = ['Conocé GEMIS', 'Líneas de investigación', 'Proyectos de investigación', 'Transferencia tecnológica', 'El equipo', 'Publicaciones e impacto']
  return <article className="research-panel research-panel--gemis"><header><span className="eyebrow">Grupo GEMIS · {String(slide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span><h4>{titles[slide]}</h4></header><div className="gemis-stage" key={slide}>{slides[slide]}</div><footer className="gemis-navigation"><DwellButton className="gemis-navigation__arrow dwell-control--ring" onActivate={() => onSlideChange((slide - 1 + slides.length) % slides.length)} ariaLabel="Slide anterior">‹</DwellButton><div>{slides.map((_, index) => <DwellButton key={index} className={`gemis-navigation__dot ${index === slide ? 'gemis-navigation__dot--active' : ''}`} onActivate={() => onSlideChange(index)} ariaLabel={`Ir a slide ${index + 1}`}><span /></DwellButton>)}</div><DwellButton className="gemis-navigation__arrow dwell-control--ring" onActivate={() => onSlideChange((slide + 1) % slides.length)} ariaLabel="Slide siguiente">›</DwellButton></footer></article>
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
