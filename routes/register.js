/*
 * All routes for /login are defined here
 * Since this file is loaded in server.js into login,
 *   these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
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
  const id = generateRandomString();
  const userEmail = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);
  if (userEmail === "" || password === "") {
    res.status(400).send("Please check that you've inputted a username and password!");
  } else if (getUserByEmail(req.body.email, users) !== null) {
    res.status(400).send("That email already has an account registered!");
  } else {
    users[id] = {id: id, email: userEmail, password: hashedPassword};
    console.log("users:", users);
    req.session.user_id = users[id].id;
    res.redirect(`/urls`);
  }
});

module.exports = router;
