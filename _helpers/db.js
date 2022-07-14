const mongoose = require('mongoose');
const connectionOptions = {  useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(process.env.mongoURI, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    Movie: require('../movie/movie.model'),
    User: require('../user/user.model'),
    isValidId
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

