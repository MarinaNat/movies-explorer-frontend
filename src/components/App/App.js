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
import unionFalse from "../../images/unionFalse.svg";
import filterMovies from '../../utils/filterMovies';
import unionOk from '../../images/ok.svg';

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
  const [success, setSuccess] = useState('');

  const toggleMenu = () => {
    setMenuOpened(!isMenuOpened);
  };

  React.useEffect(() => {
    console.log('getUserInfo()');
    console.log(getUserInfo());
    getUserInfo();
  }, []);

  // проверка авторизации пользователя
  function getUserInfo() {
    mainApi
      .getUserInfo()
      .then((res) => {
        console.log('res in getUserInfo')
        console.log(res)
        if (res) {
          setCurrentUser(res);
          console.log('setCurrentUser in getUserInfo:', setCurrentUser(res))
          setIsLoggedIn(true);
          navigate("/movies");
          pathname === "/signin" || pathname === "/signup"
            ? navigate("/movies")
            : navigate(pathname);
        }
      })
      .catch(err => {
        console.log('Авторизуйтесь', err);
        setIsLoggedIn(false);
      })
  };

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


  //регистрация пользователя
  function handleRegister(data) {
    setIsLoading(true);
    mainApi.register(data)
      .then((res) => {
        handleLogin(data)
      })
      .catch(() => {
        setTooltipData({
          img: unionFalse,
          title: "Пользователь с таким email существует.",
        });
        handleInfoTooltip();
      })
      .finally(() => setIsLoading(false))
  };

  //авторизация пользователя
  function handleLogin(values) {
    console.log('data in handleLogin: ')
    console.log(values)
    setIsLoading(true);
    mainApi
      .login(values)
      .then((res) => {
        setCurrentUser(res);
        console.log('res.token in handleLogin: ')
        console.log(res.token)
        console.log('res in handleLogin: ')
        console.log(res)
        // if (res.token) {
          localStorage.setItem('token', res.token);
          setIsLoggedIn(true);
          navigate('/movies')
        // }
      })
      .catch(() => {
        setTooltipData({
          img: unionFalse,
          title: 'Неправильный E-mail или пароль',
        });
        handleInfoTooltip()
      })
      .finally(() => setIsLoading(false))
  }

  //выход пользователя из аккаунта
  const handleSignOut = () => {
    setCurrentUser({});
    setSavedMovies([]);
    setSearchedMovies([]);
    setIsLoggedIn(false);
    localStorage.clear();
    navigate('/');
  }


  //редактирование информации о пользователе
  function handleEditProfile(values) {
    setIsLoading(true)
    console.log('values in handleEditProfile: ', values)
    mainApi.updateUserInfo(values)
      .then(res => {
        setCurrentUser(res)
        setTooltipData({
          img: unionOk,
          title: 'Данные изменены!',
        });
        handleInfoTooltip()
      })
      .catch(err => {
        setSuccess('');
        console.log(err)
      })
      .finally(() => setIsLoading(false));
  }

  //открытие попапа с информацией
  function handleInfoTooltip() {
    setIsTooltipOpened(true);
  }

  //закрытие попапа с информацией
  function closeInfoTooltip() {
    setIsTooltipOpened(false);
  }


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
    <CurrentUserContext.Provider value={ currentUser }>
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
                    handleEditProfile={handleEditProfile}
                    success={success}
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