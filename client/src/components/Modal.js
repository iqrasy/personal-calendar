import React from "react";

const Modal = ({ categoryName, setCategoryName, handleModal, action }) => {
	return (
		<div
			className="modal fade"
			id="categoryModal"
			tabIndex="-1"
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5>{action}</h5>
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
							<input
								placeholder="Category name"
								value={categoryName}
								onChange={(e) => setCategoryName(e.target.value)}
							/>
						)}
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
							onClick={handleModal}
						>
							{action === "Delete Category" ? "Delete" : "Save changes"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
