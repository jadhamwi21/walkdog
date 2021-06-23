import React from "react";
import Styles from "./MyAccount.module.css";
const ErrorComponent = ({ error }) => {
	return <div className={Styles.ErrorWrapper}>{error}</div>;
};

export default ErrorComponent;
