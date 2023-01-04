const express = require('express');
const quizQueries = require('../db/queries/quiz-queries');
const router = express.Router();

router.get('/', (req, res) => {
  quizQueries.getQuizzes()
    .then((quizzes) => {
      res.json(quizzes);
    });
});

// GET /quiz/new
router.get('/new', (req, res) => {
  res.render('new-quiz');
});

// POST /quiz/new
router.post('/new', (req, res) => {
  const quizData = {
    name: req.body['quiz-name'],
    description: req.body['quiz-name']
  };
  quizQueries.addQuiz(quizData)
    .then((quiz) => {
      return quiz.id;
    })
    .then((quiz_id) => {
      for (let x = 1; x <= 10; x++) {
        const questionData = {
          qNumber: x,
          name: req.body[`q${x}-description`],
          correct: req.body[`q${x}-answer`],
          option1: req.body[`q${x}-option1`],
          option2: req.body[`q${x}-option2`],
          option3: req.body[`q${x}-option3`],
          quizId: quiz_id
        };
        quizQueries.addQuestion(questionData)
      }
    });
    res.render('index');
});

// GET /quiz/new
router.get('/edit/:id', (req, res) => {
  quizQueries.getQuizByID(req.params.id)
    .then((quiz) => {
      const templateVars = { quiz };
      res.render('edit-quiz', templateVars);
    });
});

module.exports = router;
