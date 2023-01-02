const express = require('express');
const router = express.Router();

// GET /quiz
router.get('/', (req, res) => {
  res.render('quiz');
});


module.exports = router;
