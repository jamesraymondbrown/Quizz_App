const express = require('express');
const router = express.Router();
const db = require('../db/connection');
router.get('/', (req, res) => {

  const templateVars = {

  };
  res.redirect('quiz', templateVars);
});
// DROP TABLE IF EXISTS questions CASCADE;
// CREATE TABLE questions (
//   id SERIAL PRIMARY KEY NOT NULL,
//   qnumber INTEGER NOT NULL,
//   question VARCHAR(255) NOT NULL,
//   correct_answer VARCHAR(100) NOT NULL,
//   option1 VARCHAR(100) NOT NULL,
//   option2 VARCHAR(100) NOT NULL,
//   option3 VARCHAR(100) NOT NULL,
//   quiz_id INTEGER REFERENCES quizzes(id) NOT NULL
// );
router.get('/:id', (req, res) => {
  console.log('REQ PARAMS HERE', req.params.id);
  // db.query(`SELECT quizzes.name AS quiz_name, quizzes.description AS quiz_desc, questions.question AS question
  // FROM quizzes
  // JOIN questions ON questions.id = quizzes.id
  // WHERE quizzes.id = ${req.params.id};`)
  db.query(`SELECT * from quizzes JOIN questions ON quizzes.id = questions.quiz_id WHERE quizzes.id = ${req.params.id} ORDER BY qnumber;`)
    .then((response) => {
      const templateVars = {
        quiz: response.rows,
      };
      console.log('response rows', response.rows);
      console.log('varsLog', templateVars);
      console.log('varsLog.starwars!', templateVars.quiz[0].name);
      res.render('quiz', templateVars);
    })
    .catch((err) => {
      console.log('ERROR MESSAGE::::', err.message);
      return null;
    });

});

// app.get('/', (req, res) => {
//   db.query(`SELECT quizzes.name AS quiz_name, quizzes.id AS quiz_id
//   FROM quizzes
//   WHERE quizzes.private = false;`)
//   .then((response) => {
//     const templateVars = {
//       quiz: response.rows,
//     }
//     console.log('varsLog', templateVars);
//     console.log('varsLog.starwars!', templateVars.quiz[0].quiz_name);
//     res.render('index', templateVars);
//   })
//   .catch((err) => {
//     console.log('ERROR MESSAGE::::', err.message);
//     return null;
//   });

// });
module.exports = router;
