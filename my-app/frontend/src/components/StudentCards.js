import React from 'react';
import './Cards.css';
import CardItem from './CardItem';


function StudentCards() {
  return (
    <div className='cards'>
      <img src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/logo.jpeg')} alt='logo image' height={100} width={100} />
      <h2>Welcome Back!</h2>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          
          <ul className='cards__items'>
            <CardItem
              src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/classroom.jpg')}
              text='My courses'
              path='/courses'
            />
            <CardItem
              src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/bulletinboard.jpeg')}
              text='Notifications'
              
              path='/announcement'
            />
            <CardItem
              src={require('/Users/alyssaingerson/Documents/GitHub/TheLearningLab/my-app/frontend/src/profilepic.png')}
              text='My Profile'
              
              path='/signup'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StudentCards;