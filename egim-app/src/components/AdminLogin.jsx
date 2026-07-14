import { useState } from 'react'
import { api } from '../api/api'
import { LogoMark } from './Navbar'

export function AdminLogin({ navigate, onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    setError('')
    try {
      const result = await api.post('/auth/login', form)
      onLogin(result.token)
      navigate('/admin/dashboard')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={submit}>
        <LogoMark />
        <div>
          <span className="section-label">Administration</span>
          <h1>Admin login</h1>
          <p>Access the EGIM dashboard with backend-managed credentials.</p>
        </div>
        {error && <div className="message error">{error}</div>}
        <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" required />
        <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} placeholder="Password" required />
        <button className="button-primary" type="submit">Login</button>
        <button className="nav-login" type="button" onClick={() => navigate('/')}>Back to website</button>
      </form>
    </main>
  )
}
