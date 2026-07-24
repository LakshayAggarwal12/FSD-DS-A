import React from 'react'

const Book = () => {
  return (
    <div>
        <div style={{border: '2px solid gray', backgroundColor: 'brown', display:'flex', flexDirection:'column', height:'300px', width: '300px', display:'flex', alignItems:'center', flexDirection:'column', padding:'10px'}}>
            <h2>Book-1</h2>
            <br />
            <img src="https://images.pexels.com/photos/115655/pexels-photo-115655.jpeg?cs=srgb&dl=pexels-lee-campbell-18167-115655.jpg&fm=jpg" alt="" 
            height={'150px'} width={'150px'}
            />
            <br />
            <br />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, corporis.</p>
        </div>
    </div>
  )
}

export default Book