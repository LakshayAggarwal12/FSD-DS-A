import React from 'react'
import Food from './Food'

const Menu = () => {

  const foods = [
  {
    id: 1,
    name: "Burger",
    price: 50,
    image: "https://picsum.photos/id/1080/300/220"
  },
  {
    id: 2,
    name: "Pizza",
    price: 299,
    image: "https://picsum.photos/id/292/300/220"
  },
  {
    id: 3,
    name: "Pasta",
    price: 220,
    image: "https://picsum.photos/id/431/300/220"
  },
  {
    id: 4,
    name: "French Fries",
    price: 99,
    image: "https://picsum.photos/id/488/300/220"
  },
  {
    id: 5,
    name: "Sandwich",
    price: 120,
    image: "https://picsum.photos/id/312/300/220"
  },
  {
    id: 6,
    name: "Biryani",
    price: 280,
    image: "https://picsum.photos/id/425/300/220"
  },
  {
    id: 7,
    name: "Paneer Tikka",
    price: 240,
    image: "https://picsum.photos/id/429/300/220"
  },
  {
    id: 8,
    name: "Ice Cream",
    price: 80,
    image: "https://picsum.photos/id/1060/300/220"
  },
  {
    id: 9,
    name: "Chocolate Cake",
    price: 180,
    image: "https://picsum.photos/id/835/300/220"
  },
  {
    id: 10,
    name: "Momos",
    price: 150,
    image: "https://picsum.photos/id/493/300/220"
  }
  ];  

  return (
    <div style={{backgroundColor: "#FFF8E7"}}>
        <div style={{width: "90%",margin: "0 auto", backgroundColor: "#f5f5dc", padding: "30px", borderRadius: "15px",boxShadow: "0 0 10px rgba(0,0,0,0.2)"}}>
        <div>
            <h1 style={{textAlign: "center", paddingBottom:'10px'}}>Our Menu !</h1>
        </div>

        <div style={{display: "flex",flexWrap: "wrap", gap: "20px", justifyContent: "center"}}>
            {foods.map((food) => (
                <Food key={food.id} food={food} />
            ))}
        </div>
     </div>
          <div style={{fontSize: '48px', color:'maroon', paddingLeft:'35vh', height:'100px'}}>
            <h2>This Hotel is good for food</h2>
          </div>
    </div>
  )
}

export default Menu