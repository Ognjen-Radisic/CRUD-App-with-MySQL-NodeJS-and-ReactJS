import React, { useState } from "react";
import "./App.css";
import Axios from "axios";
import EmployeeCard from "./EmployeeCard";

const Form = () => {
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);
	const [department, setDepartment] = useState("");
	const [country, setCountry] = useState("");
	const [salary, setSalary] = useState(0);

	//after we retrieve data from database with function "getData" we store it here
	const [employeeList, setEmployeeList] = useState([]);

	const postData = (e) => {
		Axios.post("http://localhost:5000/create", {
			name,
			age,
			department,
			country,
			salary,
		}).then(() => {
			console.log("I'm here, new one in database!!!!!");
			//let's show it immidietly
			getData();
		});

		e.preventDefault();
		setName("");
		setAge(0);
		setDepartment("");
		setCountry("");
		setSalary(0);
	};

	const getData = () => {
		Axios.get("http://localhost:5000/employees").then((res) => {
			console.log("Hello everyone, gio loaded some data for you");
			setEmployeeList(res.data);
		});
	};

	return (
		<>
			<div className="form-container">
				<div className="formWrapper">
					<h1>Add employess in the database</h1>
					<form className="form">
						<div className="wrapper">
							<label>Name:</label>
							<input
								type="text"
								value={name}
								placeholder="Type..."
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						<div className="wrapper">
							<label>Age:</label>
							<input
								type="number"
								value={age}
								placeholder="Type..."
								onChange={(e) => setAge(e.target.value)}
							/>
						</div>
						<div className="wrapper">
							<label>Department:</label>
							<input
								type="text"
								value={department}
								placeholder="Type..."
								onChange={(e) => setDepartment(e.target.value)}
							/>
						</div>
						<div className="wrapper">
							<label>Country:</label>
							<input
								type="text"
								value={country}
								placeholder="Type..."
								onChange={(e) => setCountry(e.target.value)}
							/>
						</div>
						<div className="wrapper">
							<label>Salary:</label>
							<input
								type="number"
								value={salary}
								placeholder="Type..."
								onChange={(e) => setSalary(e.target.value)}
							/>
						</div>
					</form>

					<button className="color-button" type="submit" onClick={postData}>
						Add User
					</button>
				</div>
			</div>
			<div className="cards-container">
				<div className="title-card-wrapper">
					<div className="title-container">
						<h1>Employess in the database</h1>
						<p>(press button "Get Users" to retrieve)</p>
					</div>

					<button onClick={getData}>Get Users</button>
				</div>

				{employeeList.map((item) => {
					return (
						<EmployeeCard
							key={item.id}
							{...item}
							setEmployeeList={setEmployeeList}
							employeeList={employeeList}
						/>
					);
				})}
			</div>
		</>
	);
};

export default Form;
