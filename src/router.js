const http = require('http');
const pg = require('pg');
const {
  handleHomeRoute,
  handleCuisine,
  handleNewRecipe,
  handlePublic,
  handleLogin,
  handleSignup,
  handle404
} = require('./handlers');

//require all the functions I will use from the file called handlers

const router = (request, response) => {

  const endpoint = request.url.split('/')[1];
  console.log(endpoint);
  //when direct to another route, you get the url as (request.url)
  //is this router connected to function request on index.js line 70?

  if (endpoint === '') {
    handleHomeRoute(response);
    //if it is localhost:5000(aka main page)
    //call the function handleHomeRoute, this only passes one argument response because you only need to receive response(file)
  } else if (endpoint.match("^Asian|Arabic|British|Italian$")) {
    handleCuisine(request, response);
    //when click, it goes to each country's database and bring the data
  } else if (endpoint === 'add') {
    handleNewRecipe(request, response)
    //when click add button
    // it goes first handlers -> addData
  } else if (endpoint.match(/public/)) {
    handlePublic(request, response);
  } else if (endpoint.match(/login/)) {
    handleLogin(request, response);
  } else if (endpoint.match(/signup/)) {
    handleSignup(request, response);
  } else {
    handle404(request, response);
  }
};

module.exports = router;
