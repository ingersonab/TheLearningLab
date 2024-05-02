import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import '../Cards.css';
import CardItem from '../CardItem';
import Footer from '../Footer';

function StudentHome() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  useEffect(()=> {
    axios.get('http://localhost:8081/studenthome')
    .then(res => {
      if(res.data.valid){
        setName(res.data.name);
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
              text='My courses'
              path='/studentcoursehome'
            />
            <CardItem
              src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/bulletinboard.jpeg')}
              text='Notifications'
              
              path='/announcement'
            />
            <CardItem
              src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/profilepic.png')}
              text='My Profile'
              
              path='/profile'
            />
          </ul>
        </div>
      </div>
      <Footer/>
    </div>
    </div>
  );
}

export default StudentHome;