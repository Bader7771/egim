const galleryImages = [
  ['Salles de cours', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=82'],
  ['Laboratoires informatiques', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=82'],
  ['Travaux pratiques', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=82'],
  ['Projets en groupe', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=82'],
  ['Accompagnement des étudiants', 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=700&q=82'],
  ['Activités étudiantes', 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=700&q=82'],
]

export function CampusGallery() {
  return (
    <section className="campus-section reveal" id="student-life">
      <div className="programs-header">
        <div>
          <span className="section-label">Vie à EGIM</span>
          <h2>Des espaces d’apprentissage pour progresser sérieusement</h2>
        </div>
        <p>Salles de cours, laboratoires, travaux pratiques et projets en groupe renforcent l’expérience étudiante à EGIM.</p>
      </div>
      <div className="gallery-grid">
        {galleryImages.map(([label, image], index) => (
          <figure className={index === 0 || index === 3 ? 'wide' : ''} key={label}>
            <img src={image} alt={label} />
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
