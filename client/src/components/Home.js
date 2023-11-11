import React, { useContext, useState } from "react";
import GlobalContext from "./context/Context";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Daily from "../components/Time/Daily";
import Month from "../components/Time/Month";
import Weekly from "../components/Time/Weekly";
import Yearly from "../components/Time/Yearly";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

const Home = () => {
	const { monthIndex, setMonthIndex } = useContext(GlobalContext);
	const userString = localStorage.getItem("user");
	const user = userString ? JSON.parse(userString) : null;
	const [action, setAction] = useState("Week");

	const handlePrevMonth = () => {
		setMonthIndex(monthIndex - 1);
	};

	const handleNextMonth = () => {
		setMonthIndex(monthIndex + 1);
	};

	const handleTime = () => {
		switch (action) {
			case "Day":
				return <Daily />;
			case "Week":
				return <Weekly />;
			case "Month":
				return <Month />;
			case "Year":
				return <Yearly />;
			default:
				return <Weekly />;
		}
	};

	return (
		<div>
			<div>
				<Header />
			</div>
			<div>
				{user ? <h1>Welcome {user.username}</h1> : <h1>Welcome</h1>}
				<button onClick={() => setAction("Day")}>Day</button>
				<button onClick={() => setAction("Week")}>Week</button>
				<button onClick={() => setAction("Month")}>Month</button>
				<button onClick={() => setAction("Year")}>Year</button>
				<button onClick={handlePrevMonth}>
					<BiLeftArrow />
				</button>
				<button onClick={handleNextMonth}>
					<BiRightArrow />
				</button>
			</div>
			<div>
				<Side>
					<Sidebar />
				</Side>
			</div>
			<div>{handleTime()}</div>
		</div>
	);
};

export default Home;

const Side = styled.div`
	min-height: 20rem;
	width: 15rem;
	border: solid pink 1px;
	margin-left: 0.4rem;
`;
