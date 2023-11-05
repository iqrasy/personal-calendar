import React, { useContext } from "react";
import styled from "styled-components";
import GlobalContext from "./context/Context";
import dayjs from "dayjs";
import SmallCalendar from "./SmallCalendar";
import Form from "./Form";

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
			<Form />
			<SmallCalendar />
		</Main>
	);
};

export default Sidebar;

const Main = styled.div`
	display: block;
`;
