import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Header from "../Header";
import dayjs from "dayjs";
import getMonth from "../getData/GetMonth";
import GlobalContext from "../context/Context";
import Form from "../Form";
import { useParams } from "react-router-dom";

const Month = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [allEvents, setAllEvents] = useState("");
	const [currentMonth, setCurrentMonth] = useState(getMonth());
	const { monthIndex } = useContext(GlobalContext);

	useEffect(() => {
		setCurrentMonth(getMonth(monthIndex));
	}, [monthIndex]);

	const { userId } = useParams();

	const handleEvents = async () => {
		try {
			const response = await fetch(
				`http://localhost:8000/events/user/${userId}`
			);
			if (response.ok) {
				const result = await response.json();
				setAllEvents(result.data);
				// console.log(allEvents);
			} else {
				console.error("Failed to retrieve events:", response.statusText);
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};

	useEffect(() => {
		handleEvents();
	}, []);

	const handleDoubleClick = () => {
		setIsFormOpen(true);
	};
	return (
		<>
			<Header />
			<First>
				<Div>
					{currentMonth.map((item, i) => (
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
										{allEvents &&
											allEvents.map((event, j) => {
												const eventDate = dayjs(event.start_datetime).format(
													"DD-MM-YY"
												);
												if (eventDate === day.format("DD-MM-YY")) {
													return (
														<Event key={j}>
															<span>
																<h4>{event.title}</h4>
																{/* <p>Start {event.start_datetime}</p> */}
																{/* <p>End {event.end_datetime}</p> */}
																{/* <p> {event.description}</p> */}
																{/* <p> {event.location}</p> */}
															</span>
														</Event>
													);
												}
												return null;
											})}
									</Second>
								</button>
							))}
						</Main>
					))}
				</Div>
				{isFormOpen && <Form />}
			</First>
		</>
	);
};

export default Month;

const Event = styled.div`
	width: 1rem;
	height: 1rem;
`;

const Blue = styled.div`
	position: relative;
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
	}
`;

const First = styled.div`
	margin-top: 4rem;
	display: flex;
`;

const Main = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	height: 10.5rem;
	background: none;
	min-width: 68rem;
	margin-right: 0.5rem;
	flex-grow: 1;
	flex-direction: column;
	cursor: pointer;

	@media only screen and (max-width: 480px) {
		/* width: 25rem; */
		/* height: 5rem; */
		/* grid-column-gap: 0rem; */
	}
`;

const Div = styled.div`
	@media only screen and (max-width: 480px) {
		/* justify-content: center; */
		/* align-items: center; */
		/* margin: 4rem 0; */
		/* justify-content: center; */
		/* align-items: flex-start; */
	}
`;

const Rows = styled.div`
	/* display: flex; */
	/* flex-direction: column; */
	/* align-items: center; */
	/* justify-content: center; */
	/* margin-top: -39px; */
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
	/* border: solid 0.3px rgba(186, 186, 186, 1); */

	p {
		margin-left: 0.4rem;
		margin-top: 0.2rem;
	}
	/* color: rgba(0, 0, 0, 0.8); */
	height: 10rem;
	width: 10rem;
	background-color: ${(props) => (props.isToday ? "lightblue" : "white")};

	@media only screen and (max-width: 480px) {
		/* font-size: 0.6rem; */
		/* width: 4rem; */
		/* height: 5rem; */
	}
`;
