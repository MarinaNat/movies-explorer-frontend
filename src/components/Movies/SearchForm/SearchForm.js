import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import loupe from '../../../images/loupe.svg';

const SearchForm = () => {
  return (
    <section className='search-form'>
      <div className='search-form__conteiner'>
        <form className='search-form__form'>
          <img src={loupe} alt='лупа' className='search-form__icon'></img>
          <input required className="search-form__input" placeholder="Фильм" />
          <button type="submit" className="search-form__button link_button"></button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  )
}

export default SearchForm