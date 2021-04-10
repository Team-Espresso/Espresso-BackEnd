'use strict';

require('dotenv').config();
const express = require('express');
const Media = require('./modules/Movies');
const Data = require('./modules/WatchList');
const app = express();
const cors = require('cors');
app.use(express.json());

const corsOptions = {
  origin: 'https://showmethemovies.netlify.app',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


const PORT = process.env.PORT;

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to DB');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/movies', Media.handleMovie);
app.get('/shows', Media.handleShow);
app.get('/search', Media.handleSearch);
app.get('/watchlist', Data.getUser);
app.post('/watchlist/movie', Data.addMovie);
app.post('/watchlist', Data.addComment);
app.post('/watchlist/comment/:commentId', Data.updateComments);
app.delete('/watchlist/movie/:movieId', Data.deleteMovie);
app.delete('/watchlist/comment/:commentId', Data.deleteComment);

// app.post('/watchList', Media.addAMovie);
// app.delete('/watchList/:index', Media.deleteAMovie);
// app.put('/watchList/:index', Media.updateAMovie);

app.listen(PORT, () => console.log(`server is up on ${PORT}`));
