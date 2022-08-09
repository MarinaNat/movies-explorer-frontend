import React, { useState } from 'react';
import './Register.css';
import Logo from '../../Logo/Logo';
import { Link } from 'react-router-dom';
// import { useFormWithValidation } from '../../../utils/validation';
import isEmail from 'validator/es/lib/isEmail';

function Register({ onRegister }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  //проверка вводимых данных
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === 'email') {
      if (!isEmail(value)) {
        event.target.setCustomValidity('Некорректый E-mail');
      } else {
        event.target.setCustomValidity('');
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  //сабмит формы
  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log("in Register-handleSubmit", values);
    onRegister(values.name, values.email, values.password)
  }

  const showError = () => {
    for (const key in errors) {
      if (errors[key]) return errors[key];
    }
  };

  console.log('\nvalues через имя ключа: ');
  console.log(values['register-name']);

  console.log('\nvalues через переменную, содержащую имя ключа: ');
  console.log(values[Object.keys(values)[0]]);


  return (
    <>
      <section className='register'>
        <Link to='/' className='register__logo'>
          <Logo />
        </Link>
        <form className='register-form' onSubmit={handleSubmit}>
          <h2 className='register-form__title'>Добро пожаловать!</h2>
          <label className='register-form__label'>Имя</label>
          <input
            className='register-form__input'
            minLength='2'
            maxLength='30'
            id='register-name'
            name='name'
            type='text'
            required
            pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
            onChange={handleChange}
            autoComplete="on"
            value={values.name || ''}
          />
          <label className='register-form__label'>E-mail</label>
          <input
            className='register-form__input'
            minLength='2'
            id='register-email'
            name='email'
            type='email'
            maxLength='40'
            required
            autoComplete="on"
            value={values.email || ''}
            onChange={handleChange}
          />
          <label className='register-form__label'>Пароль</label>
          <input
            className='register-form__input'
            minLength='2'
            maxLength='30'
            id='register-password'
            name='password'
            type='password'
            required
            autoComplete="on"
            value={values.password || ''}
            onChange={handleChange}
          />
          <span className={`register-form__error ${!isValid ? 'register-form__error_server' : ''}`} >{showError()}</span>
          <button
            className={
              `${isValid
                ? 'register-form__button link'
                : 'register-form__button register-form__button_disabled'
              }`
            }
            type='submit'
            disabled={!isValid ? true : ''}
          >
            Зарегистрироваться
          </button>
          <div className='register-form__enter'>
            <p className='register-form__text'>Уже зарегистрированы?</p>
            <Link to='/signin' className='register-form__link link'>
              Войти
            </Link>
          </div>
        </form>
      </section>
    </>

  )
}

export default Register