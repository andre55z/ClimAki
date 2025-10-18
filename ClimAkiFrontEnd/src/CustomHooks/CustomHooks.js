import { useState } from "react";
import { useEffect } from "react";

export function gettingData(latitude, longitude, getFunction){
    const [data, setData] = useState(null);

    useEffect(()=>{
        if (!latitude || !longitude) return;
        
        async function fetchData() {
            const result = await getFunction(latitude, longitude);
            setData(result);
        }
        
        fetchData();
    }, [latitude, longitude]);

    return data;
}

export function dateFormatation(date) {
    if (!date) return "";

    const month = date.slice(5, 7); 
    const day = date.slice(8, 10); 

    const fullDate = `${day}/${month}`; 
    return fullDate;
}