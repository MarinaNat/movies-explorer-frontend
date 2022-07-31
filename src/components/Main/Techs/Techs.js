import React from 'react';
import './Techs.css';

const Techs = () => {
  return (
    <section id='tachs' className='techs'>
      <div className='techs__content'>
        <h3 className='techs__title'>Технологии</h3>
        <h2 className='techs__subtitle'>7 технологий</h2>
        <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      </div>
      <ul className='techs-list'>
        <li className='techs-list__item'>HTML</li>
        <li className='techs-list__item'>CSS</li>
        <li className='techs-list__item'>JS</li>
        <li className='techs-list__item'>React</li>
        <li className='techs-list__item'>Git</li>
        <li className='techs-list__item'>Express.js</li>
        <li className='techs-list__item'>mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs