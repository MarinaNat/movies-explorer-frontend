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
import { getErrMessage } from '../../utils/getErrMessage';
import ProtectedRoute from '../ProtectedRoute';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import unionOk from "../../images/unionOk.svg";
import unionFalse from "../../images/unionFalse.svg";
// import {
//   BASIC_ERROR_MESSAGE,
//   EDIT_PROFILE_ERROR_404_MESSAGE,
//   EDIT_PROFILE_MESSAGE,
//   SHORT_MOVIE_DURATION
// } from "../../const/errMessages";

const App = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [currentUser, setCurrentUser] = useState({});
  const [isMenuOpened, setMenuOpened] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // стэйт пользователя — вошёл он в систему или нет
  const [isLoading, setIsLoading] = useState(false);
  // const [GlobalLoading, setGlobalLoading] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);
  // const [searchedMovies, setSearchedMovies] = useState([]);
  const [isTooltipOpened, setIsTooltipOpened] = React.useState(false);
  const [tooltipData, setTooltipData] = useState({ img: "", title: "" });
  // const [email, setEmail] = useState("");

  const toggleMenu = () => {
    setMenuOpened(!isMenuOpened);
  };

  //регистрация пользователя
  function handleRegister(name, email, password) {
    mainApi.register(name, email, password)
      .then((res) => {
        if (res._id) {
          setTooltipData({
            img: unionOk,
            title: "Вы успешно зарегистрировались!",
          });
          handleLogin(email, password);
          setCurrentUser(res);
          setIsLoggedIn(true);
          navigate('/movies')
        }
      })
      .catch(() => {
        setTooltipData({
          img: unionFalse,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        handleInfoTooltip();
        // setError(getErrMessage(err));
        // console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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


//получение информации о пользоватале
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

//получение сохраненных фильмов
useEffect(() => {
  if (isLoggedIn) {
    mainApi.getMovies()
      .then((data) => {
        setSavedMovies(data);
      })
      .catch(err => {
        console.log(err)
      })
  }
}, [isLoggedIn]);

//сохранение фильма
function handleSavedMovies(movie) {
  mainApi.addMovies(movie)
    .then(newMovie => {
      setSavedMovies([newMovie, ...savedMovies])
    })
    .catch((err) => {
      setError(getErrMessage(err));
      console.log(err);
    })
    .finally(() => setIsLoading(false))
}

//удаление фильма
function handleDeleteMovie(movie) {
  const savedMovie = savedMovies.find((item) => {
    if (item.movieId === movie.id || item.movieId === movie.movieId) {
      return item
    } else {
      return savedMovies
    }
  })
  mainApi
    .deleteMovies(savedMovie._id)
    .then(() => {
      const newMovies = savedMovies.filter((mov) => {
        if (movie.id === mov.movieId || movie.movieId === mov.movieId) {
          return false
        } else {
          return true
        }
      })
      setSavedMovies(newMovies);
    })
    .catch((err) => {
      setError(getErrMessage(err));
      console.log(err);
    })
    .finally(() => setIsLoading(false))
}

//открытие попапа с информацией
function handleInfoTooltip() {
  setIsTooltipOpened(true);
}

//закрытие попапа с информацией
function closeInfoTooltip() {
  setIsTooltipOpened(false);
}

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
                  savedMovies={savedMovies}
                  onSaveClick={handleSavedMovies}
                  onDeleteClick={handleDeleteMovie}
                  isLoading={isLoading}
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
                  savedMovies={savedMovies}
                  onDeleteClick={handleDeleteMovie}
                  isLoading={isLoading}
                  error={error}
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