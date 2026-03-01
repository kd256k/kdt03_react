
export default function TailCard({ imgUrl, title, subtitle, tag }) {
    let tags = "";
    if (tag.includes(',')) {
        tags = tag.split(',')
        tags = tags.map(kw => <span key={kw}
                                className="bg-[#EFF5FF] rounded-sm p-2 inline-flex m-1 text-sm">
                                {kw}
                              </span>);
        if(tags.length >= 4 ) tags = tags.slice(0,5);
    }
    else {
        tags = <span className="bg-[#EFF5FF] rounded-sm p-2 flex m-1 text-sm h-14"> {tag}</span>

     };

    //console.log(tags)
    return (
        <div className="max-w-sm h-96 bg-white border border-[#CDD7E4] rounded-lg shadow-sm">
            <div>
                <img className="rounded-t-lg w-full h-46 object-cover"
                    src={imgUrl} alt=""
                    onError={(e) => { e.currentTarget.src = "https://placehold.co/400x300?text=No+Image"; }} />
            </div>
            <div className="p-2 h-50 flex flex-col jusify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {title}
                    </h1>
                    <p className="mb-2 font-medium tracking-tight text-gray-800 text-sm" >
                        {subtitle}
                    </p>
                </div>
                <p className="mb-1 font-normal text-gray-700">
                    {tags}
                </p>
            </div>
        </div>
    )
}

