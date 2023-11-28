import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Main from "../assets/mainPage.png";

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<>
			<Container>
				<Content>
					<Title>
						<Word>Significantly</Word>
						<Word>Improve your</Word>
						<Word>Productivity</Word>
					</Title>
					<ButtonContainer>
						<Login onClick={() => navigate("/login")}>Login</Login>
						<Singup onClick={() => navigate("/signup")}>Sign up</Singup>
					</ButtonContainer>
				</Content>
				<ImageContainer>
					<img src={Main} alt="Main Page" />
				</ImageContainer>
			</Container>
		</>
	);
};

export default LandingPage;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 100vh;
	background-color: #fff;
`;

const Content = styled.div`
	margin-top: 4rem;
	text-align: center;
`;

const Title = styled.h1`
	font-size: 5rem;
	margin-bottom: 2rem;
	color: black;

	@media only screen and (max-width: 480px) {
		font-size: 3rem;
	}
`;

const Word = styled.span`
	display: block;
	margin-bottom: 0.5rem;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	gap: 2rem;
`;

const Login = styled.button`
	padding: 1rem 2rem;
	font-size: 1rem;
	background-color: transparent;
	color: black;
	border: none;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: transparent;
		border-radius: 0.5rem;
		border: solid black 1px;
	}

	@media only screen and (max-width: 480px) {
		padding: 1rem 2rem;
		font-size: 1rem;
		background-color: #2b2d2e;
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}
`;

const Singup = styled.button`
	padding: 1rem 2rem;
	font-size: 1rem;
	background-color: #2b2d2e;
	color: white;
	border: none;
	border-radius: 0.5rem;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: transparent;
		color: black;
		border: solid black 1px;
	}
`;

const ImageContainer = styled.div`
	max-width: 60%;
	img {
		width: 100%;
		height: auto;
		border-radius: 1rem;
	}

	@media only screen and (max-width: 480px) {
		img {
			display: none;
		}
	}
`;
