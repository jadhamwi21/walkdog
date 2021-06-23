import Styles from "../OwnerInterface.module.css";
import React, { useContext } from "react";
import { editPostContext } from "./PostComponent";

const InputField = ({
	placeholder,
	name,
	width,
	style,
	maxlength,
	type,
	withError,
}) => {
	const { Inputs, Handlers, Errors, AddStylesForInvalid } =
		useContext(editPostContext);
	return (
		<div
			className={Styles.FieldWrapper}
			style={{ width: width, margin: "0px" }}
		>
			<input
				type={type === undefined ? "text" : type}
				name={name}
				value={Inputs[name]}
				onChange={Handlers.inputHandler}
				placeholder={placeholder}
				className={Styles.InputField}
				style={{
					width: "100%",
					...style,
					...AddStylesForInvalid(name),
				}}
				maxLength={maxlength}
			/>
			{withError && (
				<div className={Styles.ErrorContainer} style={{ width: "100%" }}>
					{Errors[name] === "" ? "" : Errors[name]}
				</div>
			)}
		</div>
	);
};

export default InputField;
