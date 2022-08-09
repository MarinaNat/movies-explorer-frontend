// const BASE_URL = 'https://apimarina-movies-explorer.nomoredomains.xyz';

class MainApi {

    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _checkResponse = (res) => {
        return res.ok
            ? res.json()
            : Promise.reject(
                `Ошибка: ${res.status}: ${res.statusText}`
            );
    }

    register( name, email, password ) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password }),
        })
            .then(this._checkResponse);
    };

    login( email, password ) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        })
            .then(this._checkResponse);
    };

    // Функция для проверки токена
// checkToken(token) {
//     return fetch(`${this._baseUrl}/users/me`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`,
//         }
//     })
//         .then(this._checkResponse);
// }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(this._checkResponse);
    }

    updateUserInfo( data ) {
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

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(this._checkResponse);
    }

    addMovies(data) {
        console.log('data in addMovies', data)
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                country: data.country,
                director: data.duration,
                duration: data.duration,
                year: data.year,
                description: data.description,
                image: ' https://api.nomoreparties.co/' + data.image.url,
                trailerLink: data.trailerLink,
                thumbnail: data.thumbnail,//ссылка?
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN
            }),
        })
            .then(this._checkResponse);
    }

    deleteMovies(movieId) {
        return fetch(`${this._baseUrl}/movie/${movieId}`, {
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
})

export default mainApi;