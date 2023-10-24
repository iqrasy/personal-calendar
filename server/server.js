const express = require("express");

const PORT = 8000;
const app = express();
const pool = require("./db");

app
	.use(express.json())
	.get("/", (req, res) => {
		res.send("hello");
	})

	// get all todo's
	.get("/todo", async (req, res) => {
		const userEmail = "iqra@test.com";
		try {
			const response = await pool.query(
				"SELECT * FROM todos WHERE user_email = $1",
				[userEmail]
			);
			res.json(response.rows);
		} catch (error) {
			console.log(error);
		}
	})

	.get("*", (req, res) => {
		res.status(404).json({
			status: 404,
			message: "oops",
		});
	});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
