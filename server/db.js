const Pool = require("pg").Pool;
require("dotenv").config();
const { USERNAME, PASSWORD, HOST, DBPORT } = process.env;

const pool = new Pool({
	user: USERNAME,
	password: PASSWORD,
	host: HOST,
	port: DBPORT,
	database: "todoapp",
});

module.exports = pool;
