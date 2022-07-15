const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Title: { type: String, unique: true},
    Year: { type: String, default: "N/A" },
    Rated: { type: String, default: "N/A" },
    Released: { type: Date, default: null},
    Runtime: { type: String, default: "N/A"},
    Genre: { type: String, default: "N/A"},
    Director: { type: String, default: "N/A" },
    Writer: { type: String, default: "N/A" },
    Actors: {type: String, default: "N/A"},
    Plot: { type: String, default: "N/A"},
    Country: { type: String, default: "N/A"},
    Language: { type: String, default: "N/A"},
    Awards: { type: String, default: "N/A"},
    Poster: {type: String, default: "N/A"},
    Ratings : [{
        _id: false,
        Source : String,
        Value : String
    }],
    Metascore: {type: String, default: 0},
    imdbRating: Schema.Types.Mixed,
    imdbVotes: {type: String, default: "N/A"},
    imdbID: {type: String, default: "N/A", unique: true},
    Type: {type: String, default: "N/A"},
    DVD: {type: String, default: null},
    BoxOffice: {type: String, default: "N/A"},
    Production: {type: String, default: "N/A"},
    Website: {type: String, default: "N/A"}
});


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
        delete ret.id;
    }
});

module.exports = mongoose.model('Movie', schema);