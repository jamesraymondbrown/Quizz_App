const express = require('express');
const router = express.Router();

// GET /quiz
router.get('/', (req, res) => {
  res.render('quiz');
});

// GET /quiz/new
router.get('/new', (req, res) => {
  res.render('new-quiz');
});

module.exports = router;
