const express = require('express');
const quizQueries = require('../db/queries/quiz-queries');
const router = express.Router();
const db = require('../db/connection');

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
    })
    .catch((err) => {
      console.log('post addQuiz error', err.message);
      return null;
    });
  res.redirect('/account');
});

// GET /quiz/edit/:id
router.get('/edit/:id', (req, res) => {
  quizQueries.getQuizByID(req.params.id)
    .then((quiz) => {
      console.log(quiz);
      const templateVars = { quiz };
      res.render('edit-quiz', templateVars);
    })
    .catch((err) => {
      console.log('POST edit/id error', err.message);
      return null;
    });
});

// GET /quiz/public
router.get('/public', (req, res) => {
  db.query('SELECT * FROM quizzes WHERE private = FALSE;')
    .then((response) => {
      const quizzes = response.rows;
      res.render('public-quizzes', {quizzes})
    })
    .catch((err) => {
      console.log('GET /public error', err.message);
      return null;
    });
});

router.get('/my-quiz-scores', (req, res) => {
  db.query(`SELECT scores.user_id AS user_id, user_score, quiz_id, quizzes.name AS quiz_name
  FROM scores
  JOIN quizzes ON quiz_id = quizzes.id
  WHERE scores.user_id = ${req.session.userId}`)
    .then((response) => {
      console.log('my-results-log', response.rows);
      const scores = response.rows;
      res.render('my-quiz-scores', {scores})
    });
});

// GET /quiz/my-quizzes
router.get('/my-quizzes', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  } db.query(`SELECT * FROM quizzes WHERE user_id = ${req.session.userId}`)
    .then((response) => {
      console.log('response.log', response.rows)
      const quizzes = response.rows;
      res.render('my-quizzes', {quizzes})
    })
    .catch((err) => {
      console.log('GET my quizzes error', err.message);
      return null;
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
        quizQueries.editQuestion(questionData);
      }
    })
    .catch((err) => {
      console.log('POST /quiz/edit/id error', err.message);
      return null;
    });
  res.redirect('/account');
});

module.exports = router;
