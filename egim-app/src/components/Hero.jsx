import { LogoMark } from './Navbar'

const heroImage = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=82'

export function Hero({ navigate, stats }) {
  return (
    <section className="new-hero" id="home">
      <div className="hero-overlay"></div>
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-logo-badge"><LogoMark /></div>
          <span className="section-label">Une formation professionnelle pour un avenir meilleur</span>
          <h1>Construisez votre avenir avec EGIM</h1>
          <p>
            EGIM propose une formation orientée métier, un apprentissage
            pratique et un environnement scolaire sérieux pour préparer les
            étudiants à leur avenir professionnel.
          </p>
          <div className="hero-buttons">
            <a className="button-primary" href="#majors">Découvrir nos filières</a>
            <button type="button" className="button-secondary" onClick={() => navigate('/register')}>Se préinscrire</button>
          </div>
        </div>
        <div className="hero-media" aria-label="Formation professionnelle EGIM">
          <div className="shape shape-blue"></div>
          <div className="shape shape-yellow"></div>
          <img src={heroImage} alt="Etudiants dans une salle de cours moderne" />
          <div className="hero-metric metric-one">
            <strong>{stats.majors || 3}</strong>
            <span>Filières professionnelles</span>
          </div>
          <div className="hero-metric metric-two">
            <strong>{stats.students || 'Live'}</strong>
            <span>Dossiers étudiants</span>
          </div>
          <div className="hero-badge">
            <span></span>
            Formation orientée carrière
          </div>
        </div>
      </div>
    </section>
  )
}
