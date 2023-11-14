import React, { useEffect, useState } from "react";
import GlobalContext from "./Context";
import dayjs from "dayjs";

const Wrapper = (props) => {
	const [monthIndex, setMonthIndex] = useState(dayjs().month());
	const [smallCalendar, setSmallCalendar] = useState(null);
	const [selectedDay, setSelectedDay] = useState(null);
	const [categoryName, setCategoryName] = useState("");
	const [categoryId, setCategoryId] = useState(null);
	const [categories, setCategories] = useState([]);
	// const [isFormOpen, setIsFormOpen] = useState(false);
	const [formData, setFormData] = useState({
		start_datetime: "",
		end_datetime: "",
		title: "",
		description: "",
		location: "",
		category_id: "",
	});

	useEffect(() => {
		if (smallCalendar !== null) {
			setMonthIndex(smallCalendar);
		}
	}, [smallCalendar]);

	return (
		<GlobalContext.Provider
			value={{
				monthIndex,
				setMonthIndex,
				smallCalendar,
				setSmallCalendar,
				selectedDay,
				setSelectedDay,
				categoryName,
				setCategoryName,
				categoryId,
				setCategoryId,
				categories,
				setCategories,
				formData,
				setFormData,
				// isFormOpen,
				// setIsFormOpen,
			}}
		>
			{props.children}
		</GlobalContext.Provider>
	);
};

export default Wrapper;
