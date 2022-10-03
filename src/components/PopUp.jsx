import React from "react"

const PopUp = (lat, lng) => {
	return (
		<div
			id="new-window-modal"
			className="shadow-lgp-2  m-1 bg-emerald-300"
			className="bg-slate-50 border  rounded-md  px-4 py-3 w-72 h-1/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
			role="alert"
			tabindex="-1"
			aria-hidden="true"
		>
			<div>
				<p className=" p-2 flex justify-center">
					The link will be opened in a new window 😎
				</p>

				<div
					role="button"
					className="shadow-lg rounded-md p-2  m-1 bg-emerald-300"
					href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
					target="_blank"
				>
					<a className="flex justify-center">
						Open link in ny window
					</a>
				</div>
			</div>
		</div>
	)
}

export default PopUp
