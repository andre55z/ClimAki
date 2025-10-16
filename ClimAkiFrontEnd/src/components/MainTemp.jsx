export default function MainTemp({temperature, ClassName}){
    return(
        <div className={`flex flex-row gap-1 items-center ${ClassName}`}>
            <h1 className="font-outfit ">{temperature}</h1>
            <h1 className="font-outfit text-[50%]">ºC</h1>
        </div>
    )
}