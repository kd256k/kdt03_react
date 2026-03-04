import TrafficNav from "./TrafficNav"
import TrafficInfo from "./TrafficInfo";
//import trafficData from "./교통사고통계.json"

import {useState, useEffect} from "react"

export default function Traffic() {
    //전체데이터
    const [tdata, setTdata] = useState([]);

    //대분류데이터
    const[c1, setC1] = useState([]);
    const[selectC1, setSelectC1] = useState();
        
    //사고유형 데이터
    const[c2, setC2] = useState([]);
    const[selectC2, setSelectC2] = useState();

    //사고 데이터
    // K = 0 ; { K : V } / 0[V]
    const[tinfo, setTinfo] = useState([]);
    
    const getFetchData = async () => {
        
        const apiKey = import.meta.env.VITE_API_KEY;

        const baseUrl = 'https://api.odcloud.kr/api/15070282/v1/uddi:8449c5d7-8be5-4712-9093-968fc0b2d9fc?';
        let url = `${baseUrl}page=1&perPage=117&returnType=json&serviceKey=${apiKey}`;

        const resp = await fetch(url);
        const data = await resp.json();
        setTdata(data.data);
    }

    useEffect( () => {
        getFetchData();
    }, []);

    //대분류
    useEffect(() => {
        if (tdata.length == 0) return;

        let tm = tdata.map(item => item["사고유형대분류"]);
        tm = [...new Set(tm)];
        setC1(tm);
        //data 중 대분류 가져와서 tm에 저장 후 Set(tm)으로 새로운 생성 
        //setC1(tm)이 생성 결과값
        // 

    }, [tdata]);

    //사고유형
    useEffect(() => {
        console.log("대분류", selectC1)
        if(c1.length == 0) return;
        
        let tm = tdata.filter(item => item["사고유형대분류"] == selectC1)
        tm = tm.map(item => item["사고유형"]);
        tm = [...new Set(tm)];
        setC2(tm);
        
        //check
        setTinfo([]); 
        
        console.log(tm)
    }, [selectC1]);

    //사고자료
    // 대분류, 사고유형이 아니면 종료. 대분류 결과값 ->selectC1, 사고유형 결과값 ->selectC2 필터함수 통해
    useEffect(() => {
        if( !selectC1 || !selectC2) return;
        let tm = tdata.filter( item => item["사고유형대분류"] == selectC1 &&
                                        item["사고유형"] == selectC2) 
                                        
            setTinfo(tm);        
       
    }, [selectC2])

    //사고 데이터가 결정되면 (tInfo 변화가 있으면 함수실행)
    useEffect(() => {
    }, [tinfo]) ;

    return (
    <div className="w-full flex flex-col justify-start items-center mt-10">
      {c1 &&                   
      <TrafficNav  title="대분류" category={c1} selectC={selectC1} setSelectC={setSelectC1} />
        }
        {c2 &&                   
      <TrafficNav  title="사고유형" category={c2} selectC={selectC2} setSelectC={setSelectC2} />
        }
        { tinfo &&  tinfo.map(item => <TrafficInfo key={item["도로종류"]} infoData = {item} />)
        }

    </div>
  )
}
