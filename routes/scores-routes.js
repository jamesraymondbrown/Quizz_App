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
  return score
};

// Currently this GET route POSTS to the db. This route should be changed to work as the
// quiztaker submission route, if possible. It will then redirect to the score page for
// that recent quiz attempt
router.get('/', (req, res) => {

  const answersArray = [2, 'A band from Liverpool', 'John and George', 'He was ugly', 'Yellow', 'Mop-tops', 'We will never know for sure', 'Apple records', 'Jesus', 'George', 'The other ones are dead'];

  const userId = req.session.userId;

  return db.query(`SELECT * FROM questions WHERE quiz_id = ${answersArray[0]}`)
  .then((response) => {
    const quizData = response.rows;
    const score = scoreCounter(answersArray, quizData)
    return db.query(`INSERT INTO scores (user_score, quiz_id, user_id)
    VALUES ($1, $2, $3);`, [score, answersArray[0], userId]);
  })
  .then((response) => {
    return db.query(`SELECT * FROM scores ORDER BY ID DESC LIMIT 1`);
  })
  .then((response) => {
    console.log('new_attempt_score', response.rows[0]);
    const currentAttemptScoreId = response.rows[0].id
    res.redirect(`/scores/${currentAttemptScoreId}`)
  })
  .catch((err) => {
    console.log('get/answers error', err.message);
    return null;
  });
});

router.post('/', (req, res) => {
  console.log('post req.body', req.body);
  const answersArray = [2, 'A band from Liverpool', 'John and George', 'He was ugly', 'Yellow', 'Mop-tops', 'We will never know for sure', 'Apple records', 'Jesus', 'George', 'The other ones are dead'];

  const userId = req.session.userId;

  return db.query(`SELECT * FROM questions WHERE quiz_id = ${answersArray[0]}`)
  .then((response) => {
    const quizData = response.rows;
    const score = scoreCounter(answersArray, quizData)
    return db.query(`INSERT INTO scores (user_score, quiz_id, user_id)
    VALUES ($1, $2, $3);`, [score, answersArray[0], userId]);
  })
  .then((response) => {
    return db.query(`SELECT * FROM scores ORDER BY ID DESC LIMIT 1`);
  })
  .then((response) => {
    console.log('new_attempt_score', response.rows[0]);
    const currentAttemptScoreId = response.rows[0].id
    res.redirect(`/scores/${currentAttemptScoreId}`)
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
  })
  .catch((err) => {
    console.log('get/answers error', err.message);
    return null;
  });
});

module.exports = router;
