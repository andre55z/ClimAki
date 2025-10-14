import { useState } from "react";
import { getActualTemperature, getWind, isDay } from "../api";
import { useEffect } from "react";

function Mainpage(){

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

        const[temperature, setTemperature] = useState("")
        useEffect (()=>{ 
            async function fetchTemp(){
                const temp = await getActualTemperature(latitude, longitude)
                setTemperature(temp)
            }
            fetchTemp();
        }, [latitude, longitude]);

        const [bgcDayOrNig, setBgcDayOrNig] = useState(null);
        useEffect(()=>{
            async function fetchIsDay(){
                const isd = await isDay(latitude, longitude);
                setBgcDayOrNig(isd);
            }
            fetchIsDay();
        }, [latitude, longitude])

        const [wind, setWind] = useState("");
        useEffect(()=>{
            async function fetchWind(){
                const windFetch = await getWind(latitude, longitude);
                setWind(windFetch);
            }
            fetchWind();
        }, [latitude, longitude])





    return(
        <div className=" bg-default min-h-screen w-full flex flex-col items-center">
            {
                !local && <h1 className="text-[150%] font-color-default lg:mt-[20%] mt-[60%] text-center p-[10%]">Permita o acesso a sua localização para a estimativa do clima na sua região</h1>
            }
            <h1>Temperatura: {temperature}</h1>
            <h1>Éh dia: {bgcDayOrNig}</h1>
            <h1>Vel do vento: {wind}</h1>
        </div>
    )
}

export default Mainpage;