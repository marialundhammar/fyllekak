import React, { useEffect } from "react";
import Map from "../components/Map";
import useRestaurants from "../hooks/useRestaurants";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { getCoords } from "../services/MapsAPI";
//just for showing cazpian

const HomePage = () => {
  const restaurantQuery = useRestaurants("restaurants")

  const [location, setLocation] = useState();
  const [mapCenter, setMapCenter] = useState({ lat: 55.59712105786678, lng: 12.997431424230891 })

  const getUserLocation = () => {
    if (navigator.geolocation) {
      console.log("yay");
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        console.log("userLocation ==>", userLocation);

        setLocation(userLocation);
      });
    } else {
      console.log("nay");
    }
  };

  if (restaurantQuery.isLoading) {
    return <div>"loading..."</div>;
  }
 
  const handleSearch = async (search) => {
    const getSearch = await getCoords(search)
    const searchRes = getSearch.results[0]?.geometry.location
    const restaurantMatches = restaurantQuery.data[0].coords

    if ((searchRes.lat === restaurantMatches.lat) && (searchRes.lng === restaurantMatches.lng)) {
      setMapCenter({
        lat: searchRes.lat,
        lng: searchRes.lng
      })
    }
  }

  return (
    <>
      <div className="container mx-auto flex justify-center text-lg">
        FYLLEKÄKSKARTAN
      </div>
      <button
        onClick={() => {
          getUserLocation();
        }}
      >
        User Location
      </button>
      <div className="container mx-auto flex justify-center text-lg">
        <SearchBar handleSearch={handleSearch} />
      </div>
      <div className="flex justify-center">
        <Map location={location} data={restaurantQuery.data} center={mapCenter} />
      </div>
    </>
  );
};

export default HomePage;
