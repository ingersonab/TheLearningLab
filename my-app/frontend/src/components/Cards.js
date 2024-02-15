import React from 'react';
import './Cards.css';
import CardItem from './CardItem';


function Cards() {
  return (
    <div className='cards'>
      <img src={require('/Users/alyssaingerson/Desktop/react-website-v1/my-app/frontend/src/logo.jpeg')} alt='logo image' height={100} width={100} />
      <div className='cards__container'>
        <div className='cards__wrapper'>
          
          <ul className='cards__items'>
            <CardItem
              src='classroom.jpg'
              text='Create Course'
              path='/services'
            />
            <CardItem
              src=''
              text='Send Announcement'
              
              path='/products'
            />
            <CardItem
              src=''
              text='View Scoreboard'
              
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
