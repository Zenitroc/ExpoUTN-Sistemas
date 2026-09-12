import { useEffect, useRef, useState, type RefObject } from 'react'
import { useInput } from '../input/InputProvider'

interface DwellState<T extends HTMLElement> {
  ref: RefObject<T | null>
  hovered: boolean
  progress: number
}

export function useDwell<T extends HTMLElement>(
  onActivate: () => void,
  disabled = false,
  allowDuringOverlay = false,
): DwellState<T> {
  const { cursor, dwellDurationSeconds } = useInput()
  const ref = useRef<T>(null)
  const activateRef = useRef(onActivate)
  const [hovered, setHovered] = useState(false)
  const [progress, setProgress] = useState(0)
  const armedRef = useRef(true)

  useEffect(() => {
    activateRef.current = onActivate
  }, [onActivate])

  useEffect(() => {
    const updateHovered = () => {
      const overlayIsOpen = document.querySelector('[data-dwell-overlay="true"]') !== null
      const rect = ref.current?.getBoundingClientRect()
      if (!rect || !cursor.active || disabled || (overlayIsOpen && !allowDuringOverlay)) {
        setHovered(false)
        return
      }
      const x = cursor.x * window.innerWidth
      const y = cursor.y * window.innerHeight
      setHovered(x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom)
    }
    updateHovered()
    window.addEventListener('dwell-overlay-change', updateHovered)
    return () => window.removeEventListener('dwell-overlay-change', updateHovered)
  }, [allowDuringOverlay, cursor, disabled])

  useEffect(() => {
    if (!hovered) {
      setProgress(0)
      armedRef.current = true
      return
    }

    const started = performance.now()
    const duration = dwellDurationSeconds * 1000
    let frame = 0
    const tick = (now: number) => {
      const next = Math.min(1, (now - started) / duration)
      setProgress(next)
      if (next === 1 && armedRef.current) {
        armedRef.current = false
        activateRef.current()
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [hovered, dwellDurationSeconds])

  return { ref, hovered, progress }
}
