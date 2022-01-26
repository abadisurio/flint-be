const express = require('express');

const router = express.Router();
const { registerUser, signinUser, getAllMovies, getAllMoviesWithLink,
    getAllMoviesWithDetail, getMovieByUserRatings } = require('../handler')
const auth = require("../middleware/auth");
// const user = require('../models/user');

router.post("/register", registerUser);
router.post("/signin", signinUser);
router.post("/getMovieByUserRatings", auth, getMovieByUserRatings);

router.get("/getAllMovies", getAllMovies);
router.get("/getAllMoviesWithLink", getAllMoviesWithLink);

router.get("/getAllMoviesWithDetail", getAllMoviesWithDetail);
// top 25
router.get('/movies', getAllMovies);


router.post("/welcome", auth, (req, res) => {
    console.log(req)
    res.status(200).send("Welcome 🙌 ");
});


// all movies
// router.get('/movies', auth, (req, res) => {
//     // console.log("req: ", req.headers)
//     var token = getToken(req.headers);
//     // console.log("token: ", token)
//     if (token) {
//         Movie.find(function (err, movies) {
//             if (err) return next(err);
//             res.json(movies);
//         });
//     } else {
//         // console.log("token: ", token)
//         return res.status(403).send({ success: false, msg: token });
//     }
// });

// by id
// router.get('/movies', auth, async (req, res) => {
//     console.log("req: ", req.headers)
//     // var token = getToken(req.headers);
//     // if (token) {
//     //     console.log("token: ", req.body)
//     // }
//     // res.json({ movie: req.body })
//     res.json({ message: "ini movie" })
//     const movie = await Movie.findOne({ _id: "61ee9931e001d4565b6e5ad6" })
//     console.log("movie: ", movie);
//     // movie.find((err, movies) => {
//     //     if (err) return next(err);
//     //     res.json(movies);
//     // });
//     // } else {
//     //     // console.log("token: ", token)
//     //     return res.status(403).send({ success: false, msg: token });
//     // }
// });

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split('.');
        console.log("parted", parted)
        if (parted.length === 3) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;
