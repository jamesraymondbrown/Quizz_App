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


module.exports = router;
