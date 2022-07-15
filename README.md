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
  <pre>
      <code>
  npm i
  </code>
  </pre>
  </i>
  </li>
  <li> 
    <p>
      Start the server 
    </p>
    <i>
    <pre>
    <code>
    npm run start
    </code>
    </pre> </i>
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
    <p>
      <b> Sample Input </b>
    </p>
      <i>
      <pre>
      <code>
      {
        "first_name" : "Nipun",
        "last_name" : "Agarwal",
        "email: "nipun@test.com",
        "password": "test@123"
      }
      </code>
  </pre>
      </i>
      
       
  </li>
  <hr>
  <li>
    <i id="login"> /user/login </i>
    <p><b>POST</b></p>
    <p> Required fields are: </p>
    <ul>
      <li> email </li>
      <li> password </li>
    </ul>
    <p> On success (200) it returns a user object with the access token </p>
    <p>
      <b> Sample Input </b>
    </p>
      <i>
      <pre>
      <code>
      {
        "email: "nipun@test.com",
        "password": "test@123"
      }
      </code>
  </pre>
      </i>
  </li>
  <hr>
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
    <p>
      <b> Sample Input </b>
    </p>
      <i>
      <pre>
      <code>
      {
        "token: "TOKEN FROM LOGIN",
        "title": "tt2911666" //imdb id or movie name ('John Wick')
      }
      </code>
      </pre>
      </i>
  </li>
  <hr>
  <li>
    <i> /movie/getByYear</i>
    <p><b>GET</b></p>
    <p> Required parameters/fields are </p>
    <ul>
      <li> token </li>
      <li> year </li>
    </ul>
    <p> <b> NOTE: </b> token can be passed as a query parameter/header(x-access-token)/in the body. Year is any year for which you want to get the movies from it can be passed in the url query parameters or in the body. Token is obtained from the <a href="#login">/user/login </a> route.</p>
    <p> On Success (200) returns a list of movies released uptil the year mentioned and ordered by their imdb rating </p>
    <p>
      <b> Sample Input </b>
    </p>
      <i>
      <pre>
      <code>
      {
        "token: "TOKEN FROM LOGIN",
        "year": "2015" //all movies released upto 2015
      }
      </code>
  </pre>
      </i>
     
  </li>
  <li>
    <i> /movies/updateMovie</i>
    <p><b>PATCH</b></p>
    <p> Required parameters/fields are </p>
    <ul>
      <li> token </li>
      <li> title </li> //Must be the exact title of the movie or can be the imdb id of the movie
    </ul>
    <p> Optional fields are </p>
    <ul>
    <li>year</li>
    <li>rated</li>
    <li>released</li>
    <li>runTime</li>
    <li>genre</li>
    <li>director</li>
    <li>writer</li>
    <li>actors</li>
    <li>plot</li>
    <li>country</li>
    <li>language</li>
    <li>awards</li>
    <li>poster</li>
    <li>ratings</li>
    <li>metascore</li>
    <li>imdbRating</li>
    <li>imdbVotes</li>
    <li>type</li>
    <li>dvd</li>
    <li>boxOffice</li>
    <li>production</li>
    <li>website</li>
    </ul>
    <p> <b> NOTE: </b>Token can be passed as a query parameter/header(x-access-token)/in the body. Year is any year for which you want to get the movies from it can be passed in the url query parameters or in the body. Token is obtained from the <a href="#login">/user/login </a> route.</p>
    <p> <b> NOTE: </b>See the sample for expected values of all the fields. User doesnt have to input all the fields only the entered fields will be updated</p>  
    <p> On Success (200) returns a movies object updated with the input fields provided. </p>
    <p>
      <b> Sample Input </b>
    </p>
    <pre>
    <code>
      <i>
      {
        "token": "TOKEN FROM LOGIN HERE",
        "title": "tt0292490",
        "year": "2002",
        "rated": "R",
        "released": "12/11/1981",
        "runTime": "189 min",
        "genre": "Comedy, Drama, Romance",
        "director": "John Doe",
        "writer": "John Doe, John Dane",
        "actors": "John Doe, John Dane",
        "plot": "lorem",
        "country": "India",
        "language": "Hindi",
        "awards": "10 wins & 30 nominations",
        "poster": "lorem",
        "ratings": [{
            "Source": "Internet Movie Database",
            "Value": "8.2/10"
        }],
        "metaScore": "85",
        "imdbRating": "9.1",
        "imdbVotes": "71,537",
        "type": "movie",
        "dvd": "12/11/1983",
        "boxOffice": "$116,900,694",
        "production": "John Productions",
        "website": "Jane Doe"
      }
      </code>
  </pre>
      </i>
  </li>
  <hr>
  </ul>
  
  
  <b><h4> Note by default it runs on port 3000 you can specify a PORT variable in the .env file if you want it to run on some other port.</h4></b>
  
   
    
