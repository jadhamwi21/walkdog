import Styles from "../OwnerInterface.module.css";
import React, { useContext } from "react";
import { FormContext } from "./NewPost";

const InputField = ({
	placeholder,
	name,
	width,
	style,
	maxlength,
	type,
	withError,
}) => {
	const { Inputs, Handlers, Errors, AddStylesForInvalid } = useContext(
		FormContext
	);
	return (
		<div className={Styles.FieldWrapper}>
			<input
				type={type === undefined ? "text" : type}
				name={name}
				value={Inputs[name]}
				onChange={Handlers.inputHandler}
				placeholder={placeholder}
				className={Styles.InputField}
				style={{ width: width, ...style, ...AddStylesForInvalid(name) }}
				maxLength={maxlength}
			/>
			{withError && (
				<div className={Styles.ErrorContainer}>
					{Errors[name] === "" ? "" : Errors[name]}
				</div>
			)}
		</div>
	);
};

export default InputField;
