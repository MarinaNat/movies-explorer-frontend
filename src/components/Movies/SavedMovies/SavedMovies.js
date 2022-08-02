import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';

const SavedMovies = () => {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList />
    </main>
  )
}

export default SavedMovies