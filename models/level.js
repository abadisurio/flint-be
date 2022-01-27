var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LevelSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Level', LevelSchema);