console.log("Backend file loaded");

//Importing requirements
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const authRouter = require('./routes/authRouter');
const { default: axios } = require('axios');

require('dotenv').config();
require('./models/db')

app.use(express.json());
app.use(cors())


//Middleware - connecting other ports to backend ports

app.use(bodyParser.json())

//Routes
app.use('/',authRouter)
app.use((err, req, res, next) => {
  console.error("JSON Parse Error:", err.message);
  res.status(400).send("Invalid JSON");
});

/*app.get("/test",(req,res)=>{
  res.send("Test working")
})*/
app.get('/api/weather/:city',async(req,res)=>{
  try 
  {
    const city = req.params.city;
    const apikey = process.env.WEATHER_API_KEY;

    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=7`)
    const data = response.data;
    const weatherData = {
    location: {
        city: data.location.name,
        country: data.location.country
    },
    current: {
        temperature: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        humidity: data.current.humidity,
        wind: data.current.wind_kph
    },
    forecast: data.forecast.forecastday .slice(1).map(day => ({
        date: day.date,
        icon:day.icon,
        maxTemp: day.day.maxtemp_c,
        minTemp: day.day.mintemp_c,
        condition: day.day.condition.text,
        icon: day.day.condition.icon
    }))
};
res.json(weatherData);

  } 
  catch (error) 
  {
    res.status(500).json({message: "Error fetching weather"});
  }
})


const PORT = process.env.PORT || 8080;
app.get('/ping',(req,res)=>{res.send('PONG')})


app.listen(PORT,()=>{console.log(`Server is running on ${PORT}`)})