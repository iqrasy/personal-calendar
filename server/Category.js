"use strict";
const pool = require("./db");

// GET ALL CATEGORIES FOR LOGGED IN USER
const getAllCategories = async (req, res) => {
	const userId = req.params.userId;
	try {
		const query = await pool.query(
			"SELECT * FROM categories WHERE user_id = $1",
			[userId]
		);

		res
			.status(200)
			.json({ message: "Events retrieved successfully", data: query.rows });
	} catch (error) {
		console.error("Database error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// CREATE NEW CATEHGORY
const createCategory = async (req, res) => {
	const { category_name, user_id } = req.body;
	try {
		const query = await pool.query(
			"INSERT INTO categories (category_name, user_id) VALUES ($1, $2) RETURNING * ",
			[category_name, user_id]
		);
		res.status(201).json({ message: "Category Created", data: query.rows[0] });
	} catch (error) {
		console.error("Database error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// UPDATE CATEGORY
const updateCategory = async (req, res) => {
	const { category_name, categoryId } = req.body;

	try {
		const query = await pool.query(
			"UPDATE categories SET category_name= $1 WHERE  id = $2 RETURNING *",
			[category_name, categoryId]
		);

		if (query.rowCount === 1) {
			res.json({ message: "Category updated", data: query.rows[0] });
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
	const { categoryId } = req.body;

	try {
		const query = await pool.query(
			"DELETE FROM categories WHERE id = $1 RETURNING *",
			[categoryId]
		);
		console.log(query.rows);

		res
			.status(200)
			.json({ message: "Category deleted successfully", data: query.rows });
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
