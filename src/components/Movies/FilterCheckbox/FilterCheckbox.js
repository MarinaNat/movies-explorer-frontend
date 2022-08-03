import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
    return (
        <div className='filter-checkbox'>
            <input type="checkbox" className='filter-checkbox__checkbox' />
            <p className='filter-checkbox__text'>Короткометражки</p>
        </div>
    );
};

export default FilterCheckbox