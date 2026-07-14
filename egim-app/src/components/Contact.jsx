import { LogoMark } from './Navbar'

export function Contact() {
  return (
    <section className="contact-redesign reveal" id="contact">
      <div>
        <span className="section-label">Contact</span>
        <h2>Visit EGIM or speak with admissions</h2>
        <p>
          Reach the school team for program information, registration steps,
          schedules, and administrative support.
        </p>
      </div>
      <div className="contact-details">
        <p><strong>Address</strong><span>EGIM Campus, Morocco</span></p>
        <p><strong>Phone</strong><span>+212 600 000 000</span></p>
        <p><strong>Email</strong><span>contact@egim.ma</span></p>
        <div className="social-links">
          <a href="#contact">Facebook</a>
          <a href="#contact">Instagram</a>
          <a href="#contact">LinkedIn</a>
        </div>
      </div>
    </section>
  )
}

export function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div>
        <LogoMark />
        <p>Professional education for students preparing for tomorrow's careers.</p>
      </div>
      <nav>
        <a href="#about">About</a>
        <a href="#majors">Majors</a>
        <a href="#admissions">Admissions</a>
        <button type="button" onClick={() => navigate('/admin/login')}>Admin</button>
      </nav>
    </footer>
  )
}
