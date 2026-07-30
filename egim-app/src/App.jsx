import { useEffect, useMemo, useState } from 'react'
import { api } from './api/api'
import { AdminLogin } from './components/AdminLogin'
import { LandingPage } from './components/LandingPage'
import { RegistrationPage } from './components/Registration'
import './App.css'

const navItems = [
  { path: '/admin/dashboard', label: 'Tableau de bord', icon: 'D' },
  { path: '/admin/majors', label: 'Filières', icon: 'F' },
  { path: '/admin/groups', label: 'Classes', icon: 'C' },
  { path: '/admin/students', label: 'Étudiants', icon: 'É' },
  { path: '/admin/payments', label: 'Paiements', icon: 'P' },
  { path: '/admin/schedule', label: 'Emploi du temps', icon: 'T' },
  { path: '/admin/settings', label: 'Paramètres', icon: 'P' },
]

const initialForms = {
  major: { name: '', description: '' },
  group: { name: '', majorId: '', classroom: '' },
  student: { fullName: '', phone: '', email: '', birthDate: '', majorId: '', groupId: '' },
  payment: { studentId: '', type: 'Monthly', amount: '', status: 'Not Paid', month: '', year: '2026', paymentDate: '' },
  schedule: { groupId: '', day: 'Monday', startTime: '', endTime: '', subject: '', classroom: '' },
}

function getInitialPath() {
  const path = window.location.pathname
  return navItems.some((item) => item.path === path) ? path : '/admin/dashboard'
}

function idOf(value) {
  return typeof value === 'object' && value !== null ? value._id : value
}

function formatDate(value) {
  if (!value) return '-'
  return new Date(value).toISOString().slice(0, 10)
}

function getLatestPayment(studentId, payments) {
  return payments.find((payment) => idOf(payment.studentId) === studentId)
}

function Badge({ status = 'Not Paid' }) {
  return <span className={`badge badge-${status.toLowerCase().replaceAll(' ', '-')}`}>{status}</span>
}

function StatCard({ label, value, detail }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  )
}

function PageHeader({ title, description, action, onAction }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && <button className="primary-button" type="button" onClick={onAction}>{action}</button>}
    </div>
  )
}

function SearchFilter({ search, setSearch, filters }) {
  return (
    <div className="toolbar">
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Rechercher dans les données"
      />
      {filters}
    </div>
  )
}

function Feedback({ loading, error, success }) {
  return (
    <>
      {loading && <div className="message info">Chargement des données...</div>}
      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}
    </>
  )
}

function DataTable({ columns, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length}>Aucune donnée trouvée.</td></tr>
          ) : rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EntityForm({ title, children, onSubmit, onCancel, editing }) {
  return (
    <form className="entity-form" onSubmit={onSubmit}>
      <div className="form-title">
        <h2>{editing ? `Modifier ${title}` : `Ajouter ${title}`}</h2>
        {editing && <button type="button" onClick={onCancel}>Annuler</button>}
      </div>
      <div className="form-grid">{children}</div>
      <button className="primary-button" type="submit">{editing ? 'Enregistrer les modifications' : `Ajouter ${title}`}</button>
    </form>
  )
}

