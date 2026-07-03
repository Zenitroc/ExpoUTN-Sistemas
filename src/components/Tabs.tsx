import type { SectionTab } from '../types'
import { DwellButton } from './DwellButton'

interface TabsProps {
  tabs: SectionTab[]
  activeId: string
  onChange: (id: string) => void
}

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  return (
    <div className="tabs" role="tablist" aria-label="Contenido de la sección">
      {tabs.map((tab) => (
        <DwellButton
          className={`tab ${activeId === tab.id ? 'tab--active' : ''}`}
          id={`tab-${tab.id}`}
          key={tab.id}
          onActivate={() => onChange(tab.id)}
          role="tab"
          ariaSelected={activeId === tab.id}
          ariaControls={`panel-${tab.id}`}
          disabled={activeId === tab.id}
        >
          {tab.label}
        </DwellButton>
      ))}
    </div>
  )
}
