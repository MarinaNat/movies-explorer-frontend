import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <section className='profile'>
      <form className='profile-form'>
        <h2 className='profile__title'>Привет, Марина!</h2>
        <div className='profile__container'>
        <label className='profile__label'>Имя</label>
        <input
          className='profile__input'
          minLength='2'
          id='profile-name'
          name='profile-name'
          type='text'
          required
          value="Марина"
          placeholder="Имя"
        />
        </div>
        <div className='profile__container'>
        <label className='profile__label'>E-mail</label>
        <input
          className='profile__input'
          minLength='2'
          id='profile-email'
          name='profile-email'
          type='email'
          required
          value="111@ya.ru"
          placeholder="email"
        />
        </div>
        
        <button className='profile__button profile__button-edit link' type='submit'>
        Редактировать
        </button>
        <button className='profile__button profile__button-exit link' type='submit'>
        Выйти из аккаунта
        </button>
      </form>
    </section>
  )
}

export default Profile