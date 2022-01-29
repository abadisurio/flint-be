const Level = require('../models/level');
const mongodb = require('mongodb')

module.exports = async (req, res) => {
    console.log("req: ", req.body)
    // var token = getToken(req.headers);
    // console.log("token: ", token)
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
    res.json({ movies: movies, lastId: movies[lastIndex]["_id"], isLast: movies.length < limit })
    // if (token) {
    //         // First sort all the docs by name
    //         // { $sort: { name: 1 } },
    //         // Take the first 100 of those
    //         // Of those, take only ones where marks > 35
    //         // { $match: { marks: { $gt: 35 } } }
    // } else {
    //     // console.log("token: ", token)
    //     return res.status(403).send({ success: false, msg: token });
    // }
}