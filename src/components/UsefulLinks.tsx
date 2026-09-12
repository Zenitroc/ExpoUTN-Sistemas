import { usefulLinks } from '../data/usefulLinks'

export function UsefulLinks() {
  return (
    <section className="useful-links" aria-label="Links útiles">
      <header className="useful-links__intro">
        <div><span className="eyebrow">Links útiles</span><h3>Todo lo importante, a un escaneo.</h3></div>
        <p>Elegí un QR para abrir información oficial desde tu celular.</p>
      </header>
      <div className="useful-links__grid">
        {usefulLinks.map((link) => (
          <article className="useful-link" key={link.url}>
            <header><h4>{link.titulo}</h4><p>{link.descripcion}</p></header>
            <figure><img src={link.qr} alt={`Código QR para ${link.titulo}`} /><figcaption>Escaneá para abrir</figcaption></figure>
            {link.tags && <div className="useful-link__tags">{link.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
            <footer><small>{link.leyenda}</small><a href={link.url} target="_blank" rel="noopener noreferrer">Abrir enlace <span aria-hidden="true">↗</span></a></footer>
          </article>
        ))}
      </div>
    </section>
  )
}
