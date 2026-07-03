import { useCallback, useEffect, useState } from 'react'
import sectionsData from './data/sections.json'
import { CursorLayer } from './components/CursorLayer'
import { DemoOverlay } from './components/DemoOverlay'
import { InfoModal } from './components/InfoModal'
import { InteractiveMap } from './components/InteractiveMap'
import { InputProvider } from './input/InputProvider'
import { useInput } from './input/InputProvider'
import { ScreenSaver } from './components/ScreenSaver'
import type { Section } from './types'

const sections = sectionsData as Section[]

function Experience() {
  const [selected, setSelected] = useState<Section | null>(null)
  const { demoActive } = useInput()
  const closeModal = useCallback(() => setSelected(null), [])
  const openModal = useCallback((section: Section) => setSelected(section), [])

  useEffect(() => {
    if (demoActive) setSelected(null)
  }, [demoActive])

  return (
    <div className="app-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <header className="topbar">
        <div className="brand">
          <div className="brand__mark" aria-hidden="true"><span /><span /><span /></div>
          <div>
            <strong>UTN.BA</strong>
            <small>Ingeniería en Sistemas de Información</small>
          </div>
        </div>
        <div className="topbar__intro">
          <span className="eyebrow">ExpoUTN · experiencia interactiva</span>
          <h1>Explorá <em>Sistemas</em></h1>
          <p>Acercá el cursor a un punto y mantenelo para descubrir.</p>
        </div>
        <DemoOverlay />
      </header>

      <InteractiveMap sections={sections} onOpen={openModal} />

      <footer className="map-footer">
        <span><i className="pulse-dot" /> Mapa activo</span>
        <span className="map-footer__hint"><b>2s</b> mantené para abrir</span>
        <span>{String(sections.length).padStart(2, '0')} puntos para explorar</span>
      </footer>

      {selected && <InfoModal section={selected} onClose={closeModal} />}
      {demoActive && <ScreenSaver sections={sections} />}
      {!demoActive && <CursorLayer />}
    </div>
  )
}

export default function App() {
  return (
    <InputProvider>
      <Experience />
    </InputProvider>
  )
}
