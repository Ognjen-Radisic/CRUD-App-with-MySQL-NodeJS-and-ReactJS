import React, { useRef, useState } from "react";
import "./modalEdit.css";
import { MdClose } from "react-icons/md";
import axios from "axios";

const ModalEdit = ({
	showModal,
	popModal,
	employeeList,
	setEmployeeList,
	id,
	name,
	country,
	department,
	salary,
	age,
}) => {
	const [name1, setName1] = useState(name);
	const [age1, setAge1] = useState(age);
	const [department1, setDepartment1] = useState(department);
	const [country1, setCountry1] = useState(country);
	const [salary1, setSalary1] = useState(salary);

	const modalRef = useRef();
	// const animation = useSpring({
	// 	config: {
	// 		duration: 250,
	// 	},
	// 	opacity: showModal ? 1 : 0,
	// 	transform: showModal ? `translateY(30%)` : `translateY(-100%)`,
	// });

	const closeModal = (e) => {
		if (modalRef.current === e.target) {
			popModal();
		}
	};

	const updateEmployee = () => {
		axios
			.patch(`http://localhost:5000/${id}`, {
				name1,
				country1,
				department1,
				salary1,
				age1,
			})
			.then(() => {
				console.log("succesful update");
				setEmployeeList(
					employeeList.map((item) => {
						return item.id === id
							? {
									...item,
									name: name1,
									country: country1,
									department: department1,
									salary: salary1,
									age: age1,
							  }
							: item;
					})
				);
			});

		popModal();
	};

	return (
		<>
			{showModal ? (
				<div className="background" ref={modalRef} onClick={closeModal}>
					<div className="modal-wrapper">
						<h2>Edit employee Information</h2>
						<MdClose className="modal-close" onClick={popModal} />
						<form className="modal-section">
							<div className="one-item">
								<label>Name:</label>
								<input
									type="text"
									value={name1}
									onChange={(e) => setName1(e.target.value)}
								/>
							</div>
							<div className="one-item">
								<label>Age:</label>
								<input
									type="number"
									value={age1}
									onChange={(e) => setAge1(e.target.value)}
								/>
							</div>
							<div className="one-item">
								<label>Department:</label>
								<input
									type="text"
									value={department1}
									onChange={(e) => setDepartment1(e.target.value)}
								/>
							</div>
							<div className="one-item">
								<label>Country:</label>
								<input
									type="text"
									value={country1}
									onChange={(e) => setCountry1(e.target.value)}
								/>
							</div>
							<div className="one-item">
								<label>Salary:</label>
								<input
									type="number"
									value={salary1}
									onChange={(e) => setSalary1(e.target.value)}
								/>
							</div>
						</form>
						<div className="align-btn">
							<button className="btn" onClick={updateEmployee}>
								Confirm
							</button>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default ModalEdit;
