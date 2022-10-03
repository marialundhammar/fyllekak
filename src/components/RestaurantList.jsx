import { useEffect, useState } from "react"
import useRestaurants from "../hooks/useRestaurants"
import RestaurantInfoCard from "./RestaurantInfoCard"

import { db } from '../firebase'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContext'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'


const RestaurantList = () => {
	const [infoCard, setInfoCard] = useState()
	// const restaurant = useRestaurants('restaurants')

	const { currentUser } = useAuthContext()

	const queryRef = query(
		collection(db, 'restaurants'),
		where('type', '==', 'snabbmat'),
		orderBy('name')
	)

	const { data: restaurant, isLoading, error } = useFirestoreQueryData(['restaurants'
		// , { uid: currentUser.uid }
	], queryRef, {
		idField: 'id',
		subscribe: true,
	})

	const toggleCard = (res) => {
		if (infoCard == res) setInfoCard();
		if (infoCard != res) setInfoCard(res);
	}

	return (
		<div className="flex">

			{isLoading && <p>Loading...</p>}

			{error && <p>{error.message}</p>}

			{restaurant && (
				<ul className="bg-blue-400 w-1/5">
					{restaurant.data &&
						restaurant.data.map((res) => (
							<div
								className="border border-blue-800 flex justify-between"
								key={res.id}
							>
								<li className="p-2" onClick={() => toggleCard(res)}>
									{res.name}
								</li>
								<a className="p-2 text-blue-900" href={res.website}>
									Website
								</a>
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
