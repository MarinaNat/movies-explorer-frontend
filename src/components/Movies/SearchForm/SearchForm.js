import { React, useState } from 'react';
import './SearchForm.css';
import '../FilterCheckbox/FilterCheckbox.css';
import loupe from '../../../images/loupe.svg';

const SearchForm = ({ handleSearch, search, setSearch }) => {
    const [error, setError] = useState('');
    const [innerSearch, setInnerSearch] = useState(search);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!innerSearch.query) {
            setError('Нужно ввести ключевое слово');
        } else {
            setError('');
            setSearch(innerSearch);
            handleSearch(innerSearch);
        }
    };

    const handleSearchInputChange = (evt) => {
        setInnerSearch({ ...innerSearch, query: evt.target.value });
    };

    const handleChangeCheckbox = (evt) => {
        setInnerSearch({ ...innerSearch, isShort: evt.target.checked });
        setSearch({ ...innerSearch, isShort: evt.target.checked });
    };

    return (
        <section className='search-form'>
            <div className='search-form__conteiner'>
                <form className='search-form__form' onSubmit={handleSubmit}>
                    <img src={loupe} alt='лупа' className='search-form__icon'></img>
                    <input
                        required
                        className="search-form__input"
                        placeholder="Фильм"
                        id="search-form-input"
                        type="text"
                        name="search-form-input"
                        minLength="1"
                        onChange={handleSearchInputChange}
                        value={innerSearch.query || ''}
                    />
                    <button type="submit" className="search-form__button link_button"></button>
                </form>
                {error && <span className="search-form__error">{error}</span>}
                <div className='filter-checkbox'>
                <input
                    type="checkbox"
                    className='filter-checkbox__checkbox'
                    onChange={handleChangeCheckbox}
                    checked={innerSearch.isShort}
                />
                <p className='filter-checkbox__text'>Короткометражки</p>
            </div>
            </div>
            
        </section>
    )
}

export default SearchForm