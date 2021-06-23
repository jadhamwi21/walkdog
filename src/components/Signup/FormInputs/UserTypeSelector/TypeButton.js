import React, { useContext } from "react";
import Styles from "../../Signup.module.css";
import { FormContext } from "../../Signup.js";
export const TypeButton = ({ label, type }) => {
	const { Inputs, Handlers } = useContext(FormContext);
	return (
		<div
			className={Styles.TypeButtonContainer}
			onClick={() => Handlers.usertypeHandler(type)}
			id={type}
		>
			<span
				className={Styles.TypeButton}
				style={Inputs.UserType !== type ? { backgroundColor: "white" } : {}}
			></span>
			<span className={Styles.TypeLabel}>{label}</span>
		</div>
	);
};

export default TypeButton;
