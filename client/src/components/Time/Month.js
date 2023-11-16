import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../context/Context";
import styled from "styled-components";
import Header from "../Header";
import { useParams } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Form from "../Form";

const Month = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [allEvents, setAllEvents] = useState([]);
	const localizer = momentLocalizer(moment);
	const { userId } = useParams();

	const handleEvents = async () => {
		try {
			const response = await fetch(
				`http://localhost:8000/events/user/${userId}`
			);
			if (response.ok) {
				const result = await response.json();
				const formattedEvents = result.data.map((event) => ({
					...event,
					start: new Date(event.start_datetime),
					end: new Date(event.end_datetime),
				}));

				setAllEvents(formattedEvents);
				console.log(allEvents);
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

	const handleSelectSlot = ({ start, end }) => {
		setAllEvents([...allEvents, { start, end }]);
		setIsFormOpen(true);
	};

	return (
		<>
			<Header />
			<First>
				<Div>
					<Calendar
						views={["day", "agenda", "work_week", "month"]}
						selectable
						defaultDate={new Date()}
						style={{ height: "100vh" }}
						defaultView="work_week"
						localizer={localizer}
						events={allEvents}
						startAccessor="start"
						endAccessor="end"
						onSelectSlot={handleSelectSlot}
					/>
					{isFormOpen && <Form isOpen={isFormOpen} setIsOpen={setIsFormOpen} />}
				</Div>
			</First>
		</>
	);
};

export default Month;

const First = styled.div`
	margin-top: 4rem;
`;

const Div = styled.div`
	@media only screen and (max-width: 480px) {
	}
`;
