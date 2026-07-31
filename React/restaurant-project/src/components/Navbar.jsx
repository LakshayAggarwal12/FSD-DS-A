import React from 'react'

const Navbar = () => {
  return (
    <div style={{display: 'flex', gap:'500px', backgroundColor:'olive'}}>
        <div style={{border:'50%'}}>
            <img src="https://png.pngtree.com/png-clipart/20250729/original/pngtree-elegant-restaurant-logo-design-with-cutlery-and-star-accents-png-image_21509145.png" alt="" 
            height={'50px'} width={'50px'} 
            />
        </div>

        <div>
            <h1>Welcome to our Hotel</h1>
        </div>
    </div>
  )
}

export default Navbar