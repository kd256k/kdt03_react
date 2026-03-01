import sarea from "./sarea.json";
import SubwayBox from "./SubwayBox";
import TailSelect from "../components/TailSelect";
import { useState, useRef, use, Suspense } from "react";

function SubwaySkeleton() {
    return (
        <div className="w-full flex flex-col my-10 rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="w-full px-5 py-3 bg-[#2A5C96] flex justify-between items-center">
                <div className="h-5 bg-blue-300 rounded w-1/2"></div>
                <div className="h-6 bg-blue-300 rounded-full w-16"></div>
            </div>
            <div className="w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-2 p-2">
                {Array(9).fill(0).map((_, i) => (
                    <div key={i} className="flex flex-col rounded-lg overflow-hidden border border-gray-200">   
                        <div className="bg-gray-200 p-2 h-12"></div>
                        <div className="p-2 h-8 bg-gray-100"></div> 
                    </div>
                ))}
            </div>
        </div>
    );
}

const dataCache = new Map();

function fetchData(area) {
    const dt = new Date().toISOString().slice(0, 10).replaceAll('-', '');
    const apikey = import.meta.env.VITE_API_KEY;
    const baseUrl = "/api/6260000/IndoorAirQuality/getIndoorAirQualityByStation?";
    let url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=50`;
    url = `${url}&resultType=json&controlnumber=${dt}&areaIndex=${area}`;
    if (!dataCache.has(url)) {
        const promise = fetch(url)
            .then(resp => {
                if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
                const contentType = resp.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")){
                    return resp.text().then(text => {
                        console.log("응답 내용:", text);
                        throw new Error("JSON이 아닌 응답");
                    });
                }
                return resp.json();
            })
            .then(data => {
                if (data.response.body.items === "" || !data.response.body.items) return [];
                let tm = data.response.body.items.item;
                tm = tm.sort((a, b) => b.controlnumber - a.controlnumber);
                return tm;
            });
        dataCache.set(url, promise.catch(() => []));
    }
    return dataCache.get(url);
}

function SubwayData({ area }) {
    const tdata = use(fetchData(area));
    return (
        <div className="w-full">
            {tdata.length > 0 ? (
                tdata.map((item, idx) => (
                    <SubwayBox key={item.controlnumber} idx={idx % 2} item={item} />
                ))
            ) : (
                <div className="w-full text-center p-5">해당 지역의 데이터가 없습니다.</div>
            )}
        </div>
    );
}

export default function Subway() {
    const [selectedArea, setSelectedArea] = useState(null);
    const selAreaRef = useRef();
    const handleSelect = () => {
        const areaValue = selAreaRef.current.value;
        if (areaValue) setSelectedArea(areaValue);
        else setSelectedArea(null);
    };
    return (
        <div className="w-9/10 flex flex-col justify-start items-center mt-10">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <h1 className="w-full p-5 text-2xl font-bold text-center">
                    부산 실내공기질 정보
                </h1>
                <TailSelect
                    id="selArea"
                    ref={selAreaRef}
                    title="부산지하철역"
                    opk={sarea.map(item => item["코드"])}
                    opv={sarea.map(item => item["측정소"])}
                    onHandle={handleSelect}
                />
            </div>
            <Suspense fallback={
                <div className="w-full">
                    {Array(3).fill(0).map((_, i) => <SubwaySkeleton key={i} />)}
                </div>
                }>
                {selectedArea ? (
                    <SubwayData area={selectedArea} />
                ) : (
                    <div className="w-full text-center p-5">지역을 선택해주세요.</div>
                )}
            </Suspense>
        </div>
    );
}