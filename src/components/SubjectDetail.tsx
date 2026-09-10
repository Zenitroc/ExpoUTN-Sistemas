import type { SubjectDetail as SubjectDetailData } from '../types'

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
        <figure className="subject-detail__video">
          <video
            src={subject.video.src}
            poster={subject.video.poster}
            controls
            preload="metadata"
            playsInline
          />
          <figcaption>
            <strong>{subject.video.titulo}</strong>
            {subject.video.pie && <span>{subject.video.pie}</span>}
          </figcaption>
        </figure>
      )}
    </article>
  )
}
