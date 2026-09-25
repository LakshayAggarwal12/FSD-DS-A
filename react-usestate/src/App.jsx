import React from 'react'
import Counter from './components/Counter'
import Change from './components/Change'

const App = () => {
  return (
    <div
      style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', gap: '20px'}}
    >
      <h1>MY COUNTER APP</h1>
      <Counter />

      <h1>MY CHANGE APP</h1>
      <Change/>
    </div>
  )
}

export default App