const User = require("../models/user");
const Level = require("../models/level");

module.exports = async (req, res) => {
    console.log(req.body)
    try {
        const userId = req.user.user_id
        const { movieId, level } = req.body;

        const oldLevel = await Level.findOne({ userId, movieId });

        console.log(oldLevel);

        if (oldLevel) {
            await Level.updateOne({ userId, movieId }, { level });
            return res.status(201).json({
                status: 'success',
                data: 'Movie level updated',
            })
        } else {
            await Level.create({
                userId, movieId, level
            })
            return res.status(201).json({
                status: 'success',
                data: 'Movie level added',
            })
        }
        // return res.status(409).send("Movie level cannot be added");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Something is happened");
    }
}