import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SmallCalendar from "./SmallCalendar";
import Category from "./Category";

const Sidebar = ({ isOpen, toggleSidebar, setIsOpen }) => {
	const [isLoggedin, setLoggedin] = useState(!!localStorage.getItem("user"));
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("user");
		setLoggedin(false);
		navigate("/");
	};

	useEffect(() => {
		const isPortrait =
			window.matchMedia("(orientation: portrait)").matches &&
			window.innerWidth <= 1024;

		setIsOpen(!isPortrait);
	}, [setIsOpen]);

	return (
		<Main isOpen={isOpen}>
			<SmallCal>
				<SmallCalendar />
			</SmallCal>
			<Cat>
				<Category />
			</Cat>
			<Logout>
				{isLoggedin && <button onClick={handleLogout}>Logout</button>}
			</Logout>
		</Main>
	);
};

export default Sidebar;

const Main = styled.div`
	display: block;
	@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
		/* display: ${(props) => (props.isOpen ? "block" : "none")}; */
	}
`;

const Cat = styled.div`
	position: absolute;
`;

const Logout = styled.div`
	position: absolute;
	bottom: 2.4rem;

	button {
		background-color: transparent;
		border: solid grey 1px;
		padding: 1rem;
		width: 25vh;
		border-radius: 0.7rem;
		color: white;
		margin-bottom: 3rem;

		&:hover {
			background-color: white;
			color: black;
			transition: background-color ease 1s;
		}
	}

	@media only screen and (max-width: 480px) {
		display: none;
	}
`;

const SmallCal = styled.div`
	@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
	}
	@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
		/* display: none; */
	}
`;
