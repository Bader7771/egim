const testimonials = [
  {
    name: 'Sample student: Lina A.',
    major: 'Development Informatique',
    text: 'EGIM helped me become more organized and confident with practical computer projects.',
    avatar: 'LA',
  },
  {
    name: 'Sample student: Yassine B.',
    major: 'Gestion d’entreprise',
    text: 'The program structure makes business lessons feel connected to real workplace situations.',
    avatar: 'YB',
  },
  {
    name: 'Sample student: Sara M.',
    major: 'Nursing',
    text: 'I appreciated the serious environment and the focus on professional preparation.',
    avatar: 'SM',
  },
]

export function Testimonials() {
  return (
    <section className="testimonials-section reveal">
      <div className="section-intro">
        <span className="section-label">Testimonials</span>
        <h2>Student voices from the EGIM experience</h2>
        <p>Sample testimonials written for EGIM to show how future student stories can appear on the website.</p>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <article className="testimonial-card" key={item.name}>
            <div className="rating" aria-label="Five out of five rating">5/5</div>
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
