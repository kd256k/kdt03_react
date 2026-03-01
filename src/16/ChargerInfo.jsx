import zcode from "./data/zcode.json"
import zscode from "./data/zscode.json"
import kind from "./data/kind.json"
import kinddetail from "./data/kinddetail.json"
import stat from "./data/stat.json"

import TailSelect from "../components/TailSelect"
import TailButton from "../components/TailButton"
import ChargerCard from "./ChargerCard"
import ChargerStat from "./ChargerStat"

import { useEffect, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ChargerSkeleton() {
    return (
        <div className="border h-20 border-gray-200 flex justify-center items-center
                    p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>      
    );
}

export default function ChargerInfo() {
  //상태변수
  const [tdata, setTdata] = useState([]);
  const [zsc, setZsc] = useState(null);
  const [kindDetail, setKindDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  //select 박스 
  const sel1Ref = useRef();
  const sel2Ref = useRef();
  const sel3Ref = useRef();
  const sel4Ref = useRef();

  //데이터가져오기
  const getFetchData = async () => {
    const apikey = import.meta.env.VITE_API_KEY;
    const baseUrl = `/api/B552584/EvCharger/getChargerInfo?`;
    let url = `${baseUrl}serviceKey=${apikey}`;
    url = `${url}&numOfRows=100&pageNo=1`;
    url = `${url}&zcode=${sel1Ref.current.value}&zscode=${sel2Ref.current.value}`;
    url = `${url}&kind=${sel3Ref.current.value}&kindDetail=${sel4Ref.current.value}`;
    url = `${url}&dataType=JSON`;
    console.log(url)

    setIsLoading(true);
    try {
      const resp = await fetch(url);
      const data = await resp.json();

      setTdata(data.items?.item || []);
    } catch (error) {
      console.log(error)
    }
    finally {
      setIsLoading(false);
    }
  }

  
    
  //시도 선택
  const handleZcode = () => {
    setZsc(null);
    setKindDetail(null);
    setTdata([]);
    setIsLoading(false);

    sel2Ref.current.value = "";
    sel3Ref.current.value = "";
    sel4Ref.current.value="";

    if (sel1Ref.current.value == "")
      setZsc(null);
    else
      setZsc(zscode[sel1Ref.current.value]);
  }

  //충전소 구분
  const handleKind = () => {
    setKindDetail(null);
    setTdata([]);
    setIsLoading(false);

    sel4Ref.current.value="";

    console.log(sel3Ref.current.value, kinddetail[sel3Ref.current.value])
    if (sel3Ref.current.value == "")
      setKindDetail(null);
    else
      setKindDetail(kinddetail[sel3Ref.current.value]);
  }

  //취소 
  const handleCancel = () => {
    sel1Ref.current.value = "";
    sel2Ref.current.value = "";
    sel3Ref.current.value = "";
    sel4Ref.current.value = "";

    setZsc(null);
    setKindDetail(null);
    setTdata([]);
    setIsLoading(false);
  }

  //검색
  const handleSearch = () => {
    if (sel1Ref.current.value == "") {
      alert("시도를 선택하세요.");
      sel1Ref.current.focus();
      return;
    }
    if (sel2Ref.current.value == "") {
      alert("지역동을 선택하세요.");
      sel2Ref.current.focus();
      return;
    }
    if (sel3Ref.current.value == "") {
      alert("충전소 구분을 선택하세요.");
      sel3Ref.current.focus();
      return;
    }
    if (sel4Ref.current.value == "") {
      alert("충전소 상세를 선택하세요.");
      sel4Ref.current.focus();
      return;
    }

    setTdata([]);
    setIsLoading(true);
    getFetchData();
  }


  // fetch가 완료되면
  useEffect(() => {
    if (tdata.length == 0) return;

    console.log(tdata)
  }, [tdata]);

  useEffect(() => { //컴포넌트 마운트 시 URL 파라미터로 자동 탐색
    const pZcode = searchParams.get("zcode");
    const pZscode = searchParams.get("zscode");
    const pKind = searchParams.get("kind");
    const pKindDetail = searchParams.get("kindDetail");

    if (pZcode && pZscode && pKind && pKindDetail) {
      // 셀렉트박스 값 세팅
      sel1Ref.current.value = pZcode;
      setZsc(zscode[pZcode]); // zscode 데이터 로드
      setTimeout(()=> {
        sel2Ref.current.value = pZscode;
        sel3Ref.current.value = pKind;
        setKindDetail(kinddetail[pKind]);
        setTimeout(()=> {
          sel4Ref.current.value = pKindDetail;
          getFetchData();
        }, 100);
      }, 100);
    }
  }, []);

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <h1 className="w-full text-2xl font-bold p-5 mb-4 text-left">
        전기차 충전소 정보
      </h1>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <TailSelect id="sel1"
          ref={sel1Ref}
          title="시도"
          opk={Object.keys(zcode)}
          opv={Object.values(zcode)}
          onHandle={handleZcode}
        />

        <TailSelect id="sel2"
          ref={sel2Ref}
          title="지역동"
          opk={zsc ? Object.values(zsc) : ""}
          opv={zsc ? Object.keys(zsc) : ""}
          onHandle={() => { }}
        />

        <TailSelect id="sel3"
          ref={sel3Ref}
          title="충전소구분"
          opk={Object.keys(kind)}
          opv={Object.values(kind)}
          onHandle={handleKind}
        />

        <TailSelect id="sel4"
          ref={sel4Ref}
          title="충전소 상세"
          opk={kindDetail ? Object.values(kindDetail) : ""}
          opv={kindDetail ? Object.keys(kindDetail) : ""}
          onHandle={() => { }}
        />

        <TailButton caption="검색" color="blue" onHandle={handleSearch} />
        <TailButton caption="취소" color="orange" onHandle={handleCancel} />
      </div>
      {
        (tdata.length != 0) &&
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 mt-5">
          <ChargerCard color="orange" title="충전소수" num={tdata.length} />
          {
            Object.keys(stat).map(scode => <ChargerCard key={stat[scode] + scode}
              color="blue"
              title={stat[scode]}
              num={tdata.filter(item => item.stat == scode).length} />)
          }

        </div>
      }
      {
        (tdata.length != 0) &&
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-5">
          {
            tdata.map((item, idx) => <Link to="/ChargerInfo/detail"
                                            key={item.statId + idx}
                                            state={{ item: item, 
                                            searchParams: { zcode: sel1Ref.current.value, zscode: sel2Ref.current.value,
                                            kind: sel3Ref.current.value,  kindDetail: sel4Ref.current.value }}}>
                                            <ChargerStat key={item.statId}
                                                        statNm={`${item.statNm}(${item.chgerId})`} />
                                      </Link>
            )
          }

        </div>
      }
      {!isLoading && tdata.length === 0 && sel1Ref.current?.value && sel2Ref.current?.value && sel3Ref.current?.value && sel4Ref.current?.value &&(
        <div className="w-full p-5 text-center text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
      {
        isLoading &&
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mt-5">
          {Array(12).fill(0).map((_, i) => <ChargerSkeleton key={i} />)}
        </div>
      }
    </div>

  )
}
