import React, { useEffect, useState, useContext } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import styled from "styled-components";
import GlobalContext from "./context/Context";
import dayjs from "dayjs";
import getMonth from "./GetMonth";

const Calendar = () => {
	const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
	const [currentMonth, setCurrentMonth] = useState(getMonth());
	const [clickedButtons, setClickedButtons] = useState([]);
	const [selectedButton, setSelectedButton] = useState(null);
	const { monthIndex, setSmallCalendar, selectedDay, setSelectedDay } =
		useContext(GlobalContext);

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

	const toggleButton = (day) => {
		if (selectedButton === day.format("DD-MM-YY")) {
			setSelectedButton(null);
			setClickedButtons((prev) =>
				prev.filter((date) => date !== day.format("DD-MM-YY"))
			);
		} else {
			setSelectedButton(day.format("DD-MM-YY"));
			setClickedButtons((prev) => [day.format("DD-MM-YY")]);
		}
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
							<div key={id}>
								{day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? (
									<button style={{ backgroundColor: "blue", color: "white" }}>
										<p>{day.format("D")}</p>
									</button>
								) : (
									<Div>
										<button
											className={
												selectedButton === day.format("DD-MM-YY")
													? "light-blue-background"
													: ""
											}
											onClick={() => {
												setSmallCalendar(currentMonthIndex);
												setSelectedDay(day);
												toggleButton(day);
											}}
										>
											<p>{day.format("D")}</p>
										</button>
									</Div>
								)}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Calendar;

const Div = styled.button`
	.light-blue-background {
		background-color: lightblue;
		color: white;
	}
`;
