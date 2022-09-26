import { Routes, Route, useRoutes } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import RestaurantPage from './pages/RestaurantPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import UserTipsPage from './pages/UserTipsPage'
import EditRestaurantPage from './pages/EditRestaurantPage'
import EditUsertipPage from './pages/EditUsertipPage'
import RequireAuth from './components/RequireAuth'
import Navigation from './pages/partials/Navigation'
import './assets/App.css'


function App() {



	return (
		<div className="App">
			<Navigation />
			<Routes>
				{/* Open routes */}
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<HomePage />} />

				<Route path="/restaurant" element={<RestaurantPage />} />
				<Route path="/usertips" element={<UserTipsPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />

				{/* Protected routes */}
				<Route path="/admin" element={
					<RequireAuth>
						<AdminPage />
					</RequireAuth>
				} />
				<Route path="/edit/restaurant/:id" element={
					<RequireAuth>
						<EditRestaurantPage />
					</RequireAuth>
				} />
				<Route path="/edit/usertip/:id" element={
					<RequireAuth>
						<EditUsertipPage />
					</RequireAuth>
				} />
			</Routes>

			<ReactQueryDevtools />
		</div>
	)
}

export default App
