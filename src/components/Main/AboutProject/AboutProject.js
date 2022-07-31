import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section id='about-project' className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__stage'>
        <p className='about-project__stage-title'>
          Дипломный проект включал 5 этапов
        </p>
        <p className='about-project__stage-title'>
          На выполнение диплома ушло 5 недель
        </p>
        <p className='about-project__stage-text'>
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
        </p>
        
        <p className='about-project__stage-text'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className='about-project__graph'>
        <div className='about-project__graph-backend'>1 неделя</div>
        <div className='about-project__graph-frontend'>4 недели</div>
        <p className='about-project__graph-text'>Back-end</p>
        <p className='about-project__graph-text'>Front-end</p>
      </div>
    </section>
  )
}

export default AboutProject