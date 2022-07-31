import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

const setActive = ({ isActive }) => isActive
  ? 'navigation__link_active'
  : 'navigation__link';

const Navigation = () => {
  return (
    <nav className='navigation'>
      <NavLink
        to='/movies'
        className={setActive}>
        Фильмы
      </NavLink>
      <NavLink
        to='/saved-movies'
        className={setActive}>
        Сохранённые фильмы
      </NavLink>
    </nav>
  )
}

export default Navigation