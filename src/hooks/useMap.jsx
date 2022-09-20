import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useQuery } from 'react-query';
import  MapsAPI  from '../services/MapsAPI'




const useMap = () => {

    const googleAPI =  import.meta.env.VITE_GOOGLE_MAP_API
    console.log("this is the api", googleAPI)

    //const {data, isLoading, isSuccess }=  useQuery(['Coords'], MapsAPI.getCoords)

/*   const coords =  {
    lat: data.results[0].geometry.location.lat,
    lng:data.results[0].geometry.location.lng,
    }
 */
/* 

    console.log("this is data from useMap", data) */

     //Just trying with some coords 
    const coords =  {
    lat: 55.593242405381694,
    lng:13.016352876632064,
    }
 /*
    //Just trying with some coords 
    const coords2 =  {
     lat:55.58477609505269,
     lng:13.011208857604752,
    }
 */
    //style of map container
   const containerStyle = {
    width: "100em",
    height: '100em'
    };  
  

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${googleAPI}`
    })

 
  
    return {
        isLoaded,
        containerStyle, 
        coords
    }


}


export default useMap