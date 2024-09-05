import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Create from './Components/Create';
import Read from './Components/Read';
import ShowProduct from './Components/ShowProduct';
import EditProduct from './Components/EditProduct';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route exact path='/add' element={<Create/>}/>
        <Route exact path='/' element={<Read/>}/>
        <Route exact path="/product/:id" element={<ShowProduct />}/>
        <Route exact path="/edit/:id" element={<EditProduct/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
