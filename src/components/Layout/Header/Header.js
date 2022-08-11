import React from 'react';
import './Header.css';
import { useRoutes } from 'react-router-dom';
import '../../../index.css';
import HeaderLanding from './HeaderLanding/HeaderLanding';
import HeaderMain from './HeaderMain/HeaderMain';

const Header = ({  handleShowMenu, isLoggedIn }) => {
  return useRoutes([
    { path: '/', element: isLoggedIn ? <HeaderMain handleOpenMenu={handleShowMenu}/> : <HeaderLanding /> },
    { path: '/movies', element: <HeaderMain handleOpenMenu={handleShowMenu} /> },
    { path: '/saved-movies', element: <HeaderMain handleOpenMenu={handleShowMenu} /> },
    { path: '/profile', element: <HeaderMain handleOpenMenu={handleShowMenu} /> },
  ]
  )
}

export default Header