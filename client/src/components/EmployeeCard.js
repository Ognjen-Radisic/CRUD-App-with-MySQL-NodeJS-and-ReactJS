import React, { useState } from "react";
import "./EmployeeCard.css";
import ModalEdit from "./ModalEdit";
import Axios from "axios";

const EmployeeCard = ({
	id,
	name,
	age,
	department,
	country,
	salary,
	setEmployeeList,
	employeeList,
}) => {
	const [showModal, setShowModal] = useState(false);
	const allitems = { id, name, age, department, country, salary };

	const popModal = () => {
		setShowModal(!showModal);
	};

	const deleteItem = () => {
		Axios.delete(`http://localhost:5000/${id}`).then((res) => {
			console.log("Succesful deletion");
			setEmployeeList(employeeList.filter((item) => item.id !== id));
		});
	};
	return (
		<>
			<main className="card-container">
				<div className="left-section">
					<section className="part">
						<article className="color">Name: {name}</article>
						<article className="color">Age: {age}</article>
						<article className="color">Country: {country}</article>
					</section>
					<section className="part">
						<article className="color">Department: {department}</article>
						<article className="color">Salary: {salary}</article>
					</section>
				</div>
				<section className="right-section">
					<button onClick={popModal}>Edit</button>
					<ModalEdit
						showModal={showModal}
						popModal={popModal}
						{...allitems}
						setEmployeeList={setEmployeeList}
						employeeList={employeeList}
					/>
					<button onClick={deleteItem}>Delete</button>
				</section>
			</main>
		</>
	);
};

export default EmployeeCard;
