import React from 'react'

const Student = () => {
  return (
    <div style={{border:'2px solid red', height:'300px', width:'300px', display:'flex', flexDirection:'column', alignItems:'center', gap:'20px', backgroundColor:'olive'}}>
        <h2>Student Info</h2>
        <img src="https://cdn.pixabay.com/photo/2024/03/19/15/23/boy-8643450_1280.png" alt="" height={'150'} width={'150'} backgroundColor={'white'}/>
        <h3>Student Name: LA</h3>
        <h4>Btech(DS-A)</h4>
    </div>
  )
}

export default Student