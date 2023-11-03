const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const PORT = 8000;
const app = express();
const pool = require("./db");
const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");

app
	.use(cors())
	.use(express.json())
	.get("/", (req, res) => {
		res.send("hello");
	})

	// login
	.post("/login", async (req, res) => {
		const { username, password } = req.body;
		try {
			const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
			const result = await pool.query(query, [username, password]);
			// console.log(result.rows);

			if (result.rows.length !== 0) {
				res.json({ message: "Login successful", data: result.rows });
			} else {
				res.json({ message: "Authentication Failed" });
			}
		} catch (error) {
			console.error("Database error:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	})

	// signup
	.post("/signup", async (req, res) => {
		const { email, username, password } = req.body;
		const saltRounds = 10;
		try {
			const hashedPass = await bcrypt.hash(password, saltRounds);
			const signup = await pool.query(
				"INSERT INTO users (email, username, password) VALUES($1, $2, $3) RETURNING *",
				[email, username, hashedPass]
			);
			const user = signup.rows[0];
			const token = jwt.sign({ email }, "secret", { expiresIn: "5hr" });

			console.log(user, token);
			res
				.status(201)
				.json({ message: "Signup successful", data: { user, token } });
		} catch (error) {
			console.error("Database error:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	})

	// get all events for user logged in
	.get("/events/user/:userId", async (req, res) => {
		const userId = req.params.userId;
		try {
			const query = await pool.query(
				"SELECT * FROM events WHERE user_id = $1",
				[userId]
			);
			console.log(query);
			res
				.status(200)
				.json({ message: "Events retrieved successfully", data: query.rows });
		} catch (error) {
			console.error("Database error:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	})

	// create new event
	.post("/events", async (req, res) => {
		const {
			start_datetime,
			end_datetime,
			title,
			description,
			location,
			category_id,
			user_id,
		} = req.body;

		try {
			const query = await pool.query(
				"INSERT INTO events ( start_datetime, end_datetime, title, description, location, category_id, user_id) VALUES ($1, $2, $3, $4, $5,  $6, $7)",
				[
					start_datetime,
					end_datetime,
					title,
					description,
					location,
					category_id,
					user_id,
				]
			);

			res.status(201).json({ message: "Event Created", data: query });
		} catch (error) {
			console.error("Database error:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	})

	// uodate the created event
	.put("/events/:id", async (req, res) => {
		const eventId = req.params.id;
		const { start_datetime, end_datetime, title, description, location } =
			req.body;

		try {
			const query =
				"UPDATE events SET start_datetime=$1, end_datetime=$2, title=$3, description=$4, location=$5 WHERE id=$6";
			const values = [
				start_datetime,
				end_datetime,
				title,
				description,
				location,
				eventId,
			];
			await pool.query(query, values);
			res.json({ message: "Event updated" });
		} catch (error) {
			console.error("Database error:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	})

	// delete the created event
	.delete("/events/:id", async (req, res) => {
		const eventId = req.params.id;

		try {
			const query = "DELETE FROM events WHERE id=$1";
			const values = [eventId];
			await pool.query(query, values);
			res.json({ message: "Event deleted" });
		} catch (error) {
			console.error("Database error:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	})

	.get("*", (req, res) => {
		res.status(404).json({
			status: 404,
			message: "oops",
		});
	});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
