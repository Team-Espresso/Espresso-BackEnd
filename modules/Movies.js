'use strict';

const movieKey = process.env.MOVIE_API_KEY;
const superagent = require('superagent');

const Media = {};

// function Media(title, overview, poster_path, release_date, rating) {
//   this.title = title;
//   this.overview = overview;
//   this.poster = `https://image.tmdb.org/t/p/w200${poster_path}`;
//   this.releaseDate = release_date;
//   this.rating = rating;
// }

Media.handleSearch = async(req, res) => {
  const url = `https://api.themoviedb.org/3/search/movie`;
  const queryMovie = {
    api_key: movieKey,
    query: req.query.searchQuery,
    language: "en-US"
  };

  console.log('made it to search');

  await superagent
    .get(url)
    .query(queryMovie)
    .then((results) => {
      console.log(results.body);
      const movieArray = results.body.results.map((film) => film);
      console.log(movieArray[0]);
      res.status(200).send({
        movieArray
      });
    }).catch((err) =>{
      console.log('error in movies', err);
      res.status(500).send('something went wrong');
    });
}

Media.handleMovie = async(req, res) => {
  const url = `https://api.themoviedb.org/3/trending`;
  const queryMovie = {
    api_key: movieKey,
    media_type: movie,
    time_window: week,
    language: "en-US"

  };

  console.log('made it to movies');

  await superagent
    .get(url)
    .query(queryMovie)
    .then((results) => {
      console.log(results.body);
      const movieArray = results.body.results.map((film) => film);
      console.log(movieArray[0]);
      res.status(200).send({
        movieArray
      });
    }).catch((err) =>{
      console.log('error in movies', err);
      res.status(500).send('something went wrong');
    });
}

Media.handleShow = async(req, res) => {
  const url = `https://api.themoviedb.org/3/trending`;
  const queryShow = {
    api_key: movieKey,
    media_type: tv,
    time_window: week,
    language: "en-US"

  };

  console.log('made it to shows');

  await superagent
    .get(url)
    .query(queryShow)
    .then((results) => {
      console.log(results.body);
      const movieArray = results.body.results.map((film) => film);
      console.log(movieArray[0]);
      res.status(200).send({
        movieArray
      });
    }).catch((err) =>{
      console.log('error in shows', err);
      res.status(500).send('something went wrong');
    });
}

module.exports = Media;
