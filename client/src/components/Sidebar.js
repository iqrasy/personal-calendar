import React from "react";
import styled from "styled-components";

const Sidebar = ({ month }) => {
	// console.log(month);
	return (
		<Main>
			<button>Today</button>
		</Main>
	);
};

export default Sidebar;

const Main = styled.div`
	/* border: solid pink 1px; */
	/* width: 10rem; */
	/* height: 25rem; */
`;
