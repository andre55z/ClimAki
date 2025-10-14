import cors from 'cors';
import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res)=>{
    try{
        const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,precipitation_probability,wind_speed_10m,relative_humidity_2m&current=is_day,temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m&timezone=auto")
        res.json(response.data)
    }catch(err){
        console.log("Erro na comunicação com a api" + err);
    }
})

app.get("/getTemperature", async (req, res)=>{
    try{
        const {lat, long} = req.query;
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,precipitation_probability,wind_speed_10m,relative_humidity_2m&current=is_day,temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m&timezone=auto`)
        res.json({temperatura: response.data.current.temperature_2m})
    }catch(err){
        console.log('Erro ao buscar o clima' + err);
    }
})

app.get("/getIsDay", async (req, res)=>{
    try{
        const {lat, long} = req.query;
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,precipitation_probability,wind_speed_10m,relative_humidity_2m&current=is_day,temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m&timezone=auto`)
        res.json({isDay: response.data.current.is_day})
    }
    catch(err){
        console.log("Erro no backend do isday " + err)
    }
})

app.get("/getWind", async (req, res)=>{
    try{
        const {lat, long} = req.query;
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,precipitation_probability,wind_speed_10m,relative_humidity_2m&current=is_day,temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m&timezone=auto`)
        res.json({windSpeed: response.data.current.wind_speed_10m})
    }catch(err){
        console.log("Erro ao pegar a velocidade do vento " + err)
    }
})



app.listen(PORT, ()=>{

    console.log(`Server rodando em http://localhost:${PORT}`)

})