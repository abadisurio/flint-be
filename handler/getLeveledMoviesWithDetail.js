const Movie = require('../models/movie');
const axios = require('axios');
const Level = require('../models/level');

module.exports = async (req, res) => {


    try {
        const userId = req.user.user_id
        const { lastId, level } = req.body
        // const limit = 10
        console.log(userId, lastId)

        const query = lastId !== ''
            ? {
                userId,
                level,
                _id: { $gt: mongodb.ObjectID(lastId) }
            }
            : {
                userId,
                level
            }

        // console.log(query);
        const leveledMovieIds = await Level.aggregate([
            {
                $match: query
            },
            {
                $project: {
                    _id: 0,
                    movieId: 1
                }
            },
            // { $limit: limit }
        ])

        // console.log(leveledMovieIds);
        const leveledMovieIdsArray = leveledMovieIds.map(item => item.movieId);
        console.log(leveledMovieIdsArray);

        const movies = await Movie.aggregate([
            { $match: { movieId: { $in: leveledMovieIdsArray } } },
            {
                $lookup: {
                    from: "movieLinks",
                    localField: "movieId",
                    foreignField: "movieId",
                    as: "links"
                }
            },
            {
                $sort: { _id: -1 }
            }
        ])
        // console.log(movies)

        const movies_detail = [];
        await Promise.all(
            movies.map(async (item) => {
                // console.log(item.links[0])
                const { movieId: movie_id, tmdbId: tmbdb_id, } = item.links[0];
                try {
                    await axios.get(`https://api.themoviedb.org/3/movie/${item.links[0]['tmdbId']}?api_key=ab54f18236e63dc6daf7c9aa35047444`)
                        .then(response => {
                            const { id, imdb_id, title, original_title, poster_path, overview } = response.data;
                            // console.log("data: ", data);

                            if (poster_path === null) throw "poster_path is null"

                            const movie_detail = {
                                movie_id, tmbdb_id, imdb_id, title, original_title, overview, genres: item.genres,
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
        // movies_detail.sort((a, b) => { leveledMovieIdsArray.indexOf(a) - leveledMovieIdsArray.indexOf(b) })
        movies_detail.map(item => console.log(item.title))
        res.status(200).json({
            status: 'success',
            data: {
                leveled_movies: movies_detail,
                item_count: movies_detail.length
            },
        })
    } catch (error) {
        // console.log(error)
        return res.status(500).send("Something is happened");
    }

}