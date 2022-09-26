import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import { useState } from "react";
import { useEffect } from "react";
import MapsAPI from "../services/MapsAPI";
import RestaurantInfoCard from "./RestaurantInfoCard";

const Map = ({ location, data }) => {
  const googleAPI = import.meta.env.VITE_GOOGLE_MAP_API;
  const [restaurants, setRestaurants] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const center = { lat: 55.59712105786678, lng: 12.997431424230891 };

  const containerStyle = {
    width: "80vw",
    height: "80vh",
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

  console.log(selectedMarker);

  useEffect(() => {
    getRestaurants();
  }, []);

  if (isLoaded && restaurants) {
  }
  return (
    isLoaded &&
    restaurants && (
      <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          {restaurants.map((restaurant) => (
            <MarkerF
              icon={{
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 5,
              }}
              position={restaurant.coord}
              label={restaurant.name}
              onClick={() => {
                setSelectedMarker(restaurant);
              }}
              key={restaurant.id}
            />
          ))}

          <MarkerF
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
            }}
            position={location}
            label="User Location"
          />
        </GoogleMap>

        {selectedMarker && (
          <RestaurantInfoCard
            key={selectedMarker.id}
            restaurant={selectedMarker}
          />
        )}
      </>
    )
  );
};

export default Map;
