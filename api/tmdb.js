export default async function handler(req, res) {
    const {queries} = req.query;    // "영화1, 영화2, 영화3" 형태로 받
    const apiKey = process.env.VITE_TMDB_API;

    const queryList = queries.split(',');

    const results = await Promise.all(
        queryList.map(query =>
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=ko-KR`).then(r => r.json())
        )
    );

    res.status(200).json(results);
}