// const Movie = require('../models/movie');
const Rating = require('../models/rating');
const axios = require('axios');

module.exports = async (req, res) => {

    try {

        const userId = "1";

        const ratings = await Rating.aggregate(
            [
                { $match: { userId: userId } },
                {
                    $lookup: {
                        from: "movieLinks",
                        localField: "movieId",
                        foreignField: "movieId",
                        as: "links"
                    }
                },
            ]
        )

        // console.log(ratings[0]);

        const movies_detail = [];
        await Promise.all(
            ratings.map(async (item) => {
                console.log(item)
                await axios.get(`https://api.themoviedb.org/3/movie/${item.links[0]['tmdbId']}?api_key=ab54f18236e63dc6daf7c9aa35047444`)
                    .then(response => {
                        const { id, imdb_id, title, original_title, poster_path } = response.data;
                        // console.log("data: ", data);
                        const movie_detail = {
                            id, imdb_id, title, original_title,
                            "poster_path": `https://image.tmdb.org/t/p/w500/${poster_path}`
                        }
                        movies_detail.push({ userId: item.userId, userRating: item.rating, ...movie_detail })
                    })
                // return movies_detail;
            })
        )
        console.log(movies_detail)
        res.status(200).json({
            status: 'success',
            data: {
                movies: movies_detail
            },
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Something is happened");
    }
}