import React, {useState} from 'react'
import './App.css'
import Homepage from './components/pages/Homepage'
import Login from './components/pages/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import SignUp from './components/pages/SignUp'
import TeacherHome from './components/pages/TeacherHome'
import StudentHome from './components/pages/StudentHome'
import Courses from './components/pages/Courses'
import Announcement from './components/pages/Announcement'
import About from './components/pages/About'
import CourseHome from './components/pages/CourseHome'
import CoursePage from './components/pages/CoursePage'
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {  

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  return (
    <BrowserRouter>  
      <Navbar/>     
      <Routes>      
        <Route path='/' element={<Homepage />}></Route>       
        <Route path='/login' element={<Login />}></Route>            
        <Route path='/signup' element={<SignUp />}></Route>            
        <Route path='/teacherhome' element={<TeacherHome />}></Route>
        <Route path='/studenthome' element={<StudentHome />}></Route>
        <Route path='/courses' element={<Courses />}></Route>
        <Route path='/announcement' element={<Announcement />}></Route> 
        <Route path='/about' element={<About />}></Route>    
        <Route path='/coursehome' element={<CourseHome />}></Route>  
        <Route path="/course/:courseId" element={<CoursePage />}></Route>
      </Routes> 
      <Footer/> 
    </BrowserRouter>  
  )
}
export default App;
