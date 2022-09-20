import React from 'react'
import { useQuery } from 'react-query';
import  MapsAPI  from '../services/MapsAPI'
import { useState } from 'react'
import useEffects from 'react'

import { GoogleMap,useJsApiLoader, Marker } from '@react-google-maps/api';


const Markers = () => {

    const dataAddress= MapsAPI.getAddress();
    const {data, isLoading, isSuccess }=  useQuery(['Coords'], MapsAPI.getCoords)


    const showMap = useMap()
  
    console.log(isSuccess)
    console.log(data)
    console.log(data.results[0].geometry.location.lng)
    console.log(data.results[0].geometry.location.lat)

/*     const lat = data.results[0].geometry.location.lat
    const lng = data.results[0].geometry.location.lng

    console.log(lat)
    console.log(lng)
 */



    return (

        <>
         {isSuccess &&    
            
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
        }
        </>
     
     
    )

}

export default Markers