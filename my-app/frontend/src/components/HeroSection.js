import React from 'react';
import {useNavigate} from "react-router-dom";
import '../App.css';
import './HeroSection.css';

function HeroSection() {

  let navigate = useNavigate();

  const routeChange = () =>{
    navigate('/signup');
  }

  return (
    <div className='hero-container' style={{backgroundImage: `url(${require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/kimberly-farmer-lUaaKCUANVI-unsplash.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="logo-container">
        <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo.jpeg')} alt='logo image' height={200} width={200} />
      </div>
      <div className="text-container">
        <h1>The Learning Lab</h1>
        <p>Gamified learning made easy.</p>
      </div>
      <div className='hero-btns'>
        <button className="px-4" style={{ fontSize: '20px', padding: '12px 24px' }} onClick={routeChange}>SIGN UP</button>
      </div>
    </div>
  );
}

export default HeroSection;
