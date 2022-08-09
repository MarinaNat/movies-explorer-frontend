const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResult = (res) => {
        return res.ok
            ? res.json()
            : Promise.reject(
                `Ошибка: ${res.status}: ${res.statusText}`
            );
    }

    getMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkResult);
    }
}

const moviesApi = new MoviesApi({
    baseUrl: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default moviesApi