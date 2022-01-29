const Movie = require('../models/movie');


const getToken = require('../middleware/getToken');

module.exports = async (req, res) => {
    try {

        const movies = await Movie.aggregate([
            { $limit: 5 },
        ])
        res.status(200).json({
            status: 'success',
            data: {
                movies: movies
            },
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Something is happened");
    }
}