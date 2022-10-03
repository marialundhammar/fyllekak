import React from "react"
import {
	GoogleMap,
	useJsApiLoader,
	MarkerF,
} from "@react-google-maps/api"
import { useState } from "react"
import RestaurantInfoCard from "./RestaurantInfoCard"
import useRestaurants from "../hooks/useRestaurants"
import googleMapsStyle from "../googleMapsStyle"

const Map = ({ location, data, center }) => {
	const googleAPI = import.meta.env.VITE_GOOGLE_MAP_API
	const restaurants = useRestaurants("restaurants")
	const [selectedMarker, setSelectedMarker] = useState(null)
	const marker = "../assets/marker.svg"

	const containerStyle = {
		width: "100vw",
		height: "100vh",
	}

	const mapStyle = googleMapsStyle

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: `${googleAPI}`,
	})

	return (
		isLoaded &&
		restaurants && (
			<>
				<div className="flex flex-col lg:flex-row">
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={center}
						zoom={15}
						options={{ styles: mapStyle }}
					>
						{restaurants.data.map((restaurant) => (
							<MarkerF
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
								fillColor: "blue",
							}}
							position={location}
							label="User Location"
						/>
					</GoogleMap>

					<div>
						{selectedMarker && (
							<RestaurantInfoCard
								key={selectedMarker.id}
								restaurant={selectedMarker}
							/>
						)}
					</div>
				</div>
			</>
		)
	)
}

export default Map
