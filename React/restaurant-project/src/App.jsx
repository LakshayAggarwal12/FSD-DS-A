import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Menu from './components/Menu'

const App = () => {
  return (
    <div>
      <Navbar />
      <Menu/>
      <div style={{position:'fixed', bottom:'0', left:'0', width:'100%'}}>
        <Footer />
      </div>
    </div>
  )
}

export default App