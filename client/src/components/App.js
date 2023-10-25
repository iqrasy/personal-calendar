import React, { useEffect, useState } from "react";
import GlobalStyle from "./Globalstyle";
import getMonth from "./GetMonth";
import Month from "./Month";
import Sidebar from "./Sidebar";

const App = () => {
	const [currentMonth, setCurrentMonth] = useState(getMonth());
	// console.log(getMonth());

	return (
		<>
			<div>
				<GlobalStyle />
				<Month month={currentMonth} />
				<Sidebar />
			</div>
		</>
	);
};

export default App;
