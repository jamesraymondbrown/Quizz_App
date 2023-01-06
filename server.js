// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');

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
  keys: ['key1']
}));
app.use(function (req, res, next) {
  res.locals.user = req. session.userId;
  next();
});
// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const quizRoutes = require('./routes/quiz-router');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const registerRoutes = require('./routes/register');
const quizTakerRoutes = require('./routes/quiz-taker');
const scoresRoutes = require('./routes/scores-routes');
const accountRoutes = require('./routes/account');
const db = require('./db/connection');



// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/quiz', quizRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/register', registerRoutes);
app.use('/account', accountRoutes);
app.use('/scores', scoresRoutes);
// Note: mount other resources here, using the same pattern above
app.use('/quiztaker', quizTakerRoutes);
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  db.query(`SELECT quizzes.name AS quiz_name, quizzes.id AS quiz_id
  FROM quizzes
  WHERE quizzes.private = false;`)
  .then((response) => {
    const templateVars = {
      quiz: response.rows,
    }
    console.log('varsLog', templateVars);
    console.log('varsLog.starwars!', templateVars.quiz[0].quiz_name);
    res.render('index', templateVars);
  })
  .catch((err) => {
    console.log('ERROR MESSAGE::::', err.message);
    return null;
  });

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
