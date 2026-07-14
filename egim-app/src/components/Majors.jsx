function idOf(value) {
  return typeof value === 'object' && value !== null ? value._id : value
}

export function Majors({ majors, groups, loading, navigate }) {
  function applyForMajor(majorId) {
    navigate(`/register?major=${majorId}`)
  }

  return (
    <section className="programs-section reveal" id="majors">
      <div className="programs-header">
        <div>
          <span className="section-label">Programs</span>
          <h2>Majors connected to professional opportunity</h2>
        </div>
        <p>
          Explore EGIM programs from the live school database and choose the path
          that matches your future plans.
        </p>
      </div>
      <div className="programs-grid">
        {majors.map((major) => {
          const groupCount = groups.filter((group) => idOf(group.majorId) === major._id).length
          return (
            <article className="program-card" key={major._id}>
              <div className="program-topline">
                <span>{groupCount} groups</span>
                <small>Open</small>
              </div>
              <h3>{major.name}</h3>
              <p>{major.description || 'Professional training program with structured courses, applied learning, and guided preparation.'}</p>
              <button type="button" onClick={() => applyForMajor(major._id)}>Register for this major</button>
            </article>
          )
        })}
        {!loading && majors.length === 0 && (
          <article className="program-card empty-program">
            <div className="program-topline">
              <span>Coming soon</span>
              <small>EGIM</small>
            </div>
            <h3>Programs are being prepared</h3>
            <p>Available majors will appear here once they are added from the admin dashboard.</p>
            <button type="button" onClick={() => navigate('/register')}>Send interest</button>
          </article>
        )}
      </div>
    </section>
  )
}
