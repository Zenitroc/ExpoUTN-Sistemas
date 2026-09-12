import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { careerProfiles, type CareerProfile } from '../data/careerPaths'
import { planK23 } from '../data/planK23'

export function CareerExplorer() {
  const [selectedId, setSelectedId] = useState(careerProfiles[0].id)
  const [isPaused, setIsPaused] = useState(false)
  const selected = careerProfiles.find((profile) => profile.id === selectedId) ?? careerProfiles[0]
  const subjectNames = useMemo(() => selected.materias.map((id) => planK23.find((subject) => subject.id === id)?.nombre).filter((name): name is string => Boolean(name)), [selected])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches || isPaused) return
    const interval = window.setInterval(() => {
      setSelectedId((current) => careerProfiles[(careerProfiles.findIndex((profile) => profile.id === current) + 1) % careerProfiles.length].id)
    }, 4600)
    return () => window.clearInterval(interval)
  }, [isPaused])

  return (
    <section className="career-explorer" style={{ '--career-color': selected.color } as CSSProperties} aria-label="Perfiles profesionales">
      <header className="career-explorer__intro">
        <div>
          <span className="eyebrow">Salida laboral</span>
          <h3>No hay una salida. Hay muchos caminos.</h3>
        </div>
      </header>

      <div className="career-explorer__profiles" role="tablist" aria-label="Perfiles profesionales" onMouseLeave={() => setIsPaused(false)}>
        {careerProfiles.map((profile) => <ProfileIndicator key={profile.id} profile={profile} selected={profile.id === selected.id} onPreview={() => { setIsPaused(true); setSelectedId(profile.id) }} />)}
      </div>

      <article className="career-profile" key={selected.id} aria-live="polite">
        <div className="career-profile__heading">
          <span className="eyebrow">Perfil profesional</span>
          <h4>{selected.nombre}</h4>
          <strong>{selected.resumen}</strong>
          <p>{selected.descripcion}</p>
          <div className="career-profile__guide"><span>De la carrera al rol</span><b>Materias, práctica y trabajo en equipo se combinan para construir este perfil.</b></div>
        </div>
        <div className="career-profile__facts">
          {subjectNames.length > 0 && <div><small>Materias relacionadas</small><div className="career-profile__chips">{subjectNames.map((name) => <span key={name}>{name}</span>)}</div></div>}
          <div><small>Ámbitos donde se trabaja</small><div className="career-profile__chips career-profile__chips--workplaces">{selected.ambitos.map((place) => <span key={place}>{place}</span>)}</div></div>
          <em>Los ámbitos mencionados son ejemplos y no implican convenio, auspicio ni vínculo institucional.</em>
        </div>
      </article>

    </section>
  )
}

function ProfileIndicator({ profile, selected, onPreview }: { profile: CareerProfile; selected: boolean; onPreview: () => void }) {
  return <div className={`career-profile-button ${selected ? 'career-profile-button--selected' : ''}`} onMouseEnter={onPreview} onFocus={onPreview} role="tab" aria-selected={selected} tabIndex={0}><i style={{ background: profile.color }} /><span>{profile.nombre}</span></div>
}
