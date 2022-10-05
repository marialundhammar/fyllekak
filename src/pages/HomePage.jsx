import React, { useEffect } from "react"
import Map from "../components/Map"
import useRestaurants from "../hooks/useRestaurants"
import { useState } from "react"
import { getCoords } from "../services/MapsAPI"
import SideBar from "../components/SideBar"

const HomePage = () => {
	const restaurantQuery = useRestaurants("restaurants")
	const [address, setAddress] = useState("")

	const [location, setLocation] = useState({
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

				setLocation(userLocation)
			})
		} else {
			return
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
			<div className="ui-sans-serif bg-darkish-blue flex flex-row">
				<Map
					location={location}
					data={restaurantQuery.data}
				/>
			</div>
		</>
	)
}

export default HomePage
