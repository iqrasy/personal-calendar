import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BsEyeSlash, BsEye } from "react-icons/bs";

const Login = () => {
	const [cookies, setCookie] = useCookies(null);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passType, setPassType] = useState("password");
	const [isLoggedin, setLoggedin] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleShowPassword = (e) => {
		e.preventDefault();
		if (passType === "password") {
			setPassType("text");
		} else {
			setPassType("password");
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:8000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, username, password }),
			});

			if (response.ok) {
				const data = await response.json();
				const user = data.data[0];
				localStorage.setItem("user", JSON.stringify(user));
				setLoggedin(true);

				navigate(`/home/${user.id}`);
				console.log(data);
				setCookie("Email", data.email);
				setCookie("AuthToken", data.token);

				// window.location.reload();
			} else {
				setError("Login failed. Please check your credentials.");
			}
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	return (
		<div>
			{isLoggedin && (
				<div>
					<h2>Login</h2>
					{error && <div>{error}</div>}
					<form>
						<input
							type="email"
							placeholder="email"
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
							type={passType}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button onClick={handleShowPassword}>
							{passType === "password" ? <BsEyeSlash /> : <BsEye />}
						</button>
						<button onClick={handleLogin}>Login</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Login;
