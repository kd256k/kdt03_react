import TailCard from "../components/TailCard"
import TailInput from "../components/TailInput"
import TailButton from "../components/TailButton"
import { useEffect, useState, useRef, use} from "react";

function GallerySkeleton() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const[tdata, setTdata] =useState([]);
  const kwRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    setTdata([]);
    kwRef.current.value= "";
    kwRef.current.focus();
  }

    const getFetchData = async () => {
      setIsLoading(true);
      try{
        const apikey = import.meta.env.VITE_API_KEY;    

        const baseUrl = '/public-api/B551011/PhotoGalleryService1/gallerySearchList1?';
        const kw = encodeURI(kwRef.current.value);
        let url = `${baseUrl}serviceKey=${apikey}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&arrange=A`;
        url = `${url}&keyword=${kw}&_type=json`;

        const resp = await fetch(url);
        const data = await resp.json();
        console.log("API 응답 필드:", Object.keys(data.response.body.items.item[0]));
        console.log("첫 번째 아이템:", data.response.body.items.item[0]);
        setTdata(data.response.body.items.item);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
      
    const handleClick = () => {
      if (kwRef.current.value == '') {
          alert('키워드를 입력해 주세요.');
          kwRef.current.focus();
          return
       }
    
     getFetchData() ;
    }

    useEffect(() => {
      kwRef.current.focus();
    }, [])

  return (
    <div className="w-full min-h-full flex flex-col justify-start items-center">
        <h1 className="w-9/10 mt-6 p-4 text-2xl font-bold text-center bg-[#D3E1FB] rounded-t-lg">
          한국관광공사 사진 정보 서비스
        </h1>
        <div className="sticky top-0 z-10 w-9/10 bg-[#D3E1FB] rounded-b-lg p-3 flex justify-center items-center">
          <div className="flex justify-center items-center gap-3">
            <TailInput type="text" name="txt1" ref={kwRef} />
            <div className="flex gap-2">
              <TailButton color="blue"
                caption="조회"
                onHandle={handleClick}/>
              <TailButton color="blue"
                caption="취소"
                onHandle={handleCancel} />
            </div>
          </div>
        </div>
      <div className="mt-4 w-9/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading 
          ? Array(6).fill(0).map((_, i) => <GallerySkeleton key={i} />)
          : tdata.map(item => <TailCard key ={item.galContentId}
                                      imgUrl={item.galWebImageUrl}
                                      title={item.galTitle}  
                                      subtitle={item.galPhotographyLocation} 
                                      tag={item.galSearchKeyword}  
                                      />)
        }
      </div> 
    </div>
  )
}