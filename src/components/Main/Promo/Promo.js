import React from 'react';
import './Promo.css';
import promoLogo from '../../../images/promoLogo.png'

const Promo = () => {
  return (
   <section className='promo'>
    <div className='promo__content'>
      <h1 className='promo__title'>
      Учебный проект студента факультета Веб-разработки.
      </h1>
      <img className="promo__logo" src={promoLogo} alt="Логотип" />
    </div>
   </section>
  )
}

export default Promo