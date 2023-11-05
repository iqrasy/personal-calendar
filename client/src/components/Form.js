import React, { useState, useEffect } from "react";
import Category from "./Category";

const Form = () => {
	const [formData, setFormData] = useState({
		start_datetime: "",
		end_datetime: "",
		title: "",
		description: "",
		location: "",
		category_id: "",
	});

	const handleInput = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:8000/events", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
			} else {
				const errorData = await response.json();
				console.error("Event creation failed:", errorData.message);
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};

	return (
		<div>
			<h1>Create Event</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						placeholder="Start Date and Time"
						type="datetime-local"
						name="start_datetime"
						value={formData.start_datetime}
						onChange={handleInput}
						// required
					/>
				</div>
				<div>
					<input
						placeholder="End Date and Time"
						type="datetime-local"
						name="end_datetime"
						value={formData.end_datetime}
						onChange={handleInput}
						// required
					/>
				</div>
				<div>
					<input
						placeholder="Title"
						type="text"
						name="title"
						value={formData.title}
						onChange={handleInput}
						// required
					/>
				</div>
				<div>
					<textarea
						placeholder="Description"
						name="description"
						value={formData.description}
						onChange={handleInput}
					/>
				</div>
				<div>
					<input
						placeholder="Location"
						type="text"
						name="location"
						value={formData.location}
						onChange={handleInput}
					/>
				</div>
				<button type="submit">Create Event</button>
			</form>
			<Category formData={formData} setFormData={setFormData} />
		</div>
	);
};

export default Form;
