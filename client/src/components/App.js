import React, { useEffect, useState, useContext } from "react";
import GlobalStyle from "./Globalstyle";
import getMonth from "./GetMonth";
import Month from "./Month";
import Header from "./Header";
import GlobalContext from "./context/Context";

const App = () => {
	const [currentMonth, setCurrentMonth] = useState(getMonth());
	const { monthIndex } = useContext(GlobalContext);

	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex));
	}, [monthIndex]);

	return (
		<>
			<GlobalStyle />
			<Header />
			<Month month={currentMonth} />
		</>
	);
};

export default App;
