import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import GlobalContext from "./context/Context";

const Category = () => {
	const { userId } = useParams();
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
			<div>
				<div value={formData.category_id} onChange={handleInput} required>
					{categories.map((category) => (
						<div key={category.id}>
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
						</div>
					))}
				</div>
				<div>
					<button
						data-toggle="modal"
						data-target="#exampleModalCenter"
						onClick={() => handleModalAction("Add Category")}
					>
						<AiOutlinePlus />
					</button>
					<Modal
						categoryName={categoryName}
						setCategoryName={setCategoryName}
						handleModal={handleModal}
						action={action}
					/>
				</div>
			</div>
		</div>
	);
};

export default Category;
