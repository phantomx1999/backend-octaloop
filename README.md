<h1 align="center"> backend-octaloop </h1>
<div id="header" align="center">
  <img src="https://media.giphy.com/media/M9gbBd9nbDrOTu1Mqx/giphy.gif" width="100"/>
</div>
<img src="https://komarev.com/ghpvc/?username=phantomx1999&style=flat-square&color=blue" alt=""/>
<h2> Running the Application </h2>
<ul> 
  <li> 
    <p>
      Clone the repo
    </p>
    <i>
    git clone <b>URL</b>
    </i>
  </li>
  <li> <p>Install all dependencies using the command below</p>
  <i>
  npm i
  </i>
  </li>
  <li> 
    <p>
      Start the server 
    </p>
    <i> npm run start </i>
  </li>
</ul>

<hr>

<h2> Routes </h2>

<ul>
  <li> 
    <i> 
      /user/register 
    </i>
    <p><b>POST</b></p>
    <p>
      Required parameters are:
    </p>
    <ul>
      <li> first_name </li>
      <li> last_name </li>
      <li> email </li>
      <li> password </li>
    </ul>
    <p> Expected input is string values for all. On Success (201) it returns a user object with the access token</p>
  </li>
  <li>
    <i id="login"> /user/login </i>
    <p><b>POST</b></p>
    <p> Required fields are: </p>
    <ul>
      <li> email </li>
      <li> password </li>
    </ul>
    <p> On success (200) it returns a user object with the access token </p>
  </li>
  <h3> Protected Routes </h3>
  <li> 
    <i> /movie/getMovie </i>
    <p><b>POST</b></p>
    <p> Requried fields are: </p>
    <ul>
      <li> token </li>
      <li> title </li>
    </ul>
    <p> <b> NOTE: </b> token can be passed as a query parameter/header(x-access-token)/in the body. Title can be a movie name or imdb id of the movie. Token is obtained from the <a href="#login">/user/login </a> route.</p>
    <p> On Sucess(200) returns a movie object which has been saved on mongodb</p>
  </li>
  <li>
    <i> /movie/getByYear/:year </i>
    <p><b>GET</b></p>
    <p> Required parameters/fields are </p>
    <ul>
      <li> token </li>
      <li> year </li>
    </ul>
    <p> <b> NOTE: </b> token can be passed as a query parameter/header(x-access-token)/in the body. Year is any year for which you want to get the movies from it can be passed in the url query parameters or in the body. Token is obtained from the <a href="#login">/user/login </a> route.</p>
    <p> On Success (200) returns a list of movies released uptil the year mentioned and ordered by their imdb rating </p>
  </li>
  </ul>
  
  
  <b><h4> Note by default it runs on port 3000 you can specify a PORT variable in the .env file if you want it to run on some other port.</h4></b>
  
   
    
