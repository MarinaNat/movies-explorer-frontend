import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderLanding.css';
import '../Header.css';
import Logo from '../../../Logo/Logo';

const HeaderLanding = () => {
  return (
    <header className='header header_landing'>
        <>
        <Link to='/' className='logo__header'>
            <Logo />
        </Link>
        <div className="header__links">
            <Link to='signup' className='header__link header__link_reg link'>
            Регистрация
            </Link>
            <Link to='signin' className='header__link header__link_enter link'>
            Войти
            </Link>
        </div>
        </>
    </header>
  )
}

export default HeaderLanding