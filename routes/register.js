/*
 * All routes for /register are defined here
 * Since this file is loaded in server.js into login,
 *   these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const bcrypt = require("bcryptjs");
//const userQueries = require('../db/queries/users'); --> connect to the db?

router.get("/", (req, res) => {
  const templateVars = {
    //user: users[req.session.user_id]
  };
  // if (req.session.user_id !== undefined) {
  //   res.redirect("/urls");
  // }
  res.render("register", templateVars);
});

router.post("/", (req, res) => {
  const userEmail = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  if (userEmail === "" || password === "") {
    res.status(400).send("Please check that you've inputted a username and password!");
  // } else if (getUserByEmail(req.body.email, users) !== null) {
  //   res.status(400).send("That email already has an account registered!");
  } else {
    // console.log('req.bodyLog', req.body.name, bcrypt.hashSync(req.body.password, 10));

    db.query(`INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;`, [req.body.name, req.body.email, hashedPassword])
    .then((response) => {
      console.log('insert query response', response.rows);
      // return result.rows[0];
      res.render('login');
    })
    .catch((err) => {
      console.log('addUser error', err.message);
      return null;
    });
  }
});

module.exports = router;
