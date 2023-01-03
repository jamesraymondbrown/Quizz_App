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
  res.render('new-quiz');
});

module.exports = router;
