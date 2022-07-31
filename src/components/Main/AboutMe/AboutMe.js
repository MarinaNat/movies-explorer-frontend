import React from 'react';
import './AboutMe.css';
import foto from '../../../images/foto.jpg';

const AboutMe = () => {
  return (
    <section id='about-me' className='about-me'>
      <h3 className='about-me__title'>Студент</h3>
      <div className='about-me__content'>
      
        <div className='about-me__info'>
          
          <h2 className='about-me__name'>Марина</h2>
          <h4 className='about-me__subtitle'>Фронтенд-разработчик, 37 лет</h4>
          <p className='about-me__text'>Я живу в Санкт-Петербурге. Для перехода в новую сферу я устроилась на курсы
            "Веб&nbsp;разработчик" в Яндекс практикум, читаю учебник по javascript, решаю задачи на codewars,
            сделала свой pet project, смотрю уроки на youtube различных блогеров.
            Люблю рисовать акварелью, участвую в онлайн мастер классах в свободное время.
          </p>
          <div className='about-me__links'>
          <a
              className="about-me__link link"
              href="https://www.codewars.com/users/MarinaNat"
              target="_blank"
              rel="noreferrer"
            >
              Codewars
            </a>
            <a
              className="about-me__link link"
              href="https://github.com/MarinaNat"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        <div className="about-me__photo-container">
          <img src={foto} alt="Моя фотография" className="about-me__photo" />
        </div>
      </div>
    </section>
  )
}

export default AboutMe