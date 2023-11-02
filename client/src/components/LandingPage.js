import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
	const navigate = useNavigate();
	return (
		<div>
			<button onClick={() => navigate("/login")}>Login</button>
			<button onClick={() => navigate("/signup")}>sign up</button>
		</div>
	);
};

export default LandingPage;
