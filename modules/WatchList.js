'use strict';

const User = require('/modules/User');

const Movies= {};

Movies.addAMovie = async(request, response) => {
  console.log('inside of addAMovie', request.body);
  const name = request.body.name;
  const movie = { name: request.body.movieName }

  await User.findOne({ email: name }, (err, entry) => {
    if(err) return console.error(err);
    if(!entry){
      return console.error('user not found');
    }
    entry.movies.push(movie);
    entry.save();
    response.status(200).send(entry.movies);
  })
}

Movies.getUser = async(request, response) => {
  const name = request.query.user_name;
  // console.log(request.query);
  await User.find({ email: name }, function (err, items) {
    if (err) return console.error(err);
    // console.log(items);
    response.status(200).send(items[items.length -1].movies);
  })
}

Movies.deleteAMovie = async(request, response) => {
  const index = parseInt(request.params.index);
  const userName = request.query.name;
  // console.log("we are in deleteAMovie", index, userName);
  
  await User.findOne({ email: userName }, (err, entry) => {
    if (err) return err;
    // console.log("this is our entry", entry);
    const newMovieArray = entry.movies.filter((movie, i) => {
      // console.log(entry.movies[i]);
      return i !== index;
    });
    console.log("this is our newMovieArray", newMovieArray);
    entry.movies = newMovieArray;
    entry.save();
    response.status(200).send('success!')
  })
}

Movies.updateAMovie = async (request, response) => {
  const id = request.params.id;
  const status = request.body.status;


  console.log('we are in updateAMovie', {index, movieName, userName, status, overview});
  // { index: '1', catName: 'sam', personName: 'Brian' }
  await User.findOne({email:userName}, (err, user) => {
    const movie = { name: movieName, overview: overview, status: status }
    user.movies(parseInt(index), 1, movie);
    user.save();
    response.status(200).send(user.movies);
  })
}

module.exports = Movies;