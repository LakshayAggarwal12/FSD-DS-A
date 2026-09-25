import React, {useState} from 'react'

const Counter = () => {

  const [Num, setNum] = useState(0)

  return (
    <div
     style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}   
    >
        <h3>Counter Component</h3>
        <br/>
        <h4>Count: {Num}</h4>
        <div
          style={{display: 'flex', gap: '10px', marginTop: '20px'}}
        >
          <button 
              style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none'}}
              onClick={() => {
                if(Num < 10){
                  setNum(Num + 1)
                }
                else{
                  alert("Count cannot exceed 10")
                }
              }}
              >
                  Increment
          </button>
          <button 
              style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none'}}
              onClick={() => {
                if(Num > 0){
                  setNum(Num - 1)
                }
                else{
                  alert("Count cannot go below 0")
                }
              }}
              >
              Decrement
          </button>
        </div>
    </div>
  )
}

export default Counter