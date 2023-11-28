import React, { useState } from "react";
import styled from "styled-components";
import { CiGrid41 } from "react-icons/ci";

const Header = ({ isOpen, toggleSidebar }) => {
	return (
		<Div>
			<ToggleBtn onClick={toggleSidebar}>
				<CiGrid41 />
			</ToggleBtn>
		</Div>
	);
};

export default Header;

const Div = styled.div``;

const ToggleBtn = styled.button`
	background: transparent;
	border: none;
	cursor: pointer;
	color: white;
	margin-right: 1rem;
	height: 3rem;
	width: 3rem;
	font-size: 2rem;
`;
