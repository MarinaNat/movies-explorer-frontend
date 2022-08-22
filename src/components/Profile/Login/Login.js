import React, { useEffect } from 'react';
import './Login.css';
import '../Register/Register';
import Logo from '../../Logo/Logo';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../../utils/validation';

const Login = ({ onLogin, error, setError, isLoading  }) => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const showNonEmptyErrors = () => {
    for (const key in errors) {
      if (errors[key]) return errors[key];
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("in login-handleSubmit", values);
    onLogin(values);
  };

  useEffect(() => {
    console.log('error');
    console.log(error);
    console.log('errors');
    console.log(errors);
    setError('');
  }, [values]);

  
  return (
    <section className='login'>
      <Link to='/' className='login__logo'>
        <Logo />
      </Link>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2 className='login-form__title'>Рады видеть!</h2>
        <label className='login-form__label' htmlFor='login-email'>E-mail</label>
        <input
          className='login-form__input'
          minLength='2'
          id='login-email'
          name='email'
          type='email'
          onChange={handleChange}
          maxLength="40"
          required
          value={values.email || ''}
        />
        <label className='login-form__label'>Пароль</label>
        <input
          className='login-form__input'
          minLength='2'
          id='login-password'
          name='password'
          type='password'
          onChange={handleChange}
          maxLength="40"
          required
          value={values.password || ''}
        />
        <span className={`login-form__error ${!isValid ? 'login-form__error_server' : ''}`} >{showNonEmptyErrors()}</span>
        <button className={
              `${isValid
                ? 'login-form__button link'
                : 'login-form__button login-form__button_disabled'
              }`
            }
            type='submit'
            disabled={!isValid || isLoading || error}
          >
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