import React from "react";
import Day from "./Day";

const Month = ({ month }) => {
	// console.log(month);
	return (
		<div>
			{month.map((item, i) => (
				<>
					{item.map((day, id) => (
						<Day day={day} key={id} rowId={i} />
					))}
				</>
			))}
		</div>
	);
};

export default Month;
