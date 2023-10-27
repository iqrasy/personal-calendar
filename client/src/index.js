import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Wrapper from "./components/context/Wrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Wrapper>
		<App />
	</Wrapper>
);
