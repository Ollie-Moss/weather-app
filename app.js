// Requires
const express = require("express");
const axios = require("axios");
const ejs = require("ejs");
require("dotenv").config();

// Static variables
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || "your_openweather_api_key";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Express Setup
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    console.log("GET req recieved at /");
    res.render("index", { weather: null, error: null });
});

app.post("/weather", async (req, res) => {
    console.log("POST req recieved at /weather");
    const city = req.body.city;
    console.log(`User entered city: ${city}`);

    if (!city) {
        console.log("No City entered");
        res.render("index", {
            weather: null,
            error: "Please enter a city name",
        });
        return;
    }

    try {
        console.log(`Fetching weather data for city ${city}`);
        const response = await axios.get(
            `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`,
        );
        console.log("Weather data fetched succesfully");
        const weatherData = response.data;

        const weather = {
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            icon: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
        };

        console.log(
            `Weather for ${weather.city}: ${weather.temperature}, ${weather.description}`,
        );

        res.render("index", { weather, error: null });
    } catch (error) {
        console.error(`Failed to fetch weather data: ${error.message}`);
        res.render("index", {
            weather: null,
            error: `Failed to fetch weather data`,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
