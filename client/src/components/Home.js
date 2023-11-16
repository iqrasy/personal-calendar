import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Month from "../components/Time/Month";

const Home = () => {
	const userString = localStorage.getItem("user");
	const user = userString ? JSON.parse(userString) : null;

	return (
		<div>
			<div>
				<Header />
			</div>
			<div>{user ? <h1>Welcome {user.username}</h1> : <h1>Welcome</h1>}</div>
			<div>
				<Side>
					<Sidebar />
				</Side>
			</div>
			<Month />
		</div>
	);
};

export default Home;

const Side = styled.div`
	min-height: 20rem;
	width: 15rem;
	border: solid pink 1px;
	margin-left: 0.4rem;
`;
