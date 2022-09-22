import React from "react";

const RestaurantInfoCard = ({ restaurant }) => {
  return (
    <div className="border-2 border-blue-800 bg-blue-400 w-1/5 rounded-xl">
      <div>
        <h1 className="text-3xl m-2">{restaurant.name}</h1>
      </div>
      <div className="flex justify-around w-8/12">
        <div className="border-2 border-blue-800 rounded-md p-1">
          <a href={restaurant.facebook}>Facebook</a>
        </div>
        <div className="border-2 border-blue-800 rounded-md p-1">
          <a href={restaurant.webiste}>Website</a>
        </div>
        <div className="border-2 border-blue-800 rounded-md p-1">
          <a href={restaurant.instagram}>Instagram</a>
        </div>
        <div className="border-2 border-blue-800 rounded-md p-1">
          <a href={restaurant.email}>Email</a>
        </div>
      </div>
      <div className="m-3">
        <p>description:</p>
        <p>{restaurant.description}</p>
      </div>
      <br />
      <p className="m-3">
        Street: {restaurant.street} {restaurant.number}
      </p>
      <p className="m-3">City: {restaurant.city}</p>
      <p className="m-3">Phone: {restaurant.phone}</p>
      <p className="m-3">Vego: {restaurant.vego}</p>
    </div>
  );
};

export default RestaurantInfoCard;
