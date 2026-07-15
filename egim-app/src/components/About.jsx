const aboutImage = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=82'

const points = [
  'Formation pratique',
  'Programmes modernes',
  'Préparation professionnelle',
  'Accompagnement des étudiants',
]

const steps = [
  ['01', 'S’inscrire', 'Choisir une filière professionnelle et envoyer une demande de préinscription.'],
  ['02', 'Apprendre', 'Suivre des cours structurés avec un encadrement sérieux en classe.'],
  ['03', 'Pratiquer', 'Développer des compétences à travers les projets, les laboratoires et les travaux dirigés.'],
  ['04', 'Préparer son avenir', 'Se préparer progressivement aux exigences du monde professionnel.'],
]

export function About() {
  return (
    <>
      <section className="school-section reveal" id="about">
        <div className="about-media">
          <div className="image-accent accent-blue"></div>
          <img src={aboutImage} alt="Etudiants EGIM travaillant en groupe" />
          <div className="about-note">
            <strong>Apprentissage moderne</strong>
            <span>Des filières pensées pour le progrès, la discipline et l’employabilité.</span>
          </div>
        </div>
        <div className="about-copy">
          <span className="section-label">À propos d’EGIM</span>
          <h2>Bienvenue à EGIM</h2>
          <p>
            EGIM est une école privée de formation professionnelle centrée sur
            l’apprentissage utile, le suivi sérieux et la préparation pratique.
            Les étudiants évoluent dans un environnement institutionnel clair,
            avec des programmes liés aux réalités du monde professionnel.
          </p>
          <div className="mission-grid">
            <article>
              <strong>Mission</strong>
              <span>Former les étudiants avec des compétences pratiques, de bonnes habitudes de travail et de la confiance.</span>
            </article>
            <article>
              <strong>Vision</strong>
              <span>Développer une école reconnue où formation, technologie et insertion professionnelle avancent ensemble.</span>
            </article>
          </div>
          <ul className="point-list">
            {points.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <a className="button-primary" href="#majors">Découvrir les filières</a>
        </div>
      </section>

      <section className="why-section reveal">
        <div className="why-backdrop" aria-hidden="true"></div>
        <div className="why-copy">
          <span className="section-label">Pourquoi choisir EGIM</span>
          <h2>Un parcours clair, de l’admission à la préparation professionnelle</h2>
          <p>EGIM offre une expérience scolaire structurée avec des programmes modernes, de la pratique et un accompagnement administratif.</p>
        </div>
        <div className="why-card-grid">
          {steps.map(([number, title, text], index) => (
            <article className={`why-step-card ${index === 2 ? 'highlight' : ''}`} key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
