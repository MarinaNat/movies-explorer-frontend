import React from 'react';
import './NavigationSidebar.css';
import { Link, NavLink } from 'react-router-dom';

const NavigationSidebar = ({ isMenuOpened, handleOpenMenu }) => {
    return (
        isMenuOpened && (
            <section className='nav-sidebar'>
                <div className='nav-sidebar__sidebar'>
                    <div className='nav-sidebar__sidebar-wrapper'>
                        <button
                            onClick={handleOpenMenu}
                            className='nav-sidebar__button-exit link'
                        ></button>
                        <nav className='nav-sidebar__navigation'>
                            <NavLink
                                onClick={handleOpenMenu}
                                to='/'
                                className={({ isActive }) =>
                                    isActive ? 'nav-sidebar__link nav-sidebar__link-active' : 'nav-sidebar__link link'
                                }
                            >Главная
                            </NavLink>
                            <NavLink
                                onClick={handleOpenMenu}
                                to='/movies'
                                className={({ isActive }) =>
                                    isActive ? 'nav-sidebar__link nav-sidebar__link-active' : 'nav-sidebar__link link'
                                }
                            >
                                Фильмы
                            </NavLink>
                            <NavLink
                                onClick={handleOpenMenu}
                                to='/saved-movies'
                                className={({ isActive }) =>
                                    isActive ? 'nav-sidebar__link nav-sidebar__link-active' : 'nav-sidebar__link link'
                                }
                            >
                                Сохранённые фильмы
                            </NavLink>
                        </nav>
                    </div>
                    <Link
                    to='/profile'
                    className='profile-link link'
                    onClick={isMenuOpened}
                    >
                        <p className='profile-link__text'>Аккаунт</p>
                        <div className='profile-link__icon'></div>
                    </Link>
                </div>
            </section>
        ))
}

export default NavigationSidebar