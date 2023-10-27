import React, { useState } from "react";
import GlobalContext from "./Context";
import dayjs from "dayjs";

const Wrapper = (props) => {
	const [monthIndex, setMonthIndex] = useState(dayjs().month());
	return (
		<GlobalContext.Provider value={{ monthIndex, setMonthIndex }}>
			{props.children}
		</GlobalContext.Provider>
	);
};

export default Wrapper;
