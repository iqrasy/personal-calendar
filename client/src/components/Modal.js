import React from "react";
import "react-color-palette/css";
import styled from "styled-components";

const Modal = ({ categoryName, setCategoryName, handleModal, action }) => {
	return (
		<div
			className="modal fade"
			id="exampleModalCenter"
			tabIndex="-1"
			role="dialog"
			data-target="#exampleModalCenter"
			aria-hidden="true"
		>
			<Main className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{action}</h5>
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
						{action === "Delete Category" ? (
							<p>
								Are you sure you want to delete the category: {categoryName}?
							</p>
						) : (
							<>
								<input
									placeholder="new category name"
									value={categoryName}
									onChange={(e) => setCategoryName(e.target.value)}
								/>
							</>
						)}
					</div>
					<div className="modal-footer">
						<Close
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal"
						>
							Close
						</Close>
						<Save
							onClick={handleModal}
							type="button"
							data-dismiss="modal"
							className="btn btn-primary"
						>
							{action === "Delete Category" ? "Delete" : "Save changes"}
						</Save>
					</div>
				</div>
			</Main>
		</div>
	);
};

export default Modal;

const Main = styled.div`
	/* background-color: rgba(0, 0, 0, 0.5); */
	border-radius: 1rem;
	padding: 20px;
	max-width: 40vh;
	margin: 20px auto;
	/* box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); */

	input {
		border-radius: 0.4rem;
		padding: 0.4rem;
	}
`;

const Close = styled.button`
	background-color: transparent;
	color: black;
	padding: 0.8rem;
	border-radius: 0.5rem;
`;

const Save = styled.button`
	background-color: black;
	padding: 0.8rem;
	border-radius: 0.5rem;
`;
