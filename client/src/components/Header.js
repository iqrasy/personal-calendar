import React from "react";
import styled from "styled-components";

const Header = () => {
	return (
		<Div>
			<button>Day</button>
			<button>week</button>
			<button>month</button>
			<button>Year</button>
			<button>Today</button>
		</Div>
	);
};

export default Header;

const Div = styled.div`
	@media only screen and (max-width: 480px) {
		display: none;
	}
`;
