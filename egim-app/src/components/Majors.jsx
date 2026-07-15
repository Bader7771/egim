function idOf(value) {
  return typeof value === 'object' && value !== null ? value._id : value
}

const fallbackImage = 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=82'

const majorThemes = [
  {
    match: ['develop', 'informatique', 'code', 'software', 'computer'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82',
    icon: '</>',
    skills: ['Programmation web', 'Bases de données', 'Logique informatique'],
    careers: ['Développeur web', 'Technicien informatique', 'Support informatique'],
  },
  {
    match: ['gestion', 'business', 'entreprise', 'management'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=82',
    icon: 'GE',
    skills: ['Gestion administrative', 'Communication professionnelle', 'Organisation'],
    careers: ['Assistant administratif', 'Commercial', 'Assistant comptable'],
  },
  {
    match: ['nursing', 'nurse', 'health', 'medical', 'soins', 'infirm'],
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=82',
    icon: 'SI',
    skills: ['Gestes de soins', 'Hygiène et sécurité', 'Accompagnement des patients'],
    careers: ['Assistant en soins', 'Aide-soignant', 'Agent de santé'],
  },
]

function getMajorTheme(name = '') {
  const normalized = name.toLowerCase()
  return majorThemes.find((theme) => theme.match.some((word) => normalized.includes(word))) || {
    image: fallbackImage,
    icon: 'EG',
    skills: ['Travail en équipe', 'Méthodes professionnelles', 'Communication'],
    careers: ['Assistant spécialisé', 'Technicien junior', 'Support opérationnel'],
  }
}

export function Majors({ majors, groups, loading, navigate }) {
  function applyForMajor(majorId) {
    navigate(`/register?major=${majorId}`)
  }

  return (
    <section className="programs-section reveal" id="majors">
      <div className="programs-header">
        <div>
          <span className="section-label">Nos filières en détail</span>
          <h2>Des filières liées aux compétences professionnelles</h2>
        </div>
        <p>
          Les filières affichées proviennent de la base de données de l’école.
          Chaque carte présente les compétences travaillées et des débouchés réalistes.
        </p>
      </div>
      <div className="programs-grid">
        {majors.map((major) => {
          const groupCount = groups.filter((group) => idOf(group.majorId) === major._id).length
          const theme = getMajorTheme(major.name)
          return (
            <article className="program-card" key={major._id}>
              <div className="program-image">
                <img src={theme.image} alt={`Etudiants EGIM en ${major.name}`} />
                <span>{theme.icon}</span>
              </div>
              <div className="program-body">
                <div className="program-topline">
                  <span>{groupCount} groupe{groupCount > 1 ? 's' : ''}</span>
                  <small>Ouvert</small>
                </div>
                <h3>{major.name}</h3>
                <p>{major.description || 'Formation professionnelle avec cours structurés, apprentissage appliqué et accompagnement pédagogique.'}</p>
                <div className="program-details">
                  <div>
                    <strong>Compétences</strong>
                    <ul>{theme.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                  </div>
                  <div>
                    <strong>Débouchés possibles</strong>
                    <ul>{theme.careers.map((career) => <li key={career}>{career}</li>)}</ul>
                  </div>
                </div>
                <div className="program-actions">
                  <button type="button" className="button-light" onClick={() => document.getElementById('admissions')?.scrollIntoView({ behavior: 'smooth' })}>Découvrir la filière</button>
                  <button type="button" onClick={() => applyForMajor(major._id)}>Se préinscrire</button>
                </div>
              </div>
            </article>
          )
        })}
        {!loading && majors.length === 0 && (
          <article className="program-card empty-program">
            <div className="program-image">
              <img src={fallbackImage} alt="Salle de cours EGIM" />
              <span>EG</span>
            </div>
            <div className="program-body">
              <div className="program-topline">
                <span>Bientôt</span>
                <small>EGIM</small>
              </div>
              <h3>Les filières sont en préparation</h3>
              <p>Les filières disponibles apparaîtront ici dès leur ajout depuis le tableau de bord.</p>
              <button type="button" onClick={() => navigate('/register')}>Envoyer une demande</button>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
