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
app.use(express.static(__dirname("public")));

// Routes
app.get("/", (req, res) => {
    console.log("GET req recieved at /");
    res.render("index", {weather: null, error: null});
});
