import { useEffect, useMemo, useState } from 'react'
import { api } from '../api/api'
import { About } from './About'
import { CampusGallery } from './CampusGallery'
import { Contact, Footer } from './Contact'
import { Hero } from './Hero'
import { Majors } from './Majors'
import { Navbar } from './Navbar'
import { ProgramOverview } from './ProgramOverview'
import { AdmissionsSection, RegistrationSection } from './Registration'
import { Statistics } from './Statistics'
import { Testimonials } from './Testimonials'
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
        <ProgramOverview majors={majors} loading={loading} navigate={navigate} />
        <About />
        <Majors majors={majors} groups={groups} loading={loading} navigate={navigate} />
        <Statistics majors={majors} groups={groups} students={students} />
        <AdmissionsSection navigate={navigate} />
        <RegistrationSection majors={majors} />
        <CampusGallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}
