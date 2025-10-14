import axios from "axios";
const API_URL = "http://localhost:3000";

export async function getActualTemperature(lat, long){
    try{
        const response = await axios.get(`${API_URL}/getTemperature`,{
            params:{
                lat: lat,
                long:long
            }
        })

        return response.data.temperatura;
    }catch(err){
        console.log(err);
        alert("Erro ao recuperar temperatura")
    }
}

export async function isDay(lat, long){
    try{
        const response = await axios.get(`${API_URL}/getIsDay`, {
            params:{
                lat:lat,
                long:long
            }
        
        });
        return response.data.isDay;
    }
    catch(err){
        console.log("Erro na verificação de dia ou noite: " + err);
    }
}

export async function getWind(lat, long){
    try{
        const response = await axios.get(`${API_URL}/getWind`, {
            params:{
                lat:lat,
                long:long
            }
        });

        return response.data.windSpeed;
    }catch(err){
        console.log("Erro ao calcular a velocidade do vento: " + err);
    }
}