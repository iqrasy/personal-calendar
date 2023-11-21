import React from "react";
import styled from "styled-components";
import SmallCalendar from "./SmallCalendar";
import Category from "./Category";

const Sidebar = () => {
	return (
		<Main>
			<Category />
			<SmallCalendar />
		</Main>
	);
};

export default Sidebar;

const Main = styled.div`
	display: block;
`;
