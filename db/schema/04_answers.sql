DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) NOT NULL,
  question_number INTEGER,
  user_answer VARCHAR(100) NOT NULL
  -- correct_answer VARCHAR(100) REFERENCES questions(correct_answer) NOT NULL,
);
