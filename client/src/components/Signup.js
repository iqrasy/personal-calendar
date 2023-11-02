import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedin, setLoggedin] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:8000/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, username, password }),
			});

			if (response.ok) {
				localStorage.setItem("user", JSON.stringify(username, email, password));
				setLoggedin(true);
				navigate("/home");
			} else {
				setError("Sign up failed. Please check your credentials.");
			}
		} catch (error) {
			console.error("Sign up error:", error);
		}
	};

	const handleLogout = () => {
		setLoggedin(false);
	};

	return (
		<div>
			{isLoggedin ? (
				<div>
					<h2>Sign up</h2>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div>
					{error && <div>{error}</div>}
					<form>
						<input
							type="text"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button onClick={handleSignUp}>Sign up</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Signup;
