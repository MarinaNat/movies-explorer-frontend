import React from 'react';
import './NavTab.css';

const NavTab = () => {
  return (
    <nav className='navtab'>
      <a href='#about-project' className='navtab__link'>О проекте</a>
      <a href='#tachs' className='navtab__link'>Технологии</a>
      <a href='#about-me' className='navtab__link'>Студент</a>
    </nav>
  )
}

export default NavTab