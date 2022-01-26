const registerUser = require('./registerUser');
const signinUser = require('./signinUser');
const getAllMovies = require('./getAllMovies');
const getAllMoviesWithLink = require('./getAllMoviesWithLink');
const getAllMoviesWithDetail = require('./getAllMoviesWithDetail');
const getMovieByUserRatings = require('./getMovieByUserRatings');

module.exports = {
    registerUser,
    signinUser,
    getAllMovies,
    getAllMoviesWithLink,
    getAllMoviesWithDetail,
    getMovieByUserRatings
}