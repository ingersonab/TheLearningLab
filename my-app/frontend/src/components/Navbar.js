import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () =>{
    try{
      await axios.post('http://localhost:8081/logout');
      sessionStorage.clear(); //clear session storage
      navigate('/login'); //once logged out, redirect to login page
    }catch(err){
      console.error('Unsuccessful logout:', err);
    }
  }

  const [click, setClick] = useState(false);
  const isAuthenticated = !!sessionStorage.getItem('userType');
  //const [buttonVisible, setButtonVisible] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
 
  //const [buttonText, setButtonText] = useState('SIGN UP');

  //console.log(isAuthenticated);


 /* const showButton = () => {
    if (window.innerWidth <= 960) {
      setButtonVisible(true);
    } else {
      setButtonVisible(!!isAuthenticated);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);*/

  /*useEffect(() => {
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButtonVisible(true);
      } else {
        setButtonVisible(!!isAuthenticated);
      }
      console.log("button visible: ", buttonVisible);
    };

    showButton();

    window.addEventListener('resize', showButton);

    return () => {
      window.removeEventListener('resize', showButton);
    };
  }, [isAuthenticated]);*/

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to={isAuthenticated ? (isAuthenticated === 'student' ? '/studenthome' : '/teacherhome') : '/'} className='navbar-logo' onClick={closeMobileMenu}>
          <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo2.jpg')} alt='logo image' height={80} width={80} />
            The Learning Lab
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Courses
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Students
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/about'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>

            <li>
            <Link
              to={isAuthenticated ? (isAuthenticated === 'student' ? '/studenthome' : '/teacherhome') : '/login'}
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              
            </Link>
          </li>
          
        </ul>
        {isAuthenticated &&(
          <Button buttonStyle='btn--outline' buttonText='LOG OUT' onClick={handleLogout}/>
        )}
        </div>
      </nav>
      
    </>
  );
}

export default Navbar;
