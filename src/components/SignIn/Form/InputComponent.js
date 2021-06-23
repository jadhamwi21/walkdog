import React from "react";
import Styles from "../Signin.module.css";
export const InputComponent = ({ PlaceHolder, type, inputHandler, value }) => {
	return (
		<input
			name={PlaceHolder}
			type={type}
			placeholder={PlaceHolder}
			className={Styles.TextField}
			onChange={inputHandler}
			value={value}
			required
		/>
	);
};

export default InputComponent;
