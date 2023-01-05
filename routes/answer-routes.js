/*
 * All routes for public quizzes are defined here
 * Since this file is loaded in server.js into /public-quizzes,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {

  let answersArray = [2, 'A band from Liverpool', 'John and George', 'He was ugly', 'Yellow', 'Mop-tops', 'We will never know for sure', 'Apple records', 'Jesus', 'George', 'The other ones are dead']


  db.query(`SELECT * FROM questions WHERE quiz_id = ${answersArray[0]}`)
  .then((response) => {
    console.log('response.log', response.rows)
    const quizzes = response.rows;
    res.render('register', {quizzes})
  });
});

// router.get('/my-quizzes', (req, res) => {
//   if (!req.session.userId) {
//     return res.redirect('/login');
//   } db.query(`SELECT * FROM quizzes WHERE user_id = ${req.session.userId}`)
//     .then((response) => {
//       console.log('response.log', response.rows)
//       const quizzes = response.rows;
//       res.render('my-quizzes', {quizzes})
//     });
// });

module.exports = router;
