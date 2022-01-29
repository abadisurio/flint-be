const Level = require('../models/level');

module.exports = async (req, res) => {
    // console.log("req: ", req.headers)
    // var token = getToken(req.headers);
    // console.log("token: ", token)
    const userId = req.user.user_id
    console.log(userId);
    const movies = await Level.aggregate([
        { $limit: 5 },
        {
            $match: { userId }
        },
    ])
    res.json({ movies: movies })
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