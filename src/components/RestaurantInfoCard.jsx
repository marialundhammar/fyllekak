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

			<div className="p-2 w-400 bg-darkish-blue text-slate-400">

				<div className="flex flex-row sm:flex-col justify-between items-center sm:items-start">
					<h1
						className="text-3xl sm:text-xl text-contrast-color"
					>{restaurant.name}</h1>

					{restaurant.vego && (<p
						className="italic my-2 sm:text-md"
					>VEGO FRIENDLY!</p>)}
				</div>

				<div className="my-2 flex flex-row sm:flex-col justify-between items-center sm:items-start">
					<div className="sm:my-2">
						<p className="">
							{restaurant.street}
							<span className="mx-2">{restaurant.number}</span>
						</p>
						<p className="">
							{restaurant.city}
						</p>
					</div>

					<div
						type="button"
						data-modal-toggle="new-window-modal"
						className="rounded-md bg-contrast-color flex justify-center w-40 sm:w-full h-full p-2 text-darkish-blue hover:bg-contrast-color-dark"
						onClick={() => {
							getDirection()
						}}
					>
						<h3>Get Direction</h3>
					</div>
				</div>

				<div className="flex flex-row my-4 items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-6 h-6 m-2"
					>
						<path
							fillRule="evenodd"
							d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
							clipRule="evenodd"
						/>
					</svg>
					<p>{restaurant.phone}</p>
				</div>

				<div className="my-3">
					{restaurant.description && (
						<div>
							<div className="rounded-md bg-nav p-3 text-slate-400">
								<p className="italic">
									{restaurant.description}
								</p>
							</div>
						</div>
					)}
				</div>
				<div className="flex flex-row flex-wrap my-3">
					{restaurant.facebook && (
						<div className="rounded p-2 m-1 sm:my-1 bg-emerald-300 text-stone-900 sm:w-full">
							<a href={restaurant.facebook}>Facebook</a>
						</div>
					)}
					{restaurant.website && (
						<div className="rounded p-2 m-1 sm:my-1 bg-emerald-300 text-stone-900 sm:w-full">
							<a href={restaurant.website}>Website</a>
						</div>
					)}

					{restaurant.instagram && (
						<div className="rounded p-2 m-1 sm:my-1 bg-emerald-300 text-stone-900 sm:w-full">
							<a href={restaurant.instagram}>
								Instagram
							</a>
						</div>
					)}

					{restaurant.email && (
						<div className="rounded p-2 m-1 sm:my-1 bg-emerald-300 text-stone-900 sm:w-full">
							<a href={restaurant.email}>Email</a>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default RestaurantInfoCard
