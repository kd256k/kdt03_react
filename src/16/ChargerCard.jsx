
export default function ChargerCard({color, title, num}) {
    const bgColor = {
        "blue" : "bg-blue-100",
        "orange" : "bg-orange-100"
    }
  return (
    <div className={`w-full h-40 ${bgColor[color]}
                    border border-gray-200 rounded-md
                    p-5
                    flex flex-col justify-center items-center`}>
        <p className='text-sm text-gray-600' >
            {title}
        </p>
        <p className='text-2xl font-bold text-gray-600' >
            {num}
        </p>
    </div>
  )
}
