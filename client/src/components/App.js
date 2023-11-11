import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./Globalstyle";
import Signup from "./Signup";
import Login from "./Login";
import LandingPage from "./LandingPage";
import Home from "./Home";

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/home/:userId" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
