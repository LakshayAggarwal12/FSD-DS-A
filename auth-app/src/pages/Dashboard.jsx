import React from 'react'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  const stats = [
    { label: 'Total Students', value: '1,248', color: '#2563eb' },
    { label: 'Active Courses', value: '36', color: '#16a34a' },
    { label: 'Pending Applications', value: '24', color: '#d97706' },
    { label: 'Attendance Rate', value: '92%', color: '#9333ea' },
  ]

  const students = [
    { name: 'Aarav Sharma', course: 'Computer Science', status: 'Active' },
    { name: 'Diya Patel', course: 'Data Science', status: 'Active' },
    { name: 'Rohan Kumar', course: 'Business Administration', status: 'Pending' },
  ]

  return (
    <div style={styles.page}>
      <Navbar />

      <main style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <p style={styles.subtitle}>Welcome back. Here is an overview of your student portal.</p>
          </div>
          <button style={styles.primaryButton}>+ Add Student</button>
        </div>

        <section style={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} style={styles.card}>
              <div style={{ ...styles.icon, backgroundColor: `${stat.color}18`, color: stat.color }}>●</div>
              <div>
                <p style={styles.cardLabel}>{stat.label}</p>
                <h2 style={styles.cardValue}>{stat.value}</h2>
              </div>
            </div>
          ))}
        </section>

        <section style={styles.contentGrid}>
          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <h2 style={styles.panelTitle}>Recent Students</h2>
              <button style={styles.linkButton}>View all</button>
            </div>
            {students.map((student) => (
              <div key={student.name} style={styles.studentRow}>
                <div style={styles.avatar}>{student.name.charAt(0)}</div>
                <div style={styles.studentInfo}>
                  <strong>{student.name}</strong>
                  <span>{student.course}</span>
                </div>
                <span style={{ ...styles.status, color: student.status === 'Active' ? '#15803d' : '#b45309', backgroundColor: student.status === 'Active' ? '#dcfce7' : '#fef3c7' }}>
                  {student.status}
                </span>
              </div>
            ))}
          </div>

          <div style={styles.panel}>
            <h2 style={styles.panelTitle}>Quick Actions</h2>
            <div style={styles.actions}>
              <button style={styles.actionButton}>Manage Students <span>→</span></button>
              <button style={styles.actionButton}>Create New Course <span>→</span></button>
              <button style={styles.actionButton}>View Reports <span>→</span></button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', backgroundColor: '#f8fafc', color: '#1e293b' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '32px' },
  title: { margin: 0, fontSize: '32px', color: '#0f172a' },
  subtitle: { margin: '8px 0 0', color: '#64748b' },
  primaryButton: { border: 0, borderRadius: '8px', padding: '12px 18px', backgroundColor: '#2563eb', color: '#fff', fontWeight: 600, cursor: 'pointer' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '20px', marginBottom: '28px' },
  card: { display: 'flex', alignItems: 'center', gap: '16px', padding: '22px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' },
  icon: { width: '40px', height: '40px', display: 'grid', placeItems: 'center', borderRadius: '10px', fontSize: '18px' },
  cardLabel: { margin: 0, color: '#64748b', fontSize: '14px' },
  cardValue: { margin: '6px 0 0', fontSize: '26px', color: '#0f172a' },
  contentGrid: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' },
  panel: { padding: '24px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px' },
  panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  panelTitle: { margin: 0, fontSize: '18px', color: '#0f172a' },
  linkButton: { border: 0, background: 'none', color: '#2563eb', cursor: 'pointer' },
  studentRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 0', borderBottom: '1px solid #f1f5f9' },
  avatar: { width: '38px', height: '38px', display: 'grid', placeItems: 'center', borderRadius: '50%', backgroundColor: '#dbeafe', color: '#1d4ed8', fontWeight: 700 },
  studentInfo: { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 },
  studentInfo: { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 },
  status: { padding: '5px 9px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 },
  actions: { display: 'grid', gap: '12px', marginTop: '18px' },
  actionButton: { display: 'flex', justifyContent: 'space-between', padding: '14px 16px', border: '1px solid #dbeafe', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#1d4ed8', fontWeight: 600, cursor: 'pointer' },
}

export default Dashboard