const Level = require('../models/level');
const mongodb = require('mongodb')

module.exports = async (req, res) => {
    console.log("req: ", req.body)
    // var token = getToken(req.headers);
    // console.log("token: ", token)

    try {
        const userId = req.user.user_id
        const lastId = req.body.lastId
        const limit = 10
        console.log(userId, lastId);


        const query = lastId !== ''
            ? {
                userId,
                _id: { $gt: mongodb.ObjectID(lastId) }
            }
            : {
                userId,
            }

        const movies = await Level.aggregate([
            {
                $match: query
            },
            { $limit: limit },
        ])
        const lastIndex = movies.length - 1;
        console.log(movies.length)
        // res.json({ movies: movies, lastId: movies[lastIndex]["_id"], isLast: movies.length < limit })
        res.status(200).json({
            status: 'success',
            data: {
                movies: movies,
                lastId: movies[lastIndex]["_id"], isLast: movies.length < limit
            },
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Something is happened");
    }
}