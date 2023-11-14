import dayjs from "dayjs";

const getWeeksInMonth = (month = dayjs().month()) => {
	month = Math.floor(month);
	const year = dayjs().year();
	const firstOfMonth = dayjs(new Date(year, month, 1)).day();
	const daysInMonth = dayjs(new Date(year, month + 1, 0)).date();

	let currentDay = 0 - firstOfMonth;
	let weeks = [];

	while (currentDay < daysInMonth) {
		const week = new Array(7).fill(null).map(() => {
			currentDay++;
			return dayjs(new Date(year, month, currentDay));
		});
		weeks.push(week);
	}
	// console.log(weeks);
	return weeks;
};

export default getWeeksInMonth;
