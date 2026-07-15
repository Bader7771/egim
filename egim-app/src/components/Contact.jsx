import { LogoMark } from './Navbar'

const googleMapsUrl = 'https://maps.app.goo.gl/v3rvxmHtGch4pBY1A'

export function Contact() {
  return (
    <section className="contact-redesign reveal" id="contact">
      <div className="contact-copy">
        <LogoMark />
        <span className="section-label">Contact</span>
        <h2>Visitez EGIM ou contactez l’administration</h2>
        <p>
          Contactez l’équipe EGIM pour obtenir des informations sur les filières,
          la préinscription, les horaires et l’accompagnement administratif.
        </p>
        <div className="map-placeholder">
          <span>Localisation EGIM</span>
          <strong>Carte Google Maps</strong>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Voir sur Google Maps</a>
        </div>
      </div>
      <div className="contact-details">
        <p><strong>Localisation</strong><span>Emplacement officiel EGIM sur Google Maps</span></p>
        <p><strong>Téléphone</strong><span>+212 600 000 000</span></p>
        <p><strong>Email</strong><span>contact@egim.ma</span></p>
        <p><strong>Horaires</strong><span>Du lundi au samedi, 09:00 - 18:00</span></p>
        <div className="location-actions">
          <a className="button-primary" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Voir sur Google Maps</a>
          <a className="nav-login" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Itinéraire</a>
        </div>
        <form className="contact-form">
          <input placeholder="Nom complet" aria-label="Nom complet" />
          <input type="email" placeholder="Email" aria-label="Email" />
          <textarea rows="4" placeholder="Message" aria-label="Message"></textarea>
          <button type="button" className="button-primary">Envoyer le message</button>
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
        <p>Une formation professionnelle pour les étudiants qui préparent les métiers de demain.</p>
      </div>
      <div className="footer-links">
        <div>
          <strong>Navigation</strong>
          <a href="#home">Accueil</a>
          <a href="#about">À propos</a>
          <a href="#majors">Filières</a>
          <a href="#admissions">Admissions</a>
        </div>
        <div>
          <strong>Filières</strong>
          <a href="#majors">Development Informatique</a>
          <a href="#majors">Gestion d'entreprise</a>
          <a href="#majors">Soins infirmiers</a>
        </div>
        <div>
          <strong>Contact</strong>
          <a href="mailto:contact@egim.ma">contact@egim.ma</a>
          <a href="tel:+212600000000">+212 600 000 000</a>
          <button type="button" onClick={() => navigate('/admin/login')}>Connexion administrateur</button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>(c) 2026 EGIM. Tous droits réservés.</span>
        <div className="footer-socials">
          <a href="#contact">Fb</a>
          <a href="#contact">In</a>
          <a href="#contact">Li</a>
        </div>
      </div>
    </footer>
  )
}
