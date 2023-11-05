import React, { useEffect, useState, useContext } from "react";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import styled from "styled-components";
import GlobalContext from "./context/Context";
import dayjs from "dayjs";
import getMonth from "./GetMonth";

const SmallCalendar = () => {
	const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
	const [currentMonth, setCurrentMonth] = useState(getMonth());
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
		const today = day.format("DD-MM-YY");
		const daySelected = selectedDay && selectedDay.format("DD-MM-YY");

		if (today === daySelected) {
			return <div style={{ backgroundColor: "blue", color: "white" }}></div>;
		} else {
			return "";
		}
	};

	return (
		<div>
			<Cal>
				<Span>
					<Button>
						<button onClick={handlePrevMonth}>
							<BiLeftArrow />
						</button>
						<p style={{ fontSize: "1.1rem" }}>
							{dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
								"MMMM YYYY"
							)}
						</p>
						<button onClick={handleNextMonth}>
							<BiRightArrow />
						</button>
					</Button>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						{currentMonth[0].map((item, i) => (
							<p key={i} style={{ marginBottom: "1rem" }}>
								{item.format("dd").charAt(0)}
							</p>
						))}
					</div>
				</Span>
				{currentMonth.map((calendar, i) => (
					<Div key={i}>
						{calendar.map((day, id) => (
							<div key={id}>
								{day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? (
									<button style={{ backgroundColor: "blue", color: "white" }}>
										<p>{day.format("D")}</p>
									</button>
								) : (
									<div>
										<button
											style={{
												backgroundColor: toggleButton(day)
													? "blue"
													: "transparent",
											}}
											onClick={() => {
												setSmallCalendar(currentMonthIndex);
												setSelectedDay(day);
											}}
										>
											<p>{day.format("D")}</p>
										</button>
									</div>
								)}
							</div>
						))}
					</Div>
				))}
			</Cal>
		</div>
	);
};

export default SmallCalendar;

const Div = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: repeat(4, 1fr);
	height: 1.5rem;

	button {
		background-color: transparent;
		border: none;
	}
`;

const Span = styled.div`
	display: flex;
	flex-direction: column;
	width: 9.5rem;
`;

const Button = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 2rem;

	button {
		background-color: transparent;
		border: none;
		font-size: 1.2rem;
	}
`;

const Cal = styled.div`
	position: absolute;
	bottom: 0;
`;
