const heroImage = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=82'

export function Hero({ navigate, stats }) {
  return (
    <section className="new-hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-inner">
        <div className="hero-content">
          <span className="section-label">Professional Education for a Better Future</span>
          <h1>Build your future with EGIM</h1>
          <p>
            EGIM provides career-focused education, practical training, and a
            disciplined school environment for students preparing for meaningful
            professional paths.
          </p>
          <div className="hero-buttons">
            <a className="button-primary" href="#majors">Discover Our Majors</a>
            <button type="button" className="button-secondary" onClick={() => navigate('/register')}>Apply for Next Year</button>
          </div>
        </div>
        <div className="hero-media" aria-label="EGIM professional education">
          <div className="shape shape-blue"></div>
          <div className="shape shape-yellow"></div>
          <img src={heroImage} alt="Students learning in a modern classroom" />
          <div className="hero-metric metric-one">
            <strong>{stats.majors || 3}</strong>
            <span>Professional Majors</span>
          </div>
          <div className="hero-metric metric-two">
            <strong>{stats.students || 'Live'}</strong>
            <span>Student Records</span>
          </div>
          <div className="hero-badge">
            <span></span>
            Career-Focused Training
          </div>
        </div>
      </div>
    </section>
  )
}
