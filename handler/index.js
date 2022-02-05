const registerUser = require('./registerUser');
const signinUser = require('./signinUser');
const getAllMovies = require('./getAllMovies');
const getAllMoviesWithLink = require('./getAllMoviesWithLink');
const getAllMoviesWithDetail = require('./getAllMoviesWithDetail');
const getMovieByUserRatings = require('./getMovieByUserRatings');
const setMovieLevel = require('./setMovieLevel');
const getMovieLevels = require('./getMovieLevels');
const getFilteredMoviesWithDetail = require('./getFilteredMoviesWithDetail');
const getLikedMoviesWithDetail = require('./getLikedMoviesWithDetail');

module.exports = {
    registerUser,
    signinUser,
    getAllMovies,
    getAllMoviesWithLink,
    getAllMoviesWithDetail,
    getFilteredMoviesWithDetail,
    getMovieByUserRatings,
    setMovieLevel,
    getMovieLevels,
    getLikedMoviesWithDetail
}