import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import '../Cards.css';
import CardItem from '../CardItem';
import Footer from '../Footer';
import RandomColorCardItem from '../RandomColorCardItem';

function TeacherHome() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  //const API_BASE_URL = 'http://LearningLabServer-dev.us-east-1.elasticbeanstalk.com';
  const API_BASE_URL = 'http://localhost:8081';

  axios.defaults.withCredentials = true;
  useEffect(()=> {
    axios.get(`${API_BASE_URL}/teacherhome`)
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
          <img src={require('../../logo.jpeg')} alt='logo image' height={100} width={100} />
          <h2>Welcome Back {name}!</h2>
          <hr style={{ color: 'gray', backgroundColor: 'gray', height: 1 }} />
        </div>
        <div className='cards__container'>
          <div className='cards__wrapper'>
          
            <ul className='cards__items'>
              <RandomColorCardItem
                text='My Courses'
                path='/teachercoursehome'
              />
              <RandomColorCardItem
                text='Send Announcement'
                path='/announcement'
              />
              <RandomColorCardItem
                text='View Scoreboard'
                path='/scoreboard'
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
