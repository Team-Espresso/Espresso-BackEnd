'use strict';

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user_rating: {type: Number},
  comment: {type: String}
});

const movieSchema = new mongoose.Schema({
  title: {type: String},
  overview: {type: String},
  poster_path: {type: String},
  release_date: {type: Date},
  rating: {type: Number},
  comments: [commentSchema]
});

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  watchList: [movieSchema]
});

const User = mongoose.model('UserParent', userSchema);

module.exports = User;