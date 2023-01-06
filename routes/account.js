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
  db.query(`SELECT users.id, name
    FROM users
    WHERE users.id = ${req.session.userId};`)
    .then((response) => {
      console.log(response.rows)
      const templateVars = response.rows;
      console.log('varsLog', templateVars);
      res.render('account', {templateVars});
    })
    .catch((err) => {
      console.log('accountRouteErrorMessage', err.message);
      return null;
    });
});


module.exports = router;
