import React,  { useState, useEffect } from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import SearchForm from '../SearchForm/SearchForm.js';
import mainApi from '../../../utils/MainApi';
import filterMovies from '../../../utils/filterMovies';

const SavedMovies = ({movies, setSavedMovies}) => {
  const [search, setSearch] = useState({query: '', isShort: false});
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [error, setError] = useState('');

  const handleDeleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const newSavedMovies = movies.filter((item) => item._id !== movieId);
        const newFilteredMovies = filteredMovies.filter(
          (item) => item._id !== movieId
        );
        setSavedMovies(newSavedMovies);
        setFilteredMovies(newFilteredMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      })
      .catch((err) => console.log(err));
  };

  const searchInSavedMovies = (search) => {
    if (movies.length) {
      const filteredMovies = filterMovies(movies, search);
      setFilteredMovies(filteredMovies);
      if (filteredMovies.length === 0) {
        setError('Ничего не найдено');
      } else setError('');
    }
    setSearch(search);
  };


  useEffect(() => {
    if (movies.length) {
      const filteredMovies = filterMovies(movies, search);
      setFilteredMovies(filteredMovies);
      if (filteredMovies.length === 0) {
        setError('Ничего не найдено');
      } else setError('');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies, search.query, search.isShort]);

  return (
    <main className='saved-movies'>
      <SearchForm 
      search={search}
      handleSearch={searchInSavedMovies}
      setSearch={setSearch}
      />
      {error && <p className="saved-movies__error">{error}</p>}
      <MoviesCardList 
      movies={filteredMovies}
      savedMovies={filteredMovies}
      onDeleteMovie={handleDeleteMovie}/>
    </main>
  )
}

export default SavedMovies