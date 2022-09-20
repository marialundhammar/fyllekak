import React from 'react'
import AddRestaurantForm from '../components/AddRestaurantForm'


const UserTipsPage = () => {
	return (
		<div>
			<h1>Skicka in ett tips på hak!</h1>
			<AddRestaurantForm col={'usertips'} />
		</div>
	)
}

export default UserTipsPage