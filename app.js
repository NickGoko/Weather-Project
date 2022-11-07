// const response= require("express");
const express = require("express");
const https = require('https')
const body_parser = require("body-parser")

const app = express();

app.use(body_parser.urlencoded({extended: true}))



app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req, res){
    // console.log(req.body.cityName)
    const API_KEY = {API_KEY}
    const city_name = req.body.cityName
    const units = "metric" 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}&units=${units}`
    
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data){
            const weather_data = JSON.parse(data)
            // console.log(weather_data);
            const weather_description = weather_data.weather[0].description
            // console.log(weather_description)
            const weather_temp = weather_data.main.temp
            // console.log(weather_temp);
            const icon = weather_data.weather[0].icon
            const img_url = "https://openweathermap.org/img/wn/"+icon+"@2x.png"

            res.write(`<p>The temp in ${city_name} currently is ${weather_temp} degrees celcius<p>`)
            res.write(`<h2>The weather in ${city_name} currently is ${weather_description}</h2>`)
            res.write("<img src="+ img_url+ ">")
            res.send()
        })
    })
})
// res.send("Server is up and running") // Cannot have more than one res.send

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
