const Movie = require('../models/movie');
const axios = require('axios');
const Level = require('../models/level');

module.exports = async (req, res) => {

    const userId = req.user.user_id

    try {

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
            { $sample: { size: 10 } },
            {
                $lookup: {
                    from: "movieLinks",
                    localField: "movieId",
                    foreignField: "movieId",
                    as: "links"
                }
            }
        ])
        // console.log(movies)

        const movies_detail = [];
        await Promise.all(
            movies.map(async (item) => {
                console.log(item.links[0])
                const { movieId: movie_id, tmdbId: tmbdb_id } = item.links[0];
                try {
                    await axios.get(`https://api.themoviedb.org/3/movie/${item.links[0]['tmdbId']}?api_key=ab54f18236e63dc6daf7c9aa35047444`)
                        .then(response => {
                            // console.log("data: ", response.data);
                            const { id, imdb_id, title, original_title, poster_path, overview } = response.data;
                            // console.log("data: ", data);
                            const movie_detail = {
                                movie_id, tmbdb_id, imdb_id, title, original_title, overview,
                                "poster_path": `https://image.tmdb.org/t/p/w300${poster_path}`
                            }
                            movies_detail.push({ ...item, movie_detail })
                        })
                } catch (error) {
                    // console.log("di sini error: ", error)
                }
                // return movies_detail;
            })
        )
        // console.log(movies_detail)
        res.status(200).json({
            status: 'success',
            data: {
                movies: movies_detail,
                item_count: movies_detail.length
            },
        })
    } catch (error) {
        // console.log(error)
        return res.status(500).send("Something is happened");
    }

}