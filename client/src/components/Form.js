import React, { useContext } from "react";
import GlobalContext from "./context/Context";

const Form = () => {
	const { formData, setFormData } = useContext(GlobalContext);

	const handleInput = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:8000/events", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
			} else {
				const errorData = await response.json();
				console.error("Event creation failed:", errorData.message);
			}
		} catch (error) {
			console.error("Fetch error:", error);
		}
	};

	return (
		<div>
			<div
				className="modal fade"
				id="formModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5>Form</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form onSubmit={handleSubmit}>
								<div>
									<input
										placeholder="Start Date and Time"
										type="datetime-local"
										name="start_datetime"
										value={formData.start_datetime}
										onChange={handleInput}
										// required
									/>
								</div>
								<div>
									<input
										placeholder="End Date and Time"
										type="datetime-local"
										name="end_datetime"
										value={formData.end_datetime}
										onChange={handleInput}
										// required
									/>
								</div>
								<div>
									<input
										placeholder="Title"
										type="text"
										name="title"
										value={formData.title}
										onChange={handleInput}
										// required
									/>
								</div>
								<div>
									<textarea
										placeholder="Description"
										name="description"
										value={formData.description}
										onChange={handleInput}
									/>
								</div>
								<div>
									<input
										placeholder="Location"
										type="text"
										name="location"
										value={formData.location}
										onChange={handleInput}
									/>
								</div>
								<button type="submit">Create Event</button>
								<div className="modal-footer">
									<button
										type="button"
										className="close"
										data-dismiss="modal"
										aria-label="Close"
										// onClick={handleModal}
									>
										Done
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Form;
