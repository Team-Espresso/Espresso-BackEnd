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
  release_date: {type: String},
  rating: {type: String},
});

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  watchList: [movieSchema],
  comments: [commentSchema]
});

// const Comment = mongoose.model('Comment', commentSchema);

const User = mongoose.model('UserParent', userSchema);

module.exports = User;
