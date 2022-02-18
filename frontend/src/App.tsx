import { useMemo } from "react";
import { useState, useEffect } from "react";
import { Geolocate } from "./components/Icons/Geolocate";
import { Alerts } from "./components/Weather/Alerts";
import { Current } from "./components/Weather/Current";
import { Daily } from "./components/Weather/Daily";
import { Hourly } from "./components/Weather/Hourly";
import {
  CitiesOption,
  LocationResultsProps,
  OneCallAPIProps,
} from "./components/Weather/OpenWeatherMap";
import { formatCityName } from "./utils/utils";
import AsyncSelect from "react-select/async";
import { cachedWaterloo } from "./cache/cachedWaterloo";
import { cachedCities } from "./cache/cachedCities";
import { cachedLondon } from "./cache/cachedLondon";
import { Location } from "./components/Weather/Location";
const debounce = require("lodash/debounce");

function App() {
  const loadData = true;
  const useCachedData = false;
  const cachedData = cachedWaterloo;

  const [dataLoaded, setDataLoaded] = useState(false);

  const citiesStorageKey = "citiesList";
  const [fetchedCities, setFetchedCities] = useState<
    LocationResultsProps[] | undefined
  >(undefined);
  const [selectedCity, setSelectedCity] = useState<
    LocationResultsProps | undefined
  >(undefined);
  const [weatherData, setWeatherData] = useState<OneCallAPIProps>({});

  // geolocate - browser lat/lon
  function geolocateFromBrowser() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      if (lat && lon) {
        fetch(`/reverse-geocode/lat/${lat}/lon/${lon}`)
          .then((res) => res.json())
          .then((data) => {
            setFetchedCities(data);
          });
      }
    });
  }

  // fetch weather data when city is selected
  useEffect(() => {
    if (selectedCity === undefined || useCachedData) return;

    fetch(`/weather/lat/${selectedCity.lat}/lon/${selectedCity.lon}`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        setDataLoaded(true);
      });
  }, [selectedCity]);

  // on init
  useEffect(() => {
    if (!loadData) return;
    if (useCachedData) {
      setWeatherData(cachedData);
      setDataLoaded(true);

      setFetchedCities(cachedCities);
      setSelectedCity(cachedCities[0]);

      return;
    }

    const savedCities = getSavedCities();

    if (savedCities.length !== 0) {
      setFetchedCities(savedCities);
      setSelectedCity(savedCities[0]);
    }
  }, []);

  // fetch cities suggestions
  const _loadSuggestions = (query: any, callback: any) => {
    fetch(`/geocode/location/${query}`)
      .then((res) => res.json())
      .then((cities) => {
        setFetchedCities(cities);
        callback(convertCitiesToOptions(cities));
      });
  };

  const loadSuggestions = debounce(_loadSuggestions, 1000);

  function convertCitiesToOptions(cities: LocationResultsProps[]) {
    const citiesOptions: CitiesOption[] = [];

    cities.forEach((city: LocationResultsProps, index: number) => {
      if (city)
        citiesOptions.push({ value: index, label: formatCityName(city) });
    });

    return citiesOptions;
  }

  function getSavedCities() {
    const savedCities = localStorage.getItem(citiesStorageKey);
    return savedCities ? JSON.parse(savedCities) : [];
  }

  // select city
  const selectCity = (e: any) => {
    if (e !== null && fetchedCities !== undefined) {
      const newCity = fetchedCities[e.value];

      setSelectedCity(newCity);

      let citiesToStore = getSavedCities();
      citiesToStore.unshift(newCity);
      citiesToStore = citiesToStore.slice(0, 5);

      localStorage.setItem(citiesStorageKey, JSON.stringify(citiesToStore));
    }
  };

  function generateDefaultOptions() {
    const savedCities = getSavedCities();

    if (savedCities.length > 0) {
      return convertCitiesToOptions(savedCities);
    } else {
      return [];
    }
  }

  const LeftPanels = useMemo(() => {
    return dataLoaded ? (
      <>
        <div className="box box--current">
          <Current city={selectedCity} data={weatherData} />
        </div>

        {weatherData.alerts && (
          <div className="box box--alerts">
            <Alerts data={weatherData} />
          </div>
        )}
      </>
    ) : (
      <></>
    );
  }, [weatherData, selectedCity, dataLoaded]);

  const RightPanels = useMemo(() => {
    return dataLoaded ? (
      <>
        <div className="box box--hourly">
          <Hourly data={weatherData} />
        </div>
        <div className="box box--daily">
          <Daily data={weatherData} />
        </div>
      </>
    ) : (
      <></>
    );
  }, [weatherData, selectedCity, dataLoaded]);

  const LocationTime = useMemo(() => {
    return dataLoaded ? (
      <Location city={selectedCity} data={weatherData} />
    ) : (
      <></>
    );
  }, [weatherData, selectedCity, dataLoaded]);

  return (
    <div className="layout-wrap">
      <div className="layout">
        <div className="layout__left">
          <div className="box box--search">
            {LocationTime}

            <div className="search-fields">
              <AsyncSelect
                className="loc-search"
                defaultOptions={generateDefaultOptions()}
                onChange={selectCity}
                loadOptions={loadSuggestions}
                placeholder="Search city..."
              />

              <button
                className="button button--icon"
                onClick={() => {
                  geolocateFromBrowser();
                }}
              >
                <Geolocate />
              </button>
            </div>
          </div>

          {LeftPanels}
        </div>

        <div className="layout__right">{RightPanels}</div>
      </div>
    </div>
  );
}

export default App;
