import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../Logo/Logo';
import '../Header.css';
import './HeaderMain.css';
import Navigation from '../../Navigation/Navigation';
import { NavLink } from 'react-router-dom';

const setActive = ({ isActive }) => isActive
    ? 'header__profile-link_active'
    : 'header__profile-link';

const HeaderMain = ({ handleOpenMenu }) => {
    return (
        <header className='header header_main'>
            <Link to='/' className='logo__header'>
                <Logo />
            </Link>
            <div className="header__navigation">
                <Navigation />
                <NavLink to='/profile' className={setActive}>
                    <p className='header__profile-link_text'>Аккаунт</p>
                    <div className='header__profile-link_icon'></div>
                </NavLink>
            </div>
            <button
                onClick={handleOpenMenu}
                className="header__nav-button link"
            ></button>
        </header>
    )
}

export default HeaderMain