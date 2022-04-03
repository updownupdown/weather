import React, { useState, useEffect } from "react";
import { Current } from "./components/Top/Current";
import { Daily } from "./components/Panels/Daily";
import { Hourly } from "./components/Panels/Hourly";
import { LocationResultsProps, OneCallAPIProps } from "./utils/OpenWeatherMap";
import { Location } from "./components/Top/Location";
import { Search } from "./components/Top/Search";
import { Alerts } from "./components/Weather/Alerts";
import { Box } from "./components/Panels/Box";
import clsx from "clsx";

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCity, setSelectedCity] = useState<
    LocationResultsProps | undefined
  >(undefined);

  const [weatherData, setWeatherData] = useState<OneCallAPIProps>({});

  useEffect(() => {
    let pageTitle = "Weather Dashboard";

    if (weatherData.current !== undefined) {
      pageTitle =
        weatherData.current?.temp.toFixed() +
        "°C (feels " +
        weatherData.current?.feels_like.toFixed() +
        "°C) in " +
        selectedCity?.name +
        " | Weather Dashboard";
    }

    document.title = pageTitle;
  }, [weatherData]);

  return (
    <div className={clsx("layout-wrap", isLoading && "data-loading")}>
      <div className="layout">
        {weatherData.alerts && (
          <Alerts alerts={weatherData.alerts} timezone={weatherData.timezone} />
        )}

        <div className="layout__top">
          <div className="layout__top__location">
            <Box layout="location" allowOverflow>
              <div className="location">
                <Location city={selectedCity} data={weatherData} />

                <Search
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  setWeatherData={setWeatherData}
                  setDataLoaded={setDataLoaded}
                  setIsLoading={setIsLoading}
                />
              </div>
            </Box>
          </div>

          {(dataLoaded || isLoading) && (
            <div className="layout__top__current">
              <Box layout="current" isLoading={isLoading}>
                <Current city={selectedCity} data={weatherData} />
              </Box>
            </div>
          )}
        </div>

        {(dataLoaded || isLoading) && (
          <>
            <Box layout="hourly" isLoading={isLoading}>
              <Hourly data={weatherData} />
            </Box>

            <Box layout="daily" isLoading={isLoading}>
              <Daily data={weatherData} />
            </Box>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
