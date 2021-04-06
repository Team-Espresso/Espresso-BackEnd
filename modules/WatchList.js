'use strict';

const User = require('./Users.js');

const Data = {};
// Data.collection.drop();
// const peter = new User({
//   email: 'peterjast@gmail.com',
//   watchList: 
//     [{title: 'Godzilla vs. Kong',
//     overview: 'In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.', 
//     poster_path: '/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jp',
//     release_date: '2021-03-24',
//     rating: 8.5,
//     comments: [{user_rating: 7, comment: 'This is a comment about this movie.'}, {user_rating: 7, comment: 'This is a comment about this movie.'}]
//     }]
// });
// peter.save();

Data.addMovie = async(request, response) => {
  console.log('inside of addAMovie', request.body);
  const email = request.body.email;
  const movie = { title: request.body.title, overview: request.body.overview, poster_path: request.body.poster_path, release_date: parseDate(request.body.release_date), rating: request.body.rating}

  await User.findOne({ email: email }, (err, entry) => {
    if(err) return console.error(err);
    if(!entry){
      return console.error('user not found');
    }
    entry.watchList.push(movie);
    entry.save();
    response.status(200).send(entry.watchList);
  })
}

Data.addComment = async(request, response) => {
  console.log('inside of addAMovie', request.body);
  const email = request.body.email;
  const movieId = request.body.id;
  const comment = { user_rating: request.body.user_rating, comment: request.body.comment}

  await User.findOne({ email: email }, (err, entry) => {
    if(err) return console.error(err);
    if(!entry){
      return console.error('user not found');
    }
    entry.watchList.forEach(movie => {
      if(movie._id === movieId){
        movie.comments.push(comment);
      };
    });
    entry.save();
    response.status(200).send(entry.watchList);
  })
}

Data.deleteComment = async(request, response) => {
  const movieId = request.params.movieId;
  const commentId = request.params.id;
  const email = request.query.email;
  console.log("we are in deleteAComment", index, userName);
  
  await User.findOne({ email: email }, (err, entry) => {
    if (err) return err;
    // console.log("this is our entry", entry);
    const newMovieArray = entry.watchList.map((movie) => {
      if(movieId === movie._id){
        const newCommentArr = movie.comments.filter(comment => commentId !== comment._id);
        movie.comments = newCommentArr;
      }  
    });
    console.log("this is our newMovieArray", newMovieArray);
    entry.movies = newMovieArray;
    entry.save();
    response.status(200).send('success!')
  })
}

Data.updateComment = async (request, response) => {
  const movieId = request.params.movieId;
  const commentId = request.params.id;
  const email = request.query.email;
  const comment = { user_rating: request.body.user_rating, comment: request.body.comment};

  console.log('we are in updateAComment', {movieId, commentId, userName, comment});

  await User.findOne({email:email}, (err, user) => {
    if(err) return console.log(err.message);
    const index = user.WatchList.indexOf((user.Watchlist.filter(movie => movie._id === movieId))[0]);

    const commentIndex = user.watchList[index].comments.indexOf((user.watchList[index].comments.filter(currentComment => commentId === currentComment.id)[0]));
    user.watchList[index].comments.splice(commentIndex, 1, comment);
    user.save();
    response.status(200).send(user.watchList);
  })
}


Data.getUser = async(request, response) => {
  const email = request.query.email;
  // console.log(request.query);
  await User.find({ email }, function (err, person) {
    if (err) return console.error(err);
    console.log(person[0]);
    response.status(200).send(person[person.length -1].watchList);
  })
}

Data.deleteMovie = async(request, response) => {
  const id = request.params.movieId;
  const email = request.query.email;
  // console.log("we are in deleteAMovie", index, userName);
  
  await User.findOne({ email: email }, (err, entry) => {
    if (err) return err;
    // console.log("this is our entry", entry);
    const newMovieArray = entry.movies.filter((movie) => movie._id !== id);
    console.log("this is our newMovieArray", newMovieArray);
    entry.movies = newMovieArray;
    entry.save();
    response.status(200).send('success!')
  })
}

module.exports = Data;