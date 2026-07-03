export type InputSource = 'mouse' | 'hand' | 'demo'

export interface CursorInput {
  x: number
  y: number
  active: boolean
  source: InputSource
}

export interface InputContextValue {
  cursor: CursorInput
  demoEnabled: boolean
  demoActive: boolean
  setDemoEnabled: (enabled: boolean) => void
}
