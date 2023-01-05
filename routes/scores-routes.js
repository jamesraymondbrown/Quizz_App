/*
 * All routes for public quizzes are defined here
 * Since this file is loaded in server.js into /public-quizzes,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const db = require('../db/connection');


const scoreCounter = (answersArray, quizData) => {
  let score = 0;
  for (let i = 1; i < answersArray.length; i++) {
    for (let j = 0; j < quizData.length; j++) {
      if (answersArray[i] === quizData[j].correct_answer) {
        score += 1;
      }
    }
  }
  console.log('scorelog', score);
  return score
};

router.get('/', (req, res) => {

  const answersArray = [2, 'A band from Liverpool', 'John and George', 'He was ugly', 'Yellow', 'Mop-tops', 'We will never know for sure', 'Apple records', 'Jesus', 'George', 'The other ones are dead']

  const arrayToStoreValues = [];

  const userId = req.session.userId;

  db.query(`SELECT * FROM questions WHERE quiz_id = ${answersArray[0]}`)
  .then((response) => {
    console.log('response.log', response.rows)
    const quizData = response.rows;
    const score = scoreCounter(answersArray, quizData)
    arrayToStoreValues.push(score);
    res.render('results', {quizData, answersArray, score})
  })
  .then((response) => {
  // console.log('queryResponseLog', arrayToStoreValues)
  db.query(`INSERT INTO scores (user_score, quiz_id, user_id) VALUES ($1, $2, $3) RETURNING *;`, [arrayToStoreValues[0], answersArray[0], userId])
  //   res.render('results', {quizData, answersArray, score})
  })
  .then((response) => {
    db.query(`SELECT * FROM scores`)
    })
  .catch((err) => {
    console.log('get/answers error', err.message);
    return null;
  });
});

router.get('/:id', (req, res) => {

  db.query(`SELECT * FROM scores WHERE scores.id = ${req.params.id}`)
  .then((response) => {
    scoreData = response.rows[0];
    res.render('results', {scoreData});
    console.log('responselog69', scoreData);
  })
  .catch((err) => {
    console.log('get/answers error', err.message);
    return null;
  });
});

// router.post("/", (req, res) => {

//   let answersArray = [2, 'A band from Liverpool', 'John and George', 'He was ugly', 'Yellow', 'Mop-tops', 'We will never know for sure', 'Apple records', 'Jesus', 'George', 'The other ones are dead'];

//   db.query(`INSERT INTO scores (score)
//   VALUES ($1)
//   RETURNING *;` [scoreCounter()])
//   .then((response) => {
//     console.log('insert query response', response.rows);
//     // return result.rows[0];
//     res.render('login');
//   })
//   .catch((err) => {
//     console.log('addUser error', err.message);
//     return null;
//   });
// });


module.exports = router;
