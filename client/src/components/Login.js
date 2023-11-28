import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import styled from "styled-components";

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
			{!isLoggedin && (
				<Main>
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
						<ShowPass onClick={handleShowPassword}>
							{passType === "password" ? <BsEyeSlash /> : <BsEye />}
						</ShowPass>
						<Log onClick={handleLogin}>Login</Log>
					</form>
				</Main>
			)}
		</div>
	);
};

export default Login;

const Main = styled.div`
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	height: 100vh;

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 1rem;
	}

	input {
		border: solid white 1px;
		border-radius: 0.5rem;
		padding: 1rem;
		margin-bottom: 1rem;
	}
`;

const Log = styled.button`
	border: solid white 1px;
	background-color: transparent;
	color: white;
	padding: 0.5rem 5rem;
	border-radius: 0.4rem;
`;

const ShowPass = styled.button`
	position: relative;
	bottom: 3.5rem;
	left: 5rem;
	width: 2rem;
	border: none;
	background-color: transparent;
`;
