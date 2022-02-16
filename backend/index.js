const express = require("express");
const app = express();
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3001;
const API_KEY = process.env.REACT_APP_API_KEY;

app.get("/location/:location", (req, res) => {
  const geocodingAPIUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${req.params.location}&appid=${API_KEY}`;

  axios
    .get(geocodingAPIUrl)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/lat/:lat/lon/:lon", (req, res) => {
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

// function geocode() {

//   fetch(geocodingAPIUrl)
//     .then((res) => res.json())
//     .then((data) => {
//       setLatLon({ lat: data[0].lat, lon: data[0].lon });
//     });
// }

// useEffect(() => {
//   geocode();
// }, [location]);

// function fetchWeatherData() {
//   if (latLon.lat === 0 && latLon.lon === 0) return;

//   const oneCallAPIUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latLon.lat}&lon=${latLon.lon}&units=metric&exclude=minutely&appid=${apiKey}`;

//   fetch(oneCallAPIUrl)
//     .then((res) => res.json())
//     .then((data) => {
//       setWeatherData(data);
//       console.log(data);
//     });
// }

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});