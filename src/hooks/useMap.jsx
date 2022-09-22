
import { useJsApiLoader } from "@react-google-maps/api";
import MapsAPI from "../services/MapsAPI";
import { useState } from "react";
import { useEffect } from "react";

const useMap = () => {
  const googleAPI = import.meta.env.VITE_GOOGLE_MAP_API;
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  
  
  //style of map container
  const containerStyle = {
    width: "100em",
    height: "100em",
  };
  
  //maybe this should be in a MapsAPI??
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${googleAPI}`,
  });

  //fetching the coords/location when the data is loaded from MapsApi
  useEffect(() => {
    (async () => {
      const data = await MapsAPI.getCoords();
      setCoords(data.results[0].geometry.location);
    })();
  }, []);

  return {
    isLoaded,
    containerStyle,
    coords,

  };
};

export default useMap;
