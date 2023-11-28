import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { useColor } from "react-color-palette";
import Modal from "./Modal";
import GlobalContext from "./context/Context";

const Category = () => {
	const { userId } = useParams();
	const [color, setColor] = useColor("#fff");
	const {
		categories,
		setCategories,
		categoryName,
		setCategoryName,
		categoryId,
		setCategoryId,
		formData,
		setFormData,
	} = useContext(GlobalContext);
	const [action, setAction] = useState(null);

	const handleInput = (e) => {
		const { name, value, type, checked } = e.target;

		if (type === "checkbox" && checked) {
			setFormData({ ...formData, [name]: value });
		} else if (type === "checkbox" && !checked) {
			setFormData({ ...formData, [name]: null });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	// GET ALL CATEGORIES
	const handleGetCategories = async () => {
		try {
			const response = await fetch(
				`http://localhost:8000/categories/user/${userId}`
			);
			if (response.ok) {
				const data = await response.json();
				setCategories(data.data);
			} else {
				const errorData = await response.json();
				console.error("Event creation failed:", errorData.message);
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};

	// ADD CATEGORIES
	const addCategory = async () => {
		try {
			const response = await fetch("http://localhost:8000/category", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ category_name: categoryName, user_id: userId }),
			});
			if (response.ok) {
				setCategoryName("");
				handleGetCategories(setCategories);
			} else {
				const errorData = await response.json();
				console.error("Category creation failed", errorData.message);
			}
		} catch (error) {
			console.error("Failed to create category", error);
		}
	};

	// UPDATE CATEGORIES
	const updateCategory = async (categoryId, newCategoryName) => {
		try {
			const response = await fetch("http://localhost:8000/category", {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					category_name: newCategoryName,
					categoryId: categoryId,
				}),
			});

			if (response.ok) {
				handleGetCategories();
				setCategoryId(null);
			} else {
				const errorData = await response.json();
				console.error("Category update failed:", errorData.message);
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};

	// DELETE CATEGORIES
	const deleteCategory = async (categoryId) => {
		try {
			const response = await fetch("http://localhost:8000/category", {
				method: "DELETE",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					categoryId,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				setCategoryId(null);
				handleGetCategories();
			} else {
				const errorData = await response.json();
				console.error("Category deletion failed:", errorData.message);
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};

	useEffect(() => {
		handleGetCategories();
	}, []);

	const handleModalAction = (action) => {
		setAction(action);
		setCategoryName("");
	};

	const handleModal = () => {
		switch (action) {
			case "Add Category":
				addCategory();
				break;
			case "Update Category":
				updateCategory(categoryId, categoryName);
				break;
			case "Delete Category":
				deleteCategory(categoryId);
				break;
			default:
				break;
		}
	};

	return (
		<div>
			<Main>
				<div value={formData.category_id} onChange={handleInput} required>
					{categories.map((category) => (
						<EditDelete key={category.id}>
							<input
								key={category.id}
								value={category.id}
								type="checkbox"
								onChange={handleInput}
								checked
							/>
							<span>{category.category_name}</span>
							<button
								type="button"
								className="btn btn-primary"
								data-toggle="modal"
								data-target="#exampleModalCenter"
								onClick={() => {
									setCategoryId(category.id);
									handleModalAction("Update Category");
								}}
							>
								<FiEdit2 />
							</button>
							<button
								type="button"
								className="btn btn-primary"
								data-toggle="modal"
								data-target="#exampleModalCenter"
								onClick={() => {
									setCategoryId(category.id);
									handleModalAction("Delete Category");
								}}
							>
								<AiOutlineDelete />
							</button>
						</EditDelete>
					))}
				</div>
				<div>
					<Add
						data-toggle="modal"
						data-target="#exampleModalCenter"
						onClick={() => handleModalAction("Add Category")}
					>
						<AiOutlinePlus />
					</Add>
					<Modal
						categoryName={categoryName}
						setCategoryName={setCategoryName}
						handleModal={handleModal}
						action={action}
					/>
				</div>
			</Main>
		</div>
	);
};

export default Category;

const Main = styled.div`
	background-color: #292929;
	padding: 2rem;
	border-radius: 1rem;
	width: 25vh;
	position: relative;
	top: 19.5rem;

	@media only screen and (max-width: 480px) {
		display: none;
	}

	@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
		display: none;
	}

	@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
		width: 38vh;
		position: relative;
		bottom: 5rem;
		padding: 2rem;
		height: 20vh;
	}
`;

const EditDelete = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	span {
		margin-right: 5rem;
	}

	button {
		background-color: transparent;
		border: none;

		&:hover {
			background-color: rgb(151, 126, 179);
		}
	}
`;

const Add = styled.button`
	background-color: transparent;
	color: white;
	border: none;
`;
