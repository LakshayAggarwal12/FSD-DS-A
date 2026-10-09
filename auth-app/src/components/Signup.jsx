import React from 'react'
import { useState } from 'react'

const Signup = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        window.alert(`Account created for ${name} with email ${email}`)
        window.location.href = '/'
    }

  return (
    <main style={{ maxWidth: '400px', margin: '40px auto', padding: '24px', fontFamily: 'Arial, sans-serif', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ marginBottom: '24px', textAlign: 'center', color: '#333' }}>Sign up</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label htmlFor="name" style={{ fontWeight: 'bold', color: '#444' }}>Name</label>
      <input id="name" name="name" type="text" required 
        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            onChange={(e) => setName(e.target.value)}
        />

      <label htmlFor="email" style={{ fontWeight: 'bold', color: '#444' }}>Email</label>
        <input id="email" name="email" type="email" required 
        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            onChange={(e) => setEmail(e.target.value)}
        />

      <label htmlFor="password" style={{ fontWeight: 'bold', color: '#444' }}>Password</label>
        <input id="password" name="password" type="password" required 
        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            onChange={(e) => setPassword(e.target.value)}
        />

      <button type="submit" style={{ marginTop: '12px', padding: '12px', border: 'none', borderRadius: '4px', backgroundColor: '#2563eb', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>Create account</button>
      </form>
    </main>
  )
}

export default Signup