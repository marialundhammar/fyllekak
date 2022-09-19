import { Routes, Route, useRoutes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import './assets/App.css'


function App() {



	return (
		<div className="App">
			<Routes>

				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<HomePage />} />

				<Route path="/login" element={<LoginPage />} />
				<Route path="/admin" element={<AdminPage />} />




			</Routes>
		</div>
	)
}

export default App
