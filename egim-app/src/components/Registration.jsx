import { useEffect, useState } from 'react'
import { api } from '../api/api'
import { Navbar } from './Navbar'
import { useReveal } from './useReveal'

const admissionsImage = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=82'
const formImage = 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=900&q=82'

export function AdmissionsSection({ navigate }) {
  const steps = [
    'Choose a major',
    'Complete the application',
    'Wait for school contact',
    'Confirm registration',
  ]

  return (
    <section className="admissions-story reveal" id="admissions">
      <div className="admissions-image">
        <img src={admissionsImage} alt="Students walking on a school campus" />
      </div>
      <div className="admissions-story-copy">
        <span className="section-label">Admissions</span>
        <h2>Registration for the next academic year</h2>
        <p>
          EGIM admissions helps each applicant choose a major, understand the
          process, and complete the request before final school confirmation.
        </p>
        <ol className="steps-list">
          {steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
        </ol>
        <button type="button" className="button-primary" onClick={() => navigate('/register')}>Apply Now</button>
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
      setStatus({ type: 'success', text: 'Your application request was sent. EGIM will contact you soon.' })
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
        <img src={formImage} alt="Student preparing an application" />
        <div>
          <span className="section-label">Application Form</span>
          <h2>Start your registration request</h2>
          <p>
            Share your details with EGIM admissions. The school team will review
            your request and guide you through the next steps.
          </p>
          <ul className="benefit-list">
            <li>Guided major selection</li>
            <li>Admissions team follow-up</li>
            <li>Next-year registration support</li>
          </ul>
          <div className="contact-mini">
            <strong>Admissions office</strong>
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
          <span>Full name</span>
          <input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} placeholder="Your full name" required />
        </label>
        <label>
          <span>Phone</span>
          <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="+212 ..." required />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" />
        </label>
        <label>
          <span>Birth date</span>
          <input type="date" value={form.birthDate} onChange={(event) => setForm({ ...form, birthDate: event.target.value })} />
        </label>
        <label className="full-field">
          <span>Major</span>
          <select value={form.majorId} onChange={(event) => setForm({ ...form, majorId: event.target.value })} required>
            <option value="">Select major</option>
            {majors.map((major) => <option key={major._id} value={major._id}>{major.name}</option>)}
          </select>
        </label>
        <label className="full-field">
          <span>Message</span>
          <textarea rows="5" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Tell us which program you are interested in."></textarea>
        </label>
      </div>
      <button type="submit" className="button-primary" disabled={submitting}>{submitting ? 'Sending request...' : 'Send application request'}</button>
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
      setStatus({ type: 'success', text: 'Your application request was sent. EGIM will contact you soon.' })
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
          <span className="section-label">Application</span>
          <h1>Apply to EGIM</h1>
          <p>Complete this request and the admissions team will contact you with program availability, documents, and next steps.</p>
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
