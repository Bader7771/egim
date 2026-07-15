const paths = [
  {
    title: 'Développement informatique',
    items: ['Développeur web', 'Technicien informatique', 'Support informatique', 'Intégrateur web'],
  },
  {
    title: 'Gestion d’entreprise',
    items: ['Assistant administratif', 'Gestionnaire', 'Commercial', 'Assistant comptable'],
  },
  {
    title: 'Soins infirmiers',
    items: ['Assistant en soins', 'Aide-soignant', 'Agent de santé', 'Accompagnement médical'],
  },
]

export function CareerPaths() {
  return (
    <section className="career-section reveal">
      <div className="programs-header">
        <div>
          <span className="section-label">Débouchés professionnels</span>
          <h2>Des pistes de carrière réalistes après la formation</h2>
        </div>
        <p>Ces exemples présentent des orientations possibles selon la filière choisie. Ils ne constituent pas une promesse d’emploi.</p>
      </div>
      <div className="career-grid">
        {paths.map((path) => (
          <article className="career-card" key={path.title}>
            <h3>{path.title}</h3>
            <ul>
              {path.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
