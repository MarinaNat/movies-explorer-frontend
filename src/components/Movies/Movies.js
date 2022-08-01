import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';

const Movies = () => {
  return (
  <main className='movies'>
<SearchForm />
<MoviesCardList />
<button className='link_button movies__more-button'>Ещё</button>
  </main>  
)
}

export default Movies