import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";
import Form from "../Form";

const Weekly = () => {
	const [currentWeek, setCurrentWeek] = useState([]);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [is24HourFormat, setIs24HourFormat] = useState(true);

	useEffect(() => {
		const startOfWeek = dayjs().startOf("week");
		const endOfWeek = dayjs().endOf("week");
		const hoursInDay = Array.from({ length: 24 }, (_, i) => i);
		const daysInWeek = [];

		for (let day = startOfWeek; day <= endOfWeek; day = day.add(1, "day")) {
			daysInWeek.push({
				day: day.format("ddd").toUpperCase(),
				date: day.format("DD"),
				hours: hoursInDay.map((hour) => day.hour(hour)),
			});
		}

		setCurrentWeek(daysInWeek);
	}, []);

	const toggleTimeFormat = () => {
		setIs24HourFormat((prevFormat) => !prevFormat);
	};

	const handleDoubleClick = () => {
		setIsFormOpen(true);
		// console.log(isFormOpen);
	};

	return (
		<>
			<button onClick={toggleTimeFormat}>
				{is24HourFormat ? "Switch to 12-hour" : "Switch to 24-hour"}
			</button>
			<WeeklyContainer>
				<HoursColumn>
					<ul>
						{currentWeek[0] &&
							currentWeek[0].hours.map((hour, j) => (
								<li key={j}>
									{is24HourFormat ? hour.format("HH A") : hour.format("hh A")}
								</li>
							))}
					</ul>
				</HoursColumn>
				<Main>
					{currentWeek.map((item, i) => (
						<Date key={i}>
							<p>
								{item.day} {item.date}
							</p>
							<ul>
								{item.hours.map((hour, j) => (
									<button
										type="button"
										data-toggle="modal"
										data-target="#formModal"
										key={j}
										onDoubleClick={() => handleDoubleClick()}
									></button>
								))}
							</ul>
						</Date>
					))}
				</Main>
			</WeeklyContainer>
			{isFormOpen && <Form />}
		</>
	);
};

export default Weekly;

const WeeklyContainer = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
`;

const Main = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-gap: 1px;
`;

const HoursColumn = styled.div`
	margin-top: 3rem;

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;

		li {
			border-bottom: 1px solid #ccc;
			width: 6rem;
			height: 5rem;
			text-align: center;
		}
	}
`;

const Date = styled.div`
	position: relative;

	p {
		height: 3rem;
		width: 14rem;
		background-color: #f0f0f0;
		text-align: center;
		margin-bottom: 2rem;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		position: absolute;
		top: 3rem;
		left: 0;
	}

	button {
    padding: 0;
    margin: 0;
		border: 1px solid #ccc;
		text-align: center;
		cursor: pointer;
		width: 14rem;
		height: 5rem;
		background-color: transparent;
	}
`;
