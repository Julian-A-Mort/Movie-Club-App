const fetch = require('node-fetch');
require('dotenv').config();

const MOVIE_API_KEY = process.env.MOVIE_API_KEY; // Store your API key in an environment variable
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchMovieDetails(tmdbId) {
  const url = `${BASE_URL}/movie/${tmdbId}?api_key=${MOVIE_API_KEY}`;
  
  try {
    const response = await fetch(url);
    const movieDetails = await response.json();
    
    // Assuming you only need the poster path, but you can extract other details here as needed
    const posterPath = movieDetails.poster_path;
    return posterPath;
  } catch (error) {
    console.error("Error fetching movie details from TMDB:", error);
    return null; // Handle the error as appropriate for your application
  }
}
