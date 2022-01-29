const Movie = require('../models/movie');
const axios = require('axios');
const Level = require('../models/level');

module.exports = async (req, res) => {

    const userId = req.user.user_id
    console.log(userId);
    const likedMovieIds = await Level.aggregate([
        {
            $match: { userId }
        },
        {
            $project: {
                _id: 0,
                movieId: 1
            }
        }
    ])

    // console.log(likedMovieIds);
    const likedMovieIdsArray = likedMovieIds.map(item => item.movieId)
    // console.log(likedMovieIdsArray);

    const movies = await Movie.aggregate([
        { $match: { movieId: { $nin: likedMovieIdsArray } } },
        { $sample: { size: 5 } },
        {
            $lookup: {
                from: "movieLinks",
                localField: "movieId",
                foreignField: "movieId",
                as: "links"
            }
        }
    ])
    console.log(movies)

    const movies_detail = [];
    await Promise.all(
        movies.map(async (item) => {
            // console.log(links)
            await axios.get(`https://api.themoviedb.org/3/movie/${item.links[0]['tmdbId']}?api_key=ab54f18236e63dc6daf7c9aa35047444`)
                .then(response => {
                    const { id, imdb_id, title, original_title, poster_path } = response.data;
                    // console.log("data: ", data);
                    const movie_detail = {
                        id, imdb_id, title, original_title,
                        "poster_path": `https://image.tmdb.org/t/p/w500/${poster_path}`
                    }
                    movies_detail.push({ ...item, movie_detail })
                })
            // return movies_detail;
        })
    )
    console.log(movies_detail)
    res.json({ movies: movies_detail })
}