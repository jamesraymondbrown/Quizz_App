const express = require('express');
const quizQueries = require('../db/queries/quiz-queries');
const router = express.Router();

router.use((req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  next();
})

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
    description: req.body['description'],
    type: req.body['type'],
    user: req.session.userId
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
  res.redirect('/');
});

// GET /quiz/edit/:id
router.get('/edit/:id', (req, res) => {
  quizQueries.getQuizByID(req.params.id)
    .then((quiz) => {
      console.log(quiz);
      const templateVars = { quiz };
      res.render('edit-quiz', templateVars);
    });
});

// POST /quiz/edit/:id
router.post('/edit/:id', (req, res) => {
  const quizData = {
    name: req.body['quiz-name'],
    description: req.body['description'],
    type: req.body['type'],
    id: req.params.id
  };

  quizQueries.editQuiz(quizData)
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
        console.log('edit in quiz router', questionData);
        quizQueries.editQuestion(questionData);
      }
    });
  res.redirect('/');
});

module.exports = router;
