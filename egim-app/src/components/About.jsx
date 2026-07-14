const aboutCards = [
  ['About EGIM', 'A private professional school focused on useful learning, disciplined administration, and student progress.'],
  ['Mission', 'Prepare students with practical skills, strong work habits, and the confidence to enter professional environments.'],
  ['Vision', 'Build a trusted training institution where education, technology, and employability move together.'],
  ['Why choose us', 'Clear programs, guided follow-up, modern classrooms, and a serious atmosphere for career preparation.'],
]

const featureCards = [
  ['Professional programs', 'Programs are organized around workplace skills and practical learning outcomes.'],
  ['Experienced instructors', 'Students learn from instructors who understand both education and professional expectations.'],
  ['Modern classrooms', 'A clean learning environment supports focused study, collaboration, and digital work.'],
  ['Career preparation', 'EGIM emphasizes confidence, communication, discipline, and readiness for future opportunities.'],
]

export function About() {
  return (
    <>
      <section className="school-section reveal" id="about">
        <div className="section-intro">
          <span className="section-label">Institution</span>
          <h2>A serious learning environment for ambitious students</h2>
          <p>
            EGIM combines professional training, academic structure, and personal
            follow-up to help students move from interest to capability.
          </p>
        </div>
        <div className="institution-grid">
          {aboutCards.map(([title, text], index) => (
            <article className="institution-card" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="features-section reveal">
        <div className="features-heading">
          <span className="section-label">Facilities and strengths</span>
          <h2>Designed for professional growth</h2>
        </div>
        <div className="feature-panel-grid">
          {featureCards.map(([title, text]) => (
            <article className="feature-panel" key={title}>
              <div className="feature-icon" aria-hidden="true"></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
