/*
 * All routes for /login are defined here
 * Since this file is loaded in server.js into login,
 *   these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.use((req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  next();
})

router.get("/", (req, res) => {
  const templateVars = {
    //user: users[req.session.user_id]
  };
  // if (req.session.user_id !== undefined) {
  //   res.redirect("/urls");
  // }
  res.render('account', templateVars);
});

// router.post("/", (req, res) => {
//   const userEmail = req.body.email;
//   const password = req.body.password;
//   const userID = getUserByEmail(userEmail, users);
//   if (getUserByEmail(req.body.email, users) === null) {
//     res.status(403).send("User not found!");
//   } if (checkUsersPassword(password) === true || bcrypt.compareSync(password, users[userID].password) === true) {
//     let loginUserID = getUserByEmail(userEmail, users);
//     req.session.user_id = users[loginUserID].id;
//     res.redirect(`/urls`);
//   } else {
//     res.status(403).send("Incorrect Password!");
//   }
// });

module.exports = router;
