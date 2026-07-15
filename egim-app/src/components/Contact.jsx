import { LogoMark } from './Navbar'

export function Contact() {
  return (
    <section className="contact-redesign reveal" id="contact">
      <div className="contact-copy">
        <span className="section-label">Contact</span>
        <h2>Visit EGIM or speak with admissions</h2>
        <p>
          Reach the school team for program information, registration steps,
          schedules, and administrative support.
        </p>
        <div className="map-placeholder">
          <span>EGIM Campus</span>
          <strong>Map area</strong>
        </div>
      </div>
      <div className="contact-details">
        <p><strong>Address</strong><span>EGIM Campus, Morocco</span></p>
        <p><strong>Phone</strong><span>+212 600 000 000</span></p>
        <p><strong>Email</strong><span>contact@egim.ma</span></p>
        <p><strong>Hours</strong><span>Monday to Saturday, 09:00 - 18:00</span></p>
        <form className="contact-form">
          <input placeholder="Full name" aria-label="Full name" />
          <input type="email" placeholder="Email" aria-label="Email" />
          <textarea rows="4" placeholder="Message" aria-label="Message"></textarea>
          <button type="button" className="button-primary">Send message</button>
        </form>
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
      <div className="footer-brand">
        <LogoMark />
        <p>Professional education for students preparing for tomorrow's careers.</p>
      </div>
      <div className="footer-links">
        <div>
          <strong>Navigation</strong>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#majors">Majors</a>
          <a href="#admissions">Admissions</a>
        </div>
        <div>
          <strong>Majors</strong>
          <a href="#majors">Development Informatique</a>
          <a href="#majors">Gestion d'entreprise</a>
          <a href="#majors">Nursing</a>
        </div>
        <div>
          <strong>Contact</strong>
          <a href="mailto:contact@egim.ma">contact@egim.ma</a>
          <a href="tel:+212600000000">+212 600 000 000</a>
          <button type="button" onClick={() => navigate('/admin/login')}>Admin Login</button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>(c) 2026 EGIM. All rights reserved.</span>
        <div className="footer-socials">
          <a href="#contact">Fb</a>
          <a href="#contact">In</a>
          <a href="#contact">Li</a>
        </div>
      </div>
    </footer>
  )
}
