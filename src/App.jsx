import { Routes, Route } from "react-router-dom"
import { ReactQueryDevtools } from "react-query/devtools"

import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"
import AdminPage from "./pages/AdminPage"
import LoginPage from "./pages/LoginPage"
import LogoutPage from "./pages/LogoutPage"
import UserTipsPage from "./pages/UserTipsPage"
import EditRestaurantPage from "./pages/EditRestaurantPage"
import Navigation from "./pages/partials/Navigation"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import RequireAuth from "./components/RequireAuth"

import "./assets/App.css"

function App() {
	return (
		<div className="App">
			<Navigation />
			<Routes>
				{/* Open routes */}
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<HomePage />} />

				<Route path="/usertips" element={<UserTipsPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />

				{/* Protected routes */}
				<Route
					path="/admin"
					element={
						<RequireAuth>
							<AdminPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/edit/:collection/:id"
					element={
						<RequireAuth>
							<EditRestaurantPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/update-profile"
					element={
						<RequireAuth>
							<UpdateProfilePage />
						</RequireAuth>
					}
				/>
			</Routes>
		</div>
	)
}

export default App
