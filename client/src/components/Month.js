import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import GlobalContext from "./context/Context";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Header from "./Header";
import { useParams } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import Form from "./Form";
import dayjs from "dayjs";

const Month = () => {
	const { formData, setFormData, monthIndex } = useContext(GlobalContext);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [selectedEventId, setSelectedEventId] = useState(null);
	const [allEvents, setAllEvents] = useState([]);
	const localizer = momentLocalizer(moment);
	const DndCalendar = withDragAndDrop(Calendar);
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
			} else {
				console.error("Failed to retrieve events:", response.statusText);
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};

	const handleEdit = async () => {
		try {
			const { id, title, description, start_datetime, end_datetime, location } =
				selectedEvent;
			const response = await fetch("http://localhost:8000/events", {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					...selectedEvent,
					eventId: selectedEventId,
					title,
					description,
					start_datetime,
					end_datetime,
					location,
				}),
			});
			if (response.ok) {
				handleEvents();
				setSelectedEventId(null);
				setIsModalOpen(false);
				console.log(selectedEvent);
			} else {
				console.error("Failed to retrieve events:", response.statusText);
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};

	const handleDelete = async () => {
		try {
			const response = await fetch("http://localhost:8000/events", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ eventId: selectedEventId }),
			});
			if (response.ok) {
				const result = await response.json();
				setSelectedEventId(null);
				setIsModalOpen(false);
			} else {
				console.error("Failed to delete event:", response.statusText);
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};

	useEffect(() => {
		handleEvents();
	}, [selectedEventId]);

	const handleInput = (e) => {
		const { name, value } = e.target;
		setSelectedEvent({ ...selectedEvent, [name]: value });
	};

	const handleSelectSlot = ({ start, end }) => {
		const formattedStartDate = moment(start).format("YYYY-MM-DDTHH:mm");
		const formattedEndDate = moment(end).format("YYYY-MM-DDTHH:mm");
		setFormData({
			...formData,
			start_datetime: formattedStartDate,
			end_datetime: formattedEndDate,
		});
		setIsFormOpen(true);
	};

	const handleSelectEvent = (event) => {
		setSelectedEvent(event);
		setSelectedEventId(event.id);
		setIsModalOpen(true);
	};

	const formattedStartDate = moment(selectedEvent?.start_datetime).format(
		"YYYY-MM-DDTHH:mm"
	);
	const formattedEndDate = moment(selectedEvent?.end_datetime).format(
		"YYYY-MM-DDTHH:mm"
	);

	return (
		<>
			<Header />
			<First>
				<h2>
					{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
				</h2>
				<Div>
					<DndCalendar
						views={["day", "agenda", "week", "month"]}
						selectable
						resizable
						defaultDate={new Date()}
						style={{ height: "100vh" }}
						defaultView="week"
						localizer={localizer}
						events={allEvents}
						startAccessor="start"
						endAccessor="end"
						onSelectSlot={handleSelectSlot}
						onSelectEvent={handleSelectEvent}
					/>
					<Popup
						open={isModalOpen}
						closeOnDocumentClick
						onClose={() => setIsModalOpen(false)}
					>
						<div>
							<label>Title:</label>
							<input
								type="text"
								name="title"
								value={selectedEvent?.title}
								onChange={handleInput}
							/>
						</div>
						<div>
							<label>Description:</label>
							<textarea
								name="description"
								value={selectedEvent?.description}
								onChange={handleInput}
							/>
						</div>
						<div>
							<label>Start Date/Time:</label>
							<input
								type="datetime-local"
								name="start_datetime"
								value={formattedStartDate}
								onChange={handleInput}
							/>
						</div>
						<div>
							<label>End Date/Time:</label>
							<input
								type="datetime-local"
								name="end_datetime"
								value={formattedEndDate}
								onChange={handleInput}
							/>
						</div>
						<div>
							<label>Location:</label>
							<input
								type="text"
								name="location"
								value={selectedEvent?.location}
								onChange={handleInput}
							/>
						</div>
						<button onClick={handleEdit}>Save Changes</button>
						<button onClick={handleDelete}>Delete</button>
					</Popup>
					{isFormOpen && (
						<Form
							isOpen={isFormOpen}
							setIsOpen={setIsFormOpen}
							allEvents={allEvents}
							setAllEvents={setAllEvents}
						/>
					)}
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
