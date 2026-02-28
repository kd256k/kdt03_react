import sarea from "./sarea.json";
import SubwayBox from "./SubwayBox";
import TailSelect from "../components/TailSelect";
import { useState, useRef, use, Suspense } from "react";

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
                return resp.json();
            })
            .then(data => {
                if (data.response.body.items === "" || !data.response.body.items) return [];
                let tm = data.response.body.items.item;
                tm = tm.sort((a, b) => a.controlnumber - b.controlnumber);
                return tm;
            });
        dataCache.set(url, promise);
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
            <Suspense fallback={<div className="w-full text-center text-xl font-bold p-5">로딩중...</div>}>
                {selectedArea ? (
                    <SubwayData area={selectedArea} />
                ) : (
                    <div className="w-full text-center p-5">지역을 선택해주세요.</div>
                )}
            </Suspense>
        </div>
    );
}