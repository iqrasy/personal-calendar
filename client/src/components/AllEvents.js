import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AllEvents = () => {
	const [allEvents, setAllEvents] = useState("");
	const { id } = useParams();
	// console.log(id);
	// const user = localStorage.getItem("user");
	// const email = user.userEmail;
	// console.log(user);

	const handleEvents = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`http://localhost:8000/getAllEventsForUser/${id}`
			);
			if (response.ok) {
				const data = await response.json();
				setAllEvents(data);
				// console.log(data);
				// console.log("Events retrieved successfully:", data);
				// Handle the retrieved data, e.g., set it in your component state.
			} else {
				console.error("Failed to retrieve events:", response.statusText);
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};
	return <div>AllEvents</div>;
};

export default AllEvents;
