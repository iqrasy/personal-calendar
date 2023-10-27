import React, { useContext } from "react";
import styled from "styled-components";
import GlobalContext from "./context/Context";
import dayjs from "dayjs";
import Calendar from "./Calendar";

const Sidebar = () => {
	const { monthIndex, setMonthIndex } = useContext(GlobalContext);

	const handleReset = () => {
		setMonthIndex(
			monthIndex === dayjs().month()
				? monthIndex + Math.random()
				: dayjs().month()
		);
	};
	// console.log(month);
	return (
		<Main>
			<button onClick={handleReset}>Today</button>
			<Calendar />
		</Main>
	);
};

export default Sidebar;

const Main = styled.div`
	/* border: solid pink 1px; */
	/* width: 10rem; */
	/* height: 25rem; */
`;
