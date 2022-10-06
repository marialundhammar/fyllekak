import { useEffect, useState } from "react"
import useRestaurants from "../hooks/useRestaurants"

import Map from "../components/Map"
import RestaurantList from "../components/RestaurantList"

import { getCoords } from "../services/MapsAPI"
import Sidebar from "../components/Sidebar"

const HomePage = () => {
	// const [vego, setVego] = useState(false)
	// const [price, setPrice] = useState(false)
	// const [showAll, setShowAll] = useState(false)
	const [query, setQuery] = useState(null)
	const [filteredRestaurants, setFilteredRestaurants] = useState([])
	// const [toggleClassNameAll, setToggleClassNameAll] = useState(
	// 	"text-contrast-color w-40 border"
	// )
	// const [toggleClassNamePrice, setToggleClassNamePrice] = useState(
	// 	"text-contrast-color w-40 border"
	// )
	// const [toggleClassNameVego, setToggleClassNameVego] = useState(
	// 	"text-contrast-color w-40 border"
	// )

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
				<div className="flex flex-col-reverse md:flex-row bg-darkish-blue text-contrast-color">
					<div className="w-full sm:w-1/4 p-2">
						<div>
							<div className="ui-sans-serif flex flex-col">
								<button
									className="p-2 border rounded border-contrast-color hover:border-contrast-color-dark hover:text-contrast-color-dark"
									onClick={() => {
										query !== "vego"
											? handleFilter("vego") && setQuery("vego")
											: handleFilter('') && setQuery(null)
									}}
								>Vegetariskt</button>

								<button
									className="p-2 border rounded border-contrast-color hover:border-contrast-color-dark hover:text-contrast-color-dark"
									onClick={() => {
										query !== "price"
											? handleFilter("price") && setQuery("price")
											: handleFilter('') && setQuery(null)
									}}
								>Billigt</button>

								<button
									className="p-2 border rounded border-contrast-color hover:border-contrast-color-dark hover:text-contrast-color-dark"
									onClick={() => {
										query !== "all"
											? handleFilter("all") && setQuery("all")
											: handleFilter('') && setQuery(null)
									}}
								>Alla</button>
							</div>
						</div>

						<div className="my-2">
							{/* <Sidebar
								restaurants={filteredRestaurants}
							/> */}
							<RestaurantList restaurants={filteredRestaurants} />

						</div>
					</div>

					<Map
						className="w-full sm:w-3/4 h-full"
						location={location}
						restaurants={filteredRestaurants}
					/>
				</div>
			</>
		)
	)
}

export default HomePage
