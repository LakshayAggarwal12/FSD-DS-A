import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App