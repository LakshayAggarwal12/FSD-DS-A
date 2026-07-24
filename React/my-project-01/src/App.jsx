import React from 'react'
import Book from './components/Book'
import Student from './components/Student'

const App = () => {
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'20px'}}>
      <Student />
      <Student />
      <Student />
    </div>
  )
}

export default App