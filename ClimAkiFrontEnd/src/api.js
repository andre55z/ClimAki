import axios from "axios";
const API_URL = "https://climaki.onrender.com";

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

export async function getHumidity(lat, long) {
    try {
        const response = await axios.get(`${API_URL}/getRelativeHumidity`, {
            params:{
                lat:lat,
                long:long
            }
        })

        return response.data.relativeHumidity;
    } catch (err) {
       console.log("Erro no front da humidade: " + err);     
    }
}

export async function getProbPrec(lat, long) {
    try{
        const response = await axios.get(`${API_URL}/getProbPrec`, {
            params:{
                lat:lat,
                long:long
            }
        })
        return response.data.probP

    }catch(err){
        console.log("Erro ao obter a chance de precipitação: " + err)
    }
}

export async function getMaxTemp(lat, long) {
    try{
        console.log("passando lat e long" + lat + long)
        const response = await axios.get(`${API_URL}/getMaxTemp`, {
            params:{
                lat:lat,
                long:long
            }
        })
        return response.data.maxT

    }catch(err){
        console.log("Erro ao obter a temperatura max: " + err)
    }
}

export async function getMinTemp(lat, long) {
    try{
        console.log("passando lat e long" + lat + long)
        const response = await axios.get(`${API_URL}/getMinTemp`, {
            params:{
                lat:lat,
                long:long
            }
        })
        return response.data.minT

    }catch(err){
        console.log("Erro ao obter a temperatura min: " + err)
    }
}