import React from 'react'
import { useQuery } from 'react-query';
import  MapsAPI  from '../services/MapsAPI'



const Map = () => {

    const data= MapsAPI.getMap();
    
 /*    console.log("isLoading is:",isLoading) */
    /*console.log(isSuccess)
    console.log(isError) */
    console.log(data)
    /*  console.log(data.results.address_components) */
    
return (
  <div className="container mx-auto">
 
  </div>
)

}
export default Map