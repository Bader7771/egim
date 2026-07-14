import { useEffect, useState } from 'react'
import { api } from '../api/api'
import { Navbar } from './Navbar'
import { useReveal } from './useReveal'

export function RegistrationSection({ majors, navigate }) {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    birthDate: '',
    majorId: '',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', text: '' })

  async function submit(event) {
    event.preventDefault()
    setStatus({ type: '', text: '' })
    try {
      await api.post('/registration-requests', form)
      setStatus({ type: 'success', text: 'Your application request was sent. EGIM will contact you soon.' })
      setForm({ fullName: '', phone: '', email: '', birthDate: '', majorId: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', text: error.message })
    }
  }

  return (
    <section className="admissions-section reveal" id="admissions">
      <div className="admissions-copy">
        <span className="section-label">Admissions</span>
        <h2>Start your registration request</h2>
        <p>
          Share your details with EGIM admissions. The school team will review
          your request and guide you through the next steps.
        </p>
        <div className="admissions-note">
          <strong>Simple process</strong>
          <span>Request, review, school contact, and final registration.</span>
        </div>
      </div>
      <ApplicationForm
        form={form}
        majors={majors}
        status={status}
        setForm={setForm}
        onSubmit={submit}
      />
    </section>
  )
}

export function ApplicationForm({ form, majors, status, setForm, onSubmit }) {
  return (
    <form className="application-form" onSubmit={onSubmit}>
      {status.text && <div className={`message ${status.type}`}>{status.text}</div>}
      <input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} placeholder="Full name" required />
      <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Phone" required />
      <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" />
      <input type="date" value={form.birthDate} onChange={(event) => setForm({ ...form, birthDate: event.target.value })} />
      <select value={form.majorId} onChange={(event) => setForm({ ...form, majorId: event.target.value })} required>
        <option value="">Select major</option>
        {majors.map((major) => <option key={major._id} value={major._id}>{major.name}</option>)}
      </select>
      <textarea rows="5" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Message"></textarea>
      <button type="submit" className="button-primary">Send application request</button>
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

  useReveal()

  useEffect(() => {
    api.get('/majors').then(setMajors).catch(() => setMajors([]))
  }, [])

  async function submit(event) {
    event.preventDefault()
    setStatus({ type: '', text: '' })
    try {
      await api.post('/registration-requests', form)
      setStatus({ type: 'success', text: 'Your application request was sent. EGIM will contact you soon.' })
      setForm({ fullName: '', phone: '', email: '', birthDate: '', majorId: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', text: error.message })
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
          setForm={setForm}
          onSubmit={submit}
        />
      </main>
    </div>
  )
}
