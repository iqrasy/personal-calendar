import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "./context/Context";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Form = ({ isOpen, setIsOpen }) => {
	const { formData, setFormData } = useContext(GlobalContext);
	console.log(formData);

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
		setIsOpen(false);
	};

	useEffect(() => {
		const currentDate = new Date().toISOString().slice(0, 16);
		setFormData({
			...formData,
			start_datetime: currentDate,
			end_datetime: currentDate,
		});
	}, []);

	return (
		<div>
			<Popup
				open={isOpen}
				closeOnDocumentClick
				onClose={() => setIsOpen(false)}
			>
				<div>
					<form onSubmit={handleSubmit}>
						<div>
							<input
								placeholder="Start Date and Time"
								type="datetime-local"
								name="start_datetime"
								value={formData.start_datetime}
								onChange={handleInput}
							/>
						</div>
						<div>
							<input
								placeholder="End Date and Time"
								type="datetime-local"
								name="end_datetime"
								value={formData.end_datetime}
								onChange={handleInput}
							/>
						</div>
						<div>
							<input
								placeholder="Title"
								type="text"
								name="title"
								value={formData.title}
								onChange={handleInput}
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
						<div className="modal-footer">
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								Done
							</button>
						</div>
					</form>
				</div>
			</Popup>
		</div>
	);
};

export default Form;
