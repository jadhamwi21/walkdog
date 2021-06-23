import React from "react";
import Styles from "./Footer.module.css";
import ApplicationTitle from "../Header/ApplicationTitle/ApplicationTitle.js";
const Logo = () => {
	return (
		<div className={Styles.LogoDiv}>
			<ApplicationTitle />
		</div>
	);
};

export default Logo;
