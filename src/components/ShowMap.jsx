import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState, useCallback} from "react"
 
 
const coords =  {
   lat: 55.593242405381694,
   lng:13.016352876632064,
 }

  
const coords2 =  {
    lat:55.58477609505269,
    lng:13.011208857604752,
  }

  const containerStyle = {
   width: "100%",
   height: '600px'
 };
 
const ShowMap = () => {
 
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

export default ShowMap
  