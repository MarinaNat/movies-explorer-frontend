import React from 'react';
import './Footer.css';
import { useRoutes } from 'react-router-dom';

const FooterVisible = () => {
  return (
    <footer className='footer'>
      <div className='footer__title'>
        <p className='footer__title-text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      </div>
      <div className='footer__info'>
        <p className='footer__copyright'>© 2022</p>
        <ul className='footer__links'>
          <li>
            <a className='footer__link link'
              href='https://practicum.yandex.ru/'
              target='_blank'
              rel='noreferrer'>
              Яндекс.Практикум
            </a>
          </li>
          <li>
          <a className='footer__link link'
              href='https://github.com/MarinaNat'
              target='_blank'
              rel='noreferrer'>
              Github
            </a>
          </li>
          <li>
          <a className='footer__link link'
              href='https://www.codewars.com/users/MarinaNat'
              target='_blank'
              rel='noreferrer'>
              Codewars
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

const Footer = () => {
  return useRoutes([
    { path: '/', element: <FooterVisible /> },
    { path: '/movies', element: <FooterVisible /> },
    { path: '/saved-movies', element: <FooterVisible /> },
  ])
};

export default Footer