DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE scores (
  id SERIAL PRIMARY KEY NOT NULL,
  your_score INTEGER NOT NULL
);