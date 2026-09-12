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

const SETTINGS_KEY = 'expoutn-interaction-settings'

const initialCursor: CursorInput = { x: 0.5, y: 0.5, active: false, source: 'mouse' }
const InputContext = createContext<InputContextValue | null>(null)

export function InputProvider({ children }: { children: ReactNode }) {
  const [cursor, setCursor] = useState<CursorInput>(initialCursor)
  const [demoEnabled, setDemoEnabledState] = useState(experienceConfig.screensaverEnabled)
  const [timings, setTimings] = useState(() => {
    const stored = localStorage.getItem(SETTINGS_KEY)
    if (!stored) return { idleTimeoutSeconds: experienceConfig.idleTimeoutSeconds, dwellDurationSeconds: experienceConfig.dwellDurationSeconds }
    try {
      const value = JSON.parse(stored) as Partial<{ idleTimeoutSeconds: number; dwellDurationSeconds: number }>
      return { idleTimeoutSeconds: value.idleTimeoutSeconds ?? experienceConfig.idleTimeoutSeconds, dwellDurationSeconds: value.dwellDurationSeconds ?? experienceConfig.dwellDurationSeconds }
    } catch { return { idleTimeoutSeconds: experienceConfig.idleTimeoutSeconds, dwellDurationSeconds: experienceConfig.dwellDurationSeconds } }
  })
  const [demoActive, setDemoActive] = useState(false)
  const idleTimer = useRef<number | undefined>(undefined)

  const scheduleDemo = useCallback(() => {
    window.clearTimeout(idleTimer.current)
    if (!demoEnabled) return
    idleTimer.current = window.setTimeout(() => setDemoActive(true), timings.idleTimeoutSeconds * 1000)
  }, [demoEnabled, timings.idleTimeoutSeconds])

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
      idleTimer.current = window.setTimeout(() => setDemoActive(true), timings.idleTimeoutSeconds * 1000)
    }
  }

  const setInteractionTimings = (next: { idleTimeoutSeconds: number; dwellDurationSeconds: number }) => {
    const normalized = { idleTimeoutSeconds: Math.max(5, Math.round(next.idleTimeoutSeconds)), dwellDurationSeconds: Math.max(.25, Math.round(next.dwellDurationSeconds * 100) / 100) }
    setTimings(normalized)
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(normalized))
  }

  return (
    <InputContext.Provider value={{ cursor, demoEnabled, demoActive, setDemoEnabled, idleTimeoutSeconds: timings.idleTimeoutSeconds, dwellDurationSeconds: timings.dwellDurationSeconds, setInteractionTimings }}>
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
