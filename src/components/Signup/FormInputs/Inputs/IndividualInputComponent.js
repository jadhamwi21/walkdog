import React, { useContext, useRef } from "react";
import Styles from "../../Signup.module.css";
import { FormContext } from "../../Signup.js";
export const IndividualInputComponent = ({
	name,
	placeholder,
	width,
	type,
}) => {
	const { Inputs, Handlers, StylesForEmptyFields, Errors } = useContext(
		FormContext
	);
	return (
		<div>
			<input
				type={type}
				placeholder={placeholder}
				style={{ width: width }}
				className={Styles.TextField}
				onChange={Handlers.fieldHandler}
				name={name}
				value={Inputs[name]}
				style={StylesForEmptyFields(name)}
			/>

			<div className={Styles.InvalidInputDivStyle}>{Errors[name]}</div>
		</div>
	);
};

export default IndividualInputComponent;
