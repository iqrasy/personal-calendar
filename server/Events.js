"use strict";
const pool = require("./db");

// ALL EVENTS FOR USER LOGGED IN
const getAllEventsForUser = async (req, res) => {
	const userId = req.params.userId;
	try {
		const query = await pool.query("SELECT * FROM events WHERE user_id = $1", [
			userId,
		]);

		res
			.status(200)
			.json({ message: "Events retrieved successfully", data: query.rows });
	} catch (error) {
		console.error("Database error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// CREATE NEW EVENT
const createEvents = async (req, res) => {
	const {
		start_datetime,
		end_datetime,
		title,
		description,
		location,
		category_id,
	} = req.body;

	try {
		const query = await pool.query(
			"INSERT INTO events ( start_datetime, end_datetime, title, description, location, category_id) VALUES ($1, $2, $3, $4, $5,  $6)",
			[start_datetime, end_datetime, title, description, location, category_id]
		);

		res.status(201).json({ message: "Event Created", data: query });
	} catch (error) {
		console.error("Database error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// UPDATE EVENT
const updateEvents = async (req, res) => {
	const eventId = req.params.eventId;
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
};

// DELETE EVENT
const deleteEvents = async (req, res) => {
	const eventId = req.params.eventId;

	try {
		const query = "DELETE FROM events WHERE id=$1";
		const values = [eventId];
		await pool.query(query, values);
		res.json({ message: "Event deleted", data: { query, values } });
	} catch (error) {
		console.error("Database error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
	getAllEventsForUser,
	createEvents,
	updateEvents,
	deleteEvents,
};
