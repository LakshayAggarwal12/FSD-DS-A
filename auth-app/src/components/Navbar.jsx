import React from 'react'

const Navbar = () => {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        backgroundColor: '#1e3a8a',
        color: '#fff',
      }}
    >
      <a href="/" style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 'bold', textDecoration: 'none' }}>
        Student Portal
      </a>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <a href="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</a>
        <a href="/courses" style={{ color: '#fff', textDecoration: 'none' }}>Courses</a>
        <a href="/assignments" style={{ color: '#fff', textDecoration: 'none' }}>Assignments</a>
        <a href="/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</a>
      </div>
    </nav>
  )
}

export default Navbar