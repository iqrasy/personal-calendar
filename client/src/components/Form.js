import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "./context/Context";
import styled from "styled-components";
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
			<StyledPopup
				open={isOpen}
				closeOnDocumentClick
				onClose={() => setIsOpen(false)}
			>
				<div>
					<Div onSubmit={handleSubmit}>
						<div>
							<Input
								placeholder="Start Date and Time"
								type="datetime-local"
								name="start_datetime"
								value={formData.start_datetime}
								onChange={handleInput}
							/>
						</div>
						<div>
							<Input
								placeholder="End Date and Time"
								type="datetime-local"
								name="end_datetime"
								value={formData.end_datetime}
								onChange={handleInput}
							/>
						</div>
						<div>
							<Input
								placeholder="Title"
								type="text"
								name="title"
								value={formData.title}
								onChange={handleInput}
							/>
						</div>
						<div>
							<TextArea
								placeholder="Description"
								name="description"
								value={formData.description}
								onChange={handleInput}
							/>
						</div>
						<div>
							<Input
								placeholder="Location"
								type="text"
								name="location"
								value={formData.location}
								onChange={handleInput}
							/>
						</div>
						<Cats>
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
						</Cats>
						<Button
							type="submit"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							Create Event
						</Button>
						<div className="modal-footer"></div>
					</Div>
				</div>
			</StyledPopup>
		</div>
	);
};

export default Form;

const StyledPopup = styled(Popup)`
	&-overlay {
		background-color: rgba(0, 0, 0, 0.5);
	}

	&-content {
		background-color: #fff;
		border-radius: 8px;
		padding: 20px;
		max-width: 400px;
		margin: 20px auto;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
	}
`;

const Input = styled.input`
	margin: 0.34rem;
	width: 25vh;
	border-radius: 0.4rem;
	padding: 0.4rem;
	border: solid grey 0.5px;
`;

const Div = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 3rem;
`;

const TextArea = styled.textarea`
	margin: 0.34rem;
	width: 25vh;
	border-radius: 0.4rem;
	padding: 0.4rem;
	border: solid grey 0.5px;
`;

const Cats = styled.div`
	select {
		width: 25vh;
		margin: 0.34rem;
		border-radius: 0.4rem;
		padding: 0.4rem;
		border: solid grey 0.5px;
	}
`;

const Button = styled.button`
	margin-top: 5rem;
	font-size: 1.3rem;
	/*
	margin-bottom: 3rem; */

	&:hover {
		padding: 0.5rem;
		border-radius: 0.5rem;
		background-color: grey;
		transition: background-color ease 1s;
	}
`;
