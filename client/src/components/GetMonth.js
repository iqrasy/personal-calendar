import dayjs from "dayjs";
import React from "react";

const getMonth = (month = dayjs().month()) => {
	month = Math.floor(month);
	const year = dayjs().year();
	const firstOfMonth = dayjs(new Date(year, month, 1)).day();
	let currentMonth = 0 - firstOfMonth;
	const daysM = new Array(5).fill([]).map(() => {
		return new Array(7).fill(null).map(() => {
			currentMonth++;
			return dayjs(new Date(year, month, currentMonth));
		});
	});
	return daysM;
};

export default getMonth;
