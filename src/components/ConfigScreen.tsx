import { useEffect, useState } from 'react'
import { useInput } from '../input/InputProvider'

export function ConfigScreen() {
  const { demoEnabled, setDemoEnabled, idleTimeoutSeconds, dwellDurationSeconds, setInteractionTimings } = useInput()
  const [idle, setIdle] = useState(idleTimeoutSeconds)
  const [dwell, setDwell] = useState(dwellDurationSeconds)
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([])
  const [cameraIndex, setCameraIndex] = useState(0)
  const [cameraMessage, setCameraMessage] = useState('Detectá las cámaras para elegir cuál usará el reconocimiento.')

  useEffect(() => {
    fetch('/expo-config/camera').then((response) => response.ok ? response.json() : null).then((settings) => {
      if (typeof settings?.cameraIndex === 'number') setCameraIndex(settings.cameraIndex)
    }).catch(() => undefined)
  }, [])

  const detectCameras = async () => {
    if (!navigator.mediaDevices?.getUserMedia) { setCameraMessage('Este navegador no permite detectar cámaras. Usá el índice manual del tracker.'); return }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach((track) => track.stop())
      const found = (await navigator.mediaDevices.enumerateDevices()).filter((device) => device.kind === 'videoinput')
      setCameras(found)
      setCameraMessage(found.length ? `${found.length} cámara(s) detectada(s).` : 'No se detectaron cámaras.')
    } catch { setCameraMessage('No se pudo acceder a la cámara. Permití el acceso y volvé a intentar.') }
  }

  const save = async () => {
    setInteractionTimings({ idleTimeoutSeconds: idle, dwellDurationSeconds: dwell })
    try {
      const response = await fetch('/expo-config/camera', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cameraIndex }) })
      setCameraMessage(response.ok ? `Cámara ${cameraIndex} guardada. Reiniciá Expo para aplicarla al tracker.` : 'No se pudo guardar la cámara en este modo.')
    } catch { setCameraMessage(`Usá: npm run all -- -Camera ${cameraIndex}`) }
  }

  return (
    <main className="config-screen">
      <section className="config-card">
        <span className="eyebrow">ExpoUTN · configuración</span>
        <h1>Interacción y protector</h1>
        <p>Estos valores se guardan en este navegador y se aplican al instante.</p>
        <label><span>Protector de pantalla</span><input type="checkbox" checked={demoEnabled} onChange={(event) => setDemoEnabled(event.target.checked)} /><b>{demoEnabled ? 'Activo' : 'Inactivo'}</b></label>
        <label><span>Tiempo de inactividad</span><div><input type="number" min="5" max="3600" step="1" value={idle} onChange={(event) => setIdle(Number(event.target.value))} /><small>segundos</small></div></label>
        <label><span>Tiempo de carga por cursor</span><div><input type="number" min="0.25" max="10" step="0.25" value={dwell} onChange={(event) => setDwell(Number(event.target.value))} /><small>segundos</small></div></label>
        <div className="config-camera"><span>Cámara para hand tracking</span><p>{cameraMessage}</p><div><select value={cameraIndex} onChange={(event) => setCameraIndex(Number(event.target.value))} disabled={!cameras.length}>{cameras.length ? cameras.map((camera, index) => <option key={camera.deviceId} value={index}>{index}: {camera.label || `Cámara ${index + 1}`}</option>) : <option value={cameraIndex}>Índice {cameraIndex}</option>}</select><button type="button" onClick={() => { void detectCameras() }}>Detectar cámaras</button></div></div>
        <button onClick={() => { void save() }}>Guardar configuración</button>
        <a href="/">← Volver a la experiencia</a>
      </section>
    </main>
  )
}
