import React from "react";
import Styles from "../OwnerInterface.module.css";
import InputField from "./InputField.js";
const DateToBorrow = () => {
	return (
		<div className={Styles.DateWrapper}>
			<InputField
				name="DayOfBorrow"
				placeholder="DD"
				width="120px"
				maxlength={2}
				withError
			/>
			<InputField
				name="MonthOfBorrow"
				placeholder="MM"
				width="120px"
				maxlength={2}
				withError
			/>
			<InputField
				name="YearOfBorrow"
				placeholder="YY"
				width="120px"
				maxlength={4}
				withError
			/>
		</div>
	);
};

export default DateToBorrow;
