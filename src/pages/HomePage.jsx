import React, { useEffect } from "react"
import Map from "../components/Map"
import useRestaurants from "../hooks/useRestaurants"

import { useState } from "react"
import { getCoords } from "../services/MapsAPI"
import Sidebar from "../components/Sidebar"
import { QueryConstraint } from "firebase/firestore"
import { useSearchParams } from "react-router-dom"

const HomePage = () => {
	const [vego, setVego] = useState(false)
	const [price, setPrice] = useState(false)
	const [showAll, setShowAll] = useState(false)
	const [query, setQuery] = useState()
	const [filteredRestaurants, setFilteredRestaurants] = useState([])
	const [searchParams, setSearchParams] = useSearchParams({
		filter: "all",
	})

	const { data: restaurants, isLoading } = useRestaurants(
		"restaurants"
	)

	const handleFilter = (query) => {
		if (query === "all") {
			setFilteredRestaurants(restaurants)
			setSearchParams({ filter: "all" })
			return
		}

		const filteredArray = restaurants.filter((res) => res[query])
		setFilteredRestaurants(filteredArray)
		setSearchParams({ filter: query })
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
		if (searchParams.get("filter")) {
			handleFilter(searchParams.get("filter"))
			console.log("hiiiiii", searchParams.get("filter"))
		}
		getUserLocation()
	}, [query, isLoading])

	return (
		filteredRestaurants && (
			<>
				<div className="flex flex-column md:flex-row bg-darkish-blue text-contrast-color">
					<div>
						<div>
							<div className="ui-sans-serif flex flex-row">
								<button
									className={
										vego
											? "text-contrast-color w-40 border bg-gray-500 "
											: "text-contrast-color w-40 border "
									}
									onClick={() => {
										handleFilter("vego")
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
						</div>

						<div>
							<Sidebar
								restaurants={filteredRestaurants}
							/>
						</div>
					</div>

					<Map
						location={location}
						restaurants={filteredRestaurants}
					/>
				</div>
			</>
		)
	)
}

export default HomePage
