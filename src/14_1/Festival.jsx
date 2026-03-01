import {useState, useEffect, useRef} from 'react'
import TailCard from '../components/TailCard'
import { Link } from 'react-router-dom';

import { Suspense } from 'react';
import { useAtom } from "jotai";
import { festivalFetchData, selGuAtom } from './atomFestival';

function FestivalSkeleton() {
  return (
    <div className="bg-white rounded-log shadow overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
}

export default function Festival() {
  return (
  <Suspense fallback={
    <div className="w-full min-h-full flex flex-col justify-start items-center">
      <h1 className="w-9/10 m-6 mb-0 p-4 text-2xl text-gray-800 font-bold text-center bg-[#D3E1FB] rounded-t-lg">
        부산축제정보
      </h1>
      <div className="w-9/10 bg-[#D3E1FB] rounded-b-log p-3 flex justify-center items-center">
        <div className="w-1/3 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
      <div className="mt-4 w-9/10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6).fill(0).map((_, i) => <FestivalSkeleton key={i} />)}
      </div>
    </div>
  }>
    <FestivalContent />
  </Suspense>
  );
}

function FestivalContent() {
    const [tdata] = useAtom(festivalFetchData);
    const [gu, SetGu] = useAtom(selGuAtom);
    const [area, setArea] = useState([]) ;
    const [areaFestival, setAreaFestival] = useState([]);
    
    const selRef = useRef();

    const handleChange = () => {
      SetGu(selRef.current.value);
    }

    useEffect(() => {
      if (!gu) {
        setAreaFestival([]) ;
      } else {
          let tm = tdata.filter(item => item.GUGUN_NM == gu);
          setAreaFestival(tm);
      }
    }, [gu, tdata])

    // const getFetchData = async () => {
    //     const apikey = import.meta.env.VITE_API_KEY;
    //     const baseUrl = `https://apis.data.go.kr/6260000/FestivalService/getFestivalKr`;
    //     let url = `${baseUrl}?serviceKey=${apikey}`;
    //     url = `${url}&pageNo=1&numOfRows=45&resultType=json`;

    //     const resp = await fetch(url);
    //     const data = await resp.json();
    //     setTdata(data.getFestivalKr.item)

    // }

    // useEffect(()=> {
    //     getFetchData()
    // }, []);

    useEffect(()=> {
        if(tdata.length == 0) return;
        
        let tm = tdata.map(item => item.GUGUN_NM);
        tm = [...new Set(tm)].sort();
        tm = tm.map(item => <option key={item}  
                                    value={item}>
                                        {item}
                                    </option>)

        setArea(tm)
    }, [tdata]);

    
  return (
        <div className="w-full min-h-full flex flex-col justify-start items-center">
                    <h1 className="w-9/10 m-6 mb-0 p-4 text-2xl text-gray-800 font-bold text-center
                                    bg-[#D3E1FB] rounded-t-lg ">
                      부산축제정보
                    </h1>
                    <div className="sticky top-0 z-10 w-9/10 bg-[#D3E1FB] rounded-b-lg p-3 flex justify-center items-center">
                        <select name="sel1" 
                            ref={selRef}
                            value={gu}
                            className='w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#003675] focus:border-[#003675] block p-2.5
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            onChange={handleChange}>
                                                  
                          <option value="">--- 지역을 선택하세요---</option>
                            {area}
                        </select>
                    </div>
                    <div className="mt-4 w-9/10
                                    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {
                        areaFestival.map((item,idx) =>  <Link to="/festival/contents"
                                                              state={{contents:item}}
                                                              key={item.UC_SEQ+idx}>
                                                        <TailCard key ={item.UC_SEQ}
                                                              imgUrl={item.MAIN_IMG_THUMB}
                                                              title={item.MAIN_TITLE.includes('(') ? item.MAIN_TITLE.split('(')[0]: item.MAIN_TITLE} 
                                                              subtitle={item.TRFC_INFO} 
                                                              tag={item.ADDR1}/> 
                                                              </Link>)
                      }
                    </div> 
        </div>
    
  )
}
