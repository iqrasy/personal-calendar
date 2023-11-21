import React, { createContext } from "react";

const CategoryContext = createContext();

export const useCategoryContext = () => {
	return useContext(CategoryContext);
};

const GlobalContext = React.createContext({
	monthIndex: 0,
	setMonthIndex: (index) => {},
	smallCalendar: 0,
	setSmallCalendar: (index) => {},
	selectedDay: null,
	setSelectedDay: (day) => {},
	categoryName: [],
	setCategoryName: null,
	categoryId: 0,
	setCategoryId: (index) => {},
	categories: [],
	setCategories: () => {},
	formData: {},
	setFormData: () => {},
	// isFormOpen: [],
	// setIsFormOpen: [],
});

export default GlobalContext;
