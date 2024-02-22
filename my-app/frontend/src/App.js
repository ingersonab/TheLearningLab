import React from 'react'
import Login from './components/pages/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import SignUp from './components/pages/SignUp'
import Home from './components/pages/Home'
import Footer from './components/Footer';

function App() {  
  return (
    <BrowserRouter>      
      <Navbar/>  
      <Routes>            
        <Route path='/' element={<Login />}/>            
        <Route path='/signup' element={<SignUp />}></Route>            
        <Route path='/home' element={<Home />}></Route>        
      </Routes>  
      <Footer/>  
    </BrowserRouter>  
  )
}
export default App;
