import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { useEffect } from 'react'

export function Modal({ children, onClose, label, wide = false }: { children: ReactNode; onClose: () => void; label: string; wide?: boolean }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', close)
    document.body.classList.add('modal-open')
    return () => { document.removeEventListener('keydown', close); document.body.classList.remove('modal-open') }
  }, [onClose])
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <div className={`modal ${wide ? 'modal--wide' : ''}`} role="dialog" aria-modal="true" aria-label={label}>
      <button className="icon-button modal-close" onClick={onClose} aria-label="关闭"><X /></button>{children}
    </div>
  </div>
}
