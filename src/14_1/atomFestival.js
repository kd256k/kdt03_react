import { atom } from "jotai";

export const selGuAtom = atom("");
export const festivalFetchData = atom(async() => {

    const apikey = import.meta.env.VITE_API_KEY;
    const baseUrl = `/public-api/6260000/FestivalService/getFestivalKr`;
    let url = `${baseUrl}?serviceKey=${apikey}`;
    url = `${url}&pageNo=1&numOfRows=45&resultType=json`;

    const resp = await fetch(url);
    const data = await resp.json();
    return data.getFestivalKr.item;
});
    