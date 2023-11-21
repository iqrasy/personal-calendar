import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Month from "./Month";

const Home = () => {
	const userString = localStorage.getItem("user");
	const user = userString ? JSON.parse(userString) : null;

	return (
		<div>
			<div>
				<Header />
			</div>
			<div>{user ? <h1>Welcome {user.username}</h1> : <h1>Welcome</h1>}</div>
			<Main>
				<Side>
					<Sidebar />
				</Side>
				<Month />
			</Main>
		</div>
	);
};

export default Home;

const Main = styled.div`
	display: flex;
	flex-direction: row;
`;

const Side = styled.div`
	min-height: 20rem;
	width: 10rem;
	border: solid pink 1px;
	margin-left: 0.4rem;
`;