function AdminDashboard({ onLogout }) {
  const [activePath, setActivePath] = useState(getInitialPath)
  const [majors, setMajors] = useState([])
  const [groups, setGroups] = useState([])
  const [students, setStudents] = useState([])
  const [payments, setPayments] = useState([])
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function loadData() {
    setLoading(true)
    setError('')
    try {
      const [majorData, groupData, studentData, paymentData, scheduleData] = await Promise.all([
        api.get('/majors'),
        api.get('/groups'),
        api.get('/students'),
        api.get('/payments'),
        api.get('/schedules'),
      ])
      setMajors(majorData)
      setGroups(groupData)
      setStudents(studentData)
      setPayments(paymentData)
      setSchedules(scheduleData)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    function handlePopState() {
      setActivePath(getInitialPath())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  async function runAction(action, message) {
    setError('')
    setSuccess('')
    try {
      await action()
      await loadData()
      setSuccess(message)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  function navigate(path) {
    window.history.pushState({}, '', path)
    setActivePath(path)
  }

  const helpers = { majors, groups, students, payments, schedules, runAction }
  const page = {
    '/admin/dashboard': <Dashboard {...helpers} navigate={navigate} />,
    '/admin/majors': <MajorsPage {...helpers} />,
    '/admin/groups': <GroupsPage {...helpers} />,
    '/admin/students': <StudentsPage {...helpers} />,
    '/admin/payments': <PaymentsPage {...helpers} />,
    '/admin/schedule': <SchedulePage {...helpers} />,
    '/admin/settings': <SettingsPage />,
  }[activePath]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span>EG</span>
          <div>
            <strong>EGIM</strong>
            <small>Administration</small>
          </div>
        </div>
        <nav>
          {navItems.map((item) => (
            <button
              type="button"
              className={activePath === item.path ? 'active' : ''}
              onClick={() => navigate(item.path)}
              key={item.path}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div>
            <span className="eyebrow">Espace administrateur</span>
            <strong>Année académique 2026</strong>
          </div>
          <div className="topbar-actions">
            <input type="search" placeholder="Recherche globale" />
            <button type="button" onClick={onLogout}>Se déconnecter</button>
          </div>
        </header>
        <div className="content-area">
          <Feedback loading={loading} error={error} success={success} />
          {page}
        </div>
      </main>
    </div>
  )
}

function Dashboard({ majors, groups, students, payments, navigate }) {
  const paidStudents = students.filter((student) => getLatestPayment(student._id, payments)?.status === 'Paid').length
  const pendingPayments = students.length - paidStudents

  return (
    <>
      <PageHeader
        title="Tableau de bord"
        description="Vue d’ensemble des activités et de la vie scolaire d’EGIM."
        action="Ajouter un étudiant"
        onAction={() => navigate('/admin/students')}
      />
      <section className="stats-grid">
        <StatCard label="Filières" value={majors.length} detail="Programmes de formation actifs" />
        <StatCard label="Classes" value={groups.length} detail="Groupes planifiés" />
        <StatCard label="Étudiants" value={students.length} detail="Dossiers inscrits" />
        <StatCard label="Étudiants à jour" value={paidStudents} detail="Dernier paiement réglé" />
        <StatCard label="Paiements en attente" value={pendingPayments} detail="Paiements partiels ou impayés" />
      </section>
      <section className="dashboard-grid">
        <div className="panel wide-panel">
          <div className="panel-title">
            <h2>Statistiques des paiements</h2>
            <span>2026</span>
          </div>
          <div className="bar-chart" aria-label="Payment statistics">
            {['Paid', 'Partial', 'Not Paid'].map((status) => {
              const count = payments.filter((payment) => payment.status === status).length
              return (
                <div className="bar-row" key={status}>
                  <span>{{ Paid: 'Payé', Partial: 'Partiel', 'Not Paid': 'Non payé' }[status]}</span>
                  <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.min(Math.max(count * 22, 8), 100)}%` }}></div></div>
                  <strong>{count}</strong>
                </div>
              )
            })}
          </div>
        </div>
        <div className="panel">
          <div className="panel-title"><h2>Activités récentes</h2><span>En direct</span></div>
          <ul className="activity-list">
            {payments.slice(0, 4).map((payment) => (
              <li key={payment._id}>Paiement de {studentName(payment.studentId)} : {{ Paid: 'payé', Partial: 'partiel', 'Not Paid': 'non payé' }[payment.status]}</li>
            ))}
            {payments.length === 0 && <li>Aucune activité récente.</li>}
          </ul>
        </div>
        <div className="panel">
          <div className="panel-title"><h2>Actions rapides</h2></div>
          <div className="quick-actions">
            <button type="button" onClick={() => navigate('/admin/majors')}>Créer une filière</button>
            <button type="button" onClick={() => navigate('/admin/groups')}>Créer une classe</button>
            <button type="button" onClick={() => navigate('/admin/payments')}>Enregistrer un paiement</button>
            <button type="button" onClick={() => navigate('/admin/schedule')}>Planifier un cours</button>
          </div>
        </div>
      </section>
    </>
  )
}

function MajorsPage({ majors, groups, students, runAction }) {
  const [form, setForm] = useState(initialForms.major)
  const [editingId, setEditingId] = useState('')

  function submit(event) {
    event.preventDefault()
    runAction(
      () => editingId ? api.put(`/majors/${editingId}`, form) : api.post('/majors', form),
      editingId ? 'Filière mise à jour.' : 'Filière créée.',
    )
    setForm(initialForms.major)
    setEditingId('')
  }

  return (
    <>
      <PageHeader title="Filières" description="Créez et gérez les programmes de formation proposés par EGIM." />
      <EntityForm title="une filière" onSubmit={submit} editing={Boolean(editingId)} onCancel={() => { setForm(initialForms.major); setEditingId('') }}>
        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Nom de la filière" required />
        <input value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Description" />
      </EntityForm>
      <section className="cards-grid">
        {majors.map((major) => (
          <article className="record-card" key={major._id}>
            <div className="record-heading">
              <h2>{major.name}</h2>
              <span>{groups.filter((group) => idOf(group.majorId) === major._id).length} classes</span>
            </div>
            <p>{major.description || 'Aucune description.'}</p>
            <div className="metric-row">
              <span>Étudiants</span>
              <strong>{students.filter((student) => idOf(student.majorId) === major._id).length}</strong>
            </div>
            <div className="chip-list">
              {groups.filter((group) => idOf(group.majorId) === major._id).map((group) => <span className="chip" key={group._id}>{group.name}</span>)}
            </div>
            <div className="row-actions">
              <button type="button" onClick={() => alert(`${major.name}\n${major.description || ''}`)}>Voir</button>
              <button type="button" onClick={() => { setForm({ name: major.name, description: major.description || '' }); setEditingId(major._id) }}>Modifier</button>
              <button type="button" onClick={() => confirmDelete(() => runAction(() => api.delete(`/majors/${major._id}`), 'Filière supprimée.'))}>Supprimer</button>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

function GroupsPage({ majors, groups, students, schedules, runAction }) {
  const [search, setSearch] = useState('')
  const [form, setForm] = useState(initialForms.group)
  const [editingId, setEditingId] = useState('')
  const filtered = groups.filter((group) => `${group.name} ${majorName(group.majorId, majors)} ${group.classroom}`.toLowerCase().includes(search.toLowerCase()))

  function submit(event) {
    event.preventDefault()
    runAction(
      () => editingId ? api.put(`/groups/${editingId}`, form) : api.post('/groups', form),
      editingId ? 'Classe mise à jour.' : 'Classe créée.',
    )
    setForm(initialForms.group)
    setEditingId('')
  }

  return (
    <>
      <PageHeader title="Classes" description="Gérez les classes, les salles, les emplois du temps et les étudiants." />
      <EntityForm title="une classe" onSubmit={submit} editing={Boolean(editingId)} onCancel={() => { setForm(initialForms.group); setEditingId('') }}>
        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Nom de la classe" required />
        <select value={form.majorId} onChange={(event) => setForm({ ...form, majorId: event.target.value })} required>
          <option value="">Sélectionner une filière</option>
          {majors.map((major) => <option value={major._id} key={major._id}>{major.name}</option>)}
        </select>
        <input value={form.classroom} onChange={(event) => setForm({ ...form, classroom: event.target.value })} placeholder="Salle" />
      </EntityForm>
      <SearchFilter search={search} setSearch={setSearch} />
      <DataTable
        columns={['Classe', 'Filière', 'Étudiants', 'Salle', 'Jours de cours', 'Actions']}
        rows={filtered.map((group) => [
          group.name,
          majorName(group.majorId, majors),
          students.filter((student) => idOf(student.groupId) === group._id).length,
          group.classroom || '-',
          schedules.filter((schedule) => idOf(schedule.groupId) === group._id).map((schedule) => schedule.day).join(', ') || '-',
          <div className="table-actions" key={group._id}>
            <button type="button" onClick={() => alert(`${group.name}\n${majorName(group.majorId, majors)}\n${group.classroom || ''}`)}>Voir</button>
            <button type="button" onClick={() => { setForm({ name: group.name, majorId: idOf(group.majorId), classroom: group.classroom || '' }); setEditingId(group._id) }}>Modifier</button>
            <button type="button" onClick={() => confirmDelete(() => runAction(() => api.delete(`/groups/${group._id}`), 'Classe supprimée.'))}>Supprimer</button>
          </div>,
        ])}
      />
    </>
  )
}

function StudentsPage({ majors, groups, students, payments, runAction }) {
  const [search, setSearch] = useState('')
  const [majorFilter, setMajorFilter] = useState('all')
  const [groupFilter, setGroupFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [form, setForm] = useState(initialForms.student)
  const [editingId, setEditingId] = useState('')

  const filtered = students.filter((student) => {
    const paymentStatus = getLatestPayment(student._id, payments)?.status || 'Not Paid'
    return `${student.fullName} ${student.email} ${student.phone}`.toLowerCase().includes(search.toLowerCase()) &&
      (majorFilter === 'all' || idOf(student.majorId) === majorFilter) &&
      (groupFilter === 'all' || idOf(student.groupId) === groupFilter) &&
      (paymentFilter === 'all' || paymentStatus === paymentFilter)
  })

  function submit(event) {
    event.preventDefault()
    runAction(
      () => editingId ? api.put(`/students/${editingId}`, form) : api.post('/students', form),
      editingId ? 'Étudiant mis à jour.' : 'Étudiant ajouté.',
    )
    setForm(initialForms.student)
    setEditingId('')
  }

  return (
    <>
      <PageHeader title="Étudiants" description="Recherchez, filtrez et gérez les dossiers d’inscription." />
      <EntityForm title="un étudiant" onSubmit={submit} editing={Boolean(editingId)} onCancel={() => { setForm(initialForms.student); setEditingId('') }}>
        <input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} placeholder="Nom complet" required />
        <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Téléphone" />
        <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="Email" />
        <input type="date" value={form.birthDate} onChange={(event) => setForm({ ...form, birthDate: event.target.value })} />
        <select value={form.majorId} onChange={(event) => setForm({ ...form, majorId: event.target.value })} required>
          <option value="">Sélectionner une filière</option>
          {majors.map((major) => <option value={major._id} key={major._id}>{major.name}</option>)}
        </select>
        <select value={form.groupId} onChange={(event) => setForm({ ...form, groupId: event.target.value })} required>
          <option value="">Sélectionner une classe</option>
          {groups.map((group) => <option value={group._id} key={group._id}>{group.name}</option>)}
        </select>
      </EntityForm>
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filters={<>
          <select value={majorFilter} onChange={(event) => setMajorFilter(event.target.value)}>
            <option value="all">Toutes les filières</option>
            {majors.map((major) => <option value={major._id} key={major._id}>{major.name}</option>)}
          </select>
          <select value={groupFilter} onChange={(event) => setGroupFilter(event.target.value)}>
            <option value="all">Toutes les classes</option>
            {groups.map((group) => <option value={group._id} key={group._id}>{group.name}</option>)}
          </select>
          <select value={paymentFilter} onChange={(event) => setPaymentFilter(event.target.value)}>
            <option value="all">Tous les paiements</option>
            <option value="Paid">Payé</option>
            <option value="Partial">Partiel</option>
            <option value="Not Paid">Non payé</option>
          </select>
        </>}
      />
      <DataTable
        columns={['Étudiant', 'Téléphone', 'Filière', 'Classe', 'Inscription', 'Paiement', 'Actions']}
        rows={filtered.map((student) => [
          <div className="student-cell" key={student._id}><strong>{student.fullName}</strong><span>{student.email}</span></div>,
          student.phone || '-',
          majorName(student.majorId, majors),
          groupName(student.groupId, groups),
          formatDate(student.createdAt),
          <Badge status={getLatestPayment(student._id, payments)?.status || 'Not Paid'} key={`${student._id}-badge`} />,
          <div className="table-actions" key={`${student._id}-actions`}>
            <button type="button" onClick={() => { setForm({ fullName: student.fullName, phone: student.phone || '', email: student.email || '', birthDate: formatDate(student.birthDate) === '-' ? '' : formatDate(student.birthDate), majorId: idOf(student.majorId), groupId: idOf(student.groupId) }); setEditingId(student._id) }}>Modifier</button>
            <button type="button" onClick={() => confirmDelete(() => runAction(() => api.delete(`/students/${student._id}`), 'Étudiant supprimé.'))}>Supprimer</button>
          </div>,
        ])}
      />
    </>
  )
}

function PaymentsPage({ students, payments, runAction }) {
  const [form, setForm] = useState(initialForms.payment)
  const [editingId, setEditingId] = useState('')

  function submit(event) {
    event.preventDefault()
    runAction(
      () => editingId ? api.put(`/payments/${editingId}`, paymentPayload(form)) : api.post('/payments', paymentPayload(form)),
      editingId ? 'Paiement mis à jour.' : 'Paiement enregistré.',
    )
    setForm(initialForms.payment)
    setEditingId('')
  }

  return (
    <>
      <PageHeader title="Paiements" description="Suivez les règlements mensuels et annuels de chaque étudiant." />
      <EntityForm title="un paiement" onSubmit={submit} editing={Boolean(editingId)} onCancel={() => { setForm(initialForms.payment); setEditingId('') }}>
        <select value={form.studentId} onChange={(event) => setForm({ ...form, studentId: event.target.value })} required>
          <option value="">Sélectionner un étudiant</option>
          {students.map((student) => <option value={student._id} key={student._id}>{student.fullName}</option>)}
        </select>
        <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
          <option value="Monthly">Mensuel</option>
          <option value="Full year">Année complète</option>
        </select>
        <input type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} placeholder="Montant" required />
        <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
          <option value="Paid">Payé</option>
          <option value="Partial">Partiel</option>
          <option value="Not Paid">Non payé</option>
        </select>
        <input value={form.month} onChange={(event) => setForm({ ...form, month: event.target.value })} placeholder="Mois" />
        <input type="number" value={form.year} onChange={(event) => setForm({ ...form, year: event.target.value })} placeholder="Année" required />
        <input type="date" value={form.paymentDate} onChange={(event) => setForm({ ...form, paymentDate: event.target.value })} />
      </EntityForm>
      <section className="stats-grid compact">
        <StatCard label="Payés" value={payments.filter((payment) => payment.status === 'Paid').length} detail="Paiements" />
        <StatCard label="Partiels" value={payments.filter((payment) => payment.status === 'Partial').length} detail="Paiements" />
        <StatCard label="Non payés" value={payments.filter((payment) => payment.status === 'Not Paid').length} detail="Paiements" />
      </section>
      <DataTable
        columns={['Étudiant', 'Type', 'Montant', 'Mois', 'Année', 'Statut', 'Date de paiement', 'Actions']}
        rows={payments.map((payment) => [
          studentName(payment.studentId, students),
          payment.type,
          `${Number(payment.amount).toLocaleString()} MAD`,
          payment.month || '-',
          payment.year,
          <select key={`${payment._id}-status`} value={payment.status} onChange={(event) => runAction(() => api.put(`/payments/${payment._id}`, { ...paymentPayload(payment), status: event.target.value }), 'Statut du paiement mis à jour.')}>
            <option value="Paid">Payé</option>
            <option value="Partial">Partiel</option>
            <option value="Not Paid">Non payé</option>
          </select>,
          formatDate(payment.paymentDate),
          <div className="table-actions" key={payment._id}>
            <button type="button" onClick={() => alert(`L’historique de ${studentName(payment.studentId, students)} est disponible dans ce tableau.`)}>Voir</button>
            <button type="button" onClick={() => { setForm({ studentId: idOf(payment.studentId), type: payment.type, amount: payment.amount, status: payment.status, month: payment.month || '', year: payment.year, paymentDate: formatDate(payment.paymentDate) === '-' ? '' : formatDate(payment.paymentDate) }); setEditingId(payment._id) }}>Modifier</button>
            <button type="button" onClick={() => confirmDelete(() => runAction(() => api.delete(`/payments/${payment._id}`), 'Paiement supprimé.'))}>Supprimer</button>
          </div>,
        ])}
      />
    </>
  )
}

function SchedulePage({ groups, schedules, runAction }) {
  const [form, setForm] = useState(initialForms.schedule)
  const [editingId, setEditingId] = useState('')

  const conflicts = useMemo(() => {
    return schedules.filter((schedule, index) =>
      schedules.some((other, otherIndex) =>
        index !== otherIndex &&
        schedule.day === other.day &&
        schedule.startTime < other.endTime &&
        other.startTime < schedule.endTime &&
        (idOf(schedule.groupId) === idOf(other.groupId) || schedule.classroom === other.classroom),
      ),
    )
  }, [schedules])

  function submit(event) {
    event.preventDefault()
    runAction(
      () => editingId ? api.put(`/schedules/${editingId}`, form) : api.post('/schedules', form),
      editingId ? 'Cours mis à jour.' : 'Cours planifié.',
    )
    setForm(initialForms.schedule)
    setEditingId('')
  }

  return (
    <>
      <PageHeader title="Emploi du temps" description="Planifiez les cours et contrôlez les conflits de salles ou de classes." />
      <EntityForm title="un cours" onSubmit={submit} editing={Boolean(editingId)} onCancel={() => { setForm(initialForms.schedule); setEditingId('') }}>
        <select value={form.groupId} onChange={(event) => setForm({ ...form, groupId: event.target.value })} required>
          <option value="">Sélectionner une classe</option>
          {groups.map((group) => <option value={group._id} key={group._id}>{group.name}</option>)}
        </select>
        <select value={form.day} onChange={(event) => setForm({ ...form, day: event.target.value })}>
          {Object.entries({ Monday: 'Lundi', Tuesday: 'Mardi', Wednesday: 'Mercredi', Thursday: 'Jeudi', Friday: 'Vendredi', Saturday: 'Samedi', Sunday: 'Dimanche' }).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
        </select>
        <input type="time" value={form.startTime} onChange={(event) => setForm({ ...form, startTime: event.target.value })} required />
        <input type="time" value={form.endTime} onChange={(event) => setForm({ ...form, endTime: event.target.value })} required />
        <input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} placeholder="Matière" required />
        <input value={form.classroom} onChange={(event) => setForm({ ...form, classroom: event.target.value })} placeholder="Salle" required />
      </EntityForm>
      <section className="planner-panel">
        <div>
          <h2>Assistant d’organisation</h2>
          <p>Les horaires sont contrôlés afin d’éviter les conflits de classe et de salle.</p>
        </div>
        <span className={conflicts.length ? 'conflict-warning' : 'conflict-ok'}>
          {conflicts.length ? `${conflicts.length} conflit(s) détecté(s)` : 'Aucun conflit détecté'}
        </span>
      </section>
      <DataTable
        columns={['Classe', 'Jour', 'Horaire', 'Matière', 'Salle', 'Actions']}
        rows={schedules.map((schedule) => [
          groupName(schedule.groupId, groups),
          ({ Monday: 'Lundi', Tuesday: 'Mardi', Wednesday: 'Mercredi', Thursday: 'Jeudi', Friday: 'Vendredi', Saturday: 'Samedi', Sunday: 'Dimanche' })[schedule.day] || schedule.day,
          `${schedule.startTime} - ${schedule.endTime}`,
          schedule.subject,
          schedule.classroom,
          <div className="table-actions" key={schedule._id}>
            <button type="button" onClick={() => { setForm({ groupId: idOf(schedule.groupId), day: schedule.day, startTime: schedule.startTime, endTime: schedule.endTime, subject: schedule.subject, classroom: schedule.classroom }); setEditingId(schedule._id) }}>Modifier</button>
            <button type="button" onClick={() => confirmDelete(() => runAction(() => api.delete(`/schedules/${schedule._id}`), 'Cours supprimé.'))}>Supprimer</button>
          </div>,
        ])}
      />
    </>
  )
}

function SettingsPage() {
  return (
    <>
      <PageHeader title="Paramètres" description="Configurez les informations essentielles de l’espace d’administration." />
      <section className="settings-grid">
        {[
          ['Profil de l’école', 'Identité d’EGIM, adresse et coordonnées de contact.'],
          ['Année académique', 'Année active, périodes d’inscription et règles de paiement.'],
          ['Accès administrateur', 'Comptes de l’équipe et gestion des rôles.'],
          ['État du système', 'Connexion à la base de données et disponibilité de l’API.'],
        ].map(([title, text]) => (
          <article className="record-card" key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
            <button type="button">Configurer</button>
          </article>
        ))}
      </section>
    </>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [token, setToken] = useState(() => sessionStorage.getItem('egimAdminToken') || '')

  useEffect(() => {
    function handlePopState() {
      setPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigate(nextPath) {
    window.history.pushState({}, '', nextPath)
    setPath(new URL(nextPath, window.location.origin).pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleLogin(nextToken) {
    sessionStorage.setItem('egimAdminToken', nextToken)
    setToken(nextToken)
  }

  function handleLogout() {
    sessionStorage.removeItem('egimAdminToken')
    setToken('')
    navigate('/admin/login')
  }

  if (path === '/register') {
    return <RegistrationPage navigate={navigate} />
  }

  if (path === '/admin/login') {
    return <AdminLogin navigate={navigate} onLogin={handleLogin} />
  }

  if (path.startsWith('/admin')) {
    if (!token) return <AdminLogin navigate={navigate} onLogin={handleLogin} />
    return <AdminDashboard onLogout={handleLogout} />
  }

  return <LandingPage navigate={navigate} />
}

function majorName(majorId, majors) {
  if (typeof majorId === 'object' && majorId !== null) return majorId.name
  return majors.find((major) => major._id === majorId)?.name ?? 'Non affectée'
}

function groupName(groupId, groups) {
  if (typeof groupId === 'object' && groupId !== null) return groupId.name
  return groups.find((group) => group._id === groupId)?.name ?? 'Non affectée'
}

function studentName(studentId, students = []) {
  if (typeof studentId === 'object' && studentId !== null) return studentId.fullName
  return students.find((student) => student._id === studentId)?.fullName ?? 'Étudiant inconnu'
}

function paymentPayload(payment) {
  return {
    studentId: idOf(payment.studentId),
    type: payment.type,
    amount: Number(payment.amount),
    status: payment.status,
    month: payment.month || '',
    year: Number(payment.year),
    paymentDate: payment.paymentDate || undefined,
  }
}

function confirmDelete(action) {
  if (window.confirm('Voulez-vous vraiment supprimer cet élément ?')) {
    action()
  }
}

export default App
