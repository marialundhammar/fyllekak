import React from "react"
import { useState } from "react"

const RestaurantInfoCard = ({ restaurant }) => {
	const [lng, setLng] = useState(null)
	const [lat, setLat] = useState(null)

	const getDirection = () => {
		setLng(restaurant.coords.lng)
		setLat(restaurant.coords.lat)
	}

	console.log(lng, lat)

	return (
		<>
			<div className="border-2 border-blue-800 bg-blue-400 w-1/5 rounded-xl">
				<div>
					<h1 className="text-3xl m-2">
						{restaurant.name}
					</h1>
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

				<div>
					<button
						onClick={() => {
							getDirection()
						}}
					>
						Get Direction
					</button>
					{lat && (
						<div
							class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
							role="alert"
						>
							<p>
								{" "}
								<a
									className="p-2 text-blue-900"
									href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
									target="_blank"
								>
									Open link in ny window
								</a>
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default RestaurantInfoCard
