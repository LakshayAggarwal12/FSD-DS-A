import React from 'react'
import { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(email === 'admin@example.com' && password === 'password123') {
        window.location.href = '/admin'
    }
    else if(email === 'user@example.com' && password === 'password123') {
        window.location.href = '/user'
    }
    else{
        setError('Invalid email or password')
        window.alert('Invalid email or password. Please try again.')
        window.location.href = '/'
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>
        Login
    </h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="email" style={{ fontWeight: 'bold' }}>
            Email
        </label>
          <input id="email" name="email" type="email" required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password</label>
          <input id="password" name="password" type="password" required
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px' }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" style={{ padding: '11px', border: 'none', borderRadius: '6px', backgroundColor: '#2563eb', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>Log In</button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>Don't have an account? <a href="/signup" style={{ color: '#2563eb' }}>Sign up</a></p>
    </div>
  )
}

export default Login