import { useInput } from '../input/InputProvider'

export function CursorLayer() {
  const { cursor } = useInput()
  if (!cursor.active) return null

  return (
    <div
      className={`cursor cursor--${cursor.source}`}
      style={{ transform: `translate3d(${cursor.x * 100}vw, ${cursor.y * 100}vh, 0)` }}
      aria-hidden="true"
    >
      <i />
      <span>{cursor.source === 'demo' ? 'DEMO' : cursor.source === 'hand' ? 'MANO' : ''}</span>
    </div>
  )
}
