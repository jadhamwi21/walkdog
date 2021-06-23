import React from "react";
import Styles from "../OwnerInterface.module.css";
import InputField from "./InputField.js";
const InputFieldsWrapper = () => {
	return (
		<div className={Styles.InputFieldsWrapper}>
			<InputField name="DogType" placeholder="Dog Type" width="80%" />
			<InputField name="DogName" placeholder="Dog Name" width="80%" />
		</div>
	);
};

export default InputFieldsWrapper;
