import React from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import useMap from "../hooks/useMap";
import useRestaurants from "../hooks/useRestaurants";

const Map = ({ query }) => {
  const showMap = useMap({ query });

  console.log(showMap.addresses);

  return (
    showMap.isLoaded && (
      <>
        <p>
          {showMap.coords.lat}, {showMap.coords.lng}
        </p>

        <GoogleMap mapContainerStyle={showMap.containerStyle} center={showMap.coords} zoom={15}>
          <MarkerF
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
            }}
            position={showMap.coords}
            label="Maria"
          />
        </GoogleMap>
      </>
    )
  );
};

export default Map;
