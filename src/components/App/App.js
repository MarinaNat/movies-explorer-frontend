/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom';
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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
// import unionOk from "../../images/unionOk.svg";
import unionFalse from "../../images/unionFalse.svg";
import filterMovies from '../../utils/filterMovies';

const App = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [currentUser, setCurrentUser] = useState({});
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // стэйт пользователя — вошёл он в систему или нет
  const [isLoading, setIsLoading] = useState(false);
  const [isTooltipOpened, setIsTooltipOpened] = React.useState(false);
  const [tooltipData, setTooltipData] = useState({ img: "", title: "" });
  const [search, setSearch] = useState({ query: '', isShort: false });
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const toggleMenu = () => {
    setMenuOpened(!isMenuOpened);
  };

  //регистрация пользователя
  function handleRegister(name, email, password) {
    setIsLoading(true)
    mainApi.register(name, email, password)
      .then((res) => {
          // handleLogin(email, password);
          setCurrentUser(res);
          setIsLoggedIn(true);
          navigate('/movies');

      })
      .catch(() => {
        setTooltipData({
          img: unionFalse,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoTooltip();
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  // проверка авторизации пользователя
  function getUserInfo() {
    mainApi
      .getUserInfo()
      .then((res) => {
        const { name, email, _id } = res;
        setCurrentUser({ name, email, _id })
        setIsLoggedIn(true);
        navigate("/movies");
        pathname === "/signin" || pathname === "/signup"
          ? navigate("/movies")
          : navigate(pathname);
      })
      .catch(err => { console.log(err) })
  };

  //авторизация пользователя
  function handleLogin(email, password) {
    setIsLoading(true);
    mainApi
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          mainApi.getUserInfo(res.token)
            .then(() => {
              setIsLoggedIn(true);
              console.log('setCurrentUser:', setCurrentUser)
              navigate('/movies')
            });
        } else {
          setTooltipData({
            img: unionFalse,
            title: 'Неправильный E-mail или пароль',
          });
          handleInfoTooltip();
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }

  //выход пользователя из аккаунта
  const handleSignOut = () => {
    setCurrentUser({});
    setIsLoggedIn(false);
    localStorage.clear();
    navigate('/');
  }


  //редактирование информации о пользователе
  function handleUpdateUser(userData) {
    console.log('userData: ', userData)
    mainApi.updateUserInfo(userData)
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

   //открытие попапа с информацией
  function handleInfoTooltip() {
    setIsTooltipOpened(true);
  }

  //закрытие попапа с информацией
  function closeInfoTooltip() {
    setIsTooltipOpened(false);
  }

useEffect(() => {
  if (localStorage.getItem('savedMovies')) {
    setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
  } else {
    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem('savedMovies', JSON.stringify(res));
      })
      .catch((err) => console.log(err));
  }
}, [isLoggedIn]);

useEffect(() => {
  if (movies.length) {
    const filteredMovies = filterMovies(movies, search);
    setSearchedMovies(filteredMovies);
    localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
    if (filteredMovies.length === 0) {
      setError('Ничего не найдено');
    } else setError('');
  }
}, [movies, search.query, search.isShort]);

useEffect(() => {
  if (localStorage.getItem('searchedMovies')) {
    setSearchedMovies(JSON.parse(localStorage.getItem('searchedMovies')));
  }
  if (localStorage.getItem('search')) {
    setSearch(JSON.parse(localStorage.getItem('search')));
  }
}, []);

// movies
const searchMovies = (req) => {
  if (!movies.length) {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => {
        setError(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        );
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }
  setSearch(req);
  localStorage.setItem('search', JSON.stringify(req));
};

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header handleShowMenu={toggleMenu} isLoggedIn={isLoggedIn} />
        <main className='page-content'>
          <NavigationSidebar handleOpenMenu={toggleMenu} isMenuOpened={isMenuOpened} />
          <Routes>
            <Route
              index
              // path=''
              element={<Main />}
            />
            <Route
              path='movies'
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Movies
                    isLoading={isLoading}
                    searchedMovies={searchedMovies}
                    search={search}
                    setSearch={setSearch}
                    searchMovies={searchMovies}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                    error={error}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='saved-movies'
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedMovies
                    movies={savedMovies}
                    setSavedMovies={setSavedMovies}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='profile'
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    isLoading={isLoading}
                    setError={setError}
                    error={error}
                    onSignOut={handleSignOut}
                    onEditProfile={handleUpdateUser}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path='signin'
              element={<Login
                isLoading={isLoading}
                onLogin={handleLogin}
                error={error}
                setError={setError}
              />}
            />
            <Route
              path='signup'
              element={
                <Register
                  isLoading={isLoading}
                  onRegister={handleRegister}
                  error={error}
                  setError={setError}
                />}
            />
            <Route
              path='*'
              element={<NotFound />}
            />
          </Routes>
        </main>
        <Footer />
        <InfoTooltip
          name="InfoTooltip"
          onClose={closeInfoTooltip}
          isOpen={isTooltipOpened}
          title={tooltipData.title}
          img={tooltipData.img}
        />
      </div>
    </CurrentUserContext.Provider >
  );
};

export default App