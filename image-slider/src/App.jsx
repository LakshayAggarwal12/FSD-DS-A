import React from 'react'
import { useState } from 'react'

const App = () => {

  const [imageIndex, setImageIndex] = useState(0)

  const images = [
  {
    id: 1,
    title: "Mountain Landscape",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
  },
  {
    id: 2,
    title: "Ocean Waves",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
  },
  {
    id: 3,
    title: "Forest Path",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b"
  },
  {
    id: 4,
    title: "City Skyline",
    category: "Architecture",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390"
  },
  {
    id: 5,
    title: "Modern Architecture",
    category: "Architecture",
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625"
  },
  {
    id: 6,
    title: "Golden Sunset",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1472120435266-53107fd0c44a"
  },
  {
    id: 7,
    title: "Coffee Cup",
    category: "Food",
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
  },
  {
    id: 8,
    title: "Laptop Workspace",
    category: "Technology",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  },
  {
    id: 9,
    title: "White Flowers",
    category: "Flowers",
    url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946"
  },
  {
    id: 10,
    title: "Desert Dunes",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35"
  }
];

  const handleNext = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };


  return (
    <div>
      <h1 style={{textAlign: 'center', marginTop: '20px'}}>Image Slider</h1>

      <div style={{textAlign: 'center', margin: '20px'}}>
        <img src = {images[imageIndex].url} alt="slider" style={{width: '500px', height: '500px', objectFit: 'cover'}} />
      </div>

      <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
        <button
          onClick={handlePrevious}
          style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none', marginRight: '10px'}} onClick={handlePrevious}>
          Previous
        </button>

        <button 
          onClick={handleNext}
          style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', backgroundColor: '#007BFF', color: '#fff', border: 'none'}}>
          Next
        </button>
      </div>
    </div>
  )
}

export default App