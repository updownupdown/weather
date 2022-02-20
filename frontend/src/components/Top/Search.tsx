import React, { useState, useEffect } from "react";
import { Geolocate } from "../Icons/Geolocate";
import AsyncSelect from "react-select/async";
import {
  LocationResultsProps,
  OneCallAPIProps,
} from "../../utils/OpenWeatherMap";
import { cachedWaterloo } from "../../cache/cachedWaterloo";
import { cachedCities } from "../../cache/cachedCities";
import { cachedLondon } from "../../cache/cachedLondon";
import "./Search.scss";
import {
  addCityToStorage,
  convertCitiesToOptions,
  generateDefaultOptions,
  getSavedCities,
  LastFetchedTime,
} from "./search-utils";
const debounce = require("lodash/debounce");

interface Props {
  selectedCity: LocationResultsProps | undefined;
  setWeatherData: (data: OneCallAPIProps) => void;
  setSelectedCity: (city: LocationResultsProps) => void;
  setDataLoaded: (loaded: boolean) => void;
  setIsLoading: (loaded: boolean) => void;
}

export const Search = ({
  selectedCity,
  setWeatherData,
  setSelectedCity,
  setDataLoaded,
  setIsLoading,
}: Props) => {
  const useCachedData = false;
  const cachedData = cachedLondon;
  const cachedCityNum = 1;

  const [fetchedCities, setFetchedCities] = useState<
    LocationResultsProps[] | undefined
  >(undefined);
  const [lastFetched, setLastFetched] = useState<Date | undefined>(undefined);

  // geolocate - browser lat/lon
  function geolocateFromBrowser() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      if (lat && lon) {
        fetch(`/reverse-geocode/lat/${lat}/lon/${lon}`)
          .then((res) => res.json())
          .then((cities) => {
            setSelectedCity(cities[0]);
            addCityToStorage(cities[0]);
            setOptionsFromStorage();
          });
      }
    });
  }

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

  // fetch weather data
  function fetchWeatherData(selectedCity: LocationResultsProps) {
    fetch(`/weather/lat/${selectedCity.lat}/lon/${selectedCity.lon}`)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        setDataLoaded(true);
        setIsLoading(false);
        setLastFetched(new Date());
      });
  }

  // fetch weather data when city is selected
  useEffect(() => {
    if (selectedCity === undefined || useCachedData) return;

    // fetch data immediately
    fetchWeatherData(selectedCity);

    // re-fetch data every fifteen minutes if page has focus
    const interval = setInterval(() => {
      if (document.hasFocus()) {
        fetchWeatherData(selectedCity);
      }
    }, 1000 * 60 * 15);

    return () => {
      clearInterval(interval);
    };
  }, [selectedCity]);

  // select city
  function selectCity(e: any) {
    if (e === null || fetchedCities === undefined) return;

    const city = fetchedCities[e.value];

    setSelectedCity(city);
    addCityToStorage(city);
  }

  // on init
  useEffect(() => {
    if (useCachedData) {
      setWeatherData(cachedData);
      setDataLoaded(true);

      setFetchedCities(cachedCities);
      setSelectedCity(cachedCities[cachedCityNum]);

      return;
    }

    if (getSavedCities().length) {
      setOptionsFromStorage(true);
    } else {
      geolocateFromBrowser();
    }
  }, []);

  function setOptionsFromStorage(loadFirstCity?: true | undefined) {
    const savedCities = getSavedCities();
    if (savedCities.length) {
      setFetchedCities(savedCities);

      if (loadFirstCity) setSelectedCity(savedCities[0]);
    }
  }

  return (
    <div className="search">
      <div className="search-fields">
        <AsyncSelect
          className="loc-search"
          defaultOptions={generateDefaultOptions()}
          onChange={selectCity}
          loadOptions={loadSuggestions}
          placeholder="Search city..."
          blurInputOnSelect
          onBlur={() => setOptionsFromStorage()}
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

      <LastFetchedTime lastFetched={lastFetched} />
    </div>
  );
};
