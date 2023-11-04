const express = require("express");
const cors = require("cors");
const { login, signup } = require("./Auth");
const {
	getAllEventsForUser,
	createEvents,
	updateEvents,
	deleteEvents,
} = require("./Events");
const {
	createCategory,
	updateCategory,
	deleteCategory,
} = require("./Category");

const PORT = 8000;
const app = express();

app
	.use(cors())
	.use(express.json())
	.get("/", (req, res) => {
		res.send("hello");
	})

	// AUTH
	.post("/login", login)
	.post("/signup", signup)

	// EVENTS
	.get("/events/user/:userId", getAllEventsForUser)
	.put("/events/:eventId", updateEvents)
	.delete("/events/:eventId", deleteEvents)
	.post("/events", createEvents)

	// CATEGORY
	.post("/category", createCategory)
	.put("/category/:categoryId", updateCategory)
	.delete("/category/:categoryId", deleteCategory)

	.get("*", (req, res) => {
		res.status(404).json({
			status: 404,
			message: "oops",
		});
	});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
