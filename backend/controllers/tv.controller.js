import { fetchFromTMDB } from "../services/tmdb.service.js"

export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
       // Check if results exist and are an array
       if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
        return res.status(400).json({ success: false, message: "No trending movies found." });
    }

    // Ensure the random index is within bounds
    const randomIndex = Math.floor(Math.random() * data.results.length);

    // Get the random Tv
    const randomTv = data.results[randomIndex];

        res.json({ success: true, content: randomTv });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getTvTrailers(req, res) {
    const { id } = req.params;


    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

        res.status(200).json({ success: true, trailers: data.results });
    } catch (error) {
        console.error('Error fetching data:', error);

        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }

        res.status(500).json({ success: false, message: error.message });
    }
}





export async function getTvDetails(req, res) {

    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null)
        }

        res.status(500).json({ success: false, message: error.message });
    }
}

export async function getSimilarTvs(req, res) {

    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }
}    

export async function getTvsByCategory(req, res) {

    const {category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }
}    