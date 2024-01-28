const axios = require('axios');
const Movie = require('../models/Movie');

const movieController = {
    addMovie: async (tmdbId) => {
        try {
            let movie = await Movie.findOne({ tmdbId });
            if (!movie) {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${process.env.MOVIE_API_KEY}`);
                const posterPath = `https://image.tmdb.org/t/p/original${response.data.poster_path}`;

                movie = new Movie({ tmdbId, posterPath });
                await movie.save();
            }
            return movie;
        } catch (error) {
            throw new Error('Error fetching from TMDb or saving movie');
        }
    },
};

module.exports = movieController;
