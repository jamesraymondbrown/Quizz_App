/*
 * All routes for /login are defined here
 * Since this file is loaded in server.js into login,
 *   these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcryptjs');

router.get("/", (req, res) => {
  // const templateVars = {
  //   //user: users[req.session.user_id]
  // };
  db.query(`SELECT * FROM scores`)
  .then((response) => {
    console.log('loginPageResponseLog', response.rows)
    res.render('login');
  });
});

const getUserWithEmail = function(email) {

  return db
  .query(`SELECT * FROM users WHERE email = $1;`, [email])
  .then((response) => {
    return response.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  });

};

/**
 *  * Check if a user exists with a given username and password
 *  * @param {String} email
 *  * @param {String} password encrypted
 *  */
const login =  function(email, password) {
    return getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
    }
    return null;
  });
};


router.post("/", (req, res) => {
  login(req.body.email, req.body.password)
    .then(user => {
      if (!user) {
        console.log('no user');
        res.status(400).send("Please check that you've inputted the correct username and password!");
        return;
      }
      req.session.userId = user.id;
      res.redirect('account')
    })
    .catch(e => {
      console.log('an error occured in the login.js post route');
      res.send(e)});
});

module.exports = router;
