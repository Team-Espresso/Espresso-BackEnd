'use strict';

const express = require('express');
const User = require('./Users.js');

const Data = {};
// Data.collection.drop();
// const demo = new User({
//   email: 'demo@demo.com',
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
// demo.save();



// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })


Data.addComment = async(request, response) => {
  console.log('inside of addComment', request.body);
  const email = request.body.email;
  const movieId = request.body.movieId;
  const comment = { movie_id: movieId, user_rating: request.body.rating, comment: request.body.comment}
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
    response.status(200).send(entry);
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
  const id = request.params.commentId;
  const email = request.query.email;
  console.log("we are in deleteAComment", email, id);
  
  await User.findOne({ email: email }, (err, entry) => {
    if (err) return err;
    // console.log("this is our entry", entry);
    const index = entry.comments.indexOf(entry.comments.id(id));
    console.log('INDEXJSXJS', index)
    entry.comments.splice(index, 1);
    // const newMovieArray = entry.watchList.filter((movie) => movie._id !== id);
    // console.log("this is our newMovieArray", newMovieArray);
    entry.save();
    console.log(entry.comments);
    response.status(200).send(entry.comments);
  })
}




Data.addMovie = async(request, response) => {
  // console.log('inside of addAMovie', request.body);
  const email = request.body.email;
  const movie = { title: request.body.title, overview: request.body.overview, poster_path: request.body.poster_path, release_date: request.body.release_date, rating: request.body.rating};

  await User.findOne({ email: email }, (err, entry) => {
    if(err) return console.error(err);
    if(!entry){
      const user = new User({
        email: email,
        watchList: 
          [movie],
        comments:
          []  
      })
    user.save();
    response.status(200).send(user.watchList);
    } else{
    entry.watchList.push(movie);
    entry.save();
    response.status(200).send(entry.watchList);
    }
  })
}


// Data.deleteComment = async(request, response) => {
//   const commentId = request.params.commentId;
//   const email = request.query.email;
//   // console.log("we are in deleteAComment", email, movieId, idx);
//   await User.findByIdAndDelete(commentId, function (err, entry) {
//     if(err){
//       console.log(err.message)
//       } else{
//         response.status(200).send('success!');
//       }
//   }) 
// }

Data.updateComments = async (request, response) => {
  console.log("inside update");
    const id = request.params.commentId;
    console.log('req body!', request.body, 'id', id);
    const email = request.body.email;
    const comment = request.body.comment;
    const rating = request.body.rating;

    await User.findOne({ email: email }, (err, entry) => {
      if(err) return console.error(err);
      if(!entry){
        return console.error('User not found');
      }
    const comments = entry.comments;
    for (let i = 0; i < comments.length; i++ ) {
      console.log(comments[i]);
      if (comments[i]._id == id) {
        comments[i].comment = comment;
        comments[i].user_rating = rating;

        entry.save(function(err) {
          if (err){console.log(err.message)};
          console.log("comment updated");
          response.status(200).send(entry.comments);
        });
      } else {
        console.log("no comment with this id");
      }
    }  
    // const index = entry.comments.indexOf(entry.comments.id(id));
    // entry.comments.splice(index, 1, comment);
    // entry.save();
    // response.status(200).send(entry.comments);
    })
    // console.log('we are in updateAComment', {commentId, email, comment});
  //   Comment.findByIdAndUpdate(id, data, {new:true, useFindAndModify:false});
  //   response.status(200).send(item);
  // } catch(err){
  //   return ( comment );
  // }
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

// Data.addUser = async(request, response, next) => {
//   console.log('inside add user');
//   try{
//   const email = request.body.email;
//   // console.log(request.query);
//   const user = new User({
//       email: 'email',
//       watchList: 
//         [],
//       comments:
//         []  
//     })
//   const result = await user.save();
//   response.state(200).send(result);
//   } catch(err){
//     next(err)
//   }
// }

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
    response.status(200).send(entry);
  })
}

module.exports = Data;