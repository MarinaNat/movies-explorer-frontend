import React, { useEffect, useContext } from 'react';
import './Profile.css';
import { useFormWithValidation } from '../../utils/validation.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({
  onSignOut,
  handleEditProfile,
  success,
  isLoading, }) => {

  const { values, handleChange, errors, isValid, setValues } =
    useFormWithValidation();

  const { name, email } = useContext(CurrentUserContext);

  const showNonEmptyErrors = () => {
    for (const key in errors) {
      if (errors[key]) return errors[key];
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
   handleEditProfile(values);
  };

  useEffect(() => {
    setValues({ name, email });
  }, [name, email]);

  return (
    <section className='profile'>
      <form className='profile-form' onSubmit={handleSubmit}>
        <h2 className='profile__title'>Привет, {name}!</h2>
        <div className='profile__container'>
          <label className='profile__label'>Имя</label>
          <input
            className='profile__input'
            minLength='2'
            id='profile-name'
            name='name'
            type='text'
            required
            value={values.name || ''}
            placeholder="Имя"
            onChange={handleChange}
          />
        </div>
        <div className='profile__container'>
          <label className='profile__label'>E-mail</label>
          <input
            className='profile__input'
            minLength='2'
            id='profile-email'
            name='email'
            type='email'
            required
            value={values.email || ''}
            placeholder="email"
            onChange={handleChange}
          />
        </div>
        {Object.values(errors).length > 0 && (
          <span className="profile__error-text">
            {showNonEmptyErrors()}
          </span>
        )}
        {success && (
          <span className="profile__success-text profile__success-text_server">
            {success}
          </span>
        )}
        <button
          className={
            !isValid || (values.name === name && values.email === email)
              ? 'profile__button profile__button-edit profile__button-edit_disabled'
              : 'profile__button profile__button-edit link'
          }
          type='submit'
          disabled={
            !isValid || (values.name === name && values.email === email) || isLoading
          }>
          Редактировать
        </button>
        <button className='profile__button profile__button-exit link' type='submit' onClick={onSignOut}>
          Выйти из аккаунта
        </button>
      </form>
    </section>
  )
}

export default Profile