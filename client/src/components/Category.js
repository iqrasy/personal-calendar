import React, { useState, useEffect } from "react";


// const handleAddCategory = () => {
// 	addCategory(categoryName);
// 	setCategoryName("");
// 	closeModal();
// };

// const handleUpdateCategory = () => {
// 	updateCategory(categoryId, categoryName);
// 	setCategoryName("");
// 	closeModal();
// };

// const handleDeleteCategory = () => {
// 	deleteCategory(categoryId);
// 	closeModal();
// };

const Category = ({ formData, setFormData }) => {
	const [categories, setCategories] = useState([]);
	const [categoryName, setCategoryName] = useState("");
	const [categoryId, setCategoryId] = useState(null);

	const handleInput = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// GET ALL CATEGORIES
	const handleGetCategories = async (setCategories) => {
		try {
			const response = await fetch("http://localhost:8000/allCategory");
			if (response.ok) {
				const data = await response.json();
				setCategories(data.data.rows);
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
				body: JSON.stringify({ category_name: categoryName }),
			});
			if (response.ok) {
				setCategoryName(""); // Clear the input field
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
			const response = await fetch(
				`http://localhost:8000/category/${categoryId}`,
				{
					method: "PUT",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({ category_name: newCategoryName }),
				}
			);

			if (response.ok) {
				handleGetCategories();
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
			const response = await fetch(
				`http://localhost:8000/category/${categoryId}`,
				{
					method: "DELETE",
				}
			);

			if (response.ok) {
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
		handleGetCategories(setCategories);
	}, []);

	return (
		<div>
			<select
				name="category_id"
				value={formData.category_id}
				onChange={handleInput}
			>
				<option value="">Select a category</option>
				{categories.map((category) => (
					<option key={category.id} value={category.id}>
						{category.category_name}
					</option>
				))}
			</select>
			<div>
				<button
					className="btn btn-primary"
					data-toggle="modal"
					data-target="#exampleModal"
				>
					Add Category
				</button>
				<div
					className="modal fade"
					id="exampleModal"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="exampleModalLabel"
					aria-hidden="true"
				>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
								>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<input
									placeholder="Add Category"
									value={categoryName}
									onChange={(e) => setCategoryName(e.target.value)}
								/>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close"
									onClick={addCategory}
								>
									Save changes
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Category;
