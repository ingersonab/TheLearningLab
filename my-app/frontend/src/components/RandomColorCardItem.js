import React from 'react';
import { Link } from 'react-router-dom';

function RandomColorCardItem({ text, path }) {
    // Function to generate a random color
    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    // Random color for the image area
    const imageColor = getRandomColor();
  
    return (
      <li className='cards__item'>
        <Link className='cards__item__link' to={path}>
          <div
            className='cards__item__pic-wrap'
            style={{ backgroundColor: imageColor }}
          >
          </div>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{text}</h5>
          </div>
        </Link>
      </li>
    );
  }
  
  export default RandomColorCardItem;