import { useCallback } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import googleMapsStyle from "../googleMapsStyle";
import SearchBar from "../components/SearchBar";
import { useAuthContext } from "../contexts/AuthContext";

const Map = ({ onLocationChange, location, restaurants }) => {
  const googleAPI = import.meta.env.VITE_GOOGLE_MAP_API;

  const { mapCenter, setMapCenter, setInfoCardRestaurant, isMapLoaded } =
    useAuthContext();

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapStyle = googleMapsStyle;

  const gMaps = isMapLoaded ? window.google.maps : {};

  const iconRestaurant = isMapLoaded
    ? {
        path: "M12,2a8.009,8.009,0,0,0-8,8c0,3.255,2.363,5.958,4.866,8.819,0.792,0.906,1.612,1.843,2.342,2.791a1,1,0,0,0,1.584,0c0.73-.948,1.55-1.885,2.342-2.791C17.637,15.958,20,13.255,20,10A8.009,8.009,0,0,0,12,2Zm0,11a3,3,0,1,1,3-3A3,3,0,0,1,12,13Z",
        fillColor: "#42f5c5",
        fillOpacity: 1,
        strokeOpacity: 0,
        anchor: new gMaps.Point(12, 22),
        scale: 1.5,
        labelOrigin: new gMaps.Point(10, -8),
      }
    : {};

  const iconUser = {
    path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
    fillColor: "#42b9f5",
    fillOpacity: 0.6,
    strokeWeight: 0,
    scale: 1.1,
  };

  const handleCityChange = useCallback(
    (city) => {
      onLocationChange(city);
    },
    [onLocationChange]
  );

  return (
    isMapLoaded &&
    restaurants && (
      <>
        <div className="flex flex-col w-screen h-screen z-0">
          <div className=" w-full">
            <SearchBar
              setMapCenter={setMapCenter}
              onCityChange={handleCityChange}
            />
          </div>

          <div className="flex justify-center items-center flex-grow">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={15}
              options={{ styles: mapStyle }}
            >
              {restaurants.map((restaurant) => (
                <MarkerF
                  position={restaurant.coords}
                  label={{
                    text: restaurant.name,
                    className: "labelStyle",
                  }}
                  onClick={() => {
                    setInfoCardRestaurant(restaurant);
                    setMapCenter(restaurant.coords);
                  }}
                  key={restaurant.id}
                  icon={iconRestaurant}
                />
              ))}
              <MarkerF icon={iconUser} position={location} animation={1} />
            </GoogleMap>
          </div>
        </div>
      </>
    )
  );
};

export default Map;
