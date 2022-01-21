var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    movieId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    genres: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Movie', MovieSchema);