const majorIcons = ['</>', 'BR', 'MD', 'ED']

export function ProgramOverview({ majors, loading, navigate }) {
  const visibleMajors = majors.slice(0, 4)

  return (
    <section className="program-overview reveal" aria-label="Aperçu des filières EGIM">
      <div className="program-overview-intro">
        <span className="section-label">Filières</span>
        <h2>Des filières professionnelles construites autour de la pratique</h2>
        <p>Explorez le catalogue EGIM issu de la base de données, choisissez votre domaine et lancez votre préinscription.</p>
      </div>
      <div className="overview-cards">
        {visibleMajors.map((major, index) => (
          <article className={`overview-card ${index === 0 ? 'highlight' : ''}`} key={major._id}>
            <span className="card-icon">{majorIcons[index % majorIcons.length]}</span>
            <h3>{major.name}</h3>
            <p>{major.description || 'Formation structurée avec apprentissage appliqué, accompagnement et préparation professionnelle.'}</p>
            <button type="button" onClick={() => navigate(`/register?major=${major._id}`)}>En savoir plus</button>
          </article>
        ))}
        {!loading && visibleMajors.length === 0 && (
          <article className="overview-card highlight">
            <span className="card-icon">EG</span>
            <h3>Les filières sont en préparation</h3>
            <p>Les filières ajoutées depuis le tableau de bord apparaîtront ici automatiquement.</p>
            <button type="button" onClick={() => navigate('/register')}>Envoyer une demande</button>
          </article>
        )}
      </div>
    </section>
  )
}
