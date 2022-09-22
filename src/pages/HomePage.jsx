import React from "react";
import Map from "../components/Map";
import useRestaurants from "../hooks/useRestaurants";
//just for showing cazpian

const HomePage = () => {
  const restaurantQuery = useRestaurants();

  return (
    <>
      <div className="container mx-auto flex justify-center text-lg">HOMEPAGE</div>
      <div className="flex justify-center">
        <Map query={restaurantQuery} />
      </div>
    </>
  );
};

export default HomePage;
