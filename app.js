// Requires
const express = require("express");
const axios = require("axios");
const ejs = require("ejs");
require("dotenv").config();

// Static variables
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = "your_openweather_api_key";
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

app.post("/weather", (req, res) => {
    console.log("POST req recieved at /weather");
    const city = req.body.city;
    console.log(`User entered city: ${city}`);

    if (!city) {
        console.log("No City entered");
        res.render("index", { weather: null, error: "Please enter a city name" });
        return;
    }

});
