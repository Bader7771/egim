const steps = [
  ['01', 'Apprendre', 'Acquérir les bases avec des cours structurés et un encadrement clair.'],
  ['02', 'Pratiquer', 'Mettre les notions en application à travers des exercices, projets et ateliers.'],
  ['03', 'Développer ses compétences', 'Renforcer la méthode, l’autonomie, la communication et la rigueur professionnelle.'],
  ['04', 'Se préparer au marché du travail', 'Comprendre les attentes du terrain et construire un projet professionnel réaliste.'],
]

export function PedagogySection() {
  return (
    <section className="pedagogy-section reveal">
      <div className="section-intro centered">
        <span className="section-label">Notre méthode pédagogique</span>
        <h2>Un apprentissage progressif, pratique et orienté métier</h2>
        <p>EGIM privilégie une approche claire : apprendre les bases, pratiquer régulièrement et préparer l’étudiant aux exigences professionnelles.</p>
      </div>
      <div className="pedagogy-timeline">
        {steps.map(([number, title, text]) => (
          <article className="pedagogy-card" key={title}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
