import { Routes, Route, useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import RestaurantPage from './pages/RestaurantPage'
import AdminPage from './pages/AdminPage'
import { ReactQueryDevtools } from 'react-query/devtools'
import './assets/App.css'


function App() {



	return (
		<div className="App">
			<Routes>

				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/restaurant" element={<RestaurantPage />} />

				<Route path="/admin" element={<AdminPage />} />



			</Routes>

			<ReactQueryDevtools />
		</div>
	)
}

export default App
