import React from 'react'
import './App.css'
import Login from './components/pages/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import SignUp from './components/pages/SignUp'
import TeacherHome from './components/pages/TeacherHome'
import StudentHome from './components/pages/StudentHome'
import Courses from './components/pages/Courses'
import Announcement from './components/pages/Announcement'
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {  
  return (
    <BrowserRouter>      
      <Navbar/>  
      <Routes>            
        <Route path='/' element={<Login />}/>            
        <Route path='/signup' element={<SignUp />}></Route>            
        <Route path='/teacherhome' element={<TeacherHome />}></Route>
        <Route path='/studenthome' element={<StudentHome />}></Route>
        <Route path='/courses' element={<Courses />}></Route>
        <Route path='/announcement' element={<Announcement />}></Route>      
      </Routes>  
      <Footer/>  
    </BrowserRouter>  
  )
}
export default App;
