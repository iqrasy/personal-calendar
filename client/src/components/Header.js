import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "./context/Context";
import styled from "styled-components";
import dayjs from "dayjs";

const Header = () => {
	const { monthIndex } = useContext(GlobalContext);
	const [isLoggedin, setLoggedin] = useState(!!localStorage.getItem("user"));
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("user");
		setLoggedin(false);
		navigate("/");
	};

	return (
		<Div>
			<button onClick={handleLogout}>{isLoggedin ? <p>Logout</p> : ""}</button>
			<h2>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>
		</Div>
	);
};

export default Header;

const Div = styled.div`
	@media only screen and (max-width: 480px) {
		display: none;
	}
`;
