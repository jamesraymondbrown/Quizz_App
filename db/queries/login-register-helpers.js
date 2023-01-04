// Functions to help with james' login and register post requests.
// I'll come back and integrated these later if I have time, to clean up the code in our routes files

const getUserWithEmail = function(email) {

  return db
  .query(`SELECT * FROM users WHERE email = $1;`, [email])
  .then((result) => {
    console.log(result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  });

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  return db
  .query(`SELECT * FROM users WHERE users.id = $1;`, [id])
  .then((result) => {
    console.log(result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
    return null;
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(input) {

  return db
  .query(`INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`, [input.name, input.email, input.password])
  .then((result) => {
    console.log(result.rows);
    return result.rows[0];
  })
  .catch((err) => {
    console.log('addUser error', err.message);
    return null;
  });

}
exports.addUser = addUser;
