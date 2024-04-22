import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import '../Cards.css';
import CardItem from '../CardItem';
import Footer from '../Footer';

function TeacherHome() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  useEffect(()=> {
    axios.get('http://localhost:8081/teacherhome')
    .then(res => {
      if(res.data.valid){
        setName(res.data.name);
        console.log('session name:', name);
      }else{
        navigate('/login')
      }
    })
    .catch(err => console.log(err))
  }, [])
  return (
    <div className='home-container'>
      <div className='cards'>
        <div className='header-container'>
          <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo.jpeg')} alt='logo image' height={100} width={100} />
          <h2>Welcome Back {name}!</h2>
          <hr style={{ color: 'gray', backgroundColor: 'gray', height: 1 }} />
        </div>
        <div className='cards__container'>
          <div className='cards__wrapper'>
          
            <ul className='cards__items'>
              <CardItem
                src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/classroom.jpg')}
                text='My Courses'
                path='/teachercoursehome'
              />
              <CardItem
                src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/megaphone.jpeg')}
                text='Send Announcement'
                path='/announcement'
              />
              <CardItem
                src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/scoreboard.jpeg')}
                text='View Scoreboard'
                path='/signup'
              />
            </ul>
          </div>
        </div>
        <div className='footer'>
          <Footer/>
        </div>
      </div>
    </div>
  );
}

export default TeacherHome;
