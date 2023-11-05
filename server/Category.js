"use strict";
const pool = require("./db");

// GET ALL CATEGORIES
const getAllCategories = async (req, res) => {
	try {
		const query = await pool.query("SELECT * FROM categories");

		res
			.status(200)
			.json({ message: "Events retrieved successfully", data: query });
	} catch (error) {
		console.error("Database error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// CREATE NEW CATEHGORY
const createCategory = async (req, res) => {
	const { category_name } = req.body;
	try {
		const query = await pool.query(
			"INSERT INTO categories (category_name) VALUES ($1)",
			[category_name]
		);
		res.status(201).json({ message: "Category Created", data: query });
	} catch (error) {
		console.error("Database error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
	const categoryId = req.params.categoryId;
	const { category_name } = req.body;

	try {
		const query = await pool.query(
			"UPDATE categories SET category_name= $1 WHERE  id = $2",
			[category_name, categoryId]
		);

		if (query.rowCount === 1) {
			res.json({ message: "Category updated", data: query });
		} else {
			res.status(404).json({ message: "Category not found" });
		}
	} catch (error) {
		console.error("Database error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// DELETE CATEGORY
const deleteCategory = async (req, res) => {
	const categoryId = req.params.categoryId;

	try {
		const query = await pool.query("DELETE FROM categories WHERE id = $1", [
			categoryId,
		]);

		if (query.rowCount === 1) {
			res.json({ message: "Category deleted", data: query });
		} else {
			res.status(404).json({ message: "Category not found" });
		}
	} catch (error) {
		console.error("Database error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	createCategory,
	updateCategory,
	deleteCategory,
	getAllCategories,
};
