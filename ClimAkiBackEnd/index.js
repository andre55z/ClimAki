import cors from 'cors';
import express from 'express';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const cache = {};
const CACHE_DURATION = 5 * 60 * 1000; 


async function getWeatherData(lat, long) {
  const key = `${lat},${long}`;
  const now = Date.now();

  if (cache[key] && (now - cache[key].timestamp < CACHE_DURATION)) {
    console.log(`Usando cache para ${key}`);
    return cache[key].data;
  }

  console.log(`Buscando novos dados para ${key}...`);
  const response = await axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&hourly=temperature_2m,precipitation_probability,wind_speed_10m,relative_humidity_2m&current=is_day,temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m&timezone=auto`
  );

  cache[key] = {
    data: response.data,
    timestamp: now,
  };

  return response.data;
}


app.get("/", async (req, res)=>{
    try{
        const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=-23.5&longitude=-47.5&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,precipitation_probability,wind_speed_10m,relative_humidity_2m&current=is_day,temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m&timezone=auto")
        res.json(response.data)
    }catch(err){
        console.log("Erro na comunicação com a api" + err);
    }
})

app.get("/getTemperature", async (req, res)=>{
    try{
        const {lat, long} = req.query;
        const response = await getWeatherData(lat, long)
        res.json({temperatura: response.current.temperature_2m})
    }catch(err){
        console.log('Erro ao buscar o clima' + err);
    }
})

app.get("/getIsDay", async (req, res)=>{
    try{
        const {lat, long} = req.query;
        const response = await getWeatherData(lat, long)
        res.json({isDay: response.current.is_day})
    }
    catch(err){
        console.log("Erro no backend do isday " + err)
    }
})

app.get("/getWind", async (req, res)=>{
    try{
        const {lat, long} = req.query;
        const response = await getWeatherData(lat, long)
        res.json({windSpeed: response.current.wind_speed_10m})
    }catch(err){
        console.log("Erro ao pegar a velocidade do vento " + err)
    }
})

app.get("/getRelativeHumidity", async (req, res)=>{
    try {
        const {lat, long} = req.query;
        const response = await getWeatherData(lat, long)
        res.json({relativeHumidity: response.current.relative_humidity_2m})
        
    } catch (err) {
        console.log("Erro na humidade relativa: " + err);
    }
})

app.get("/getProbPrec", async (req, res)=>{
    try{
        const {lat, long} = req.query;
        const response = await getWeatherData(lat, long)
        res.json({probP: response.daily.precipitation_probability_max[0]})  
    }catch(err){
        console.log("Erro no back do probprec: "+ err)
    }
})

app.get("/getMaxTemp", async (req, res)=>{
    try{
        const {lat, long} = req.query;
        const response = await getWeatherData(lat, long)
        res.json({maxT: response.daily.temperature_2m_max[0]})  
    }catch(err){
        console.log("Erro no back do mintemp: "+ err)
    }
})

app.get("/getMinTemp", async (req, res)=>{
    try{
        const {lat, long} = req.query;
        const response = await getWeatherData(lat, long)
        res.json({minT: response.daily.temperature_2m_min[0]})  
    }catch(err){
        console.log("Erro no back do maxtemp: "+ err)
    }
})

app.get("/getDays", async (req, res)=>{
    try{
        const {lat, long} = req.query;
        const response = await getWeatherData(lat, long)
        res.json({days: response.daily.time})  
    }catch(err){
        console.log("Erro no back do vetor de dias: "+ err)
    }
})

app.get("/getPredictMaxTemp", async (req, res)=>{
    try{
        const {lat, long} = req.query;
        const response = await getWeatherData(lat, long)
        res.json({maxPT: response.daily.temperature_2m_max})  
    }catch(err){
        console.log("Erro no back do vetor de temperatura max: "+ err)
    }
})

app.get("/getPredictMinTemp", async (req, res)=>{
    try{
        const {lat, long} = req.query;
        const response = await getWeatherData(lat, long)
        res.json({minPT: response.daily.temperature_2m_min})  
    }catch(err){
        console.log("Erro no back do vetor de temperatura min: "+ err)
    }
})

app.get("/getPredictPrec", async (req, res)=>{
    try{
        const {lat, long} = req.query;
        const response = await getWeatherData(lat, long)
        res.json({predictPrec: response.daily.precipitation_probability_max})  
    }catch(err){
        console.log("Erro no back do vetor de precipitação: "+ err)
    }
})


app.listen(PORT, ()=>{

    console.log(`Server rodando em http://localhost:${PORT}`)

})