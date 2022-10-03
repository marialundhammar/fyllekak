import React from "react"
import { useState } from "react"
import PopUp from "../components/PopUp"

const RestaurantInfoCard = ({ restaurant, id }) => {
	const [lng, setLng] = useState(null)
	const [lat, setLat] = useState(null)

	const getDirection = () => {
		setLng(restaurant.coords.lng)
		setLat(restaurant.coords.lat)
	}

	return (
		<>
			{lat && lng && <PopUp lat={lat} lng={lng} />}

			<div className="px-4 w-400 ">
				<div className="flex flex-row">
					<h1 className="text-3xl">{restaurant.name}</h1>
					{restaurant.vego && (
						<p className="m-3">VEGO FRIENDLY!</p>
					)}
				</div>
				<div className="flex flex-row">
					<p className="my-3">
						Address: {restaurant.street}{" "}
						{restaurant.number}, {restaurant.city}
					</p>

					<div
						type="button"
						data-modal-toggle="new-window-modal"
						className="shadow-lg rounded-md bg-emerald-100 flex justify-center w-40 h-8 my-2 p-1"
						onClick={() => {
							getDirection()
						}}
					>
						<h3>Get Direction</h3>
					</div>
				</div>

				<div className="flex flex-row my-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6"
					>
						<path
							fillRule="evenodd"
							d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
							clipRule="evenodd"
						/>
					</svg>
					{restaurant.phone}
				</div>

				<div className="my-2 ">
					{restaurant.description && (
						<div>
							<p>About</p>
							<div className="border rounded-md h-20 bg-slate-100">
								<p className="italic">
									{restaurant.description}
								</p>
							</div>
						</div>
					)}
				</div>
				<div className="flex flex-row">
					{restaurant.facebook && (
						<div className="shadow-lg rounded-md p-2 bg-emerald-300 ">
							<a href={restaurant.facebook}>Facebook</a>
						</div>
					)}
					{restaurant.webiste && (
						<div className="shadow-lg rounded-md p-2 bg-emerald-300">
							<a href={restaurant.webiste}>Website</a>
						</div>
					)}

					{restaurant.instagram && (
						<div className="shadow-lg rounded-md p-2 bg-emerald-300">
							<a href={restaurant.instagram}>
								Instagram
							</a>
						</div>
					)}

					{restaurant.email && (
						<div className="shadow-lg rounded-md p-2 bg-emerald-300">
							<a href={restaurant.email}>Email</a>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default RestaurantInfoCard
