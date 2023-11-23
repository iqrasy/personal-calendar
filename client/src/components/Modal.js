import React, { useState } from "react";
import { ColorPicker, useColor, Saturation, Hue } from "react-color-palette";
import "react-color-palette/css";

const Modal = ({ categoryName, setCategoryName, handleModal, action }) => {
	const [color, setColor] = useColor("#fff");
	return (
		<div
			className="modal fade"
			id="exampleModalCenter"
			tabIndex="-1"
			role="dialog"
			data-target="#exampleModalCenter"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered" role="document">
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
								{/* add color category */}

								<ColorPicker
									hideInput={["rgb", "hsv"]}
									color={color}
									onChange={setColor}
								/>
							</>
						)}
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal"
						>
							Close
						</button>
						<button
							onClick={handleModal}
							type="button"
							data-dismiss="modal"
							className="btn btn-primary"
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
