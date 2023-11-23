import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
	const [isLoggedin, setLoggedin] = useState(!!localStorage.getItem("user"));
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("user");
		setLoggedin(false);
		navigate("/");
	};

	return (
		<Div>{isLoggedin && <button onClick={handleLogout}>Logout</button>}</Div>
	);
};

export default Header;

const Div = styled.div`
	/* @media only screen and (max-width: 480px) {
		display: none;
	} */
`;
