import { useMemo, useRef, useState } from 'react'
import { planK23, type PlanMateria, type PlanResource } from '../data/planK23'
import { DwellButton } from './DwellButton'

type Relation = 'selected' | 'cursada' | 'aprobada' | 'habilita' | 'muted' | 'normal'

function names(ids: number[], byId: Map<number, PlanMateria>) {
  return ids.length ? ids.map((id) => byId.get(id)?.nombre ?? `Materia ${id}`) : ['Ninguna']
}

export function PlanStudyMap() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const byId = useMemo(() => new Map(planK23.map((materia) => [materia.id, materia])), [])
  const selected = selectedId ? byId.get(selectedId) : undefined
  const habilitadas = useMemo(() => selected
    ? planK23.filter((materia) =>
      materia.correlativasCursadas.includes(selected.id) || materia.correlativasAprobadas.includes(selected.id),
    ).map((materia) => materia.id)
    : [], [selected])

  const relation = (materia: PlanMateria): Relation => {
    if (!selected) return 'normal'
    if (materia.id === selected.id) return 'selected'
    if (selected.correlativasCursadas.includes(materia.id)) return 'cursada'
    if (selected.correlativasAprobadas.includes(materia.id)) return 'aprobada'
    if (habilitadas.includes(materia.id)) return 'habilita'
    return 'muted'
  }

  const toggleMateria = (id: number) => {
    setSelectedId((current) => current === id ? null : id)
  }

  return (
    <section className="plan-study" aria-label="Mapa interactivo del plan K23">
      <div className="plan-study__map">
        <div className="plan-study__levels">
          {[1, 2, 3, 4, 5].map((nivel) => (
            <section className="plan-study__level" key={nivel} aria-label={`${nivel}.º nivel`}>
              <h3>{nivel}.º <span>nivel</span></h3>
              <div className="plan-study__subjects">
                {planK23.filter((materia) => materia.nivel === nivel).map((materia) => (
                  <DwellButton
                    key={materia.id}
                    className={`plan-subject plan-subject--${relation(materia)} ${materia.integradora ? 'plan-subject--integrated' : ''}`}
                    onActivate={() => toggleMateria(materia.id)}
                    ariaLabel={`${selectedId === materia.id ? 'Limpiar selección de' : 'Seleccionar'} ${materia.nombre}`}
                  >
                    <span className="plan-subject__id">{String(materia.id).padStart(2, '0')}</span>
                    <span className="plan-subject__name">{materia.nombre}</span>
                    {materia.integradora && <span className="plan-subject__integrated">Integradora</span>}
                  </DwellButton>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="plan-study__legend" aria-label="Referencias del mapa">
          <span><i className="plan-subject--cursada" />Cursada</span>
          <span><i className="plan-subject--aprobada" />Aprobada</span>
          <span><i className="plan-subject--habilita" />Habilita</span>
          <span><i className="plan-subject--integrated" />Integradora</span>
        </div>
      </div>

      <aside className="plan-study__detail" aria-live="polite">
        {selected ? (
          <>
            <div className="plan-study__detail-header">
              <span>Materia {String(selected.id).padStart(2, '0')} · {selected.nivel}.º nivel</span>
              {selected.integradora && <b>Integradora</b>}
              <h3>{selected.nombre}</h3>
              <p>{selected.descripcion}</p>
            </div>
            <div className="plan-study__requirements">
              <Requirement title="Cursadas" items={names(selected.correlativasCursadas, byId)} tone="cursada" />
              <Requirement title="Aprobadas" items={names(selected.correlativasAprobadas, byId)} tone="aprobada" />
              <Requirement title="Habilita" items={names(habilitadas, byId)} tone="habilita" />
            </div>
            {selected.resources?.length ? <div className="plan-study__qr-list">{selected.resources.map((resource) => resource.type === 'videoLocal' ? <PlanLocalVideo resource={resource} key={resource.title} /> : <PlanResourceQr resource={resource} key={resource.title} />)}</div> : null}
          </>
        ) : (
          <div className="plan-study__empty">
            <span>Plan K23 · 36 materias</span>
            <h3>Consulte las correlatividades</h3>
            <p>Seleccione una asignatura para identificar sus requisitos de cursada, aprobación y las asignaturas que habilita.</p>
          </div>
        )}
      </aside>
    </section>
  )
}

function PlanResourceQr({ resource }: { resource: PlanResource }) {
  const url = resource.url ?? resource.embedUrl
  if (!url) return null

  return (
    <DwellButton className="plan-resource-qr dwell-control--ring" onActivate={() => window.open(url, '_blank', 'noopener,noreferrer')} ariaLabel={`Abrir ${resource.title}`}>
      <img src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(url)}`} alt={`Código QR para ${resource.title}`} />
      <span><b>{resource.title}</b><small>Escaneá o mantené para abrir ↗</small></span>
    </DwellButton>
  )
}

function PlanLocalVideo({ resource }: { resource: PlanResource }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  if (!resource.url) return null

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!video) return
    if (!video.paused) {
      video.pause()
      return
    }
    try {
      await video.play()
    } catch {
      video.muted = true
      await video.play().catch(() => undefined)
    }
  }

  return (
    <figure className={`plan-local-video subject-detail__video ${isPlaying ? 'subject-detail__video--playing' : ''}`}>
      <video ref={videoRef} controls preload="metadata" playsInline onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)}>
        <source src={resource.url} type="video/mp4" />
        {resource.subtitles ? <track kind="subtitles" src={resource.subtitles} srcLang="es" label="Español" default /> : null}
      </video>
      <DwellButton className="subject-detail__video-action dwell-control--ring" onActivate={togglePlayback} ariaLabel={isPlaying ? 'Pausar video' : 'Reproducir video'}>{isPlaying ? 'Ⅱ' : '▶'}</DwellButton>
      <figcaption><b>{resource.title}</b><small>{resource.description}</small></figcaption>
    </figure>
  )
}

function Requirement({ title, items, tone }: { title: string; items: string[]; tone: 'cursada' | 'aprobada' | 'habilita' }) {
  return (
    <section className={`plan-requirement plan-requirement--${tone}`}>
      <h4>{title}</h4>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  )
}
