import React, { createContext } from "react";

const GlobalContext = React.createContext({
	monthIndex: 0,
	setMonthIndex: (index) => {},
	smallCalendar: 0,
	setSmallCalendar: (index) => {},
	selectedDay: null,
	setSelectedDay: (day) => {},
});

export default GlobalContext;
