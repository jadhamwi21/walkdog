import React from "react";
import Styles from "./Footer.module.css";
import Logo from "./Logo";
export const Footer = () => {
	return (
		<div className={Styles.Container}>
			<Logo />
		</div>
	);
};
export default Footer;
