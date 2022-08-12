import React from 'react';
import './Login.css';
import '../Register/Register';
import Logo from '../../Logo/Logo';
import { Link } from 'react-router-dom';
import isEmail from 'validator/es/lib/isEmail';

const Login = ({ onLogin }) => {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

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
    console.log("in login-handleSubmit", values);
    onLogin(values.email, values.password)
  }

  const showError = () => {
    for (const key in errors) {
      if (errors[key]) return errors[key];
    }
  };

  console.log('\nvalues через переменную, содержащую имя ключа: ');
  console.log(values[Object.keys(values)[0]]);
  return (
    <section className='login'>
      <Link to='/' className='login__logo'>
        <Logo />
      </Link>
      <form className='login-form' onSubmit={handleSubmit}>
        <h2 className='login-form__title'>Рады видеть!</h2>
        <label className='login-form__label'>E-mail</label>
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
        <span className={`login-form__error ${!isValid ? 'login-form__error_server' : ''}`} >{showError()}</span>
        <button className={
              `${isValid
                ? 'login-form__button link'
                : 'login-form__button login-form__button_disabled'
              }`
            }
            type='submit'
            disabled={!isValid ? true : ''}
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