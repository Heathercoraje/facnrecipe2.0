const dbConnection = require('../database/db_connection');

const addNewRecipeQuery = `INSERT INTO recipe (name, ingredients, procedure, cuisine) VALUES ($1, $2, $3, $4);`;

const addNewRecipe = (recipeInput, callback) => {
  const {
    name,
    ingredients,
    directions,
    origin
  } = recipeInput;
  //this 4 different const varibales are to store values of each key  of object recipeInput

  dbConnection.query(addNewRecipeQuery, [name, ingredients, directions, origin], (err, res) => {
    if (err) {
      console.log(err)
      return callback(err);
    } else {
      console.log('new data entered');
      callback(null);
      //what is this callback doing.............ugf callback..
      //maybe I don't need res? because I am not sending back to browser?
      //this callback has been defined in handlers.handleNewRecipe
    }
  });
}

module.exports = addNewRecipe;
