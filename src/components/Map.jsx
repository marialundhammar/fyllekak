import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import { useState } from "react";
import { useEffect } from "react";
import MapsAPI from "../services/MapsAPI";

const Map = ({ userLocation, data }) => {
  const googleAPI = import.meta.env.VITE_GOOGLE_MAP_API;
  const [restaurants, setRestaurants] = useState([]);

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${googleAPI}`,
  });

  const getRestaurants = async () => {
    const result = [];

    for (const res of data) {
      const address = `${res.street}+${res.number}+${res.city}`;
      const coords = await MapsAPI.getCoords(
        `${res.street}+${res.number}+${res.city}`
      );

      result.push({
        address: address,
        id: `${res.id}`,
        name: `${res.name}`,
        coord: coords.results[0].geometry.location,
      });
    }
    setRestaurants(result);

    return restaurants;
  };
  console.log(restaurants);

  useEffect(() => {
    getRestaurants();
  }, []);

  const getSelected = () => {
    console.log(restaurants[0]);
  };

  /*   const getInfoRestaurant = () => {
    console.log("this is restaurant", restaurants.coord);
  };
 */
  //fetching the coords/location when the data is loaded from MapsApi
  /*   useEffect(() => {
    setCoords([]);
    const getCoords = () => {
      restaurants.forEach(async (restaurant) => {
        const marker = await MapsAPI.getCoords(restaurant.address);
        setCoords((state) => [
          ...state,
          {
            coord: marker.results[0].geometry.location,
            id: restaurant.id,
            name: restaurant.name,
          },
        ]);
      });
    };
    getCoords();
  }, []); */

  return (
    isLoaded &&
    restaurants && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: 55.59712105786678,
          lng: 12.997431424230891,
        }}
        zoom={15}
      >
        {restaurants.map((restaurant) => (
          <MarkerF
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
            }}
            position={restaurant.coord}
            label={restaurant.name}
            onClick={getSelected}
            key={restaurant.id}
          />
        ))}

        <MarkerF
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
          }}
          position={userLocation.userLocation}
          label="User Location"
        />
      </GoogleMap>
    )
  );
};

export default Map;
