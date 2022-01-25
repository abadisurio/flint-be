const Movie = require('../models/movie');


const getToken = require('../middleware/getToken');

module.exports = async (req, res) => {
    // console.log("req: ", req.headers)
    var token = getToken(req.headers);
    // console.log("token: ", token)
    if (token) {
        const movies = await Movie.aggregate([
            // First sort all the docs by name
            // { $sort: { name: 1 } },
            // Take the first 100 of those
            { $limit: 5 },
            // Of those, take only ones where marks > 35
            // { $match: { marks: { $gt: 35 } } }
        ])
        res.json({ movies: movies })
    } else {
        // console.log("token: ", token)
        return res.status(403).send({ success: false, msg: token });
    }
}