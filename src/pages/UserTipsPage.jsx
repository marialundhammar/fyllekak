import React from 'react'
import AddRestaurantForm from '../components/AddRestaurantForm'


const UserTipsPage = () => {
	return (
		<div className="container h-screen max-w-full bg-darkish-blue text-contrast-color p-5">
			<div className="flex flex-col sm:flex-row justify-between py-3">
				<h1 className="font-medium text-3xl p-3">Skicka in ett tips på hak!</h1>
			</div>

			<AddRestaurantForm col={'usertips'} />
		</div>
	)
}

export default UserTipsPage