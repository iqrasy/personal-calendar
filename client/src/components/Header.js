import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import GlobalContext from "./context/Context";
import dayjs from "dayjs";

const Header = () => {
	const { monthIndex, setMonthIndex } = useContext(GlobalContext);
	const [isLoggedin, setLoggedin] = useState(!!localStorage.getItem("user"));
	const navigate = useNavigate();

	const handlePrevMonth = () => {
		setMonthIndex(monthIndex - 1);
	};

	const handleNextMonth = () => {
		setMonthIndex(monthIndex + 1);
	};

	const handleLogout = () => {
		localStorage.removeItem("user");
		setLoggedin(false);
		navigate("/");
	};


	return (
		<Div>
			<button>Day</button>
			<button>week</button>
			<button>month</button>
			<button>Year</button>
			<button onClick={handlePrevMonth}>
				<BiLeftArrow />
			</button>
			<button onClick={handleNextMonth}>
				<BiRightArrow />
			</button>
			<button onClick={handleLogout}>
				{isLoggedin ? <p>Logout</p> : ""}
			</button>
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
