import { useInput } from '../input/InputProvider'
import { DwellButton } from './DwellButton'

export function DemoOverlay() {
  const { demoEnabled, demoActive, setDemoEnabled, idleTimeoutSeconds } = useInput()
  return (
    <div className="demo-control">
      {demoActive && <span className="demo-control__status"><i /> Protector activo</span>}
      <DwellButton
        className={demoEnabled ? 'is-on' : ''}
        onActivate={() => setDemoEnabled(!demoEnabled)}
        ariaLabel={`${demoEnabled ? 'Desactivar' : 'Activar'} protector de pantalla`}
      >
        <span>Protector {idleTimeoutSeconds}s</span>
        <i />
      </DwellButton>
    </div>
  )
}
