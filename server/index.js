const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const database = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "password",
	database: "employeesystem",
});

app.listen(5000, () => {
	console.log("We are back in game on port 5000!");
});

app.post("/create", (req, res) => {
	console.log(req.body);
	console.log("heloooo");
	let name = req.body.name;
	let age = req.body.age;
	let department = req.body.department;
	let country = req.body.country;
	let salary = req.body.salary;

	database.query(
		"insert into employee (name,age,department, country, salary) values(?, ?, ?, ?, ?)",
		[name, age, department, country, salary],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("SUCCESSS BOIII");
			}
		}
	);
});

app.get("/employees", (req, res) => {
	database.query("select * from employee", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.delete("/:id", (req, res) => {
	const id = req.params.id;

	database.query("delete from employee where id=?", [id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log("item deleted");
			res.send(result);
			console.log(result);
		}
	});
});

app.patch("/:id", (req, res) => {
	const id = req.params.id;
	let name = req.body.name1;
	let age = req.body.age1;
	let department = req.body.department1;
	let country = req.body.country1;
	let salary = req.body.salary1;

	database.query(
		"UPDATE employee SET name=?, age=?, department=?, country=?, salary=? WHERE id=?",
		[name, age, department, country, salary, id],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.send(result);
			}
		}
	);
});
