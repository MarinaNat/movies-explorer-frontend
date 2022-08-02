import React from 'react';
import './Header.css';
import { useRoutes } from 'react-router-dom';
import '../../../index.css';
import HeaderLanding from './HeaderLanding/HeaderLanding';
import HeaderMain from './HeaderMain/HeaderMain';

const Header = ({  handleShowMenu }) => {
  return useRoutes([
    { path: '/', element: <HeaderLanding /> },
    { path: '/movies', element: <HeaderMain handleOpenMenu={handleShowMenu} /> },
    { path: '/saved-movies', element: <HeaderMain handleOpenMenu={handleShowMenu} /> },
    { path: '/profile', element: <HeaderMain handleOpenMenu={handleShowMenu} /> },
  ]
  )
}

export default Header