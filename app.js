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
app.post('/movie/getByYear/:year', auth, filterMovie);
app.post('/movie/getMovie', auth, getMovie);
app.post('/user/register', registerUser);
app.post('/user/login', authenticateUser);


//functions
async function filterMovie(req, res, next) {
  let year = req.params.year;
  let d = new Date(year, 12);
  const movies = await movieService.getByYear(d)
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
    res.status(201).json(user);
  } catch (err) {
    res.json(err)
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
    console.log(e);
  }
}


async function getMovie(req, res, next) {
  const params = req.body;
  if (/^ev\d{7}\/\d{4}(-\d)?$|^(ch|co|ev|nm|tt)\d{7}$/.test(params.title)) {
    let response = await axios({
      method: 'get',
      url: omdb,
      params: {
        i: params.title
      }
    })
    let movie = await movieService.saveMovie(response.data);
    if (movie)
      res.json(movie)
    else
      res.json({ 'Message': "Movie Already Saved" })
  }
  else {
    let response = await axios({
      method: 'get',
      url: omdb,
      params: {
        t: params.title
      }
    })
    let movie = await movieService.saveMovie(response.data);
    if (movie)
      res.json(movie)
    else
      res.json({ 'Message': "Movie Already Saved" })
  }
}



//server run
const port = process.env.PORT || 3000
app.listen(port)
console.log("App listening on port " + port)