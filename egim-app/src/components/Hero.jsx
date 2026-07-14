import heroImage from '../assets/hero.png'

export function Hero({ navigate, stats }) {
  return (
    <section className="new-hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-inner">
        <div className="hero-content">
          <span className="section-label">Professional private school</span>
          <h1>Shape your future with professional education</h1>
          <p>
            EGIM helps ambitious students build practical skills, career habits,
            and confidence through structured programs connected to real
            professional expectations.
          </p>
          <div className="hero-buttons">
            <a className="button-primary" href="#majors">Discover programs</a>
            <button type="button" className="button-secondary" onClick={() => navigate('/register')}>Apply now</button>
          </div>
        </div>
        <div className="hero-media" aria-label="EGIM professional education">
          <img src={heroImage} alt="Professional learning environment" />
          <div className="hero-metric metric-one">
            <strong>{stats.majors}</strong>
            <span>Programs</span>
          </div>
          <div className="hero-metric metric-two">
            <strong>{stats.students}</strong>
            <span>Student records</span>
          </div>
          <div className="hero-badge">
            <span></span>
            Career-focused training
          </div>
        </div>
      </div>
    </section>
  )
}
