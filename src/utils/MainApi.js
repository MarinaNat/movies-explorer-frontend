// const BASE_URL = 'https://apimarina-movies-explorer.nomoredomains.xyz';

class MainApi {

    constructor({ baseUrl, apiURL }) {
        this._baseUrl = baseUrl;
        this._apiURL = apiURL;
    }

    _checkResponse = (res) => {
        return res.ok
            ? res.json()
            : Promise.reject(
                `Ошибка: ${res.status}: ${res.statusText}`
            );
    }

    register(data) {
        console.log('data in register')
        console.log(data)
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
            }),
        })
            .then(this._checkResponse);
    };

    login(data) {
        console.log('data in login')
        console.log(data)
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        })
            .then(this._checkResponse);
    };

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            // credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(this._checkResponse);
    }

    updateUserInfo(data) {
        console.log('data.name: ', data.name)
        console.log('data.email: ', data.email)
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
            }),
        })
            .then(this._checkResponse);
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include'
        })
            .then(this._checkResponse);
    }

    saveMovie(data) {
        console.log('data.trailerLink in saveMovie:', data.trailerLink)
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                country: data.country || ' ',
                director: data.director || ' ',
                duration: data.duration || 0,
                year: data.year || ' ',
                description: data.description || ' ',
                image: `${this._apiURL}${data.image.url}`,
                trailerLink: data.trailerLink,
                thumbnail: `${this._apiURL}${data.image.formats.thumbnail.url}`,
                movieId: data.id,
                nameRU: data.nameRU || ' ',
                nameEN: data.nameEN || ' ',
            }),
        })
            .then((res) => res.json());
    }

    deleteMovie(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(this._checkResponse);
    }

}

const mainApi = new MainApi({
    baseUrl: 'https://apimarina-movies-explorer.nomoredomains.xyz',
    apiURL: 'https://api.nomoreparties.co' //бэк фильмов
})

export default mainApi;