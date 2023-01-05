/*
 * All routes for /login are defined here
 * Since this file is loaded in server.js into login,
 *   these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.use((req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  next();
})

router.get("/", (req, res) => {
  // console.log('userIDlog', req.session.userId);
  db.query(`SELECT quizzes.name AS quiz_name, quizzes.id AS quiz_id, users.name AS user_name, users.id AS user_id FROM quizzes
    JOIN users ON users.id = user_id
    WHERE user_id = ${req.session.userId};`)
    .then((response) => {
      const templateVars = response.rows;
      console.log('varsLog', templateVars);
      res.render('account', {templateVars});
    })
    .catch((err) => {
      console.log('accountRouteErrorMessage', err.message);
      return null;
    });
  //res.render('account', templateVars);
});

// = ${req.session.userId}
// where user.id = ${req.session.userId};


module.exports = router;
