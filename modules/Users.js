'use strict';

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  status: {type: String},
  rating: {type: Number}
});

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  name: {type: String},
  about: {type:String},
  watchList: [movieSchema]
});

const User = mongoose.model('UserParent', userSchema);

module.exports = User;