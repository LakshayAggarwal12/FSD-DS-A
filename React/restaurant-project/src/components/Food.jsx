import React from 'react'

const Food = (props) => {
  return (
    <div>
        <div style={{width: "300px",border: "2px solid brown",display: "flex",flexDirection: "column"}}>
            <img src={props.food.image} alt="" style={{ width: "100%",height: "220px", objectFit: "cover"}}/>
            <div style={{backgroundColor: "brown",color: "black",display: "flex",justifyContent: "space-between",alignItems: "center",padding: "15px"}}>
                <h3 style={{margin: 0,whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}>{props.food.name}</h3>
                <h4 style={{margin: 0,fontSize: "24px",}}>Price: {props.food.price}</h4>
            </div>

            <div style={{display:'flex'}}>
                <button style={{flex:1, height:'60px'}}>Buy</button>
                <button style={{flex:1, height:'60px'}}>Add</button>
            </div>
        </div>
    </div>
  )
}

export default Food