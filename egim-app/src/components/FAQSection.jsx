import { useState } from 'react'

const questions = [
  ['Comment effectuer une préinscription ?', 'Cliquez sur le bouton de préinscription, remplissez le formulaire en ligne et l’administration EGIM vous contactera pour la suite.'],
  ['Quelles sont les filières disponibles ?', 'Les filières affichées sur cette page sont chargées depuis la base de données de l’école et peuvent évoluer selon l’offre disponible.'],
  ['Quels documents sont nécessaires ?', 'L’administration vous indiquera les documents à préparer après l’étude de votre demande de préinscription.'],
  ['Quand commencent les inscriptions ?', 'Les périodes d’inscription sont communiquées par l’administration. Vous pouvez envoyer une demande pour être recontacté.'],
  ['L’école propose-t-elle un accompagnement professionnel ?', 'EGIM met l’accent sur la pratique, l’orientation et la préparation aux attentes du monde professionnel.'],
  ['Comment contacter l’administration ?', 'Vous pouvez utiliser le formulaire de contact, appeler le numéro indiqué ou ouvrir la localisation Google Maps depuis la section Contact.'],
]

export function FAQSection() {
  const [open, setOpen] = useState(0)

  return (
    <section className="faq-section reveal">
      <div className="section-intro centered">
        <span className="section-label">Questions fréquentes</span>
        <h2>Les réponses aux questions les plus courantes</h2>
        <p>Retrouvez les informations essentielles avant de contacter l’administration EGIM.</p>
      </div>
      <div className="faq-list">
        {questions.map(([question, answer], index) => (
          <article className="faq-item" key={question}>
            <button
              type="button"
              aria-expanded={open === index}
              aria-controls={`faq-${index}`}
              onClick={() => setOpen(open === index ? -1 : index)}
            >
              <span>{question}</span>
              <strong>{open === index ? '-' : '+'}</strong>
            </button>
            <div className="faq-answer" id={`faq-${index}`} hidden={open !== index}>
              <p>{answer}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
