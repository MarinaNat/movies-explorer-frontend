import React from 'react';
import './MoviesCard.css';
import screenshot from '../../../images/movies/1.jpg'


const MoviesCard = () => {
  return (
    <li className='movie-card'>
      <div className='movie-card__info'>
        <div className='movie-card__text'>
          <h2 className='movie-card__title'>33 слова о дизайне</h2>
          <p className='movie-card__duration'>1ч 47м</p>
        </div>
        <button className='movie-card__icon movie-card__save link_button'></button>
        {/* <button className="icon movie-card__unsave link_button"></button> */}
        {/* <button className="icon movie-card__delete link_button"></button> */}
      </div>
      <img
        className='movie-card__img'
        alt='Превью фильма'
        src={screenshot}
      />
    </li>
  )
}

export default MoviesCard