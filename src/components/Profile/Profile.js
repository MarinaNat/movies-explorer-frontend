import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ onSignOut, onEditProfile }) => {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [previousName, setPreviousName] = React.useState(currentUser.name);
  const [email, setEmail] = React.useState(currentUser.email);
  const [previousEmail, setPreviousEmail] = React.useState(currentUser.email);
  const [isActiveButton, setIsActiveButton] = React.useState(false);

  //обновление данных, сохранение в локальном хранилище
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setIsActiveButton(false);
    onEditProfile({ name, email });
    localStorage.setItem('name', name)
    localStorage.setItem('email', email)
  };

  //ввод данных, сверка со старыми
  function handleUserName(evt) {
    const value = evt.target.value;
    setName(value);
    if (value !== previousName) {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  }

  //ввод данных, сверка со старыми
  function handleUserEmail(evt) {
    const value = evt.target.value;
    setEmail(value);
    if (value !== previousEmail) {
      setIsActiveButton(true);
    } else {
      setIsActiveButton(false);
    }
  }

  React.useEffect(() =>{
    const localStorageName = localStorage.getItem('name');
    if (localStorageName) {
      setPreviousName(localStorageName);
    }
    const localStorageEmail = localStorage.getItem('email');
    if (localStorageEmail) {
      setPreviousEmail(localStorageEmail);
    }
  }, [])

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
            name='profile-name'
            type='text'
            required
            value={name}
            placeholder="Имя"
            onChange={handleUserName}
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
            value={email}
            placeholder="email"
            onChange={handleUserEmail}
          />
        </div>

        <button className='profile__button profile__button-edit link' type='submit' disabled={!isActiveButton}>
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