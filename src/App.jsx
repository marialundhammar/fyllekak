import { Routes, Route, useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import RestaurantPage from './pages/RestaurantPage'
import AdminPage from './pages/AdminPage'
import { ReactQueryDevtools } from 'react-query/devtools'
import LoginPage from './pages/LoginPage'
import UserTipsPage from './pages/UserTipsPage'
import RequireAuth from './components/RequireAuth'
import './assets/App.css'
import Navigation from './pages/partials/Navigation'


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

				{/* Protected routes */}
				<Route path="/admin" element={
					<RequireAuth>
						<AdminPage />
					</RequireAuth>
				} />

			</Routes>

			<ReactQueryDevtools />
		</div>
	)
}

export default App
