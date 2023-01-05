const { realpathSync } = require('fs');
const db = require('../connection');

const getQuizzes = () => {
  return db.query('SELECT * from quizzes;')
    .then((response) => {
      return response.rows;
    });
};

const addQuiz = (quiz) => {
  console.log('inside quiz queries', quiz)
  return db.query('INSERT INTO quizzes (name, description, private, user_id) VALUES ($1, $2, $3, $4) RETURNING *;', [quiz.name, quiz.description, quiz.type, quiz.user])
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

const editQuiz = (quiz) => {
  return db.query('UPDATE quizzes SET name = $1, description = $2, private = $3 WHERE id = $4 RETURNING *;', [quiz.name, quiz.description, quiz.type, quiz.id])
    .then((response) => {
      return response.rows[0];
    });
};

const editQuestion = (question) => {
  return db.query('UPDATE questions SET question = $1, correct_answer = $2, option1 = $3, option2 = $4, option3 = $5 WHERE quiz_id = $6 AND qnumber = $7;', [question.name, question.correct, question.option1, question.option2, question.option3, question.quizId, question.qNumber])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getQuizzes,
  addQuiz,
  addQuestion,
  getQuizByID,
  editQuiz,
  editQuestion
};
