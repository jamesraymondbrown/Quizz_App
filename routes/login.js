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
//const userQueries = require('../db/queries/users'); --> connect to the db?

router.get("/", (req, res) => {
  const templateVars = {
    //user: users[req.session.user_id]
  };
  // if (req.session.user_id !== undefined) {
  //   res.redirect("/urls");
  // }
  db.query(`SELECT * FROM users`)
  .then((response) => {
    console.log('responseLog', response.rows)
    res.render('login');
  });
  // res.render('login', templateVars);
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
      // console.log('userResponseLog', user)
      if (bcrypt.compareSync(password, user.password)) {
        return user;
    }
    return null;
  });
};


router.post("/", (req, res) => {
  // const {email, password} = req.body;
  login(req.body.email, req.body.password)
    .then(user => {
      if (!user) {
        console.log('no user');
        res.status(400).send("Please check that you've inputted the correct username and password!");
        return;
      }
      req.session.userId = user.id;
      console.log('cookiesLog', req.sessionOptions.userId);
      //res.send({user: {name: user.name, email: user.email, id: user.id}});
      res.render('account')
    })
    .catch(e => {
      console.log('an error occured in the login.js post route');
      res.send(e)});
  // const userEmail = req.body.email;
  // const password = req.body.password;
  // const userID = getUserByEmail(userEmail, users);
  // if (getUserByEmail(req.body.email, users) === null) {
  //   res.status(403).send("User not found!");
  // } if (checkUsersPassword(password) === true || bcrypt.compareSync(password, users[userID].password) === true) {
  //   let loginUserID = getUserByEmail(userEmail, users);
  //   req.session.user_id = users[loginUserID].id;
  //   res.redirect(`/urls`);
  // } else {
  //   res.status(403).send("Incorrect Password!");
  // }
});

module.exports = router;
