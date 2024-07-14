import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../App.css';
import '../Cards.css';
import CardItem from '../CardItem';
import RandomColorCardItem from '../RandomColorCardItem';
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
        <img src={require('../../logo.jpeg')} alt='logo image' height={100} width={100} />
        <h2>Welcome Back {name}!</h2>
        <hr style={{ color: 'gray', backgroundColor: 'gray', height: 1 }} />
      </div>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          
          <ul className='cards__items'>
            <RandomColorCardItem
              text='My courses'
              path='/studentcoursehome'
            />
            <RandomColorCardItem
              text='Notifications'
              path='/announcement'
            />
            <RandomColorCardItem
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