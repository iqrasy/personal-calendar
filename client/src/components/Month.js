import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import dayjs from "dayjs";
import Sidebar from "./Sidebar";
import AllEvents from "./AllEvents";
import "tippy.js/dist/tippy.css";
import Form from "./Form";

const Month = ({ month }) => {
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleDoubleClick = () => {
		setIsFormOpen(true);
	};
	return (
		<>
			<Header />
			<First>
				<Side>
					<Sidebar />
				</Side>
				<Div>
					{month.map((item, i) => (
						<Main key={i}>
							{item.map((day, id) => (
								<button
									type="button"
									data-toggle="modal"
									data-target="#formModal"
									onDoubleClick={handleDoubleClick}
									key={id}
								>
									<Second key={id}>
										{i === 0 && (
											<Rows>
												<p>{day.format("ddd").toUpperCase()}</p>
											</Rows>
										)}
										{day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? (
											<Blue>
												<p>{day.format("DD")}</p>
											</Blue>
										) : (
											<p>{day.format("DD")}</p>
										)}
									</Second>
								</button>
							))}
						</Main>
					))}
				</Div>
				<AllEvents />
				{isFormOpen && <Form />}
			</First>
		</>
	);
};

export default Month;

const Blue = styled.div`
	/* position: relative;
	p {
		border: solid blue 1px;
		width: 1.4rem;
		height: 1.4rem;
		border-radius: 50%;
		background-color: blue;
		color: white;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	} */
`;

const Side = styled.div`
	min-height: 20rem;
	width: 15rem;
	border: solid pink 1px;
	margin-left: 0.4rem;
`;

const First = styled.div`
	margin-top: 4rem;
	display: flex;
`;

const Main = styled.div`
	button {
		background: none;
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		height: 10.5rem;
		min-width: 68rem;
		margin-right: 0.5rem;
		flex-grow: 1;
		flex-direction: column;
		cursor: pointer;
	}

	@media only screen and (max-width: 480px) {
		/* width: 25rem; */
		/* height: 5rem; */
		/* grid-column-gap: 0rem; */
	}
`;

const Div = styled.div`
	/* margin-top: 4rem; */
	/* display: flex; */
	/* flex-direction: column; */
	/* justify-content: flex-end; */
	/* align-items: flex-end; */

	@media only screen and (max-width: 480px) {
		/* justify-content: center; */
		/* align-items: center; */
		/* margin: 4rem 0; */
		/* justify-content: center; */
		/* align-items: flex-start; */
	}
`;

const Rows = styled.div`
	/* display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: -19px; */
	/* border: solid 1px green; */

	@media only screen and (max-width: 480px) {
		/* margin-top: -0.9rem; */
	}
`;

const Second = styled.div`
	/* display: flex; */
	/* flex-direction: column; */
	/* align-items: center; */
	/* justify-content: flex-start; */
	border: solid 0.3px rgba(186, 186, 186, 1);

	p {
		margin-left: 0.4rem;
		margin-top: 0.2rem;
	}
	/* color: rgba(0, 0, 0, 0.8); */
	/* height: 10rem; */
	/* width: 10rem; */
	/* background-color: ${(props) => (props.isToday ? "lightblue" : "white")}; */

	@media only screen and (max-width: 480px) {
		/* font-size: 0.6rem; */
		/* width: 4rem; */
		/* height: 5rem; */
	}
`;
