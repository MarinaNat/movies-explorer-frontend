import React from 'react';
import './NotFound.css';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {

  const navigate = useNavigate();
  const comeBack = () => navigate(-1)

  return (
    <section>
      <div className='not-found'>
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
        <Link to="/" className="not-found__link link" onClick={comeBack}>
          Назад
        </Link>
      </div>

    </section>
  )
}

export default NotFound