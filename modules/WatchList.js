'use strict';

const express = require('express');
const User = require('./Users.js');

const Data = {};
// Data.collection.drop();
// const peter = new User({
//   email: 'peterjast@gmail.com',
//   watchList: 
//     [{title: 'Godzilla vs. Kong',
//     overview: 'In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.', 
//     poster_path: '/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg',
//     release_date: '2021-03-24',
//     rating: 8.5}],
//   comments:
//     [{user_rating: 7,
//       comment: 'a comment about this movie'
//     }]  
// });
// peter.save();



// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })

Data.addComment = async(request, response) => {
  console.log('inside of addComment', request.body);
  const email = request.body.email;
  const movieId = request.body.movieId;
  const comment = { user_rating: request.body.rating, comment: request.body.comment}
  await User.findOne({ email: email }, (err, entry) => {
    if(err) return console.error(err);
    if(!entry){
      return console.error('user not found');
    }
    console.log('watch!!!:', entry.watchList);
    console.log(movieId);
    console.log(comment);
    entry.comments.push(comment);
    entry.save();
    response.status(200).send(entry.watchList);
  })
}

// Data.addComment = async(request, response) => {
//   // console.log('inside of addComment', request.body);
//   const email = request.body.email;
//   const movieId = request.body.movieId;
//   const user_rating = parseInt(request.body.user_rating);
//   const comment = request.body.comment;
//   await User.findOne({ email: email }, (err, entry) => {
//     if(err) return console.error(err);
//     if(!entry){
//       return console.error('user not found');
//     }
//     entry.watchList.push(user_rating, comment);
//     entry.save();
//     response.status(200).send(entry.watchList);
// })
// }


Data.deleteComment = async(request, response) => {
  const movieId = request.params.movieId;
  const commentId = request.params.id;
  const email = request.query.email;
  console.log("we are in deleteAComment", email, movieId, commentId);
  
  await User.findOne({ email: email }, (err, entry) => {
    if (err) return err;
    // console.log("this is our entry", entry);
    console.log(entry.watchList);
    const index = entry.watchList.indexOf(entry.watchList.id(movieId));
    console.log('INDEXJSXJS', index)
    });
    console.log("this is our newMovieArray", newMovieArray);
    entry.movies = newMovieArray;
    entry.save();
    response.status(200).send(newMovieArray)
}




Data.addMovie = async(request, response) => {
  // console.log('inside of addAMovie', request.body);
  const email = request.body.email;
  const movie = { title: request.body.title, overview: request.body.overview, poster_path: request.body.poster_path, release_date: request.body.release_date, rating: request.body.rating};

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


Data.deleteComment = async(request, response) => {
  const movieId = request.params.movieId;
  const idx = request.params.idx;
  const email = request.query.email;
  // console.log("we are in deleteAComment", email, movieId, idx);
  await User.findByIdAndDelete(movieId, function (err, entry) {
    if(err){
      console.log(err.message)
      } else{
        response.status(200).send('success!');
      }
  }) 
}


Data.updateComment = async (request, response) => {
  const movieId = request.params.movieId;
  console.log('req body!', request.body);
  const email = request.body.email;
  const comment = { rating: request.body.rating, comment: request.body.comment};
  console.log('we are in updateAComment', {movieId, idx, email, comment});
  await User.findByIdAndUpdate(movieId, comment, {new:true, useFindAndModify:false}), function(err,entry){
    if(err){
      console.log(err.message);
    } else {
      response.status(200).send('success');
    }
  }
  // } ;
  // console.log('req body!', request.body); 

  // await User.findOne({email:email}, (err, user) => {
  //   if(err) return console.log(err.message);
  //   const movieIndex = user.watchList.indexOf((user.watchlist.filter(movie => movie._id === movieId))[0]);
  //   user.watchList[movieIndex].comments.splice(index, 1, comment);
  //   user.save();
}


Data.getUser = async(request, response) => {
  const email = request.query.email;
  // console.log(request.query);
  await User.find({ email }, function (err, person) {
    if (err) return console.log(err.message);
    // console.log('insidePerson:', person[0], person[person.length -1]);
    response.status(200).send(person[person.length -1]);
  })
}

Data.deleteMovie = async(request, response) => {
  const id = request.params.movieId;
  const email = request.query.email;
  console.log("we are in deleteAMovie", id, email);

  await User.findOne({ email: email }, (err, entry) => {
    if (err){
      console.log(err.message);
    }
    // console.log("this is our entry", entry);
    const index = entry.watchList.indexOf(entry.watchList.id(id));
    console.log('INDEXJSXJS', index)
    entry.watchList.splice(index, 1);
    // const newMovieArray = entry.watchList.filter((movie) => movie._id !== id);
    // console.log("this is our newMovieArray", newMovieArray);
    entry.save();
    console.log(entry.watchList);
    response.status(200).send(entry.watchList);
  })
}

module.exports = Data;