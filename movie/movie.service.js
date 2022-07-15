
const db = require('../_helpers/db');
module.exports = {
    saveMovie,
    getByYear,
    update
};

async function update(params){
    var movie;
    
    if (/^ev\d{7}\/\d{4}(-\d)?$|^(ch|co|ev|nm|tt)\d{7}$/.test(params.title))
    {
        movie = await db.Movie.findOne({imdbID: params.title})
    }
    else
    {
        movie = await db.Movie.findOne({Title: params.title})
    }
    if(!movie)
        throw ({ status: 404, code: 'MOVIE_NOT_EXISTS', message: 'The movie does not exist please try adding the movie first.' });
    
    if(params.year)
        movie.Year = params.year
    if(params.rated)
        movie.Rated = params.rated
    if(params.released)
        movie.Released = params.released
    if(params.runTime)
        movie.Runtime = params.runTime
    if(params.genre)
        movie.Genre = params.genre
    if(params.director)
        movie.Director = params.director
    if(params.writer)
        movie.Writer = params.writer
    if(params.actors)
        movie.Actors = params.actors
    if(params.Plot)
        movie.Plot = params.plot
    if(params.country)
        movie.Country = params.country
    if(params.language)
        movie.Language = params.language
    if(params.awards)
        movie.Awards = params.awards
    if(params.poster)
        movie.Poster = params.poster
    if(params.ratings)
        movie.Ratings = params.ratings
    if(params.metaScore)
        movie.Metascore = params.metaScore
    if(params.imdbRating)
        movie.imdbRating = params.imdbRating
    if(params.imdbVotes)
        movie.imdbVotes = params.imdbVotes
    if(params.type)
        movie.Type = params.type
    if(params.dvd)
        movie.DVD = params.dvd
    if(params.boxOffice)
        movie.BoxOffice = params.boxOffice
    if(params.production)
        movie.Production = params.production
    if(params.website)
        movie.Website = params.website
    await movie.save()
    return(movie)
}
async function getByYear(year) {
    const movies = await db.Movie.
        find().
        where('Year').lte(year).
        sort({imdbRating: 'desc'}).
        select({ "Title": 1, "Year": 1, "Rated": 1, "Plot": 1, "Ratings": 1, "imdbID": 1})
    console.log(movies)
    return(movies)
}

async function saveMovie(params) {
    // validate
    if (await db.Movie.findOne({ Title: params.Title })) {
        throw ({ status: 409, code: 'MOVIE_ALREADY_EXISTS', message: 'Movie already exists' });
    }
    // create movie object

    const movie = new db.Movie(params);
    // save movie
    await movie.save();
    return movie
}

