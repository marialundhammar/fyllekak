import { useState } from "react";
import RestaurantInfoCard from "./RestaurantInfoCard";
import { useAuthContext } from "../contexts/AuthContext";

const RestaurantList = ({ restaurants }) => {
  const [infoCard, setInfoCard] = useState();
  const { infoCardRestaurant, setInfoCardRestaurant } = useAuthContext();

  const { setMapCenter } = useAuthContext();

  const handleOnClickRestaurantCard = (res) => {
    setInfoCardRestaurant(res);
    setMapCenter(res.coords);
  };

  return (
    <div>
      <ul className="">
        {restaurants &&
          restaurants.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0).map((res) => (
            <div
              className="my-1 border border-contrast-color rounded bg-nav flex justify-between hover:text-contrast-color-dark hover:bg-darkish-blue"
              key={res.id}
              onClick={() => handleOnClickRestaurantCard(res)}
            >
              <li className="p-2">{res.name}</li>
            </div>
          ))}
      </ul>

      {infoCardRestaurant && (
        <RestaurantInfoCard
          key={infoCardRestaurant.id}
          restaurant={infoCardRestaurant}
        />
      )}
    </div>
  );
};

export default RestaurantList;
