// import { useState } from 'react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import ProtectedRoute from '../ProtectedRoute';
import './App.css';
import Header from '../Layout/Header/Header.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../Movies/SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Login from '../Profile/Login/Login.js';
import Register from '../Profile/Register/Register.js';
import Footer from '../Layout/Footer/Footer.js';
import NotFound from '../NotFound/NotFound.js';
import NavigationSidebar from '../Layout/Navigation/NavigationSidebar/NavigationSidebar.js';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const App = () => {
  const [isMenuOpened, setMenuOpened] = React.useState(false);
  const toggleMenu = () => {
    setMenuOpened(!isMenuOpened);
  };

  return (
    <div className="page">
      <Header handleShowMenu={toggleMenu} />
      {/* <main className='page-content'> */}
        <NavigationSidebar handleOpenMenu={toggleMenu} isMenuOpened={isMenuOpened} />
        <Routes>
          <Route
            path='/'
            element={<Main />}
          ></Route>
          <Route
            path='/movies'
            element={<Movies />}
          ></Route>
          <Route
            path='/saved-movies'
            element={<SavedMovies />}
          ></Route>
          <Route
            path='/profile'
            element={<Profile />}
          ></Route>
          <Route
            path='/signin'
            element={<Login />}
          ></Route>
          <Route
            path='/signup'
            element={<Register />}
          ></Route>
          <Route
            path='/*'
            element={<NotFound />}
          ></Route>
        </Routes>
      {/* </main> */}

      <Footer />
    </div>
  )
}

export default App