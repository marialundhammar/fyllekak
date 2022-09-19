import { createContext, useContext, useState } from 'react'
import {
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth'

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [userName, setUserName] = useState(null)
	const [userEmail, setUserEmail] = useState(null)
	const [loading, setLoading] = useState(false)

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const contextValues = {
		login,
		logout
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{loading ? (
				<h3>Loading...</h3>
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}

export {
	AuthContextProvider as default,
	useAuthContext,
}

