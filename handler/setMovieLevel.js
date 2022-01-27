const User = require("../models/user");
const Level = require("../models/level");

module.exports = async (req, res) => {
    console.log(req.body)
    try {
        const userId = req.user.user_id
        const { movieId, level } = req.body;

        const oldLevel = await Level.findOne({ userId, movieId });

        if (oldLevel) {
            console.log("oldLevel ", oldLevel);
            if (level === "-1" || level === "0") {

                await Level.deleteOne({ userId, movieId })
                return res.status(409).send("Movie level deleted");
            } else {
                await Level.updateOne({ userId, movieId }, { level })
                return res.status(409).send("Movie level updated");
            }
        }
        if (level === "1" || level === "2") {
            const newlevel = await Level.create({
                userId, movieId, level
            })
            res.status(201).json(newlevel);
        }
        return res.status(409).send("Movie level cannot be other than 1 or 2");
    } catch (err) {
        console.log(err);
    }
}