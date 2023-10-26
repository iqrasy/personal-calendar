import React, { useEffect, useState } from "react";
import GlobalStyle from "./Globalstyle";
import getMonth from "./GetMonth";
import Month from "./Month";
import Sidebar from "./Sidebar";
import Header from "./Header"

const App = () => {
	const [currentMonth, setCurrentMonth] = useState(getMonth());

	return (
		<>
			<GlobalStyle />
			<Header />
			<Month month={currentMonth} />
			{/* <Sidebar /> */}
		</>
	);
};

export default App;
