import React from 'react';
import './InfoTooltip.css';

function InfoTooltip({ img, title, onClose, isOpen }) {
  return(
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__status">
        <button type="button" className="popup__close-button" onClick={onClose}/>
        <img className="popup__status-image" src={img} alt="icon"/>
        <p className="popup__status-text">{title}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;