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
  return `${score} out of 10`
};

router.get('/', (req, res) => {

  let answersArray = [2, 'A band from Liverpool', 'John and George', 'He was ugly', 'Yellow', 'Mop-tops', 'We will never know for sure', 'Apple records', 'Jesus', 'George', 'The other ones are dead']

  db.query(`SELECT * FROM questions WHERE quiz_id = ${answersArray[0]}`)
  .then((response) => {
    console.log('response.log', response.rows)
    const quizData = response.rows;
    const score = scoreCounter(answersArray, quizData)
    res.render('results', {quizData, answersArray, score})
  })
  // .then(function (newResult) {
  //   db.query(`INSERT INTO scores (score) VALUES (9) RETURNING *;`)
  //   res.render('results', {quizData, answersArray, score})
  // })
});


// router.post("/", (req, res) => {
//   const userEmail = req.body.email;
//   const password = req.body.password;
//   const hashedPassword = bcrypt.hashSync(password, 10);
//   if (userEmail === "" || password === "") {
//     res.status(400).send("Please check that you've inputted a username and password!");
//   // } else if (getUserByEmail(req.body.email, users) !== null) {
//   //   res.status(400).send("That email already has an account registered!");
//   } else {
//     // console.log('req.bodyLog', req.body.name, bcrypt.hashSync(req.body.password, 10));

//     db.query(`INSERT INTO users (name, email, password)
//     VALUES ($1, $2, $3)
//     RETURNING *;`, [req.body.name, req.body.email, hashedPassword])
//     .then((response) => {
//       console.log('insert query response', response.rows);
//       // return result.rows[0];
//       res.render('login');
//     })
//     .catch((err) => {
//       console.log('addUser error', err.message);
//       return null;
//     });
//   }
// });


module.exports = router;
