function idOf(value) {
  return typeof value === 'object' && value !== null ? value._id : value
}

const fallbackImage = 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=82'

const majorThemes = [
  {
    match: ['develop', 'informatique', 'code', 'software', 'computer'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82',
    icon: '</>',
  },
  {
    match: ['gestion', 'business', 'entreprise', 'management'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=82',
    icon: 'BS',
  },
  {
    match: ['nursing', 'nurse', 'health', 'medical', 'soins', 'infirm'],
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=82',
    icon: 'HC',
  },
]

function getMajorTheme(name = '') {
  const normalized = name.toLowerCase()
  return majorThemes.find((theme) => theme.match.some((word) => normalized.includes(word))) || {
    image: fallbackImage,
    icon: 'EG',
  }
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
          const theme = getMajorTheme(major.name)
          return (
            <article className="program-card" key={major._id}>
              <div className="program-image">
                <img src={theme.image} alt={`${major.name} students at EGIM`} />
                <span>{theme.icon}</span>
              </div>
              <div className="program-body">
                <div className="program-topline">
                  <span>{groupCount} groups</span>
                  <small>Open</small>
                </div>
                <h3>{major.name}</h3>
                <p>{major.description || 'Professional training program with structured courses, applied learning, and guided preparation.'}</p>
                <div className="program-actions">
                  <button type="button" className="button-light" onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}>View Program</button>
                  <button type="button" onClick={() => applyForMajor(major._id)}>Apply Now</button>
                </div>
              </div>
            </article>
          )
        })}
        {!loading && majors.length === 0 && (
          <article className="program-card empty-program">
            <div className="program-image">
              <img src={fallbackImage} alt="EGIM classroom" />
              <span>EG</span>
            </div>
            <div className="program-body">
              <div className="program-topline">
                <span>Coming soon</span>
                <small>EGIM</small>
              </div>
              <h3>Programs are being prepared</h3>
              <p>Available majors will appear here once they are added from the admin dashboard.</p>
              <button type="button" onClick={() => navigate('/register')}>Send interest</button>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
