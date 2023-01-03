const db = require('../connection');

const getQuizzes = () => {
  return db.query('SELECT * from quizzes;')
    .then((response) => {
      return response.rows;
    });
};

module.exports = {
  getQuizzes
};
