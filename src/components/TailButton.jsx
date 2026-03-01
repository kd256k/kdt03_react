const BTStyle = {
    blue : {
        base : "bg-[#003675]",
        hover : "hover:bg-[#2A5C96]"},
    orange : {
        base : "bg-orange-500",
        hover : "hover:bg-orange-900"},
    lime : {
        base : "bg-lime-500",
        hover : "hover:bg-lime-900"},
}



export default function TailButton({color, caption, onHandle}) {
    const btstyle = BTStyle[color] ;
    
  return (
   <button className={`${btstyle.base} text-white rounded whitespace-nowrap
                       ${btstyle.hover} hover:font-bold cursor-pointer px-4 py-2 mx-2`}
          onClick={onHandle}>
     {caption}
   </button>
  )
}
