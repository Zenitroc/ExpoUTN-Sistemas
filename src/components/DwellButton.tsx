import type { AriaRole, CSSProperties, ReactNode } from 'react'
import { useDwell } from '../hooks/useDwell'

interface DwellButtonProps {
  children: ReactNode
  className?: string
  onActivate: () => void
  ariaLabel?: string
  disabled?: boolean
  role?: AriaRole
  ariaSelected?: boolean
  ariaControls?: string
  id?: string
}

export function DwellButton({
  children,
  className = '',
  onActivate,
  ariaLabel,
  disabled,
  role,
  ariaSelected,
  ariaControls,
  id,
}: DwellButtonProps) {
  const { ref, hovered, progress } = useDwell<HTMLButtonElement>(onActivate, disabled)
  const style = { '--control-dwell': progress } as CSSProperties

  return (
    <button
      ref={ref}
      id={id}
      className={`${className} dwell-control ${hovered ? 'dwell-control--active' : ''}`}
      style={style}
      onClick={onActivate}
      aria-label={ariaLabel}
      disabled={disabled}
      role={role}
      aria-selected={ariaSelected}
      aria-controls={ariaControls}
    >
      {children}
      <span className="dwell-control__meter" aria-hidden="true" />
    </button>
  )
}
