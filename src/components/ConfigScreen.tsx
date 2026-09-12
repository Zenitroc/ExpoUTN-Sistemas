import { useState } from 'react'
import { useInput } from '../input/InputProvider'

export function ConfigScreen() {
  const { demoEnabled, setDemoEnabled, idleTimeoutSeconds, dwellDurationSeconds, setInteractionTimings } = useInput()
  const [idle, setIdle] = useState(idleTimeoutSeconds)
  const [dwell, setDwell] = useState(dwellDurationSeconds)
  const save = () => setInteractionTimings({ idleTimeoutSeconds: idle, dwellDurationSeconds: dwell })

  return (
    <main className="config-screen">
      <section className="config-card">
        <span className="eyebrow">ExpoUTN · configuración</span>
        <h1>Interacción y protector</h1>
        <p>Estos valores se guardan en este navegador y se aplican al instante.</p>
        <label><span>Protector de pantalla</span><input type="checkbox" checked={demoEnabled} onChange={(event) => setDemoEnabled(event.target.checked)} /><b>{demoEnabled ? 'Activo' : 'Inactivo'}</b></label>
        <label><span>Tiempo de inactividad</span><div><input type="number" min="5" max="3600" step="1" value={idle} onChange={(event) => setIdle(Number(event.target.value))} /><small>segundos</small></div></label>
        <label><span>Tiempo de carga por cursor</span><div><input type="number" min="0.25" max="10" step="0.25" value={dwell} onChange={(event) => setDwell(Number(event.target.value))} /><small>segundos</small></div></label>
        <button onClick={save}>Guardar configuración</button>
        <a href="/">← Volver a la experiencia</a>
      </section>
    </main>
  )
}
