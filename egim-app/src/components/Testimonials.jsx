const testimonials = [
  {
    name: 'Exemple fictif : Lina A.',
    major: 'Development Informatique',
    text: 'EGIM m’a aidée à mieux m’organiser et à gagner en confiance grâce aux projets pratiques en informatique.',
    avatar: 'LA',
  },
  {
    name: 'Exemple fictif : Yassine B.',
    major: 'Gestion d’entreprise',
    text: 'La structure de la formation rend les cours de gestion plus concrets et proches des situations professionnelles.',
    avatar: 'YB',
  },
  {
    name: 'Exemple fictif : Sara M.',
    major: 'Soins infirmiers',
    text: 'J’ai apprécié l’environnement sérieux et l’importance donnée à la préparation professionnelle.',
    avatar: 'SM',
  },
]

export function Testimonials() {
  return (
    <section className="testimonials-section reveal">
      <div className="section-intro">
        <span className="section-label">Témoignages</span>
        <h2>Des exemples de retours étudiants</h2>
        <p>Ces témoignages sont des exemples fictifs rédigés pour présenter l’expérience EGIM de manière réaliste.</p>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <article className="testimonial-card" key={item.name}>
            <div className="rating" aria-label="Note cinq sur cinq">5/5</div>
            <p>{item.text}</p>
            <div className="testimonial-author">
              <span>{item.avatar}</span>
              <div>
                <strong>{item.name}</strong>
                <small>{item.major}</small>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
