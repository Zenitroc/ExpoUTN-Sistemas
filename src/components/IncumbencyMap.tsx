import { useMemo, useState } from 'react'
import { incumbencyAreas, incumbencyJobCount, type IncumbencyArea, type IncumbencyJob } from '../data/incumbencies'
import { planK23 } from '../data/planK23'
import { DwellButton } from './DwellButton'

export function IncumbencyMap() {
  const [areaId, setAreaId] = useState(incumbencyAreas[0].id)
  const [jobName, setJobName] = useState<string | null>(null)
  const area = incumbencyAreas.find((item) => item.id === areaId) ?? incumbencyAreas[0]
  const job = area.puestos.find((item) => item.nombre === jobName) ?? null
  const selectArea = (next: IncumbencyArea) => {
    setAreaId(next.id)
    setJobName(null)
  }

  return (
    <section className="incumbency-map" aria-label="Mapa de áreas y puestos profesionales">
      <header className="incumbency-map__intro">
        <div>
          <span className="eyebrow">Un título, muchos caminos</span>
          <h3>Ingeniería en Sistemas de Información</h3>
        </div>
        <span>{incumbencyAreas.length} áreas · {incumbencyJobCount} puestos</span>
      </header>

      <div className="incumbency-map__layout">
        <div className={`incumbency-map__canvas incumbency-map__canvas--${area.id}`}>
          <div className="incumbency-map__root">Ingeniería en Sistemas<br />de Información</div>
          <div className="incumbency-map__areas">
            {incumbencyAreas.map((item) => (
              <DwellButton
                key={item.id}
                className={`incumbency-area ${item.id === area.id ? 'incumbency-area--selected' : ''}`}
                onActivate={() => selectArea(item)}
                ariaLabel={`Explorar ${item.nombre}`}
                ariaSelected={item.id === area.id}
              >
                <span>{String(incumbencyAreas.indexOf(item) + 1).padStart(2, '0')}</span>
                <strong>{item.nombre}</strong>
              </DwellButton>
            ))}
          </div>
          <div className="incumbency-map__jobs" key={area.id} aria-label={`Puestos de ${area.nombre}`}>
            {area.puestos.map((item) => (
              <DwellButton
                key={item.nombre}
                className={`incumbency-job ${job?.nombre === item.nombre ? 'incumbency-job--selected' : ''}`}
                onActivate={() => setJobName((current) => current === item.nombre ? null : item.nombre)}
                ariaLabel={`Ver ${item.nombre}`}
                ariaSelected={job?.nombre === item.nombre}
              >{item.nombre}</DwellButton>
            ))}
          </div>
        </div>
        <IncumbencyDetail area={area} job={job} />
      </div>
      <p className="incumbency-map__note">Las áreas y puestos presentados son una guía de orientación profesional y no constituyen una lista cerrada de los alcances del título.</p>
    </section>
  )
}

function IncumbencyDetail({ area, job }: { area: IncumbencyArea; job: IncumbencyJob | null }) {
  const materiaNames = useMemo(() => job?.materias.map((id) => planK23.find((materia) => materia.id === id)?.nombre).filter((name): name is string => Boolean(name)) ?? [], [job])
  return (
    <aside className="incumbency-detail" aria-live="polite" key={`${area.id}-${job?.nombre ?? 'area'}`}>
      {job ? (
        <>
          <span className="eyebrow">Puesto · {area.nombre}</span>
          <h4>{job.nombre}</h4>
          <p>{job.queHace}</p>
          {materiaNames.length > 0 && <><small>Materias relacionadas</small><div className="incumbency-detail__chips">{materiaNames.map((name) => <span key={name}>{name}</span>)}</div></>}
        </>
      ) : (
        <>
          <span className="eyebrow">Área profesional</span>
          <h4>{area.nombre}</h4>
          <p>{area.resumen}</p>
          <small>Alcance profesional</small>
          <blockquote>{area.alcance}</blockquote>
          <strong>{area.puestos.length} puestos relacionados</strong>
          <em>Seleccione un puesto para consultar su descripción.</em>
        </>
      )}
    </aside>
  )
}
