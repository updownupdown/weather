import React, { useState } from "react";
import { Current } from "./components/Top/Current";
import { Daily } from "./components/Panels/Daily";
import { Hourly } from "./components/Panels/Hourly";
import { LocationResultsProps, OneCallAPIProps } from "./utils/OpenWeatherMap";
import { Location } from "./components/Top/Location";
import { Search } from "./components/Top/Search";
import { Alerts } from "./components/Weather/Alerts";

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  const [selectedCity, setSelectedCity] = useState<
    LocationResultsProps | undefined
  >(undefined);

  const [weatherData, setWeatherData] = useState<OneCallAPIProps>({});

  return (
    <div className="layout-wrap">
      <div className="layout">
        <div className="layout__top">
          <div className="box box--location">
            {weatherData.alerts && (
              <Alerts
                alerts={weatherData.alerts}
                timezone={weatherData.timezone}
              />
            )}

            <Location city={selectedCity} data={weatherData} />

            <Search
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              setWeatherData={setWeatherData}
              setDataLoaded={setDataLoaded}
            />
          </div>

          <Current city={selectedCity} data={weatherData} />
        </div>

        <Hourly data={weatherData} />
        <Daily data={weatherData} />
      </div>
    </div>
  );
}

export default App;
