
import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
} from "@react-google-maps/api";
import useMap from "../hooks/useMap";
import useRestaurants from "../hooks/useRestaurants";

const Map = ({ query }) => {
  const showMap = useMap({ query });


  console.log(showMap);
const Map = ( location ) => {
  console.log('location ==>', location.userLocation)


  return (
    showMap.isLoaded && (
      <>
        <p>
          {showMap.coords.lat}, {showMap.coords.lng}
        </p>

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
        label = "Maria"
        />
 
        <MarkerF
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
        }}
        position={showMap.coords2}
        label = "Alexander"
        />

        <MarkerF
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
        }}
        position={location.userLocation}
        label = "User Location"
        />
  
      </GoogleMap>
  )
 
 }
 
 export default Map
   