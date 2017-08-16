const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const getData = require('./queries/getData.js');
const dbConnection = require('./database/db_connection');
const addNewRecipe = require('./queries/addData.js');
const cookie = require('cookie');
const {
  sign,
  verify
} = require('jsonwebtoken');

const handleHomeRoute = (response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html')
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, 'Content-Type: text/html')
      response.end('<h1> sorry, the page doesnt response </h1>')
    } else { //when (!error) then serve the file
      response.writeHead(200, 'Content-Type: text/html')
      response.end(file);
    }
  });
}

const handlePublic = (request, response) => {
  const fileName = request.url;
  const fileType = fileName.split(".")[1];
  const filePath = path.join(__dirname, "..", fileName);

  fs.readFile(filePath, function(error, file) {
    if (error) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem loading this page</h1>');
    } else {
      response.writeHead(200, {
        "Content-Type": "text/" + fileType
      });
      response.end(file);
    }
  });
}

const handleCuisine = (request, response) => {
  const endpoint = request.url.split('/')[1];
  getData(endpoint, (err, res) => {
    if (err) {
      return console.log('error querying the db');
    }
    const data = JSON.stringify(res);
    response.writeHead(200, {
      'content-type': 'application/json'
    });
    response.end(data);
  });
}

const handleNewRecipe = (request, response) => {
  let string = '';
  request.on('data', (chunk) => {
    string += chunk;
    //seding data from front to back

  });
  request.on('end', () => {
    //once the has arrived, I pass the data(string) and parse it then store it in varible recipeInput

    const recipeInput = qs.parse(string);
    //addNewRecipe function is in addData.js
    // addNewRecipe function essentially put recipeInput(sent by client via form) into database by using query
    addNewRecipe(recipeInput, (err) => {
      if (err) {
        response.writeHead(500, 'Content-Type: text/html');
        response.end('we cannot add your recipe')
      }
      //when (!err) then redirect to home
      response.writeHead(302, {
        'location': '/'
      });
      response.end();
    })
  });
}


//handleLogin function should 1)get login info 2) hash password then 3)validate whether this is the right dude
const handleLogin = (request, response) => {
  let string = '';
  request.on('data', (chunk) => {
    string += chunk;
  });
  request.on('end', () => {
    console.log(string); //this is data you get from the request before parsing it
    //username=heathercoraje&password=rafamel&submit=
    const loginInfo = qs.parse(string);
    console.log(loginInfo);
    //this is what you get after parsing it
    //{ username: 'heathercoraje', password: 'rafamel', submit: '' }

    validateLogin(loginInfo, (err) => {
      if (err) {
        return console.log(err);
      } else {
        //very much don't know what to do with this either...
      }

    })
  })
}
//put signupInfo into db using query
const handleSignup = (request, response) => {
  let string = '';
  request.on('data', (chunk) => {
    string += chunk;
  });
  request.on('end', () => {
    const signupInfo = qs.parse(string);
    //console.log(signupInfo);
    createUser(signupInfo, (err) => {
      if (err) return {}
      //don't know what to do...
    })
  })
}
//handle 404error
const handle404 = (request, response) => {
  response.writeHead(404, "Content-Type:text/html");
  response.end("<h1>404 not found</h1>");
}






module.exports = {
  handleHomeRoute,
  handlePublic,
  handleCuisine,
  handleNewRecipe,
  handleLogin,
  handleSignup,
  handle404
};
