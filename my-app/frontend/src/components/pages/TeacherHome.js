import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import '../Cards.css';
import CardItem from '../CardItem';

function TeacherHome() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  useEffect(()=> {
    axios.get('http://localhost:8081/teacherhome')
    .then(res => {
      if(res.data.valid){
        setName(res.data.name);
      }else{
        navigate('/')
      }
    })
    .catch(err => console.log(err))
  }, [])
  return (
    <div className='cards'>
      <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo.jpeg')} alt='logo image' height={100} width={100} />
      <h2>Welcome Back {name}!</h2>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          
          <ul className='cards__items'>
            <CardItem
              src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/classroom.jpg')}
              text='Create Course'
              path='/courses'
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
    </div>
  );
}

export default TeacherHome;
