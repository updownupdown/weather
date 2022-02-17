const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3001;
const API_KEY = process.env.REACT_APP_API_KEY;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get("/geocode/location/:location", (req, res) => {
  const geocodingAPIUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${req.params.location}&limit=5&appid=${API_KEY}`;

  axios
    .get(geocodingAPIUrl)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/reverse-geocode/lat/:lat/lon/:lon", (req, res) => {
  const geocodingAPIUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${req.params.lat}&lon=${req.params.lon}&limit=5&appid=${API_KEY}`;

  axios
    .get(geocodingAPIUrl)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/weather/lat/:lat/lon/:lon", (req, res) => {
  const oneCallAPIUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${req.params.lat}&lon=${req.params.lon}&units=metric&exclude=minutely&appid=${API_KEY}`;

  axios
    .get(oneCallAPIUrl)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
