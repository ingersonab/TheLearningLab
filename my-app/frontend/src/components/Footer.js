import React from 'react';
import './Footer.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

function Footer() {
  const myStyle = {
    marginTop: "3000px"

  }
  return (
    <div className='footer-container'>
    
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
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
