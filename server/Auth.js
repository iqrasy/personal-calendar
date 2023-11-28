"use strict";
const bcrypt = require("bcrypt");
const pool = require("./db");
const jwt = require("jsonwebtoken");

// LOGIN
const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
		const result = await pool.query(query, [email, password]);

		if (result.rows.length !== 0) {
			res.json({ message: "Login successful", data: result.rows });
		} else {
			res.status(500).json({ message: "Authentication Failed" });
		}
	} catch (error) {
		console.error("Database error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// SIGNUP
const signup = async (req, res) => {
	const { email, username, password } = req.body;
	const saltRounds = 10;
	try {
		const hashedPass = await bcrypt.hash(password, saltRounds);
		const signup = await pool.query(
			"INSERT INTO users (email, username, password) VALUES($1, $2, $3) RETURNING *",
			[email, username, hashedPass]
		);
		const user = signup.rows[0];
		const token = jwt.sign({ email }, "secret", { expiresIn: "never" });

		res
			.status(201)
			.json({ message: "Signup successful", data: { user, token } });
	} catch (error) {
		console.error("Database error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = { login, signup };
