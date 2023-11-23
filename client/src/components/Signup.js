import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsEyeSlash, BsEye } from "react-icons/bs";

const Signup = () => {
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
				const user = { email, username, password };
				localStorage.setItem("user", JSON.stringify(user));
				setLoggedin(true);
				navigate("/home");
			} else {
				setError("Sign up failed. Please check your credentials.");
			}
		} catch (error) {
			console.error("Sign up error:", error);
		}
	};

	return (
		<div>
			{isLoggedin && (
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
							type={passType}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button onClick={handleShowPassword}>
							{passType === "password" ? <BsEyeSlash /> : <BsEye />}
						</button>
						<button onClick={handleSignUp}>Sign up</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Signup;
