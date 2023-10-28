import React, { useContext } from "react";
import styled from "styled-components";
import GlobalContext from "./context/Context";
import dayjs from "dayjs";
import Calendar from "./Calendar";
import Events from "./Events";

const Sidebar = () => {
	const { monthIndex, setMonthIndex } = useContext(GlobalContext);

	const handleReset = () => {
		setMonthIndex(
			monthIndex === dayjs().month()
				? monthIndex + Math.random()
				: dayjs().month()
		);
	};

	return (
		<Main>
			<button onClick={handleReset}>Today</button>
			<Events />
			<Calendar />
		</Main>
	);
};

export default Sidebar;

const Main = styled.div`
	display: block;
`;
