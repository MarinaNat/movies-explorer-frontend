import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';
// import Preloader from "../Preloader/Preloader";

const SavedMovies = () => {
  return (
    <main className='saved-movies'>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
    </main>
  )
}

export default SavedMovies