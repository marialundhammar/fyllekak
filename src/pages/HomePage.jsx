import React, { useEffect } from "react"
import Map from "../components/Map"
import useRestaurants from "../hooks/useRestaurants"

import { useState } from "react"
import { getCoords } from "../services/MapsAPI"
import Sidebar from "../components/Sidebar"

const HomePage = () => {
	const [vego, setVego] = useState(false)
	const [price, setPrice] = useState(false)
	const [showAll, setShowAll] = useState(false)
	const [query, setQuery] = useState(null)
	const [filteredRestaurants, setFilteredRestaurants] = useState([])
	const [toggleClassNameAll, setToggleClassNameAll] = useState(
		"text-contrast-color w-40 border"
	)
	const [toggleClassNamePrice, setToggleClassNamePrice] = useState(
		"text-contrast-color w-40 border"
	)
	const [toggleClassNameVego, setToggleClassNameVego] = useState(
		"text-contrast-color w-40 border"
	)

	const { data: restaurants, isLoading } = useRestaurants(
		"restaurants"
	)

	const handleFilter = (query) => {
		if (query === "all") {
			setFilteredRestaurants(restaurants)
			return
		}
		const filteredArray = restaurants.filter((res) => res[query])

		setFilteredRestaurants(filteredArray)
	}

	console.log(filteredRestaurants)

	const [location, setLocation] = useState({
		lat: 55.59712105786678,
		lng: 12.997431424230891,
	})

	const getUserLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const userLocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}

				setLocation(userLocation)
			})
		} else {
			return
		}
	}

	useEffect(() => {
		if (isLoading) return
		getUserLocation()
		setFilteredRestaurants(restaurants)
	}, [query, isLoading])

	return (
		filteredRestaurants && (
			<>
				<div>
					<div className="ui-sans-serif bg-darkish-blue flex flex-row">
						<button
							className={
								vego
									? "text-contrast-color w-40 border bg-gray-500 "
									: "text-contrast-color w-40 border "
							}
							onClick={() => {
								handleFilter("vego")
								setToggleClassNameVego(
									vego
										? "text-contrast-color w-40 border bg-gray-500"
										: "text-contrast-color w-40 border "
								)
							}}
						>
							{" "}
							Vegetariskt{" "}
						</button>
						<button
							className={
								price
									? "text-contrast-color w-40 border bg-gray-500 "
									: "text-contrast-color w-40 border "
							}
							onClick={() => {
								handleFilter("price")
								setToggleClassNamePrice()
							}}
						>
							{" "}
							Billigt{" "}
						</button>
					</div>

					<div>
						<button
							className={
								showAll
									? "text-contrast-color w-40 border bg-gray-500"
									: "text-contrast-color w-40 border "
							}
							onClick={() => {
								handleFilter("all")
							}}
						>
							{" "}
							Alla{" "}
						</button>
					</div>

					<Map
						location={location}
						restaurants={filteredRestaurants}
					/>

					<Sidebar restaurants={filteredRestaurants} />
				</div>
			</>
		)
	)
}

export default HomePage
