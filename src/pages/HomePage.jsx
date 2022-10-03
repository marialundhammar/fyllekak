import React, { useEffect } from "react"
import Map from "../components/Map"
import useRestaurants from "../hooks/useRestaurants"
import { useState } from "react"
import SearchBar from "../components/SearchBar"
import { getCoords } from "../services/MapsAPI"
import SideBar from "../components/SideBar"

const HomePage = () => {
	const restaurantQuery = useRestaurants("restaurants")

	const [location, setLocation] = useState()
	const [mapCenter, setMapCenter] = useState({
		lat: 55.59712105786678,
		lng: 12.997431424230891,
	})

	const getUserLocation = () => {
		if (navigator.geolocation) {
			console.log("yay")
			navigator.geolocation.getCurrentPosition((position) => {
				const userLocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				}

				console.log("userLocation ==>", userLocation)

				setLocation(userLocation)
			})
		} else {
			console.log("nay")
		}
	}

	const handleSearch = async (search) => {
		const getSearch = await getCoords(search)
		console.log("getSearch ==>", getSearch)

		const searchRes = getSearch.results[0]?.geometry.location
		console.log("searchRes ==>", searchRes)

		const restaurantData = restaurantQuery.data
		console.log("restaurantData ==>", restaurantData)

		const restaurantDataNames = restaurantData.map(
			(restaurant) => restaurant.name
		)
		console.log("restaurantDataNames ==>", restaurantDataNames)

		const restaurantDataCoords = restaurantData.map(
			(restaurant) => restaurant.coords
		)
		console.log("restaurantDataCoords ==>", restaurantDataCoords)

		const restaurantDataCoordsFiltered = restaurantDataCoords.filter(
			(restaurant) => {
				return restaurant !== undefined
			}
		)
		console.log(
			"restaurantDataCoordsFiltered ==>",
			restaurantDataCoordsFiltered
		)

		const re = new RegExp(search, "gi")
		console.log("re ==>", re)

		for (const name of restaurantDataNames) {
			console.log("name inside for loop ==>", name)
			console.log(
				"name.match(re) inside for loop ==>",
				name.match(re)
			)

			console.log("searchRes before if ==>", searchRes)

			if (name.match(re)) {
				console.log("Success")
				console.log("search ==>", search)
				console.log("name ==>", name)

				console.log("re ==>", re)

				console.log("Great success")
				console.log("name.match(re) ==>", name.match(re))

				const nameOfRestaurant = restaurantData.filter(
					(restaurant) => {
						return restaurant.name.match(re)
					}
				)
				console.log("nameOfRestaurant ==>", nameOfRestaurant)

				setMapCenter({
					lat: nameOfRestaurant[0].coords.lat,
					lng: nameOfRestaurant[0].coords.lng,
				})

				return
			} else if (searchRes) {
				setMapCenter({
					lat: searchRes.lat,
					lng: searchRes.lng,
				})
			}
		}
	}

	useEffect(() => {
		getUserLocation()
	}, [])

	if (restaurantQuery.isLoading) {
		return <div>"loading..."</div>
	}

	return (
		<>
			<div className="ui-sans-serif bg-darkish-blue">
				<div className="container mx-auto p-2 flex justify-center text-lg">
					<SideBar handleSearch={handleSearch} />
				</div>

				<Map
					location={location}
					data={restaurantQuery.data}
					center={mapCenter}
				/>
			</div>
		</>
	)
}

export default HomePage
