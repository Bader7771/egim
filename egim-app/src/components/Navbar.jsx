import { useEffect, useState } from 'react'

const navLinks = [
  ['home', 'Home'],
  ['about', 'About'],
  ['majors', 'Majors'],
  ['admissions', 'Admissions'],
  ['student-life', 'Student Life'],
  ['contact', 'Contact'],
]

export function LogoMark() {
  return (
    <div className="egim-logo" aria-label="EGIM">
      <span>EG</span>
      <strong>EGIM</strong>
    </div>
  )
}

export function Navbar({ navigate }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24)
      const sections = navLinks.map(([id]) => document.getElementById(id)).filter(Boolean)
      const current = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= 120)
      if (current) setActive(current.id)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function goHome() {
    setOpen(false)
    navigate('/')
  }

  function closeMenu() {
    setOpen(false)
  }

  return (
    <header className={`site-navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <button className="logo-button" type="button" onClick={goHome}>
        <LogoMark />
      </button>
      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={open ? 'is-open' : ''} aria-label="Main navigation">
        {navLinks.map(([id, label]) => (
          <a className={active === id ? 'active' : ''} href={`#${id}`} onClick={closeMenu} key={id}>{label}</a>
        ))}
      </nav>
      <div className={`nav-actions ${open ? 'is-open' : ''}`}>
        <button type="button" className="nav-login" onClick={() => { setOpen(false); navigate('/admin/login') }}>Admin Login</button>
        <button type="button" className="nav-cta" onClick={() => { setOpen(false); navigate('/register') }}>Register Now</button>
      </div>
    </header>
  )
}
