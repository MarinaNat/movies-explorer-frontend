import React from 'react';
import './Login.css';
import Logo from '../../Logo/Logo';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <section className='login'>
      <Link to='/' className='login__logo'>
        <Logo />
      </Link>
      <form className='login-form'>
        <h2 className='login-form__title'>Рады видеть!</h2>
        <label className='login-form__label'>E-mail</label>
        <input
          className='login-form__input'
          minLength='2'
          id='login-email'
          name='login-email'
          type='email'
          required
        />
        <label className='login-form__label'>Пароль</label>
        <input
          className='login-form__input'
          minLength='2'
          id='login-password'
          name='login-password'
          type='password'
          required
        />
        <button className='login-form__button link' type='submit'>
          Войти
        </button>
        <div className='login-form__enter'>
          <p className='login-form__text'>Ещё не зарегистрированы?</p>
          <Link to='/signup' className='login-form__link link'>
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  )
}

export default Login