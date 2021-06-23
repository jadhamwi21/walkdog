import React from "react";
import IndividualInputComponent from "./IndividualInputComponent.js";
import Styles from "../../Signup.module.css";
export const InputComponentsContainer = () => {
	return (
		<div className={Styles.InputFieldsContainer}>
			<div className={Styles.NameFieldsWrapper}>
				<IndividualInputComponent
					placeholder="First Name"
					width="200px"
					name="FirstName"
					type="text"
				/>
				<IndividualInputComponent
					placeholder="Last Name"
					width="200px"
					name="LastName"
					type="text"
				/>
			</div>
			<IndividualInputComponent
				placeholder="Email"
				width="300px"
				name="Email"
				type="email"
			/>
			<IndividualInputComponent
				placeholder="Password"
				width="300px"
				name="Password"
				type="password"
			/>
			<IndividualInputComponent
				placeholder="Confirm Password"
				width="300px"
				name="ConfirmPassword"
				type="password"
			/>
		</div>
	);
};

export default InputComponentsContainer;
