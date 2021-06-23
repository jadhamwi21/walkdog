import React from "react";
import ErrorComponent from "./ErrorComponent";
import Styles from "./MyAccount.module.css";
const NewPasswordComponent = ({
	value,
	placeholder,
	name,
	onChange,
	error,
}) => {
	return (
		<div className={Styles.PasswordFieldWrapper}>
			<input
				type="password"
				value={value}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
			/>
			<ErrorComponent error={error} />
		</div>
	);
};

export default NewPasswordComponent;
