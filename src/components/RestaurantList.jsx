import { useEffect, useState } from "react"
import useRestaurants from "../hooks/useRestaurants"
import RestaurantInfoCard from "./RestaurantInfoCard"

import { db } from '../firebase'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'


const RestaurantList = () => {
	const [infoCard, setInfoCard] = useState()
	const [vego, setVego] = useState(false)
	const [pricerange, setPricerange] = useState('2')

	// const restaurant = useRestaurants('restaurants')

	const { currentUser } = useAuthContext()

	const queryRef = query(
		collection(db, 'restaurants'),
		// where('vego', '==', vego),
		where('price', '==', pricerange),
		// orderBy('name')
	)

	const { data: restaurant, isLoading, error } = useFirestoreQueryData(['restaurants', { vego }], queryRef,
		{
			// 	idField: 'id',
			subscribe: true,
		}
	)

	const toggleCard = (res) => {
		if (infoCard == res) setInfoCard();
		if (infoCard != res) setInfoCard(res);
	}

	return (
		<div className="flex">

			<div>
				<button onClick={() => setVego(vego ? false : true)}> Vegetariskt </button>
			</div>
			<div>
				<button onClick={() => {
					console.log(pricerange)
					setPricerange('1')
					console.log(pricerange)
				}}> Billigt </button>

				<button onClick={() => setPricerange('2')}> Mellan </button>
				<button onClick={() => setPricerange('3')}> Dyrt </button>
			</div>

			{isLoading && <p>Loading...</p>}

			{error && <p>{error.message}</p>}

			{restaurant && console.log(restaurant)}

			{restaurant && (
				<ul className="bg-blue-400 w-1/5">
					{restaurant &&
						restaurant.map((res) => (
							<div
								className="border border-blue-800 flex justify-between"
								key={restaurant.indexOf(res)}
							>
								<li className="p-2" onClick={() => toggleCard(res)}>{res.name}</li>
								<a className="p-2 text-blue-900" href={res.website}>Website</a>
							</div>
						))}
				</ul>
			)}

			{infoCard && (
				<RestaurantInfoCard key={infoCard.id} restaurant={infoCard} />
			)}
		</div>
	);
};

export default RestaurantList;
