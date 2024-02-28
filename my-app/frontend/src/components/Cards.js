import React from 'react';
import './Cards.css';
import CardItem from './CardItem';


function Cards() {
  return (
    <div className='cards'>
      <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo.jpeg')} alt='logo image' height={100} width={100} />
      <h2>Welcome Back!</h2>
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

export default Cards;
