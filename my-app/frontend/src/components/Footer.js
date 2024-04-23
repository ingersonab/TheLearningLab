import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  
  return (
    <div className='footer-container'>
    
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
          <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo2.jpg')} alt='logo image' height={80} width={80}></img>
            <Link to='/' className='social-logo'>
              The Learning Lab
            </Link>
          </div>
          <small className='website-rights'>TheLearningLab © 2023</small>
          
        </div>
      </section>
    </div>
  );
}

export default Footer;
