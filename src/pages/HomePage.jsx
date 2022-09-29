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
    console.log("getSearch ==>", getSearch)

    const searchRes = getSearch.results[0]?.geometry.location
    console.log("searchRes ==>", searchRes)
    
    const restaurantData = restaurantQuery.data
    console.log("restaurantData ==>", restaurantData)

    const restaurantDataNames = restaurantData.map((restaurant) => (restaurant.name))
    console.log("restaurantDataNames ==>", restaurantDataNames)

    const restaurantDataCoords = restaurantData.map((restaurant) => (restaurant.coords))
    console.log("restaurantDataCoords ==>", restaurantDataCoords)

    const restaurantDataCoordsFiltered = restaurantDataCoords.filter((restaurant) => {return restaurant !== undefined})
    console.log("restaurantDataCoordsFiltered ==>", restaurantDataCoordsFiltered)
    
    const re = new RegExp(search, "gi")

    for (const name of restaurantDataNames) {
      
      if (name.match(re)) {
        console.log("Success")
        console.log("search ==>", search)
        console.log("name ==>", name)

        console.log("re ==>", re)
        
        console.log("Great success")
        console.log("name.match(re) ==>", name.match(re))

        const nameOfRestaurant = restaurantData.filter((restaurant) => {return restaurant.name.match(re)})
        console.log("nameOfRestaurant ==>", nameOfRestaurant)

        setMapCenter({
          lat: nameOfRestaurant[0].coords.lat,
          lng: nameOfRestaurant[0].coords.lng,
        })
      }
    }

    for (const coords of restaurantDataCoordsFiltered) {
      // console.log("coords ==>", coords)
      // console.log("coords.lat ==>", coords?.lat)
      // console.log("coords.lng ==>", coords?.lng)

      if ((coords.lat === searchRes.lat) && (coords.lng === searchRes.lng)) {
        console.log("Great Success")

        setMapCenter({
          lat: searchRes.lat,
          lng: searchRes.lng
        })
      }
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
