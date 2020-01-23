export default class Film {
  constructor(data) {
    this.id = data.id;
    this.name = data.film_info.title;
    this.alternativeName = data.film_info.alternative_title;
    this.rating = data.film_info.total_rating;
    this.poster = data.film_info.poster;
    this.age = data.film_info.age_rating;
    this.director = data.film_info.director;
    this.writers = data.film_info.writers;
    this.actors = data.film_info.actors;
    this.date = data.film_info.release.date;
    this.country = data.film_info.release.release_country;
    this.duration = data.film_info.runtime;
    this.genres = data.film_info.genre;
    this.description = data.film_info.description;
    this.commentsId = data.comments;
    this.watchlist = data.user_details.watchlist;
    this.history = data.user_details.already_watched;
    this.favorites = data.user_details.favorite;
    this.score = data.user_details.personal_rating;
    this.watchingDate = data.user_details.watching_date;
  }

  toRAW() {
    return {
      'id': this.id,
      'film_info': {
        'title': this.name,
        'alternative_title': this.alternativeName,
        'total_rating': this.rating,
        'poster': this.poster,
        'age_rating': this.age,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors,
        'release': {
          'date': this.date,
          'release_country': this.country
        },
        'runtime': this.duration,
        'genre': this.genres,
        'description': this.description
      },
      'user_details': {
        'personal_rating': this.score,
        'watchlist': this.watchlist,
        'already_watched': this.history,
        'watching_date': this.watchingDate,
        'favorite': this.favorites
      },
      'comments': this.commentsId
    };
  }

  static parseFilm(data) {
    return new Film(data);
  }

  static parseFilms(data) {
    return data.map(Film.parseFilm);
  }

  static clone(film) {
    return new Film(film.toRAW());
  }
}
