

export default function TrafficInfo({ infoData }) {
    const show = ["사고건수", "사망자수", "중상자수", "경상자수", "부상신고자수"];

    return (
        <div className='w-full flex flex-col justify-center items-start p-1'>
            <div className='text-lg font-bold text-lime-700 px-2'>
                [{infoData["도로종류"]}]
            </div>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1'>{
                show.map(item => <div className='w-full flex p-1'>
                    <div className='w-1/2 bg-lime-800 text-white p-1 text-center'>
                        {item}
                    </div>
                    <div className='w-1/2 bg-lime-50 p-1 text-center font-bold'>
                        {parseInt(infoData[item]).toLocaleString()}</div>
                </div>)}
            </div>
        </div>
    )
}
//{parseInt(infoData[item]).toLocaleString()} "**수" 를 표시해야 하므로 .