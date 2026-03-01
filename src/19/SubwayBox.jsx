import scode from "./scode.json";

// 항목별 상태 기준: [좋음 상한, 보통 상한]
const THRESHOLDS = {
  pm10: [75, 150],
  pm25: [35, 75],
  co2:  [500, 1000],
  co:   [5, 10],
  fad:  [50, 100],
  no2:  [0.03, 0.06],
};

const STATUS = {
  good:    { label: "좋음", color: "bg-emerald-100 text-emerald-800" },
  normal:  { label: "보통", color: "bg-yellow-100 text-yellow-800" },
  bad:     { label: "나쁨", color: "bg-red-100 text-red-800" },
  none:    { label: "측정없음", color: "bg-gray-100 text-gray-400" },
};

function getStatus(key, value) {
  if (value === "-" || value == null) return STATUS.none;
  const th = THRESHOLDS[key];
  if (!th) return null; // no, nox, o3 — 판정 없음
  const num = parseFloat(value);
  if (isNaN(num)) return STATUS.none;
  if (num <= th[0]) return STATUS.good;
  if (num <= th[1]) return STATUS.normal;
  return STATUS.bad;
}

// 카드 전체 종합 상태: 판정 가능한 항목 중 가장 나쁜 것
function getOverallStatus(item) {
  let worst = STATUS.good;
  for (const key of Object.keys(THRESHOLDS)) {
    const s = getStatus(key, item[key]);
    if (!s || s === STATUS.none) continue;
    if (s === STATUS.bad) return STATUS.bad;
    if (s === STATUS.normal) worst = STATUS.normal;
  }
  return worst;
}

export default function SubwayBox({ item }) {
  const overall = getOverallStatus(item);

  return (
    <div className="w-full flex flex-col justify-start my-10 rounded-xl shadow-md overflow-hidden">
      {/* 헤더 */}
      <div className="w-full px-5 py-3 bg-[#2A5C96] text-white font-bold flex justify-between items-center">
        <span>
          {item.office} {item.site} {item.city}
          &nbsp;({item.controlnumber.slice(0, 4)}.{item.controlnumber.slice(4, 6)}.{item.controlnumber.slice(6, 8)}&nbsp;
          {item.controlnumber.slice(8, 10)}시)
        </span>
        <span className={`text-sm px-3 py-1 rounded-full font-bold ${overall.color}`}>
          {overall.label}
        </span>
      </div>

      {/* 측정값 그리드 */}
      <div className="w-full grid grid-cols-2 md:grid-cols-5 lg:grid-cols-9 gap-2 p-2">
        {Object.keys(scode).map(c => {
          const status = getStatus(c, item[c]);
          const valueCls = status ? status.color : "bg-gray-50 text-gray-700";
          const displayValue = (item[c] === "-" || item[c] == null) ? "측정없음" : item[c];
          const displayUnit = (item[c] === "-" || item[c] == null) ? "" : scode[c]["unit"];

          return (
            <div key={c} className="w-full flex flex-col rounded-lg overflow-hidden border border-gray-200">
              <div className="bg-[#D3E1FB] text-gray-700 p-2 font-bold text-sm flex flex-col justify-center items-center">
                <div>{scode[c]["name"]}</div>
                <div className="text-xs text-gray-700">({c})</div>
              </div>
              <div className={`p-2 text-center text-sm font-semibold ${valueCls}`}>
                {displayValue} {displayUnit}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}