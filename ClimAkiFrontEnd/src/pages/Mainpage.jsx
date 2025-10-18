import { useState } from "react";
import { getActualTemperature, getWind, isDay, getHumidity, getProbPrec, getMaxTemp, getMinTemp } from "../api";
import { useEffect } from "react";
import { gettingData } from "../CustomHooks/CustomHooks";
import MainTemp from "../components/MainTemp";
import Sun from "../components/Animations/Sun";
import LoadingPage from "./LoadingPage";
import BoxTemp from "../components/BoxTemp";
import Moon from "../components/Animations/Moon";
import BoxComlements from "../components/BoxComplements";
import Rain from "../components/Animations/Rain";
import BoxPredict from "../components/BoxPredict";

function Mainpage(){

    const [loading, setLoading] = useState(true);

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [local, setLocal] = useState(false);
        
        useEffect(()=>{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        setLatitude(lat);
                        setLongitude(lon);
                        
                        setLocal({lat, lon});
                    },
                    (error) => console.error(error)
                );
            }
        }, []);

        const temperature = gettingData(latitude, longitude, getActualTemperature);
        const bgcDayOrNig = gettingData(latitude, longitude, isDay);
        const wind = gettingData(latitude, longitude, getWind);
        const relativeHumidity = gettingData(latitude, longitude, getHumidity);
        const probPrec = gettingData(latitude, longitude, getProbPrec);
        const maxTemp = gettingData(latitude, longitude, getMaxTemp);

        const minTemp = gettingData(latitude, longitude, getMinTemp);

        const [bgColor, setBgColor] = useState("");
        const [ftColor, setFtColor] = useState("");
        const [boxesColor, setBoxesColor] = useState("");
        const [headerColor, setHeaderColor] = useState("");
        const [subHeaderColor, setSubHeaderColor] = useState("");


        const [dia, setDia] = useState(false);
        const [chuva, setChuva] = useState(false);
        useEffect(()=>{

                if(probPrec === null || probPrec === undefined || bgcDayOrNig === null || bgcDayOrNig === undefined) {
                    return; 
                }       
            
            if(probPrec >= 70){
                setBgColor(" bg-rain ");
                setFtColor(" font-color-rain ")
                setBoxesColor(" rain-box-color ")
                setLoading(false);
                setChuva(true);
                setHeaderColor(" header-color-rain")
                setSubHeaderColor(" subheader-color-rain")
            }
            else{
                if(bgcDayOrNig == 0){
                    setBgColor(" bg-noite ")
                    setFtColor(" font-color-noite ")
                    setBoxesColor(" night-box-color ")
                    setLoading(false);
                    setHeaderColor(" header-color-night ")
                    setSubHeaderColor(" subheader-color-night ")
                }
                else{
                    if(bgcDayOrNig == 1){
                        setBgColor(" bg-dia ");
                        setFtColor(" font-color-dia ")
                        setBoxesColor(" day-box-color ")
                        setLoading(false);
                        setDia(true);
                        setHeaderColor(" header-color-day ")
                        setSubHeaderColor(" subheader-color-day ")
                    }
                    else{
                        setBgColor(" bg-default ")
                    }
                }
            }
        }, [probPrec, bgcDayOrNig])
        
    return(
        <div className={` ${bgColor} overflow-hidden min-h-screen w-full flex flex-col items-center`}>
            {
                loading ? <LoadingPage/> :
            
            <div className="w-[80%] h-[50%] mt-[10%] flex flex-col items-center">
                <div className="flex flex-col items-center py-10 ">
                    
                    {dia 
                        ? <Sun ClassName={"w-[50%] mb-[10%] mt-[-10%]"}/> 
                        : chuva 
                            ? <Rain ClassName={"w-[100%] mt-[-20%]"}/> 
                            : <Moon ClassName={"w-[200%] mt-[-50%] lg:mt-[-90%] mb-[-35%] lg:mb-[-55%]"}/>
                        }
                    <MainTemp temperature={temperature} ClassName={`${ftColor} text-[500%] mt-[-10%] lg:mb-[-25%]`}/>
                </div>

                <div className="flex flex-row items-center gap-3 mt-[15%]">
                    <BoxTemp minMaxT={maxTemp} typeTemp={"maxT"} ClassName={`rounded-[20px] ${boxesColor} w-[230%] h-[300%]`} ClassNameTemp={`${ftColor} text-[150%]`} ClassNameHotArrow={`w-[15%]`}/>
                    <BoxTemp minMaxT={minTemp} typeTemp={"minT"} ClassName={`rounded-[20px] ${boxesColor} w-[230%] h-[300%]`} ClassNameTemp={`${ftColor} text-[150%]`} ClassNameColdArrow={`w-[15%]`}/>

                </div>

                <div className="flex flex-row items-center justify-center gap-2 mt-6 mb-[10%]">
                    <BoxComlements Data={probPrec} Emoji={"🌧️"} ClassName={`rounded-[20px] ${boxesColor} p-5 w-[90px] h-[90px] justify-center`} ClassNameData={`${ftColor} text-[120%]`} Medida={"%"}    ClassNameEmoji={"text-[120%]"}/>
                    <BoxComlements Data={relativeHumidity} Emoji={"💧"} ClassName={`rounded-[20px] ${boxesColor} w-[90px] h-[90px] justify-center`} ClassNameData={`${ftColor} text-[120%]`} Medida={"%"}    ClassNameEmoji={"text-[120%]"}/>
                    <BoxComlements Data={wind} Emoji={"🌀"} ClassName={`rounded-[20px] ${boxesColor} w-[90px] h-[90px] justify-center`} ClassNameData={`${ftColor} text-[100%] text-center`} Medida={"km/h"} ClassNameEmoji={"text-[120%]"}  />

                </div>
                <div className="flex lg:mt-0 mt-10">
                    <BoxPredict BgcColor={boxesColor} lat={latitude} long={longitude} headerC={headerColor} subHeaderC={subHeaderColor}/>

                </div>
            </div>}

        </div>
    )
}

export default Mainpage;