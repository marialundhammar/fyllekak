import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import useMap from "../hooks/useMap";
import useRestaurants from "../hooks/useRestaurants";

const Map = (location, query) => {
  console.log("location ==>", location.userLocation);
  const showMap = useMap({ query });
  console.log(showMap);

  return (
    showMap.isLoaded && (
      <GoogleMap
        mapContainerStyle={showMap.containerStyle}
        center={showMap.coords}
        zoom={15}
      >
        <MarkerF
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
          }}
          position={showMap.coords}
          label="Maria"
        />

        <MarkerF
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
          }}
          position={showMap.coords2}
          label="Alexander"
        />

        <MarkerF
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
          }}
          position={location.userLocation}
          label="User Location"
        />
      </GoogleMap>
    )
  );
};

export default Map;
