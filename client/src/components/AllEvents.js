import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AllEvents = () => {
	const [allEvents, setAllEvents] = useState("");
	const { userId } = useParams();

	const handleEvents = async () => {
		try {
			const response = await fetch(
				`http://localhost:8000/events/user/${userId}`
			);
			if (response.ok) {
				const result = await response.json();
				setAllEvents(result.data);
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

	return (
		<div>
			{allEvents.map((event) => (
				<div key={event.id}>
					<h3>{event.title}</h3>
					<p>Start Date: {event.start_datetime}</p>
					<p>End Date: {event.end_datetime}</p>
					<p>Description: {event.description}</p>
					<p>Location: {event.location}</p>
				</div>
			))}
		</div>
	);
};

export default AllEvents;
