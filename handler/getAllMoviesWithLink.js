const Movie = require('../models/movie');

module.exports = async (req, res) => {
    const movies = await Movie.aggregate([
        { $limit: 5 },
        {
            $lookup: {
                from: "movieLinks",
                localField: "movieId",
                foreignField: "movieId",
                as: "links"
            }
        }
    ])
    res.json({ movies: movies })
}