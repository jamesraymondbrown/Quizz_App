/*
 * All routes for public quizzes are defined here
 * Since this file is loaded in server.js into /public-quizzes,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  db.query('SELECT * FROM quizzes;')
    .then((response) => {
      const quizzes = response.rows;
      console.log('quizObject Log', quizzes);
      // res.json(quizObject);
      res.render('public-quizzes', {quizzes})
    });

    // res.render({template:'index', { user : user}}

  // res.render('public-quizzes');
});

module.exports = router;
