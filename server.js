// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ['superSecretKey', 'anotherEvenMoreSecretKey'],
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const quizRoutes = require('./routes/quiz-router');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const accountRoutes = require('./routes/account');
const publicQuizzesRoutes = require('./routes/public-quizzes');
const myQuizzesRoutes = require('./routes/my-quizzes');
const quizResultsRoutes = require('./routes/quiz-results');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/quiz', quizRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/account', accountRoutes);
app.use('/public-quizzes', publicQuizzesRoutes);
app.use('/my-quizzes', myQuizzesRoutes);
app.use('/quiz-results', quizResultsRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get("/login", (req, res) => {
//   const templateVars = {
//     //user: users[req.session.user_id]
//   };
//   // if (req.session.user_id !== undefined) {
//   //   res.redirect("/urls");
//   // }
//   res.render("login", templateVars);
// });

// app.post("/login", (req, res) => {
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

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
