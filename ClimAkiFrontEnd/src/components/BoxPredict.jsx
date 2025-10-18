import HotArrow from "../assets/HotArrow.png"
import ColdArrow from "../assets/ColdArrow.png"
import { getDays, getPredictMaxTemp, getPredictMinTemp, getPredictPrec } from "../api";
import { gettingData, dateFormatation } from "../CustomHooks/CustomHooks";

export default function BoxPredict({BgcColor, lat, long, fontC, headerC}){
    
    const days = gettingData(lat, long, getDays);
    const predictMaxTemp = gettingData(lat, long, getPredictMaxTemp);
    const predictMinTemp = gettingData(lat, long, getPredictMinTemp);
    const predictPrec = gettingData(lat, long, getPredictPrec);
    console.log('BoxPredict renderizou', { lat, long, type: typeof lat });



    if (!days || !predictMaxTemp || !predictMinTemp || !predictPrec) {
        return (
        <div
            className={`flex items-center justify-center w-[400px] h-[600px] rounded-[30px] ${BgcColor} font-outfit`}
        >
            <h1>Carregando previsão...</h1>
        </div>
        );
    }
    return(
        <>
            <div className={`flex flex-col  gap-10  w-[330px] h-[600px] mb-5 rounded-[30px] ${BgcColor} font-outfit`} >
                <div className={`${headerC} flex flex-col p-5 items-center rounded-t-[30px]`}>
                    <h1 className={`${fontC} text-[15px] text-center `}> Previsão do tempo para os próximos dias</h1>
                </div>
                <div className={` w-[100%] flex flex-row justify-center gap-16 pl-[70px] `}>
                    <img src={HotArrow} className="w-[15px]"/>  
                    <img src={ColdArrow} className="w-[15px]"/>
                    🌧️
                </div>
                <div className="flex flex-row gap-9 pl-10">
                    <div className=" text-center flex flex-col justify-center gap-10">
                        
                        
                        {days.map((day, index)=>(
                            <h1 key={index}>{dateFormatation(day)}</h1>
                        ))}
                    </div>
                    <div className=" text-center flex flex-col justify-center gap-10">
                        {predictMaxTemp.map((maxT, index)=>(
                            <h1 key={index}>{maxT}ºC</h1>
                        ))}
                    </div>
                    <div className=" text-center flex flex-col justify-center gap-10">
                        {predictMinTemp.map((minT, index)=>(
                            <h1 key={index}>{minT}ºC</h1>
                        ))}
                    </div>
                    <div className=" text-center flex flex-col justify-center gap-10">
                        {predictPrec.map((precP, index)=>(
                            <h1 key={index}>{precP}%</h1>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}