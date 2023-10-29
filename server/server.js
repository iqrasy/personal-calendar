const express = require("express");
const cors = require('cors')

const PORT = 8000;
const app = express();
const pool = require("./db");

app
	.use(cors())
	.use(express.json())
	.get("/", (req, res) => {
		res.send("hello");
	})

	// get all todo's
	.get("/events", async (req, res) => {
		try {
			const { rows } = await pool.query("SELECT * FROM events");
			res.json(rows);
		} catch (error) {
			console.log(error);
		}
	})

	.post("/login", async (req, res) => {
		const { username, password } = req.body;
		try {
			const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
			const result = await pool.query(query, [username, password]);
			console.log(result.rows);
			if (result.rows.length === 0) {
				return res.status(401).json({ message: "Authentication failed" });
			}
			res.json({ message: "Login successful", data: result.rows });
		} catch (error) {
			console.error("Database error:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	})

	.post("/events", async (req, res) => {
		const { start_datetime, end_datetime, title, description, location } =
			req.body;
		try {
			const query =
				"INSERT INTO events (start_datetime, end_datetime, title, description, location) VALUES ($1, $2, $3, $4, $5)";
			await pool.query(query, values);
			console.log(query);
			res.status(201).json({ message: "Event Created" });
		} catch (error) {
			console.log(error);
		}
	})

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
			res.status(500).json({ error: "Internal Server Error" });
		}
	})

	.delete("/events/:id", async (req, res) => {
		const eventId = req.params.id;

		try {
			const query = "DELETE FROM events WHERE id=$1";
			const values = [eventId];
			await pool.query(query, values);
			res.json({ message: "Event deleted" });
		} catch (error) {
			res.status(500).json({ error: "Internal Server Error" });
		}
	})

	.get("*", (req, res) => {
		res.status(404).json({
			status: 404,
			message: "oops",
		});
	});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
