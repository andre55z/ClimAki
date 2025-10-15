import { useState } from "react";
import { getActualTemperature, getWind, isDay, getHumidity, getProbPrec, getMaxTemp, getMinTemp } from "../api";
import { useEffect } from "react";
import { gettingData } from "../CustomHooks/CustomHooks";
import MainTemp from "../components/MainTemp";
import Sun from "../components/Animations/Sun";
import LoadingPage from "./LoadingPage";
import BoxTemp from "../components/BoxTemp";

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
        useEffect(()=>{
            
            if(probPrec >= 70){
                setBgColor(" bg-rain ");
                setFtColor(" font-color-rain ")
                setBoxesColor(" rain-box-color ")
                setLoading(false);
            }
            else{
                if(bgcDayOrNig == 0){
                    setBgColor(" bg-noite ")
                    setFtColor(" font-color-noite ")
                    setBoxesColor(" night-box-color ")
                    setLoading(false);

                }
                else{
                    if(bgcDayOrNig == 1){
                        setBgColor(" bg-dia ");
                        setFtColor(" font-color-dia ")
                        setBoxesColor(" day-box-color ")
                        setLoading(false);

                    }
                    else{
                        setBgColor(" bg-default ")
                    }
                }
            }
        }, [bgcDayOrNig, probPrec])
        
    return(
        <div className={` ${bgColor} min-h-screen w-full flex flex-col items-center`}>
            {
                loading && <LoadingPage/>
            }
            <div className="w-[80%] h-[50%] mt-[40%] flex flex-col items-center">
                <div className="flex flex-col items-center gap-5">
                    <Sun ClassName={"w-[50%]"}/>
                    <MainTemp temperature={temperature} ClassName={`${ftColor} text-[500%]`}/>
                </div>

                <div className="flex flex-row items-center gap-5">
                    <BoxTemp minMaxT={maxTemp} typeTemp={"maxT"} ClassName={`rounded-[20px] ${boxesColor} w-[100%] h-[300%]`} ClassNameTemp={`${ftColor} text-[200%]`} ClassNameHotArrow={`w-[15%]`}/>
                    <BoxTemp minMaxT={minTemp} typeTemp={"minT"} ClassName={`rounded-[20px] ${boxesColor} w-[100%] h-[300%]`} ClassNameTemp={`${ftColor} text-[200%]`} ClassNameColdArrow={`w-[15%]`}/>

                </div>
            </div>

        </div>
    )
}

export default Mainpage;