import React, { useEffect } from 'react'

const App = () => {
  const[formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: ""
  })

  useEffect(()=>{
    console.log("form data updated", formData)
  }, [formData])

  const handleChange=(e)=>{
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    alert(`Account created for ${formData.name} with email ${formData.email}`)
    console.log("form submitted", formData)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>

      <form action = "" 
      style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px', padding: '24px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
      >

        <input name="name" type="text" placeholder='Enter your name' 
        value = {formData.name} 
        onChange = {handleChange}
        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        <input name="email" type="email" placeholder='Enter your email' 
        value = {formData.email}
        onChange = {handleChange}
        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        <input name="password" type="password" placeholder='Enter your password' 
        value = {formData.password} 
        onChange = {handleChange} 
        style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}/>

        <button type='submit' 
        style={{ padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        onClick={handleSubmit}
        >
          Registration
        </button>

      </form>
    </div>
  )
}

export default App