/*
 * All routes for public quizzes are defined here
 * Since this file is loaded in server.js into /public-quizzes,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('public-quizzes');
});

module.exports = router;
