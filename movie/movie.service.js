
const db = require('../_helpers/db');
const moment = require('moment')
module.exports = {
    saveMovie,
    getByYear
};
async function getByYear(year) {
    
    const movies = await db.Movie.
        find().
        where('Released').lt(year).
        sort({imdbRating: 'desc'})
    console.log(movies)
    return(movies)
}

async function saveMovie(params) {
    // validate
    if (await db.Movie.findOne({ Title: params.Title })) {
        return;
    }
    // create movie object

    const movie = new db.Movie(params);
    // save movie
    await movie.save();
    return movie
}

