const majorIcons = ['</>', 'BR', 'MD', 'ED']

export function ProgramOverview({ majors, loading, navigate }) {
  const visibleMajors = majors.slice(0, 4)

  return (
    <section className="program-overview reveal" aria-label="EGIM program overview">
      <div className="program-overview-intro">
        <span className="section-label">Programs</span>
        <h2>Professional majors built around practical learning</h2>
        <p>Explore the live EGIM program catalog, choose a field, and begin the admission process with the school team.</p>
      </div>
      <div className="overview-cards">
        {visibleMajors.map((major, index) => (
          <article className={`overview-card ${index === 0 ? 'highlight' : ''}`} key={major._id}>
            <span className="card-icon">{majorIcons[index % majorIcons.length]}</span>
            <h3>{major.name}</h3>
            <p>{major.description || 'Structured professional training with applied work, guided learning, and career preparation.'}</p>
            <button type="button" onClick={() => navigate(`/register?major=${major._id}`)}>Learn more</button>
          </article>
        ))}
        {!loading && visibleMajors.length === 0 && (
          <article className="overview-card highlight">
            <span className="card-icon">EG</span>
            <h3>Majors are being prepared</h3>
            <p>Programs added from the admin dashboard will appear here automatically.</p>
            <button type="button" onClick={() => navigate('/register')}>Send interest</button>
          </article>
        )}
      </div>
    </section>
  )
}
