import React from "react";
import Map from "../components/Map";
import useRestaurants from "../hooks/useRestaurants";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
//just for showing cazpian

const HomePage = () => {
  const restaurantQuery = useRestaurants("restaurants")

  const [location, setLocation] = useState();

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
        <SearchBar />
      </div>
      <div className="flex justify-center">
        <Map location={location} data={restaurantQuery.data} />
      </div>
    </>
  );
};

export default HomePage;
