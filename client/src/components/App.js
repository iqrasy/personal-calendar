import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import GlobalStyle from "./Globalstyle";
import getMonth from "./GetMonth";
import Month from "./Month";
import GlobalContext from "./context/Context";
import Signup from "./Signup";
import Login from "./Login";
import LandingPage from "./LandingPage";

const App = () => {
	const [currentMonth, setCurrentMonth] = useState(getMonth());
	const { monthIndex } = useContext(GlobalContext);

	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex));
	}, [monthIndex]);

	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/home" element={<Month month={currentMonth} />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
