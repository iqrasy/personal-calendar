import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedin, setLoggedin] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const response = await fetch("http://localhost:8000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			if (response.ok) {
				localStorage.setItem("user", JSON.stringify(username));
				setLoggedin(true);
				setUsername("");
				setPassword("");
			} else {
				setError("Login failed. Please check your credentials.");
			}
		} catch (error) {
			console.error("Login error:", error);
		}
	};
	console.log(username);

	const handleLogout = () => {
		setLoggedin(false);
	};

	return (
		<div>
			{isLoggedin ? (
				<div>
					<h2>Welcome {username}</h2>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div>
					<h2>Login</h2>
					{error && <div>{error}</div>}
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
					<button onClick={handleLogin}>Login</button>
					<button onClick={() => navigate("/signup")}>Signup</button>
				</div>
			)}
		</div>
	);
};

export default Login;
