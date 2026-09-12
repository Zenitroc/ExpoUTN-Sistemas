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
import { UtnLogo } from './components/UtnLogo'
import { ConfigScreen } from './components/ConfigScreen'

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
        <UtnLogo />
        <div className="topbar__intro">
          <span className="eyebrow">ExpoUTN · experiencia interactiva</span>
          <h1>Explorá <em>Sistemas</em></h1>
          <p>Acercá el cursor a un punto y mantenelo para descubrir.</p>
        </div>
        <DemoOverlay />
      </header>

      <InteractiveMap sections={sections} onOpen={openModal} disabled={selected !== null} />

      <footer className="map-footer">
        <span>{String(sections.length).padStart(2, '0')} puntos para explorar</span>
        <span className="map-footer__hint"><b>2s</b> mantené para abrir</span>
        <span className="map-footer__department">Departamento de Ingeniería en Sistemas de Información</span>
      </footer>

      {selected && <InfoModal section={selected} onClose={closeModal} />}
      {demoActive && <ScreenSaver />}
      {!demoActive && <CursorLayer />}
    </div>
  )
}

export default function App() {
  const isConfig = window.location.pathname === '/config'
  return (
    <InputProvider>
      {isConfig ? <ConfigScreen /> : <Experience />}
    </InputProvider>
  )
}
