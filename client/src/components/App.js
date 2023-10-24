import React, { useEffect } from "react";
import GlobalStyle from "./Globalstyle";

const App = () => {
	// const getData = async () => {
	// 	const userEmail = "iqra@test.com";
	// 	try {
	// 		const response = await fetch(`http://localhost:8000/todo/${userEmail}`);
	// 		const json = await response.json();
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// useEffect(() => getData, []);

	return (
		<div>
			<GlobalStyle />
			App
		</div>
	);
};

export default App;
