import React, { createContext } from "react";

const GlobalContext = React.createContext({
	monthIndex: 0,
	setMonthIndex: (index) => {},
});

export default GlobalContext;
