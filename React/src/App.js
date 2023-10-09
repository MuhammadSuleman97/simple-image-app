
import React, { useState, useEffect } from 'react';
import './App.css'
import CardList from './components/card/card.component';
import { Routes, Route} from 'react-router-dom';
import NavBar from './components/navbar/navbar.component';
import UploadImage from './components/uplaod-image/upload-image.component';

function App() {

  const [images, setImages] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:4000/api/images')
      .then(res => res.json())
      .then(data => setImages(data.images))
      .catch(err => console.log(err));
  }, []);


  console.log('from main:',images)
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/"  element={<CardList images={images}/>} />
        <Route path="/upload-image" element={<UploadImage />} />
      </Routes>
    </div>
  );
}

export default App;
