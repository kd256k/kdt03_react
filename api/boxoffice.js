export default async function handler(req, res) {
    const {dt} = req.query;
    const apiKey = process.env.VITE_MV_API;

    const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apiKey}&targetDt=${dt}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
}