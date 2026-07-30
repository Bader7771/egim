const API_URL = (process.env.EGIM_API_URL || 'http://localhost:5000/api').replace(/\/$/, '')

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: options.body ? { 'Content-Type': 'application/json' } : undefined,
    ...options,
  })
  const data = response.status === 204 ? null : await response.json().catch(() => null)
  if (!response.ok) throw new Error(`${path}: ${data?.message || response.statusText}`)
  return data
}

async function ensure(path, items, key, payload) {
  const current = await request(path)
  const records = [...current]
  for (const item of items) {
    if (records.some((record) => key(record) === key(item))) continue
    const created = await request(path, { method: 'POST', body: JSON.stringify(payload(item)) })
    records.push(created)
  }
  return records
}

const majorSeeds = [
  ['Développement Digital', 'Conception d’applications web et mobiles, bases de données et méthodes agiles.'],
  ['Gestion des Entreprises', 'Comptabilité, finance, entrepreneuriat et pilotage des organisations.'],
  ['Marketing Digital', 'Stratégie de marque, réseaux sociaux, publicité et analyse des performances.'],
  ['Réseaux & Cybersécurité', 'Administration des systèmes, réseaux informatiques et sécurité numérique.'],
  ['Design Graphique', 'Identité visuelle, communication créative, édition et interfaces numériques.'],
].map(([name, description]) => ({ name, description }))

const groupSeeds = [
  ['DD-101', 'Développement Digital', 'Salle A1'], ['DD-201', 'Développement Digital', 'Labo Info 1'],
  ['GE-101', 'Gestion des Entreprises', 'Salle B2'], ['GE-201', 'Gestion des Entreprises', 'Salle B3'],
  ['MD-101', 'Marketing Digital', 'Salle C1'], ['RC-101', 'Réseaux & Cybersécurité', 'Labo Réseaux'],
  ['RC-201', 'Réseaux & Cybersécurité', 'Labo Info 2'], ['DG-101', 'Design Graphique', 'Studio Créatif'],
].map(([name, major, classroom]) => ({ name, major, classroom }))

const studentNames = [
  'Salma Alaoui', 'Yassine Benali', 'Imane El Amrani', 'Omar Berrada', 'Lina Chraïbi',
  'Hamza El Fassi', 'Aya Idrissi', 'Mehdi Tazi', 'Nour Bennani', 'Adam Lahlou',
  'Meryem Amrani', 'Ilyas Mansouri', 'Sara El Gharbi', 'Anas Bouzidi', 'Ghita Naciri',
  'Zakaria Rahmani', 'Kenza Saidi', 'Amine Ouazzani', 'Hiba Kettani', 'Rayan Belkadi',
]

async function main() {
  const majors = await ensure('/majors', majorSeeds, (item) => item.name, (item) => item)
  const majorByName = Object.fromEntries(majors.map((major) => [major.name, major]))
  const groups = await ensure('/groups', groupSeeds, (item) => item.name, (item) => ({
    name: item.name, majorId: majorByName[item.major]._id, classroom: item.classroom,
  }))
  const groupByName = Object.fromEntries(groups.map((group) => [group.name, group]))

  const students = studentNames.map((fullName, index) => {
    const group = groups[index % groups.length]
    const digits = String(610000000 + index * 1731)
    return {
      fullName,
      phone: `+212 6 ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`,
      email: `${fullName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]+/g, '.').replace(/^\.|\.$/g, '')}@etudiant.egim.ma`,
      birthDate: `${2002 + (index % 5)}-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 25) + 1).padStart(2, '0')}`,
      groupId: group._id,
      majorId: typeof group.majorId === 'object' ? group.majorId._id : group.majorId,
    }
  })
  const savedStudents = await ensure('/students', students, (item) => item.email, (item) => item)

  const currentPayments = await request('/payments')
  for (let index = 0; index < savedStudents.length; index += 1) {
    const student = savedStudents[index]
    if (currentPayments.some((payment) => (payment.studentId?._id || payment.studentId) === student._id)) continue
    const status = ['Paid', 'Paid', 'Paid', 'Partial', 'Not Paid'][index % 5]
    await request('/payments', { method: 'POST', body: JSON.stringify({
      studentId: student._id, type: 'Monthly', amount: status === 'Paid' ? 1800 : status === 'Partial' ? 900 : 0,
      status, month: 'Juillet', year: 2026, paymentDate: status === 'Not Paid' ? undefined : `2026-07-${String((index % 25) + 1).padStart(2, '0')}`,
    }) })
  }

  const scheduleSeeds = [
    ['DD-101', 'Monday', '09:00', '11:00', 'Algorithmique'], ['DD-201', 'Tuesday', '10:00', '12:00', 'Développement React'],
    ['GE-101', 'Monday', '11:00', '13:00', 'Comptabilité générale'], ['GE-201', 'Wednesday', '09:00', '11:00', 'Gestion financière'],
    ['MD-101', 'Thursday', '14:00', '16:00', 'Stratégie digitale'], ['RC-101', 'Tuesday', '14:00', '16:00', 'Fondamentaux réseaux'],
    ['RC-201', 'Friday', '09:00', '11:00', 'Cybersécurité'], ['DG-101', 'Wednesday', '14:00', '16:00', 'Design d’interface'],
  ]
  const currentSchedules = await request('/schedules')
  for (const [groupName, day, startTime, endTime, subject] of scheduleSeeds) {
    const group = groupByName[groupName]
    if (currentSchedules.some((item) => (item.groupId?._id || item.groupId) === group._id && item.day === day && item.startTime === startTime)) continue
    await request('/schedules', { method: 'POST', body: JSON.stringify({
      groupId: group._id, day, startTime, endTime, subject, classroom: group.classroom,
    }) })
  }

  console.log(`Données de démonstration prêtes : ${majors.length} filières, ${groups.length} classes, ${savedStudents.length} étudiants.`)
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
