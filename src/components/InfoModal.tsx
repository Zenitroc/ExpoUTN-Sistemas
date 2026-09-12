import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import type { ContentBlock, Section } from '../types'
import { Tabs } from './Tabs'
import { DwellButton } from './DwellButton'
import { useDwell } from '../hooks/useDwell'
import { ProjectCarousel } from './ProjectCarousel'
import { PlanStudyMap } from './PlanStudyMap'
import { SubjectDetail } from './SubjectDetail'
import { ProjectGallery } from './ProjectGallery'
import { ElectiveExplorer } from './ElectiveExplorer'
import { ResearchExplorer } from './ResearchExplorer'
import { IncumbencyMap } from './IncumbencyMap'
import { CareerExplorer } from './CareerExplorer'
import { UsefulLinks } from './UsefulLinks'

type LinkItem = Extract<ContentBlock, { type: 'links' }>['items'][number]

function LinkCard({ item }: { item: LinkItem }) {
  const openLink = () => {
    if (item.url !== '#') window.open(item.url, '_blank', 'noopener,noreferrer')
  }
  const { ref, hovered, progress } = useDwell<HTMLAnchorElement>(openLink)

  return (
    <a
      ref={ref}
      href={item.url}
      className={`dwell-control ${hovered ? 'dwell-control--active' : ''}`}
      style={{ '--control-dwell': progress } as CSSProperties}
      target={item.url === '#' ? undefined : '_blank'}
      rel="noreferrer"
    >
      <span>{item.label}</span>
      {item.description && <small>{item.description}</small>}
      <b aria-hidden="true">↗</b>
      <i className="dwell-control__meter" aria-hidden="true" />
    </a>
  )
}

function Content({ block }: { block: ContentBlock }) {
  if (block.type === 'project-carousel') {
    return <ProjectCarousel items={block.items} />
  }
  if (block.type === 'text') {
    return (
      <div className="content-text">
        {block.heading && <h3>{block.heading}</h3>}
        <p>{block.body}</p>
      </div>
    )
  }
  if (block.type === 'highlights') {
    return (
      <ul className="highlight-grid">
        {block.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    )
  }
  if (block.type === 'image') {
    return (
      <figure className="content-image">
        <img src={block.src} alt={block.alt} />
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>
    )
  }
  if (block.type === 'video') {
    return (
      <div className="content-video">
        <iframe
          src={block.url}
          title={block.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }
  return (
    <div className="link-grid">
      {block.items.map((item) => (
        <LinkCard item={item} key={item.label} />
      ))}
    </div>
  )
}

export function InfoModal({ section, onClose }: { section: Section; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState(section.tabs[0].id)
  const [isClosing, setIsClosing] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const closingRef = useRef(false)
  const tab = section.tabs.find((item) => item.id === activeTab) ?? section.tabs[0]
  const isPlan = section.id === 'plan'
  const isElectives = section.id === 'electivas'
  const isResearch = section.id === 'investigacion'
  const isIncumbencies = section.id === 'incumbencias'
  const isCareer = section.id === 'salida'
  const isUsefulLinks = section.id === 'links'

  const requestClose = useCallback(() => {
    if (closingRef.current) return
    closingRef.current = true
    setIsClosing(true)
    closeTimer.current = window.setTimeout(onClose, 320)
  }, [onClose])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return
      if (event.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(closeTimer.current)
    }
  }, [requestClose])

  return (
    <div className={`modal-backdrop ${isClosing ? 'modal-backdrop--closing' : ''}`} role="presentation">
      <section className={`modal ${isClosing ? 'modal--closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal__rail" style={{ '--accent': section.accent } as CSSProperties}>
          <span>{section.index}</span>
          <i />
          <span>ISI</span>
        </div>
        <div className="modal__main">
          <header className="modal__header">
            <div>
              <span className="eyebrow">Explorá la carrera</span>
              <h2 id="modal-title">{section.title}</h2>
              <p>{section.description}</p>
            </div>
            <DwellButton className="modal__close-icon dwell-control--ring" onActivate={requestClose} ariaLabel="Cerrar">×</DwellButton>
          </header>
          {!isPlan && !isElectives && !isResearch && !isIncumbencies && !isCareer && !isUsefulLinks && <Tabs tabs={section.tabs} activeId={activeTab} onChange={setActiveTab} />}
          <div
            className={`modal__content ${isPlan ? 'modal__content--plan' : ''} ${isCareer ? 'modal__content--career' : ''} ${isUsefulLinks ? 'modal__content--useful-links' : ''}`}
            id={`panel-${isPlan ? 'plan-k23' : tab.id}`}
            role="tabpanel"
            aria-labelledby={isPlan ? undefined : `tab-${tab.id}`}
          >
            {isPlan
              ? <PlanStudyMap />
              : tab.subjectDetail
                ? <SubjectDetail subject={tab.subjectDetail} />
                : tab.projectGallery
                  ? <ProjectGallery />
                  : tab.electiveExplorer
                    ? <ElectiveExplorer />
                    : tab.researchExplorer
                      ? <ResearchExplorer />
                      : tab.incumbencyMap
                        ? <IncumbencyMap />
                        : tab.careerExplorer
                          ? <CareerExplorer />
                          : tab.usefulLinks
                            ? <UsefulLinks />
                      : tab.content.map((block, index) => <Content block={block} key={`${block.type}-${index}`} />)}
          </div>
          <footer className="modal__footer">
            <DwellButton className="back-button" onActivate={requestClose}>
              <span aria-hidden="true">←</span> Volver al mapa
            </DwellButton>
            <span>ExpoUTN · Ingeniería en Sistemas de Información</span>
          </footer>
        </div>
      </section>
    </div>
  )
}
