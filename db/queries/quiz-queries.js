const { realpathSync } = require('fs');
const db = require('../connection');

const getQuizzes = () => {
  return db.query('SELECT * from quizzes;')
    .then((response) => {
      return response.rows;
    });
};

const addQuiz = (quiz) => {
  return db.query('INSERT INTO quizzes (name, description) VALUES ($1, $2) RETURNING *;', [quiz.name, quiz.description])
    .then((response) => {
      return response.rows[0];
    });
};

const addQuestion = (question) => {
  return db.query('INSERT INTO questions (qnumber, question, correct_answer, option1, option2, option3, quiz_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;', [question.qNumber, question.name, question.correct, question.option1, question.option2, question.option3, question.quizId])
    .then((response) => {
      return response.rows[0];
    });
};

const getQuizByID = (id) => {
  return db.query('SELECT * from quizzes JOIN questions ON quizzes.id = questions.quiz_id WHERE quizzes.id = $1 ORDER BY qnumber;', [id])
    .then((quiz) => {
      return quiz.rows;
    });
};

module.exports = {
  getQuizzes,
  addQuiz,
  addQuestion,
  getQuizByID
};
