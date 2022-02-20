import React, { useState } from "react";
import { Current } from "./components/Top/Current";
import { Daily } from "./components/Panels/Daily";
import { Hourly } from "./components/Panels/Hourly";
import { LocationResultsProps, OneCallAPIProps } from "./utils/OpenWeatherMap";
import { Location } from "./components/Top/Location";
import { Search } from "./components/Top/Search";
import { Alerts } from "./components/Weather/Alerts";
import { Box } from "./components/Panels/Box";

function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCity, setSelectedCity] = useState<
    LocationResultsProps | undefined
  >(undefined);

  const [weatherData, setWeatherData] = useState<OneCallAPIProps>({});

  return (
    <div className="layout-wrap">
      <div className="layout">
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

          {dataLoaded && (
            <div className="layout__top__current">
              <Box layout="current">
                <Current city={selectedCity} data={weatherData} />
              </Box>
            </div>
          )}
        </div>

        {dataLoaded && (
          <>
            {weatherData.alerts && (
              <Alerts
                alerts={weatherData.alerts}
                timezone={weatherData.timezone}
              />
            )}

            <Box layout="hourly">
              <Hourly data={weatherData} />
            </Box>

            <Box layout="daily">
              <Daily data={weatherData} />
            </Box>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
