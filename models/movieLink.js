var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieLinkSchema = new Schema({
    movieId: {
        type: String,
        required: true
    },
    imdbId: {
        type: String,
        required: true
    },
    tmdbId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('MovieLink', MovieLinkSchema);