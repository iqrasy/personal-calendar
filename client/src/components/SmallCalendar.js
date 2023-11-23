import React, { useEffect, useState, useContext } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import GlobalContext from "./context/Context";
import dayjs from "dayjs";
import getMonth from "../components/getData/GetMonth";

const SmallCalendar = () => {
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
			<Cal>
				<Span>
					<Button>
						<button onClick={handlePrevMonth}>
							<IoIosArrowBack />
						</button>
						<p>
							{dayjs(new Date(dayjs().year(), currentMonthIndex)).format(
								"MMMM YYYY"
							)}
						</p>
						<button onClick={handleNextMonth}>
							<IoIosArrowForward />
						</button>
					</Button>
					<WeekNames>
						{currentMonth[0].map((item, i) => (
							<p key={i}>{item.format("dd").charAt(0)}</p>
						))}
					</WeekNames>
				</Span>
				{currentMonth.map((calendar, i) => (
					<Div key={i}>
						{calendar.map((day, id) => (
							<div key={id}>
								{day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? (
									<button>
										<p>{day.format("D")}</p>
									</button>
								) : (
									<Days>
										<p>{day.format("D")}</p>
									</Days>
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
		background-color: #977eb3;
		margin: 0.2rem;
		color: white;
		border-radius: 1rem;
		height: 1.5rem;
		width: 1.5rem;
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
	width: 14rem;
	margin-bottom: 1rem;

	button {
		background-color: transparent;
		border: none;
		font-size: 1.2rem;
		color: white;
		cursor: pointer;

		&:focus {
			outline: none;
		}
	}

	p {
		font-size: 1.2rem;
		text-align: center;
		width: 13rem;
		margin: 1rem;
	}
`;

const Cal = styled.div`
	position: absolute;
	top: 8.3rem;
	background-color: #292929;
	padding: 2rem;
	border-radius: 1rem;
	width: 25vh;
`;

const WeekNames = styled.div`
	display: flex;
	justify-content: space-between;
	width: 13rem;
`;

const Days = styled.div`
	padding: 0.3rem;
`;
