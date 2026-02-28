// 다시
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
import { Link } from "react-router-dom"
//라우터로 묶기위한 Link 체크 


export default function Charge() {
  //상태변수
  const [tdata, setTdata] = useState([]);
  const [zsc, setZsc] = useState(null);
  const [kdc, setKdc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const sel1Ref = useRef();
  const sel2Ref = useRef();
  const sel3Ref = useRef();
  const sel4Ref = useRef();

  //데이터 가져오기
  //파일 index코드와 select항목별 연결 확인하기
  const getFetchData = async () => {
    const apikey = import.meta.env.VITE_API_KEY;
    const baseUrl = `http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?`;
    let url = `${baseUrl}serviceKey=${apikey}`;
    url = `${url}&numOfRows=10&pageNo=1`;
    url = `${url}&zcode=${sel1Ref.current.value}&zscode=${sel2Ref.current.value}`;
    url = `${url}&kind=${sel3Ref.current.value}&kindDetail=${sel4Ref.current.value}`;
    url = `${url}&dataType=JSON`;

    setIsLoading(true);

    // try, catch, finally로 데이터 잡아서 넘기기
    try{
     const resp = await fetch(url);
     const data = await resp.json();

     setTdata(data.items.item);
    } catch (error){
      console.log(error)
    }
    finally{
      setIsLoading(false);
    }
  }

  //파일 index코드와 select항목별 연결 확인하기
  //시도 선택
  const handleZcode = () => {
    setZsc(null);
    setTdata([]);
    setIsLoading(false);

    if (sel1Ref.current.value == "")
      setZsc(null);
    else setZsc(zscode[sel1Ref.current.value]);
  }
  // setZsc() 확인하기 ↑

  const handleKcode = () => {
    setKdc(null);
    setTdata([]);
    setIsLoading(false);

    console.log(sel3Ref.current.value, kinddetail[sel3Ref.current.value])
    if (sel3Ref.current.value == "")
      setKdc(null);
    else setKdc(kinddetail[sel3Ref.current.value]);
  }

  // 

  const handleCancel = () => {
    sel1Ref.current.value = "";
    sel2Ref.current.value = "";
    sel3Ref.current.value = "";
    sel4Ref.current.value = "";

    setZsc(null);
    setKdc(null);
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
      alert("충전소구분을 선택하세요.");
      sel3Ref.current.focus();
      return;
    }
    if (sel4Ref.current.value == "") {
      alert("충전소상세를 선택하세요.");
      sel4Ref.current.focus();
      return;
    }

    //다시확인
    setTdata([]);
    setIsLoading(false);
    getFetchData();
    //
  }

  //fetch가 완료되면
  useEffect(() => {
    if (tdata.length == 0) return; // 데이터를 받아 오지 못하면 즉각 종료됨.

    //console.log()
  }, [tdata]);


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
                    opv={zsc ? Object.keys(zsc) : ""} //체크하기 
                    onHandle={() => { }}
        />
        <TailSelect id="sel3"
                    ref={sel3Ref}
                    title="충전소구분"
                    opk={Object.keys(kind)}
                    opv={Object.values(kind)}
                    onHandle={handleKcode}
        />
        <TailSelect id="sel4"
                    ref={sel4Ref}
                    title="충전소상세"
                    opk={kdc ? Object.values(kdc) : ""} //체크하기
                    opv={kdc ? Object.keys(kdc) : ""}
                    onHandle={() => { }}
        />
        <TailButton caption="검색" color="blue" onHandle={handleSearch} />
        <TailButton caption="취소" color="orange" onHandle={handleCancel} />
      </div>
      
        {
          (tdata.length != 0) && //괄호주의
            
              <div className="w-full gird grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 mt-5">
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
            tdata.map((item, idx) => <Link to="/Charge/detail"
                                            key={item.statId + idx}
                                            state={{ item: item }}>
                                            <ChargerStat key={item.statId}
                                                        statNm={`${item.statNm}(${item.chgerId})`} />
                                      </Link>
            )
          }

        </div>
      }
      {
        isLoading &&
        <div className="w-full p-5 mb-4 flex justify-center items-center">
          <img src="/img/loading.gif" alt="로딩중" />
        </div>
      }
    </div>

  )
}


// (A && B )
