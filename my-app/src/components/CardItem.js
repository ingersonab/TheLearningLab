import React from 'react';
import { Link } from 'react-router-dom';
import './CardItem.css'

function CardItem({title, imageUrl, body}) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={imageUrl}>
          <figure className='cards__item__pic-wrap' data-category={title}>
            <img
              className='image-container'
              alt='Classroom Image'
              src={imageUrl}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{body}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;