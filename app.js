if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const omdb = `http://www.omdbapi.com/?apikey=${process.env.omdbKey}&&`
const express = require('express')
const Joi = require('joi');
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
const movieService = require('./movie/movie.service')
const userService = require('./user/user.service')
const auth = require('./_helpers/auth')

//Middleware and Setup
app.use(bodyParser.json())
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))


//routes
app.patch('/movies/updateMovie', auth, updateMovie)
app.get('/movie/getByYear', auth, filterMovie);
app.post('/movie/getMovie', auth, getMovie);
app.post('/user/register', registerUser);
app.post('/user/login', authenticateUser);


//functions
async function updateMovie(req, res, next) {
  const params = req.body;
  console.log(params);
  try {
    const movie = await movieService.update(params);
    res.status(400).json(movie)
  }
  catch (e) {
    console.log(e);
    res.status(e.status).json(e)
  }
}
async function filterMovie(req, res, next) {
  let year = req.query.year || req.body.year;
  const movies = await movieService.getByYear(year)
  res.json(movies);
}

async function authenticateUser(req, res, next) {
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await userService.authenticate(email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(e.status).json(err)
  }

}

async function registerUser(req, res, next) {
  try {
    // Get user input
    const params = req.body;
    console.log(params)
    // Validate user input
    if (!(params.email && params.password && params.first_name && params.last_name)) {
      res.status(400).send("All input is required");
    }
    const user = await userService.register(params);
    console.log(user)
    res.status(201).json(user);
  }
  catch (e) {
    res.status(e.status).json(e);
  }
}


async function getMovie(req, res, next) {
  var params = req.body;
  let movie, response;
  
  try {
    if (/^ev\d{7}\/\d{4}(-\d)?$|^(ch|co|ev|nm|tt)\d{7}$/.test(params.title)) {
      response = await axios({
        method: 'get',
        url: omdb,
        params: {
          i: params.title
        }
      })
    }
    else {
      response = await axios({
        method: 'get',
        url: omdb,
        params: {
          t: params.title
        }
      })  
    }
    if(response.data.Error)
      throw({'Err_Message': response.data.Error})
    movie = await movieService.saveMovie(response.data);
    res.status(200).json(movie);
  }
  catch (e) {
    res.json(e)
  }

}



//server run
const port = process.env.PORT || 3000
app.listen(port)
console.log("App listening on port " + port)