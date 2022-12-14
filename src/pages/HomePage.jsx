import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import useRestaurants from "../hooks/useRestaurants";
import RestaurantList from "../components/RestaurantList";
import Map from "../components/Map";
import { getAddress } from "../services/MapsAPI";

const HomePage = () => {
	const { setMapCenter, isMapLoaded } = useAuthContext();
	const { data: restaurants, isLoading } = useRestaurants("restaurants");

	const params = new URLSearchParams(useLocation().search);
	const filterParam = params.get("filter");
	const cityParam = params.get("city");

	const [searchParams, setSearchParams] = useSearchParams({
		filter: filterParam ? filterParam : "all",
		city: cityParam ? cityParam : "malmö",
		address: ""
	});

	const address = searchParams.get('address') ? searchParams.get('address') : ""
	const filter = searchParams.get('filter')

	/* INCOMING v
		const [searchParams, setSearchParams] = useSearchParams({
			filter: "all",
			address: ""
		})

		const address = searchParams.get('address') ? searchParams.get('address') : ""
		const filter = searchParams.get('filter')
	*/

	const [userLocation, setUserLocation] = useState(null);
	const [isLocationLoaded, setIsLocationLoaded] = useState(false);
	const [queryFilter, setQueryFilter] = useState(
		filterParam ? filterParam : "all"
	);
	const [city, setCity] = useState(cityParam ? cityParam : null);
	const [userCity, setUserCity] = useState();
	const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

	const handleFilter = (queryFilter) => {
		const filteredByCity = restaurants.filter(
			(res) => res.city.toLowerCase() === city.toLowerCase()
		);

		if (queryFilter === "all") {
			setFilteredRestaurants(filteredByCity);
			setSearchParams({ filter: "all", city, address });
			return;
		}

		const filteredByQuery = restaurants
			? filteredByCity.filter((res) => res[queryFilter])
			: [];

		setQueryFilter(queryFilter);

		setFilteredRestaurants(filteredByQuery);

		setSearchParams({ filter: queryFilter, city: city, address });
	};

	/* INCMONG v
	
	// const handleFilter = (query) => {
	// 	if (query === "all") {
	// 		setFilteredRestaurants(restaurants)
	// 		setSearchParams({ 
	// 			filter: "all",
	// 			address: address
	// 		})
	// 		return
	// 	}

	// 	const filteredArray = restaurants.filter((res) => res[query])
	// 	setFilteredRestaurants(filteredArray)
	// 	setSearchParams({ 
	// 		filter: query,
	// 		address: address
	// 	})
	// }


	// useEffect(() => {
	// 	if (isLoading) return
	// 	if (searchParams.get("filter")) {
	// 		handleFilter(searchParams.get("filter"))
	// 	}
	// 	if (searchParams.get("address")) {
	// 		setSearchParams({
	// 			filter: filter,
	// 			address: address
	// 		})
	// 	}
	// 	getUserLocation()
	// }, [queryFilter, isLoading])

	*/

	useEffect(() => {
		if (isLoading || !isMapLoaded) return;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				console.log(position);
				const coords = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};

				await setUserLocation(coords);

				const { results } = await getAddress(coords.lat, coords.lng);
				results[0].address_components.forEach((component) => {
					if (component.types.includes("postal_town")) {
						const userCity = component.long_name.toLowerCase();
						setUserCity(userCity);
						if (!city) {
							setCity(userCity);
							setMapCenter(coords);
							setSearchParams((params) => ({
								filter: queryFilter,
								city: userCity,
								address
							}));
						} else if (city.toLowerCase() === userCity) {
							setMapCenter(coords);
						}
						setIsLocationLoaded(true);
					}
				});
			});
		}
	}, [isLoading]);

	useEffect(() => {
		if (!isLocationLoaded) return;
		handleFilter(queryFilter);
	}, [isLocationLoaded, queryFilter, city]);

	const handleLocationChange = (city) => {
		setCity(city);
		handleFilter(queryFilter);
	};

	if (isLoading || !isMapLoaded || !isLocationLoaded)
		return (
			<div className="flex justify-center items-center h-full">Loading...</div>
		);
	return (
		<>
			<div className="flex flex-col-reverse md:flex-row bg-darkish-blue text-contrast-color">
				<div className="w-full sm:w-1/4 p-2">
					<div>
						<div className="ui-sans-serif flex flex-col">
							<button
								className="p-2 border rounded border-contrast-color hover:border-contrast-color-dark hover:text-contrast-color-dark"
								onClick={() => {
									handleFilter("vego");
								}}
							>
								Vegetariskt
							</button>

							<button
								className="p-2 border rounded border-contrast-color hover:border-contrast-color-dark hover:text-contrast-color-dark"
								onClick={() => {
									handleFilter("price");
								}}
							>
								Billigt
							</button>

							<button
								className="p-2 border rounded border-contrast-color hover:border-contrast-color-dark hover:text-contrast-color-dark"
								onClick={() => {
									handleFilter("all");
								}}
							>
								Alla
							</button>
						</div>
					</div>

					<div className="my-2">
						<RestaurantList restaurants={filteredRestaurants} />
					</div>
				</div>

				<Map
					className="w-full sm:w-3/4 h-full"
					onLocationChange={handleLocationChange}
					location={userLocation}
					restaurants={filteredRestaurants}
					setSearchParams={setSearchParams}
					address={address}
				/>
			</div>
		</>
	);
};

export default HomePage;
