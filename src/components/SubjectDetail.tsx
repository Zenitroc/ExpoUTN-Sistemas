import { useRef, useState } from 'react'
import type { SubjectDetail as SubjectDetailData, SubjectVideo } from '../types'
import { DwellButton } from './DwellButton'

function SubjectVideoPlayer({ video }: { video: SubjectVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const togglePlayback = () => {
    const player = videoRef.current
    if (!player) return
    if (player.paused) void player.play()
    else player.pause()
  }

  return (
    <figure className="subject-detail__video">
      <video ref={videoRef} src={video.src} poster={video.poster} controls preload="metadata" playsInline onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
      <DwellButton className="subject-detail__video-action dwell-control--ring" onActivate={togglePlayback} ariaLabel={isPlaying ? 'Pausar video' : 'Reproducir video'}>
        {isPlaying ? 'Ⅱ' : '▶'}
      </DwellButton>
      <figcaption>
        <strong>{video.titulo}</strong>
        {video.pie && <span>{video.pie}</span>}
      </figcaption>
    </figure>
  )
}

export function SubjectDetail({ subject }: { subject: SubjectDetailData }) {
  return (
    <article className={`subject-detail ${subject.video ? 'subject-detail--with-video' : ''}`}>
      <div className="subject-detail__copy">
        <div className="subject-detail__meta">
          <span>{subject.anio}</span>
          {subject.integradora && <b>{subject.integradora}</b>}
        </div>
        <h3>{subject.nombre}</h3>
        <h4>{subject.subtitulo}</h4>
        {subject.descripcion.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {subject.video && (
        <SubjectVideoPlayer video={subject.video} />
      )}
    </article>
  )
}
