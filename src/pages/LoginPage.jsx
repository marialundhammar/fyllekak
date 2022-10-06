import { useRef, useState } from "react";
// import { useForm } from 'react-hook-form'
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const emailRef = useRef(null)
	const passwordRef = useRef(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { login } = useAuthContext()

	// const { handleSubmit, register, reset, getValues } = useForm()

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate("/admin");
		} catch (err) {
			console.log(err);
			setError(err.message);
			setLoading(false);
		}
	};

	return (
		<div className="container h-screen max-w-full bg-darkish-blue text-contrast-color p-5">
			<div className="flex flex-col items-center justify-between py-3">
				<h1 className="font-medium text-3xl p-3">Admin login</h1>
			</div>

			{error && <h3>Error: {error}</h3>}
			{loading && <h3>Loading...</h3>}

			<form onSubmit={handleLogin} noValidate
				className="flex flex-col items-center "
			>
				<input
					className="w-5/12 p-1 my-2 bg-darkish-blue border rounded border-nav"
					type="email"
					placeholder="E-post"
					ref={emailRef}
				/>
				<input
					className="w-5/12 p-1 my-2 bg-darkish-blue border rounded border-nav"
					type="password"
					placeholder="Password"
					ref={passwordRef}
					autoComplete="off"
				/>
				<input
					className=" w-5/12 p-2 my-3 border rounded border-contrast-color bg-contrast-color text-darkish-blue hover:border-contrast-color-dark hover:bg-contrast-color-dark"
					type="submit" />
			</form>
		</div>
	);
};

export default LoginPage;
