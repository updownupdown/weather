import React, { useState, useEffect } from "react";
import { Geolocate } from "../Icons/Geolocate";
import AsyncSelect from "react-select/async";
import {
  CitiesOption,
  LocationResultsProps,
  OneCallAPIProps,
} from "../../utils/OpenWeatherMap";
import { cachedWaterloo } from "../../cache/cachedWaterloo";
import { cachedCities } from "../../cache/cachedCities";
import { cachedLondon } from "../../cache/cachedLondon";
import { formatCityName } from "../../utils/utils";
import "./Search.scss";
const debounce = require("lodash/debounce");

interface Props {
  selectedCity: LocationResultsProps | undefined;
  setWeatherData: (data: OneCallAPIProps) => void;
  setSelectedCity: (city: LocationResultsProps) => void;
  setDataLoaded: (loaded: boolean) => void;
}

export const Search = ({
  selectedCity,
  setWeatherData,
  setSelectedCity,
  setDataLoaded,
}: Props) => {
  const loadData = true;
  const useCachedData = true;

  const cachedData = cachedWaterloo;

  const citiesStorageKey = "citiesList";

  const [fetchedCities, setFetchedCities] = useState<
    LocationResultsProps[] | undefined
  >(undefined);

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

  // fetch cities suggestions
  const _loadSuggestions = (query: any, callback: any) => {
    fetch(`/geocode/location/${query}`)
      .then((res) => res.json())
      .then((cities) => {
        setFetchedCities(cities);
        callback(convertCitiesToOptions(cities));
      });
  };

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

  const loadSuggestions = debounce(_loadSuggestions, 1000);

  function generateDefaultOptions() {
    const savedCities = getSavedCities();

    if (savedCities.length > 0) {
      return convertCitiesToOptions(savedCities);
    } else {
      return [];
    }
  }

  function convertCitiesToOptions(cities: LocationResultsProps[]) {
    const citiesOptions: CitiesOption[] = [];

    cities.forEach((city: LocationResultsProps, index: number) => {
      if (city)
        citiesOptions.push({ value: index, label: formatCityName(city) });
    });

    return citiesOptions;
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

  function getSavedCities() {
    const savedCities = localStorage.getItem(citiesStorageKey);
    return savedCities ? JSON.parse(savedCities) : [];
  }

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

  return (
    <div className="search">
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
  );
};
