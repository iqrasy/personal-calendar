import React from "react";
import styled from "styled-components";
import SmallCalendar from "./SmallCalendar";
import Category from "./Category";

const Sidebar = () => {
	return (
		<Main>
			<SmallCalendar />
			<Cat>
				<Category />
			</Cat>
		</Main>
	);
};

export default Sidebar;

const Main = styled.div`
	display: block;
`;

const Cat = styled.div`
	/* display: flex;
	justify-content: center;
	align-items: center; */
	position: absolute;
	margin-top: 23rem;
`;
