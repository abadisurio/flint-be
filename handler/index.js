const registerUser = require('./registerUser');
const signinUser = require('./signinUser');
const getAllMovies = require('./getAllMovies');
const getAllMoviesWithLink = require('./getAllMoviesWithLink');
const getAllMoviesWithDetail = require('./getAllMoviesWithDetail');
const getMovieByUserRatings = require('./getMovieByUserRatings');
const setMovieLevel = require('./setMovieLevel');
const getLikedMovies = require('./getLikedMovies');
const getFilteredMoviesWithDetail = require('./getFilteredMoviesWithDetail');

module.exports = {
    registerUser,
    signinUser,
    getAllMovies,
    getAllMoviesWithLink,
    getAllMoviesWithDetail,
    getFilteredMoviesWithDetail,
    getMovieByUserRatings,
    setMovieLevel,
    getLikedMovies
}