const aboutImage = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=82'

const points = [
  'Practical education',
  'Modern programs',
  'Career preparation',
  'Student support',
]

const steps = [
  ['01', 'Enroll', 'Choose a professional major and submit your registration request.'],
  ['02', 'Learn', 'Follow structured courses with focused classroom instruction.'],
  ['03', 'Practice', 'Build applied skills through projects, labs, and guided work.'],
  ['04', 'Build Your Career', 'Prepare for professional environments with confidence.'],
]

export function About() {
  return (
    <>
      <section className="school-section reveal" id="about">
        <div className="about-media">
          <div className="image-accent accent-blue"></div>
          <img src={aboutImage} alt="EGIM students collaborating on campus" />
          <div className="about-note">
            <strong>Modern Learning</strong>
            <span>Programs designed for progress, discipline, and employability.</span>
          </div>
        </div>
        <div className="about-copy">
          <span className="section-label">About EGIM</span>
          <h2>Welcome to EGIM</h2>
          <p>
            EGIM is a professional private school focused on useful learning,
            serious follow-up, and practical preparation. Students study in a
            clean institutional environment where every program is connected to
            future career expectations.
          </p>
          <div className="mission-grid">
            <article>
              <strong>Mission</strong>
              <span>Prepare students with practical skills, strong work habits, and confidence.</span>
            </article>
            <article>
              <strong>Vision</strong>
              <span>Build a trusted school where education, technology, and employability move together.</span>
            </article>
          </div>
          <ul className="point-list">
            {points.map((point) => <li key={point}>{point}</li>)}
          </ul>
          <a className="button-primary" href="#majors">Learn More</a>
        </div>
      </section>

      <section className="why-section reveal">
        <div className="why-backdrop" aria-hidden="true"></div>
        <div className="why-copy">
          <span className="section-label">Why Choose EGIM</span>
          <h2>A clear path from admission to career readiness</h2>
          <p>EGIM gives students a focused school experience with modern programs, practical learning, and administrative support.</p>
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
