import { useEffect, useState } from 'react'

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

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`site-navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <button className="logo-button" type="button" onClick={() => navigate('/')}>
        <LogoMark />
      </button>
      <nav aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#majors">Majors</a>
        <a href="#admissions">Admissions</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="nav-actions">
        <button type="button" className="nav-login" onClick={() => navigate('/admin/login')}>Admin login</button>
        <button type="button" className="nav-cta" onClick={() => navigate('/register')}>Register now</button>
      </div>
    </header>
  )
}
