import { useEffect, useState } from 'react'
import { api } from '../api/api'
import { Navbar } from './Navbar'
import { useReveal } from './useReveal'

const admissionsImage = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=82'
const formImage = 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=900&q=82'

export function AdmissionsSection({ navigate }) {
  const steps = [
    'Choisir une filière',
    'Remplir le formulaire de préinscription',
    'Être contacté par l’administration',
    'Finaliser l’inscription',
  ]

  return (
    <section className="admissions-story reveal" id="admissions">
      <div className="admissions-image">
        <img src={admissionsImage} alt="Etudiants sur un campus scolaire" />
      </div>
      <div className="admissions-story-copy">
        <span className="section-label">Admissions</span>
        <h2>Parcours d’admission pour la prochaine année scolaire</h2>
        <p>
          Le service des admissions EGIM accompagne chaque candidat dans le
          choix de sa filière, la compréhension des étapes et la finalisation
          de sa demande avant confirmation administrative.
        </p>
        <ol className="steps-list">
          {steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
        </ol>
        <button type="button" className="button-primary" onClick={() => navigate('/register')}>Se préinscrire</button>
      </div>
    </section>
  )
}

export function RegistrationSection({ majors }) {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    birthDate: '',
    majorId: '',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [submitting, setSubmitting] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setStatus({ type: '', text: '' })
    setSubmitting(true)
    try {
      await api.post('/registration-requests', form)
      setStatus({ type: 'success', text: 'Votre demande de préinscription a été envoyée. EGIM vous contactera prochainement.' })
      setForm({ fullName: '', phone: '', email: '', birthDate: '', majorId: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', text: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="registration-section reveal" id="registration">
      <div className="registration-panel">
        <img src={formImage} alt="Etudiant préparant une demande de préinscription" />
        <div>
          <span className="section-label">Formulaire de préinscription</span>
          <h2>Envoyez votre demande de préinscription</h2>
          <p>
            Renseignez vos informations. L’administration EGIM étudiera votre
            demande et vous guidera dans les prochaines étapes.
          </p>
          <ul className="benefit-list">
            <li>Orientation dans le choix de la filière</li>
            <li>Suivi par l’administration</li>
            <li>Accompagnement pour la prochaine année</li>
          </ul>
          <div className="contact-mini">
            <strong>Bureau des admissions</strong>
            <span>contact@egim.ma</span>
            <span>+212 600 000 000</span>
          </div>
        </div>
      </div>
      <ApplicationForm
        form={form}
        majors={majors}
        status={status}
        submitting={submitting}
        setForm={setForm}
        onSubmit={submit}
      />
    </section>
  )
}

export function ApplicationForm({ form, majors, status, submitting = false, setForm, onSubmit }) {
  return (
    <form className="application-form" onSubmit={onSubmit}>
      {status.text && <div className={`message ${status.type}`}>{status.text}</div>}
      <div className="form-fields">
        <label>
          <span>Nom complet</span>
          <input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} placeholder="Votre nom complet" required />
        </label>
        <label>
          <span>Téléphone</span>
          <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="+212 ..." required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" />
        </label>
        <label>
          <span>Date de naissance</span>
          <input type="date" value={form.birthDate} onChange={(event) => setForm({ ...form, birthDate: event.target.value })} />
        </label>
        <label className="full-field">
          <span>Filière</span>
          <select value={form.majorId} onChange={(event) => setForm({ ...form, majorId: event.target.value })} required>
            <option value="">Choisir une filière</option>
            {majors.map((major) => <option key={major._id} value={major._id}>{major.name}</option>)}
          </select>
        </label>
        <label className="full-field">
          <span>Message</span>
          <textarea rows="5" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Indiquez la filière qui vous intéresse ou votre question."></textarea>
        </label>
      </div>
      <button type="submit" className="button-primary" disabled={submitting}>{submitting ? 'Envoi en cours...' : 'Envoyer la demande'}</button>
    </form>
  )
}

export function RegistrationPage({ navigate }) {
  const [majors, setMajors] = useState([])
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    birthDate: '',
    majorId: new URLSearchParams(window.location.search).get('major') || '',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [submitting, setSubmitting] = useState(false)

  useReveal()

  useEffect(() => {
    api.get('/majors').then(setMajors).catch(() => setMajors([]))
  }, [])

  async function submit(event) {
    event.preventDefault()
    setStatus({ type: '', text: '' })
    setSubmitting(true)
    try {
      await api.post('/registration-requests', form)
      setStatus({ type: 'success', text: 'Votre demande de préinscription a été envoyée. EGIM vous contactera prochainement.' })
      setForm({ fullName: '', phone: '', email: '', birthDate: '', majorId: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', text: error.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="public-redesign">
      <Navbar navigate={navigate} />
      <main className="standalone-application reveal">
        <section className="application-intro">
          <span className="section-label">Préinscription</span>
          <h1>Se préinscrire à EGIM</h1>
          <p>Complétez cette demande. L’équipe des admissions vous contactera avec les informations sur les filières, les documents et les prochaines étapes.</p>
        </section>
        <ApplicationForm
          form={form}
          majors={majors}
          status={status}
          submitting={submitting}
          setForm={setForm}
          onSubmit={submit}
        />
      </main>
    </div>
  )
}
