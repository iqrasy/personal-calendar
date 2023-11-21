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
	getAllCategories,
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
	.post("/events/:user_id", createEvents)
	.put("/events", updateEvents)
	.delete("/events", deleteEvents)

	// CATEGORY
	.get("/categories/user/:userId", getAllCategories)
	.post("/category", createCategory)
	.put("/category", updateCategory)
	.delete("/category", deleteCategory)

	.get("*", (req, res) => {
		res.status(404).json({
			status: 404,
			message: "oops",
		});
	});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
