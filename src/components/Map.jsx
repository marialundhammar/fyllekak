import React from 'react'
import { GoogleMap,useJsApiLoader, Marker } from '@react-google-maps/api';
import useMap from '../hooks/useMap'



const Map = () =>  {


  const showMap = useMap()

  
  return (showMap.isLoaded && (
    <>
    
  
      <GoogleMap
        mapContainerStyle={showMap.containerStyle}
        center={showMap.coords}
        zoom={15}
        >

      
        <Marker
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
        }}
        position={showMap.coords}
        label = "Maria"
        />
  
      </GoogleMap>
      </>
  )
  )

 }
 
 export default Map
   