DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  question VARCHAR(255) NOT NULL,
  correct_answer VARCHAR(100) NOT NULL,
  option1 VARCHAR(100) NOT NULL,
  option2 VARCHAR(100) NOT NULL,
  option3 VARCHAR(100) NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id)
);