import React from "react"
import { useState } from "react"

const PopUp = (latLng) => {
	const [close, setClose] = useState(false)

	console.log(latLng.latLng)

	let visability =
		"bg-slate-100 border-blue-500 text-blue-700 px-4 py-3 w-86 h-1/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"

	return (
		<div
			id="new-window-modal"
			className={visability}
			aria-hidden="true"
		>
			<div>
				<h3 className="mx-auto">
					The link will be opened in a new window
				</h3>

				<div
					role="button"
					className="shadow-lg rounded-md p-2  m-1 bg-emerald-300"
				>
					<a
						className="p-2 text-blue-900 "
						href={`https://www.google.com/maps/search/?api=1&query=${latLng.latLng.lat},${latLng.latLng.lng}`}
						target="_blank"
					>
						Open link in ny window
					</a>
				</div>
			</div>
		</div>
	)
}

export default PopUp
