import React from "react"
import {
	GoogleMap,
	useJsApiLoader,
	MarkerF,
} from "@react-google-maps/api"
import { useState } from "react"

import RestaurantInfoCard from "./RestaurantInfoCard"
import useRestaurants from "../hooks/useRestaurants"

const Map = ({ location, data, center }) => {
	const googleAPI = import.meta.env.VITE_GOOGLE_MAP_API
	const restaurants = useRestaurants("resturants")
	const [selectedMarker, setSelectedMarker] = useState(null)

	const containerStyle = {
		width: "80vw",
		height: "80vh",
	}

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: `${googleAPI}`,
	})

	if (isLoaded && restaurants) {
	}
	return (
		isLoaded &&
		restaurants && (
			<>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={15}
				>
					{restaurants.data.map((restaurant) => (
						<MarkerF
							icon={{
								path:
									google.maps.SymbolPath
										.BACKWARD_CLOSED_ARROW,
								scale: 5,
							}}
							position={restaurant.coords}
							label={restaurant.name}
							onClick={() => {
								setSelectedMarker(restaurant)
							}}
							key={restaurant.id}
						/>
					))}

					<MarkerF
						icon={{
							path: google.maps.SymbolPath.CIRCLE,
							scale: 7,
						}}
						position={location}
						label="User Location"
					/>
				</GoogleMap>

				{selectedMarker && (
					<RestaurantInfoCard
						key={selectedMarker.id}
						restaurant={selectedMarker}
					/>
				)}
			</>
		)
	)
}

export default Map
