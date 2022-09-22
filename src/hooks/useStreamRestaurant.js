import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

import React from 'react'

const useStreamRestaurant = (col, id) => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const ref = doc(db, col, id)

		const unsubscirbe = onSnapshot(ref, (snapshot) => {
			setData({
				id: snapshot.id,
				...snapshot.data()
			})
			setLoading(false)
		})
		return unsubscirbe
	}, [])

	return {
		data,
		loading,
	}
}

export default useStreamRestaurant