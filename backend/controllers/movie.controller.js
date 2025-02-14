import { fetchFromTMDB } from "../services/tmdb.service.js"

export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
       // Check if results exist and are an array
       if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
        return res.status(400).json({ success: false, message: "No trending movies found." });
    }

    // Ensure the random index is within bounds
    const randomIndex = Math.floor(Math.random() * data.results.length);

    // Get the random movie
    const randomMovie = data.results[randomIndex];

        res.json({ success: true, content: randomMovie });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getMovieTrailers(req, res) {

    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.status(200).json({ success: true, trailers: data.results });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null)
        }

        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getMovieDetails(req, res) {

    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null)
        }

        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getSimilarMovies(req, res) {

    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }
}    

export async function getMoviesByCategory(req, res) {

    const {category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }
}    