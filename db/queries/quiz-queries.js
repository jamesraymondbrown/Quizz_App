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
  return db.query('INSERT INTO questions (question, correct_answer, option1, option2, option3, quiz_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [question.name, question.correct, question.option1, question.option2, question.option3, question.quizId])
    .then((response) => {
      return response.rows[0];
    });
};

module.exports = {
  getQuizzes,
  addQuiz,
  addQuestion
};
