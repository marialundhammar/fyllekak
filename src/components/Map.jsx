import React from 'react'
import { GoogleMap,useJsApiLoader, Marker } from '@react-google-maps/api';
import useMap from '../hooks/useMap'
import { useQuery } from 'react-query';
import  MapsAPI  from '../services/MapsAPI'


const Map = () =>  {


  const {data, isLoading, isSuccess }=  useQuery(['Coords'], MapsAPI.getCoords)

  const showMap = useMap()

  console.log(isSuccess)
  console.log(data)
  console.log(data.results[0].geometry.location.lng)
  console.log(data.results[0].geometry.location.lat)


  const position = {
    lat: 37.772,
    lng: -122.214
  }
  
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
          scale: 20,
        }}
        position={position}
        label = "Alexander"
        />
  
      </GoogleMap>
      </>
  )
  )

 }
 
 export default Map
   