import React from "react"

const PopUp = (query) => {
	return (
		<div
			id="new-window-modal"
			className="bg-slate-100 border-blue-500 text-blue-700 px-4 py-3 w-72 h-1/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
			role="alert"
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
						href={`https://www.google.com/maps/search/?api=1&query=${query.lat},${query.lng}`}
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
