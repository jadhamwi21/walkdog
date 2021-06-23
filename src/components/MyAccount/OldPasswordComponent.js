import React, { useState } from "react";
import ShowPassword from "../../assets/ShowPassword.svg";
import HidePassword from "../../assets/HidePassword.svg";
import Styles from "./MyAccount.module.css";
import ErrorComponent from "./ErrorComponent";
const OldPasswordComponent = ({ value, placeholder, onChange, error }) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className={Styles.PasswordFieldWrapper}>
			<input
				type={showPassword ? "text" : "password"}
				value={value}
				name="old"
				placeholder={placeholder}
				onChange={onChange}
			/>
			<div
				className={Styles.ShowHidePasswordWrapper}
				onClick={() => setShowPassword(!showPassword)}
			>
				<img src={showPassword ? ShowPassword : HidePassword} />
			</div>
			<ErrorComponent error={error} />
		</div>
	);
};

export default OldPasswordComponent;
