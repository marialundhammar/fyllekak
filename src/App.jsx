import { Routes, Route, useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import UserTipsPage from './pages/UserTipsPage'
import RequireAuth from './components/RequireAuth'
import './assets/App.css'


function App() {



	return (
		<div className="App">
			<Routes>
				{/* Open routes */}
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/usertips" element={<UserTipsPage />} />
				<Route path="/login" element={<LoginPage />} />

				{/* Protected routes */}
				<Route path="/admin" element={
					<RequireAuth>
						<AdminPage />
					</RequireAuth>
				} />

			</Routes>
		</div>
	)
}

export default App
