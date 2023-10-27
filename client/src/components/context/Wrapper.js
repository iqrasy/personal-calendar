import React, { useEffect, useState } from "react";
import GlobalContext from "./Context";
import dayjs from "dayjs";

const Wrapper = (props) => {
	const [monthIndex, setMonthIndex] = useState(dayjs().month());
	const [smallCalendar, setSmallCalendar] = useState(null);
	const [selectedDay, setSelectedDay] = useState(null);

	useEffect(() => {
		if (smallCalendar !== null) {
			setMonthIndex(smallCalendar);
		}
	}, [smallCalendar]);

	return (
		<GlobalContext.Provider
			value={{
				monthIndex,
				setMonthIndex,
				smallCalendar,
				setSmallCalendar,
				selectedDay,
				setSelectedDay,
			}}
		>
			{props.children}
		</GlobalContext.Provider>
	);
};

export default Wrapper;
