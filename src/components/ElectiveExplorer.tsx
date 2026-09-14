import { useEffect, useRef, useState } from 'react'
import { electiveCategories, electiveCount, electiveVideos, type ElectiveVideo } from '../data/electives'
import { DwellButton } from './DwellButton'

type ElectiveView = 'areas' | 'videos' | 'player'

function useCardsPerPage() {
  const [cardsPerPage, setCardsPerPage] = useState(6)

  useEffect(() => {
    const update = () => setCardsPerPage(window.matchMedia('(max-width: 700px)').matches ? 2 : window.matchMedia('(max-width: 980px), (max-height: 760px)').matches ? 4 : 6)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return cardsPerPage
}

function VideoCard({ item, onActivate }: { item: ElectiveVideo; onActivate: () => void }) {
  return (
    <DwellButton className="elective-video-card" onActivate={onActivate} ariaLabel={`Ver video de ${item.materia}`}>
      <span className="elective-video-card__poster">
        {item.poster ? <img src={item.poster} alt="" /> : item.video ? <video src={item.video} muted playsInline preload="metadata" onLoadedData={(event) => { event.currentTarget.currentTime = .1 }} aria-hidden="true" /> : <><i>{item.categoria}</i><b>{item.materia}</b></>}
        <em>▶</em>
      </span>
      <strong>{item.materia}</strong>
      <small>{item.categoria}</small>
    </DwellButton>
  )
}

function ElectiveVideoPlayer({ item }: { item: ElectiveVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
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
      // Fallback para navegadores que bloquean audio iniciado sólo por dwell.
      video.muted = true
      await video.play().catch(() => undefined)
    }
  }

  if (!item.video) return <div className="elective-player__pending"><span>Electivas</span><b>{item.materia}</b><small>Video disponible próximamente</small></div>

  return (
    <figure className={`subject-detail__video elective-player__video ${isPlaying ? 'elective-player__video--playing' : ''}`}>
      <video ref={videoRef} src={item.video} poster={item.poster} controls playsInline onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} />
      <DwellButton className="subject-detail__video-action dwell-control--ring" onActivate={togglePlayback} ariaLabel={isPlaying ? 'Pausar video' : 'Reproducir video'}>{isPlaying ? 'Ⅱ' : '▶'}</DwellButton>
    </figure>
  )
}

export function ElectiveExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [view, setView] = useState<ElectiveView>('areas')
  const [page, setPage] = useState(0)
  const [activeVideo, setActiveVideo] = useState<ElectiveVideo | null>(null)
  const cardsPerPage = useCardsPerPage()
  const selected = electiveCategories.find((category) => category.id === selectedId)
  const totalPages = Math.max(1, Math.ceil(electiveVideos.length / cardsPerPage))
  const visibleVideos = electiveVideos.slice(page * cardsPerPage, (page + 1) * cardsPerPage)

  useEffect(() => setPage((current) => Math.min(current, totalPages - 1)), [totalPages])

  const openVideos = () => { setView('videos'); setActiveVideo(null) }
  const playVideo = (item: ElectiveVideo) => { setActiveVideo(item); setView('player') }

  return (
    <section className={`elective-explorer elective-explorer--${view} ${selected ? 'elective-explorer--selected' : ''}`} aria-label="Electivas de la carrera">
      {view === 'areas' && <>
        <header className="elective-explorer__intro">
          <div>
            <span className="eyebrow">Electivas</span>
            <h3>Definí tu orientación académica</h3>
            <p>Seleccione las áreas de Ingeniería en Sistemas que desea profundizar.</p>
          </div>
          <div className="elective-explorer__facts" aria-label="Datos de las electivas">
            <strong><b>{electiveCount}</b> electivas</strong>
            <strong><b>3.º, 4.º y 5.º</b> nivel</strong>
            <DwellButton className="elective-explorer__more dwell-control--ring" onActivate={openVideos} ariaLabel="Conocer más sobre las electivas">Conocer más</DwellButton>
          </div>
        </header>

        <div className="elective-explorer__stage">
          <div className="elective-explorer__categories" aria-label="Áreas de profundización">
            {electiveCategories.map((category, index) => (
              <DwellButton key={category.id} className={`elective-category ${selectedId === category.id ? 'elective-category--selected' : ''}`} onActivate={() => setSelectedId((current) => current === category.id ? null : category.id)} ariaLabel={`${selectedId === category.id ? 'Cerrar' : 'Ver'} ${category.nombre}`} ariaSelected={selectedId === category.id}>
                <span className="elective-category__index">{String(index + 1).padStart(2, '0')}</span>
                <strong>{category.nombre}</strong>
                <small>{category.materias.length} {category.materias.length === 1 ? 'electiva' : 'electivas'}</small>
              </DwellButton>
            ))}
          </div>

          <aside className={`elective-explorer__detail ${selected ? 'elective-explorer__detail--open' : ''}`} aria-live="polite">
            {selected ? <><span className="eyebrow">{selected.nombre}</span><h4>{selected.subtitulo}</h4><div className="elective-explorer__chips">{selected.materias.map((materia) => <span key={materia}>{materia}</span>)}</div></> : <div className="elective-explorer__empty"><span>Seleccione un área</span><p>Las electivas permiten configurar distintas orientaciones de formación.</p></div>}
          </aside>
        </div>
      </>}

      {view === 'videos' && <section className="elective-library" aria-label="Videos de materias electivas">
        <header className="elective-library__header"><div><span className="eyebrow">Electivas · videos</span><h3>Presentaciones de asignaturas</h3></div><DwellButton className="elective-library__back dwell-control--ring" onActivate={() => setView('areas')} ariaLabel="Volver a Electivas">‹ Electivas</DwellButton></header>
        <div className="elective-library__grid">{visibleVideos.map((item) => <VideoCard item={item} onActivate={() => playVideo(item)} key={item.id} />)}</div>
        <footer className="elective-library__pagination" aria-label={`Página ${page + 1} de ${totalPages}`}>
          <DwellButton className="elective-library__arrow" onActivate={() => setPage((current) => current - 1)} ariaLabel="Página anterior" disabled={page === 0}>‹</DwellButton>
          <span>{Array.from({ length: totalPages }, (_, index) => <i className={index === page ? 'is-active' : ''} key={index} />)}</span>
          <DwellButton className="elective-library__arrow" onActivate={() => setPage((current) => current + 1)} ariaLabel="Página siguiente" disabled={page === totalPages - 1}>›</DwellButton>
        </footer>
      </section>}

      {view === 'player' && activeVideo && <section className="elective-player" aria-label={`Video de ${activeVideo.materia}`}>
        <DwellButton className="elective-player__back dwell-control--ring" onActivate={() => setView('videos')} ariaLabel="Volver a videos">← Volver a videos</DwellButton>
        <div className="elective-player__media">
          <ElectiveVideoPlayer item={activeVideo} key={activeVideo.id} />
        </div>
        <footer><span>{activeVideo.categoria}</span><h3>{activeVideo.materia}</h3></footer>
      </section>}
    </section>
  )
}
