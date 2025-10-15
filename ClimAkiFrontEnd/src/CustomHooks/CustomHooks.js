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
    }, [latitude, longitude, getFunction]);

    return data;
}