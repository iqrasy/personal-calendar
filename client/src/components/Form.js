import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "./context/Context";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useParams } from "react-router-dom";

const Form = ({ isOpen, setIsOpen }) => {
	const { userId } = useParams();
	const [selectedCategory, setSelectedCategory] = useState("");
	const { formData, setFormData, categoryId, categoryName, categories } =
		useContext(GlobalContext);

	const handleInput = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleCategoryChange = (e) => {
		setSelectedCategory(e.target.value);
		setFormData({ ...formData, categoryId: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`http://localhost:8000/events/${userId}`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					user_id: userId,
					...formData,
					category_id: selectedCategory,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				console.log(selectedCategory);
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
						<div>
							<select
								name="category_id"
								value={selectedCategory}
								onChange={handleCategoryChange}
							>
								<option value="" disabled>
									Select a category
								</option>
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.category_name}
									</option>
								))}
							</select>
						</div>
						<button
							type="submit"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							Create Event
						</button>
						<div className="modal-footer"></div>
					</form>
				</div>
			</Popup>
		</div>
	);
};

export default Form;
