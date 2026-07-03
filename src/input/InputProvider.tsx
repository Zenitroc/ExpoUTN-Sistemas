import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { cursorFromPointer } from './MouseInput'
import { externalCursorInput } from './ExternalCursorInput'
import type { CursorInput, InputContextValue } from './types'
import experienceConfig from '../data/experience.json'

const IDLE_DELAY = experienceConfig.idleTimeoutSeconds * 1000

const initialCursor: CursorInput = { x: 0.5, y: 0.5, active: false, source: 'mouse' }
const InputContext = createContext<InputContextValue | null>(null)

export function InputProvider({ children }: { children: ReactNode }) {
  const [cursor, setCursor] = useState<CursorInput>(initialCursor)
  const [demoEnabled, setDemoEnabledState] = useState(experienceConfig.screensaverEnabled)
  const [demoActive, setDemoActive] = useState(false)
  const idleTimer = useRef<number | undefined>(undefined)

  const scheduleDemo = useCallback(() => {
    window.clearTimeout(idleTimer.current)
    if (!demoEnabled) return
    idleTimer.current = window.setTimeout(() => setDemoActive(true), IDLE_DELAY)
  }, [demoEnabled])

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      setDemoActive(false)
      setCursor(cursorFromPointer(event))
      scheduleDemo()
    }
    const onPointerLeave = () => setCursor((current) => ({ ...current, active: false }))

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    scheduleDemo()
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      window.clearTimeout(idleTimer.current)
    }
  }, [scheduleDemo])

  useEffect(() => {
    externalCursorInput.connect((externalCursor) => {
      setDemoActive(false)
      setCursor(externalCursor)
      scheduleDemo()
    })
    return () => externalCursorInput.disconnect()
  }, [scheduleDemo])

  const setDemoEnabled = (enabled: boolean) => {
    setDemoEnabledState(enabled)
    setDemoActive(false)
    window.clearTimeout(idleTimer.current)
    if (enabled) {
      idleTimer.current = window.setTimeout(() => setDemoActive(true), IDLE_DELAY)
    }
  }

  return (
    <InputContext.Provider value={{ cursor, demoEnabled, demoActive, setDemoEnabled }}>
      {children}
    </InputContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useInput() {
  const value = useContext(InputContext)
  if (!value) throw new Error('useInput debe usarse dentro de InputProvider')
  return value
}
