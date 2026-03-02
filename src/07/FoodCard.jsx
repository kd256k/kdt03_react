import busan from "../assets/busan.png"
import bank from "../assets/bank.png"
import market from "../assets/market.png"
import { BsTelephone } from 'react-icons/bs';
import { FaFax } from 'react-icons/fa';
import { useState } from "react";

export default function FoodCard({ data }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(prev => !prev);
  }

  return (
    <div className="w-full h-44 flex justify-start items-start       
                    border border-gray-300 
                    rounded-sm">
      <div className="w-44 h-full px-5 py-2 flex justify-center">
        <img src={data['구분'] == "광역지원센터" ? busan : data['구분'] == "기초푸드뱅크" ? bank : market}
            alt={data['구분']}
           className="w-30 h-30"/>
      </div>
      <div className="w-2/3 h-full flex flex-col justify-between py-2">
        <div>
          <h1 className="text-xl font-bold">
            {data['사업장명']}
          </h1>
          <h2 className="text-lg font-bold text-gray-500">
            {data['운영주체명']}
          </h2>
          <p className="text-md font-semi bold text-gray-500">
            {data['사업장 소재지']}
          </p>
        </div>
        <div className="w-full h-10 bg-gray-400 text-white cursor-pointer"
          onClick={handleClick}>
          {isActive &&
            <ul className="w-full h-full flex justify-center items-center space-x-6">
              <li className="flex">
                <BsTelephone className="mr-2 h-full" />{data['연락처(대표번호)']}
              </li>
              <li className="flex">
                <FaFax className="mr-2 h-full" />{data['팩스번호']}
              </li>
            </ul>
          }
        </div>
      </div>
    </div>
  )
}

