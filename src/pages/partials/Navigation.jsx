import React from "react"
import { NavLink } from "react-router-dom"
import { useAuthContext } from "../../contexts/AuthContext"

const Navigation = () => {
	const { currentUser, userPhotoUrl, userEmail } = useAuthContext()

	return (
		<nav className="bg-nav text-contrast-color flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 sm:items-baseline w-full">
			<div className="mb-2 sm:mb-0 ">
				<a
					href="/"
					className="text-2xl no-underline text-grey-darkest hover:text-contrast-color-dark"
				>🥴 FYLLEKÄK</a>
			</div>
			<div className="flex flex-row items-center">
				{currentUser ? (
					<>
						{userPhotoUrl && (
							userPhotoUrl
								? <div className="object-contain w-8 h-8" >
									<img src={userPhotoUrl} />
								</div>
								: userEmail
						)}
						<NavLink
							to="/admin"
							className="
									text-lg 
									no-underline 
									text-grey-darkest 
									hover:text-blue-dark 
									ml-2 
									p-4
						">Admin</NavLink>
						<NavLink
							to="/update-profile"
							className="
									text-lg 
									no-underline 
									text-grey-darkest 
									hover:text-blue-dark 
									ml-2 
									p-4
						">Uppdatera profil</NavLink>
						<NavLink
							to="/logout"
							className="
									text-lg 
									no-underline 
									text-grey-darkest 
									hover:text-blue-dark 
									ml-2 
									p-4
						">Logga ut</NavLink>
					</>
				) : (
					<>
						<NavLink
							to="/usertips"
							className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 p-4"
						>Tipsa oss!
						</NavLink>
						<NavLink
							to="/login"
							className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 p-4"
						>Admin Login
						</NavLink>
					</>
				)}
			</div>
		</nav>
	)
}

export default Navigation
