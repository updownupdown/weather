import React from "react";
import { CitiesOption, LocationResultsProps } from "../../utils/OpenWeatherMap";
import { formatCityName } from "../../utils/utils";

export const citiesStorageKey = "citiesList";

interface LastFetchedProps {
  lastFetched: Date | undefined;
}
export const LastFetchedTime = ({ lastFetched }: LastFetchedProps) => {
  if (lastFetched === undefined) return <></>;

  const fetchTime = lastFetched.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return <span className="last-fetched">Data last fetched: {fetchTime}</span>;
};

// convert cities from API to select options
export function convertCitiesToOptions(cities: LocationResultsProps[]) {
  const citiesOptions: CitiesOption[] = [];

  cities.forEach((city: LocationResultsProps, index: number) => {
    if (city) citiesOptions.push({ value: index, label: formatCityName(city) });
  });

  return citiesOptions;
}

// get cities from local storage
export function getSavedCities() {
  const savedCities = localStorage.getItem(citiesStorageKey);
  return savedCities ? JSON.parse(savedCities) : [];
}

// generate default options for select
export function generateDefaultOptions() {
  const savedCities = getSavedCities();

  if (savedCities.length > 0) {
    return convertCitiesToOptions(savedCities);
  } else {
    return [];
  }
}

export function addCityToStorage(newCity: LocationResultsProps) {
  let citiesToStore = getSavedCities();

  // add new city to top of list of cities to store (only store unique, max 5)
  citiesToStore.forEach((city: LocationResultsProps, index: number) => {
    console.log(city);

    if (
      city.name === newCity.name &&
      city.state === newCity.state &&
      city.country === newCity.country
    ) {
      citiesToStore.splice(index, 1);
    }
  });

  citiesToStore.unshift(newCity);
  citiesToStore = citiesToStore.slice(0, 5);

  localStorage.setItem(citiesStorageKey, JSON.stringify(citiesToStore));
}
