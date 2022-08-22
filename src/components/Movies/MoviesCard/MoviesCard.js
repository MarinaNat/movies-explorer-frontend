/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';


const MoviesCard = ({ movie, savedMovies, onDelete, onSave }) => {
  let location = useLocation();
  const [saved, setSaved] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const { _id } = useContext(CurrentUserContext);

  useEffect(() => {
    const isSaved = savedMovies.find((item) => item.movieId === movie.id);
    setSaved(isSaved);
  }, [movie, savedMovies]);

  const handleMovieCardClick = () => {
    window.open(movie.trailerLink, '_blank');
  };

  const handleSaveDeleteAction = (evt) => {
    evt.stopPropagation();
    if (saved) {
      const { _id } = savedMovies.find((item) => item.movieId === movie.id);
      onDelete(_id);
    } else {
      onSave(movie, _id);
      setSaved(true);
    }
  };

  const handleDelete = (evt) => {
    evt.stopPropagation();
    const { _id } = movie;
    onDelete(_id);
  };

  useEffect(() => {
    const src =
      location.pathname === '/saved-movies'
        ? movie.image
        : movie?.image?.url.includes('https://api.nomoreparties.co')
          ? movie.image
          : 'https://api.nomoreparties.co' + movie.image.url;
    setImgSrc(src);
  }, [movie]);

  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const min = duration % 60;
    return hours ? `${hours}ч ${min}м` : `${min}м`;
  };


  return (
    // <a href={card.trailerLink} target="_blank" rel="noreferrer" className='movie-card__link'>
    <li className='movie-card' onClick={handleMovieCardClick}>
      <div className='movie-card__info' id='card' name='card'>
        <div className='movie-card__text'>
          <h2 className='movie-card__title'>{movie.nameRU}</h2>
          <p className='movie-card__duration'>{formatDuration(movie.duration)}</p>
        </div>
        {location.pathname === '/movies' && (
          <button className={
            saved
              ? 'movie-card__icon movie-card__save link_button'
              : 'movie-card__icon movie-card__unsave link_button'
          }
            onClick={handleSaveDeleteAction}
          ></button>
        )}
        {location.pathname === '/saved-movies' && (
          <button
            className="movie-card__icon movie-card__delete link_button"
            onClick={handleDelete}
          ></button>
        )}
      </div>
        <img
          className='movie-card__img'
          alt={movie.nameRU}
          src={imgSrc}
        />

    </li>
    // </a>
  )
}

export default MoviesCard