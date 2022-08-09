import { errMessages } from "../const/errMessages";

export const getErrMessage = (error) => {
    error = error.split(':')[0];
    const code = error.match(/\d+/gm)[0];
    console.log(error.match(/\d+/gm));
    console.log(code);
    return `${error}: ` + errMessages[code];
  };

  
export const BASE_URL = "https://apimarina-movies-explorer.nomoredomains.xyz";

export const SHORT_MOVIE_DURATION = 40;
export const HOUR = 60;

export const REG_EXP_NAME = /([а-яА-Яёa-z][\s-]{0,1})+/i;
export const REG_EXP_EMAIL = /[a-z\d\-._]+@[a-z]+\.[a-z]{2,}/i;
export const REG_EXP_PASSWORD = /[^\sа-яё]+/i;

export const INVALID_INPUT_BG_COLOR = "#f9d9d9";

export const LOW_WIDTH = 480;
export const HIGH_WIDTH = 1280;

export const CARDS_NUMBER_S = 5;
export const CARDS_NUMBER_M = 8;
export const CARDS_NUMBER_L = 12;

export const SMALL_INCREMENT = 2;
export const BIG_INCREMENT = 3;

export const BASIC_ERROR_MESSAGE = "Что-то пошло не так. Пожалуйста, попробуйте позже.";
export const EDIT_PROFILE_MESSAGE = "Данные пользователя изменены.";
export const EDIT_PROFILE_ERROR_404_MESSAGE = "Пользователь с такими данными уже зарегистрирован.";