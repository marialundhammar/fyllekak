import React from "react"
import { NavLink } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext"

const Navigation = () => {
	const { currentUser } = useAuthContext()

	return (
		<nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-yellow-200 sm:items-baseline w-full">
			<div className="mb-2 sm:mb-0">
				<a
					href="/"
					className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
				>
					Logo
				</a>
			</div>
			<div>
				{currentUser ? (
					<>
						<NavLink
							to="/admin"
							className="
									text-lg 
									no-underline 
									text-grey-darkest 
									hover:text-blue-dark 
									ml-2 
									p-4
							"
						>
							Admin
						</NavLink>
						<NavLink
							to="/logout"
							className="
									text-lg 
									no-underline 
									text-grey-darkest 
									hover:text-blue-dark 
									ml-2 
									p-4
							"
						>
							Log out
						</NavLink>
					</>
				) : (
					<>
						<NavLink
							to="/restaurant"
							className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 p-4"
						>
							Restaurant list
						</NavLink>
						<NavLink
							to="/usertips"
							className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 p-4"
						>
							User tips
						</NavLink>
						<NavLink
							to="/login"
							className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 p-4"
						>
							Login
						</NavLink>
					</>
				)}
			</div>
		</nav>
	)
}

export default Navigation
