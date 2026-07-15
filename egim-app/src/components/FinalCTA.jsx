export function FinalCTA({ navigate }) {
  return (
    <section className="final-cta reveal">
      <div>
        <span className="section-label">Préinscription</span>
        <h2>Prêt à construire votre avenir avec EGIM ?</h2>
        <p>Découvrez nos filières et envoyez votre demande de préinscription pour la prochaine année scolaire.</p>
      </div>
      <div className="final-cta-actions">
        <a className="button-primary" href="#majors">Voir les filières</a>
        <button type="button" className="button-secondary" onClick={() => navigate('/register')}>Se préinscrire</button>
      </div>
    </section>
  )
}
