import type { ReactNode } from 'react'

export function SectionIcon({ id }: { id: string }) {
  const paths: Record<string, ReactNode> = {
    plan: <><path d="M4 5.5c3.2-.9 5.8-.3 8 1.4v13c-2.2-1.7-4.8-2.3-8-1.4z" /><path d="M20 5.5c-3.2-.9-5.8-.3-8 1.4v13c2.2-1.7 4.8-2.3 8-1.4z" /></>,
    materias: <><rect x="3" y="4" width="18" height="13" rx="1.5" /><path d="M8 21h8M10 17l-1 4M14 17l1 4M9.5 8l-2 2 2 2M14.5 8l2 2-2 2" /></>,
    salida: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12h18M12 10v4" /></>,
    incumbencias: <><circle cx="12" cy="9" r="5" /><path d="m9 13-2 8 5-3 5 3-2-8M12 6.5l.8 1.6 1.7.3-1.2 1.3.3 1.8-1.6-.8-1.6.8.3-1.8-1.2-1.3 1.7-.3z" /></>,
    proyectos: <><path d="M8.2 14.7A6.5 6.5 0 1 1 15.8 14.7C14.7 15.5 14 16.3 14 18h-4c0-1.7-.7-2.5-1.8-3.3Z" /><path d="M10 21h4M9 3 7.5 1M15 3l1.5-2M5.5 6 3 5M18.5 6 21 5M12 7v3M10.5 11.5h3" /></>,
    vida: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M15 14.5a5 5 0 0 1 6 4.9V20" /></>,
    investigacion: <><path d="m10 3 4 1-1 4-4-1zM10 7l-2 8M6 15h7M5 21h12M8 18h7" /><path d="M14 10a5 5 0 0 1 3 8M13 13a2 2 0 0 1 1 4" /></>,
    testimonios: <><path d="M4 5h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-5l-3 3-3-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /><path d="M8 9.5H6.5v3H9v-2M15 9.5h-1.5v3H16v-2" /></>,
    links: <><path d="m10 14 4-4M7.5 16.5l-1 1a3.5 3.5 0 0 1-5-5l4-4a3.5 3.5 0 0 1 5 0M16.5 7.5l1-1a3.5 3.5 0 0 1 5 5l-4 4a3.5 3.5 0 0 1-5 0" /></>,
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[id] ?? paths.links}
    </svg>
  )
}
