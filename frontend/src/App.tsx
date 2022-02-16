import { useMemo } from "react";
import { useState, useEffect } from "react";
import { cachedData } from "./cachedData";
import { Alerts } from "./components/Weather/Alerts";
import { Current } from "./components/Weather/Current";
import { Daily } from "./components/Weather/Daily";
import { Hourly } from "./components/Weather/Hourly";
import { OneCallAPIProps } from "./components/Weather/OpenWeatherMap";

interface LatLonProps {
  lat?: number;
  lon?: number;
}

function App() {
  const savedLocation = localStorage.getItem("location") ?? "";

  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState("");
  const [latLon, setLatLon] = useState<LatLonProps>({
    lat: undefined,
    lon: undefined,
  });
  const [weatherData, setWeatherData] = useState<OneCallAPIProps>({});

  function geolocate(searchLocation: string) {
    console.log("geolocate...");
    fetch(`/location/${searchLocation}`)
      .then((res) => res.json())
      .then((data) => {
        const city = data[0];
        const cityName = `${city.name}, ${city.state}, ${city.country}`;
        setLatLon({ lat: city.lat, lon: city.lon });
        setLocation(cityName);
        setInputValue(cityName);
        localStorage.setItem("location", cityName);
      });
  }

  useEffect(() => {
    if (savedLocation !== "") geolocate(savedLocation);
  }, []);

  useEffect(() => {
    if (latLon.lat === undefined || latLon.lon === undefined) return;

    fetch(`/lat/${latLon.lat}/lon/${latLon.lon}`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      });
  }, [latLon]);

  const LeftPanels = useMemo(() => {
    return (
      <>
        <Current location={location} data={weatherData} />
        {weatherData.alerts && <Alerts data={weatherData} />}
      </>
    );
  }, [weatherData, location]);

  const RightPanels = useMemo(() => {
    return (
      <>
        <Hourly data={weatherData} />
        <Daily data={weatherData} />
      </>
    );
  }, [weatherData, location]);

  return (
    <div className="layout">
      <div className="layout__top">
        <div className="layout__search">
          <input
            type="text"
            className="form-control"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                geolocate(inputValue);
              }
            }}
            value={inputValue}
          />
          <button
            onClick={() => {
              geolocate(inputValue);
            }}
          >
            Search
          </button>
        </div>
      </div>

      <div className="layout__bottom">
        <div className="layout__bottom__left">{LeftPanels}</div>
        <div className="layout__bottom__right">{RightPanels}</div>
      </div>
    </div>
  );
}

export default App;
