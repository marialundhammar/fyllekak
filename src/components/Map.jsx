import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import useMap from "../hooks/useMap";
import useRestaurants from "../hooks/useRestaurants";

const Map = () => {
  const showMap = useMap();

  const { data } = useRestaurants();

  console.log(data);

  if (data) {
    data.data.map((res) => console.log("this is the mapping", res.name));
  }
 */
  return (
    showMap.isLoaded && (
      <GoogleMap mapContainerStyle={showMap.containerStyle} center={showMap.coords} zoom={15}>
        <Marker
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
          }}
          position={showMap.coords}
          label="Maria"
        />

        <Marker
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
          }}
          position={showMap.coords2}
          label="Alexander"
        />
      </GoogleMap>
    )
  );
};

export default Map;
