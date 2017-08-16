'use strict'

const dbConnection = require('../database/db_connection');

const bcrypt = require('bcryptjs');

//first, create function to hash password
const hashPassword = (password, callback) => {
  bcrypt.hash(password, 10, callback);

};
//then store the hash as const hashedPassword
const hashedPassword = hashPassword(password, (err, response) => {
  if (err) {
    return console.log(err);
  }
  console.log(response);
  return response;
})

//then compare password vs hashedPassword
const comparePasswords = (password, hashedPassword, callback) => {
  bcrypt.compare(password, hashPassword, (err, response) => {
    if (err) {
      return callback(err);
    }
    callback(err, response)
  });
  //wtf call is this callback doing
  //what is this response, is this boolean?
}

const validateLogin = (loginInfo, callback) => {
  //do we call comparePasswords function here?


}


//handleSignup needs createUser function
const createUser = (userInfo, callback) => {
  const {
    username,
    password,
    name,
    surname,
    email
  } = userInfo;


  const insertUser = "INSERT INTO users ( username, password, name, surname, email) VALUES ($1,$2, $3, $4, $5)"
  const post = [username, hashedPassword, name, surname, email];
  dbConnection.query(insertUser, post, (err, response) => {
    if (err) {
      return callback(err);

    }
    console.log('new user added!');
    callback(null, response);
  })

}


module.exports = {
  hashPassword,
  validateLogin,
  createUser

};
