import React from "react";
import dayjs from "dayjs";
import styled from "styled-components";

const Day = ({ day, rowId }) => {
	const isToday = day.isSame(dayjs(), "day");

	return (
		<>
			<Div>
				{/* {rowId === 0 && (
					<Rows>
						<p>{day.format("ddd").toUpperCase()}</p>
					</Rows>
				)}
				<p>{day.format("DD")}</p> */}
			</Div>
		</>
	);
};

export default Day;

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	border: solid 0.3px rgba(186, 186, 186, 1);
	color: rgba(0, 0, 0, 0.8);
	height: 10rem;
	width: 10rem;
	/* background-color: ${(props) => (props.isToday ? "lightblue" : "white")}; */

	@media only screen and (max-width: 480px) {
		font-size: 0.6rem;
		width: 4rem;
		height: 5rem;
	}
`;

const Rows = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: solid 1px green;
	margin-top: -20px;
	/* border: solid 1px green; */

	@media only screen and (max-width: 480px) {
		margin-top: -0.9rem;
	}
`;
