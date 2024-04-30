import React, {useState, useEffect} from 'react'
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
import Profile from './components/pages/Profile'
import About from './components/pages/About'
import TeacherCourseHome from './components/pages/TeacherCourseHome'
import StudentCourseHome from './components/pages/StudentCourseHome'
import TeacherCoursePage from './components/pages/TeacherCoursePage'
import StudentCoursePage from './components/pages/StudentCoursePage'
import Game from './components/pages/Game'
import Scoreboard from './components/pages/Scoreboard'
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {  

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
        <Route path='/profile' element={<Profile />}></Route> 
        <Route path='/about' element={<About />}></Route>    
        <Route path='/teachercoursehome' element={<TeacherCourseHome />}></Route>
        <Route path='/studentcoursehome' element={<StudentCourseHome />}></Route>  
        <Route path='/teachercourse/:courseId' element={<TeacherCoursePage />}> </Route>
        <Route path='studentcourse/:courseId' element={<StudentCoursePage/>}></Route>
        <Route path='/triviagame/:gameId' element={<Game/>}></Route>
        <Route path='/scoreboard' element={<Scoreboard/>}></Route>
      </Routes> 
    </BrowserRouter>  
  )
}

export default App;
