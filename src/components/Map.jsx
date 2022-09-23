import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import { useState } from "react";
import { useEffect } from "react";
import MapsAPI from "../services/MapsAPI";

const Map = ({ userLocation, query }) => {
  const addresses = [];

  console.log("THIS IS QUERY", query);

  query.forEach((res) =>
    addresses.push(`${res.street}+${res.number}+${res.city}`)
  );

  /*   const showMap = useMap({ query });
   */
  const googleAPI = import.meta.env.VITE_GOOGLE_MAP_API;
  const [coords, setCoords] = useState([]);

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${googleAPI}`,
  });

  console.log(addresses);

  //fetching the coords/location when the data is loaded from MapsApi
  useEffect(() => {
    setCoords([]);
    const getCoords = () => {
      addresses.forEach(async (address) => {
        const coord = await MapsAPI.getCoords(address);
        setCoords((state) => [
          ...state,
          coord.results[0].geometry.location,
        ]);
      });
    };
    getCoords();
  }, []);

  console.log("COORDS", coords);

  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: 55.59712105786678,
          lng: 12.997431424230891,
        }}
        zoom={15}
      >
        {coords.map((coord) => (
          <MarkerF
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 7,
            }}
            position={coord}
            label="Restaurant name"
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
