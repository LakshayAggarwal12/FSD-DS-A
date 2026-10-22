import React from 'react'
import { useContext, createContext } from 'react'

const App = () => {

  const myname = createContext("default value");
  const value = useContext(myname);

  return (
    <div>
      <h1>value from context: {value}</h1>
    </div>
  )
}

export default App