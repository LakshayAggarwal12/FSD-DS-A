import React, {useState} from 'react'

const Change = () => {
  const [height, setHeight] = useState(100)  
  const [width, setWidth] = useState(100)  

  return (
    <div
        style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
    >
        <img src="https://images.pexels.com/photos/1870376/pexels-photo-1870376.jpeg?cs=srgb&dl=pexels-larissa-barbosa-945746-1870376.jpg&fm=jpg" alt="Change"
            style={{width: width, height: height, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}        
        />

        <div
          style={{display: 'flex', gap: '10px', marginTop: '20px'}}
        >
          <button 
              style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none'}}
              onClick={() => setWidth(width + 5)}
              >
                  row+1
          </button>
          <button 
              style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none'}}
              onClick={() => setWidth(width - 5)}
              >
              row-1
          </button>
          <button 
              style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none'}}
              onClick={() => setHeight(height + 5)}
              >
                    col+1
          </button>
          <button 
              style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none'}}
              onClick={() => setHeight(height - 5)}
              >
                col-1
          </button>
        </div>
    </div>
  )
}

export default Change