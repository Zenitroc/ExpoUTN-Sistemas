import type { ReactNode } from 'react'

const icons: Record<string, ReactNode> = {
  plan: <><path d="M4 6.5 9 4l6 2.5L20 4v13.5L15 20l-6-2.5-5 2.5Z" /><path d="M9 4v13.5M15 6.5V20" /><circle cx="12" cy="11.5" r="1.7" fill="currentColor" stroke="none" /></>,
  materias: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8M8 13h5M8 17h7" /><path d="m16.5 13 1.1 1.1 2.1-2.3" /></>,
  salida: <><path d="M4 19V5M4 19h16" /><path d="m7 15 4-4 3 2 5-6" /><path d="M15.5 7H19v3.5" /><circle cx="7" cy="15" r="1" fill="currentColor" stroke="none" /><circle cx="11" cy="11" r="1" fill="currentColor" stroke="none" /></>,
  incumbencias: <><circle cx="12" cy="5.5" r="2.2" /><circle cx="5.5" cy="17.5" r="2.2" /><circle cx="18.5" cy="17.5" r="2.2" /><path d="M10.8 7.3 6.7 15.6M13.2 7.3l4.1 8.3M7.8 17.5h7.4" /></>,
  proyectos: <><path d="m12 3 7 4v10l-7 4-7-4V7Z" /><path d="m5 7 7 4 7-4M12 11v10" /><path d="m9.5 14 1.5 1.5 3.5-3.5" /></>,
  vida: <><path d="M12 20.5s-7-3.8-7-10.1A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.4c0 6.3-7 10.1-7 10.1Z" /><path d="M8 4.5v3M6.5 6h3M17.5 5.5v2M16.5 6.5h2" /></>,
  investigacion: <><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" /><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(28 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(-28 12 12)" /><path d="M12 2.5v2M12 19.5v2" /></>,
  electivas: <><path d="M5 5h14v5H5zM5 14h14v5H5z" /><circle cx="9" cy="7.5" r="1.5" fill="currentColor" stroke="none" /><circle cx="15" cy="16.5" r="1.5" fill="currentColor" stroke="none" /><path d="M12 10v4" /></>,
  links: <><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><path d="M15 15h2v2h-2zM18 18h2v2h-2zM15 19h1M19 14h1" /></>,
}

export function SectionIcon({ id }: { id: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[id] ?? icons.links}</svg>
}
