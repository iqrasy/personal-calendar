import React, { useEffect, useState, useContext } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import GlobalContext from "./context/Context";
import dayjs from "dayjs";
import getMonth from "./GetMonth";

const Calendar = () => {
	const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
	const [currentMonth, setCurrentMonth] = useState(getMonth());
	const { monthIndex } = useContext(GlobalContext);

	useEffect(() => {
		setCurrentMonthIndex(monthIndex);
	}, [monthIndex]);

	useEffect(() => {
		setCurrentMonth(getMonth(currentMonthIndex));
	}, [currentMonthIndex]);

	const handlePrevMonth = () => {
		setCurrentMonthIndex(currentMonthIndex - 1);
	};

	const handleNextMonth = () => {
		setCurrentMonthIndex(currentMonthIndex + 1);
	};

	return (
		<div>
			<p>
				{dayjs(new Date(dayjs().year(), currentMonthIndex)).format("MMMM YYYY")}
			</p>
			<button onClick={handlePrevMonth}>
				<BiLeftArrow />
			</button>
			<button onClick={handleNextMonth}>
				<BiRightArrow />
			</button>
			<div>
				{currentMonth[0].map((item, i) => (
					<span key={i}>{item.format("dd").charAt(0)}</span>
				))}
				{currentMonth.map((calendar, i) => (
					<div key={i}>
						{calendar.map((day, id) => (
							<button key={id}>
								<span>{day.format("D")}</span>
							</button>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Calendar;
