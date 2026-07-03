import type { CursorInput } from './types'

export function cursorFromPointer(event: PointerEvent): CursorInput {
  return {
    x: Math.min(1, Math.max(0, event.clientX / window.innerWidth)),
    y: Math.min(1, Math.max(0, event.clientY / window.innerHeight)),
    active: true,
    source: 'mouse',
  }
}
