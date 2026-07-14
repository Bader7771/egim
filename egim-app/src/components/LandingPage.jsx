import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/api'
import { About } from './About'
import { Contact, Footer } from './Contact'
import { Hero } from './Hero'
import { Majors } from './Majors'
import { Navbar } from './Navbar'
import { RegistrationSection } from './Registration'
import { Statistics } from './Statistics'
import { useReveal } from './useReveal'

export function LandingPage({ navigate }) {
  const [majors, setMajors] = useState([])
  const [groups, setGroups] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useReveal()

  useEffect(() => {
    async function loadSchoolData() {
      try {
        const [majorData, groupData, studentData] = await Promise.all([
          api.get('/majors'),
          api.get('/groups'),
          api.get('/students'),
        ])
        setMajors(majorData)
        setGroups(groupData)
        setStudents(studentData)
      } finally {
        setLoading(false)
      }
    }

    loadSchoolData()
  }, [])

  const stats = useMemo(() => ({
    majors: majors.length,
    groups: groups.length,
    students: students.length,
  }), [majors.length, groups.length, students.length])

  return (
    <div className="public-redesign">
      <Navbar navigate={navigate} />
      <main>
        <Hero navigate={navigate} stats={stats} />
        <About />
        <Majors majors={majors} groups={groups} loading={loading} navigate={navigate} />
        <Statistics majors={majors} groups={groups} students={students} />
        <RegistrationSection majors={majors} navigate={navigate} />
        <Contact />
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}
