import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Month from "./Calendar";

const Home = () => {
	const userString = localStorage.getItem("user");
	const user = userString ? JSON.parse(userString) : null;

	return (
		<>
			<div>
				<Header />
			</div>
			{/* might not keep the welcome username */}
			<div>{user ? <h1>Hi, {user.username}</h1> : ""}</div>
			<Main>
				<Side>
					<Sidebar />
				</Side>
				<BigCalDiv>
					<Month />
				</BigCalDiv>
			</Main>
		</>
	);
};

export default Home;

const Main = styled.div`
	display: flex;
	flex-direction: row;
`;

const Side = styled.div`
	margin-left: 0.4rem;
	width: 25rem;
	margin-top: 3rem;
	color: white;
	border-radius: 1.2rem;
	/* border: solid green 1px; */
`;

const BigCalDiv = styled.div`
	border: solid 1px pink;
	padding: 1rem;
	margin: 3rem 0.6rem;
	border-radius: 1.8rem;
	width: 100%;
	background: rgb(229, 255, 106);
	background: linear-gradient(
		90deg,
		rgba(229, 255, 106, 1) 0%,
		rgba(186, 223, 150, 1) 35%,
		rgba(219, 211, 242, 1) 100%
	);
`;
