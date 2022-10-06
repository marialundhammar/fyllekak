import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import useRestaurants from "../hooks/useRestaurants"
import RestaurantList from "../components/RestaurantList"
import Map from "../components/Map"

const HomePage = () => {
	const [query, setQuery] = useState(null)
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
		}
		getUserLocation()
	}, [query, isLoading])

	return (
		filteredRestaurants && (
			<>
				<div className="flex flex-col-reverse md:flex-row bg-darkish-blue text-contrast-color">
					{/* Sidebar */}
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
							<RestaurantList restaurants={filteredRestaurants} />
						</div>
					</div>

					{/* Maps component */}
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
