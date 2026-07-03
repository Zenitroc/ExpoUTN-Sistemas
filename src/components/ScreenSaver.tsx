import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import experienceConfig from '../data/experience.json'
import type { Section } from '../types'

export function ScreenSaver({ sections }: { sections: Section[] }) {
  const [index, setIndex] = useState(0)
  const section = sections[index]
  const highlights = useMemo(
    () => section.tabs.flatMap((tab) => tab.content)
      .find((block) => block.type === 'highlights'),
    [section],
  )

  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % sections.length),
      experienceConfig.carouselIntervalSeconds * 1000,
    )
    return () => window.clearInterval(timer)
  }, [sections.length])

  return (
    <div className="screensaver" aria-live="polite">
      <div className="screensaver__noise" aria-hidden="true" />
      <header className="screensaver__header">
        <div className="brand">
          <div className="brand__mark" aria-hidden="true"><span /><span /><span /></div>
          <div><strong>UTN.BA</strong><small>Ingeniería en Sistemas de Información</small></div>
        </div>
        <span>ExpoUTN · recorré la carrera</span>
      </header>

      <article className="screensaver__slide" key={section.id} style={{ '--accent': section.accent } as CSSProperties}>
        <span className="screensaver__number">{section.index} / {String(sections.length).padStart(2, '0')}</span>
        <div className="screensaver__copy">
          <span className="eyebrow">Descubrí Sistemas</span>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          {highlights?.type === 'highlights' && (
            <div className="screensaver__tags">
              {highlights.items.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
            </div>
          )}
        </div>
        <div className="screensaver__orb" aria-hidden="true">
          <i /><i /><i />
          <strong>{section.index}</strong>
        </div>
        <div
          className="screensaver__timer"
          style={{ '--slide-duration': `${experienceConfig.carouselIntervalSeconds}s` } as CSSProperties}
        />
      </article>

      <footer className="screensaver__footer">
        <span><i /> Protector de pantalla</span>
        <strong>Mové el cursor para explorar</strong>
        <div className="screensaver__dots">
          {sections.map((item, itemIndex) => <i className={itemIndex === index ? 'is-active' : ''} key={item.id} />)}
        </div>
      </footer>
    </div>
  )
}
