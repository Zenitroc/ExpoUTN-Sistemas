import type { CursorInput } from './types'

export type ExternalCursorListener = (cursor: CursorInput) => void

/**
 * Punto de integración para hand tracking u otras fuentes remotas.
 * El proveedor sólo necesita recibir { x, y, active, source }.
 *
 * Ejemplo futuro:
 * const socket = new WebSocket(url)
 * socket.onmessage = ({ data }) => listener(JSON.parse(data))
 */
export class ExternalCursorInput {
  private listener?: ExternalCursorListener

  connect(listener: ExternalCursorListener) {
    this.listener = listener
  }

  disconnect() {
    this.listener = undefined
  }

  // Útil para ensayar una fuente externa sin abrir un WebSocket.
  emit(cursor: Omit<CursorInput, 'source'>) {
    this.listener?.({ ...cursor, source: 'hand' })
  }
}

export const externalCursorInput = new ExternalCursorInput()
