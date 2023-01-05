DROP TABLE IF EXISTS quizzes CASCADE;
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  type VARCHAR(10) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL
);
