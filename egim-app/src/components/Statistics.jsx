import { useEffect, useState } from 'react'

function Counter({ value }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const target = Number(value) || 0
    const duration = 700
    const start = performance.now()

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      setDisplay(Math.round(target * progress))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [value])

  return display
}

export function Statistics({ majors, groups, students }) {
  const stats = [
    ['Filières', majors.length, 'Programmes actifs'],
    ['Groupes', groups.length, 'Groupes de classe organisés'],
    ['Etudiants', students.length, 'Dossiers étudiants enregistrés'],
    ['Préinscriptions', majors.length || 1, 'Opportunités de candidature'],
  ]

  return (
    <section className="numbers-section reveal">
      {stats.map(([label, value, detail]) => (
        <article className="number-card" key={label}>
          <strong><Counter value={value} /></strong>
          <span>{label}</span>
          <p>{detail}</p>
        </article>
      ))}
    </section>
  )
}
