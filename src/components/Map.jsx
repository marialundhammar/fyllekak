import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';



const Map = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDjwKG-ZAmhe10gH1w3vUBkviGJk1CrFWw"
    })
  
 
  
  return isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coords}
        zoom={15}
        >
       
        <Marker
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
         
        }}
        position={coords}
        label = "Maria"
        />
 
        <Marker
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 7,
        }}
        position={coords2}
        label = "Alexander"
        />
  
      </GoogleMap>
  )
 
 }
 
 export default Map
   