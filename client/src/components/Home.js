import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Month from "./Calendar";

const Home = () => {
	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div>
				<Header isOpen={isOpen} toggleSidebar={toggleSidebar} />
			</div>
			<Main>
				{isOpen && (
					<Side>
						<Sidebar />
					</Side>
				)}
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
	border: solid red 1px;

	@media only screen and (max-width: 480px),
		(min-device-width: 480px) and (max-device-width: 1024px) and (orientation: portrait) {
		display: none;
	}
`;

const BigCalDiv = styled.div`
	padding: 1rem;
	margin: 3rem 0.6rem;
	border-radius: 1rem;
	width: 100%;
	background: rgb(229, 255, 106);
	background: linear-gradient(
		90deg,
		rgba(229, 255, 106, 1) 0%,
		rgba(186, 223, 150, 1) 35%,
		rgba(219, 211, 242, 1) 100%
	);

	@media only screen and (max-width: 767px) {
		margin: 2rem 0;
		padding: 1rem;
	}

	@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
		position: relative;
		bottom: 1.4rem;
	}
`;
