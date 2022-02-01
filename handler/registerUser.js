const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const Rating = require("../models/rating");

module.exports = async (req, res) => {
    console.log("req", req.body)
    // Our register logic starts here
    try {
        // Get user input
        const { username, password } = req.body;

        // Validate user input
        if (!(password && username)) {
            return res.status(400).json({
                status: 'success',
                message: "All input is required",
                data: false,
            })
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ username });

        if (oldUser) {
            return res.status(409).json({
                status: 'success',
                message: "User Already Exist",
                data: false,
            })
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            userId: '355',
            username,
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        return res.status(201).json({
            status: 'success',
            data: true,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'success',
            message: err.message,
            data: false,
        })
    }
    // Our register logic ends here
}