import { useState, useRef } from "react";
export default function MyRef() {
   //state 변수
    const [scnt, setScnt]  = useState(0);
    
    //Ref 변수 input박스의 값 도출시
    //useRef 값이 변해도 "화면에 렌더링되지않음"
    //useRef() -> Ref객체 생성 후, 선택하고 싶은 Dom에 Ref값으로 설정.
    // .current
    const rcnt =useRef(0);

    //컴포넌트 변수 
    let cnt = 0;

    const handleCnt = () => {
        cnt = cnt + 1;
    }


    const handlesCnt = () => {
        setScnt(scnt + 1);
    }
    
    const handlerCnt = () => {
        rcnt.current = rcnt.current + 1;
    }
    return (
        <div className="w-full h-full
                    text-xl font-bold
                    flex justify-center items-center
                    space-x-10">
            <div className="text-blue-700">
                <div className="bg-blue-700 text-white p-2 cursor-pointer"
                    onClick={handleCnt}>
                    일반 컴포넌트 변수</div>
                <div className="text-center">{cnt}</div>
            </div>
            <div className="text-lime-700">
                <div className="bg-lime-700 text-white p-2 cursor-pointer"
                onClick={handlesCnt}>
                    state 변수
                </div>
                <div className="text-center">
                    {scnt}
                </div>
            </div>
            <div className="text-orange-700">
                <div className="bg-orange-700 text-white p-2 cursor-pointer"
                onClick={handlerCnt}>
                    ref 변수
                </div>
                <div className="text-center">
                    {rcnt.current}
                </div>
            </div>
        </div>
    )
}