import React from 'react';
import './Header.css';
import { useRoutes } from 'react-router-dom';
import '../../../index.css';
import HeaderLanding from './HeaderLanding/HeaderLanding';
import HeaderMain from './HeaderMain/HeaderMain';

const Header = () => {
  return useRoutes([
    { path: '/', element: <HeaderLanding /> },
    { path: '/movies', element: <HeaderMain /> },
    { path: '/saved-movies', element: <HeaderMain /> },
    { path: '/profile', element: <HeaderMain /> },
  ]
  )
}

export default Header