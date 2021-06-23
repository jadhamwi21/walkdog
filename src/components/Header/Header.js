import React from "react";
import Styles from "./Header.module.css";
import ApplicationTitle from "./ApplicationTitle/ApplicationTitle.js";
import Navigation from "./Navigation/Navigation.js";

const Header = () => {
	return (
		<div className={Styles.HeaderBar}>
			<div>
				<ApplicationTitle />
				<Navigation />
			</div>
		</div>
	);
};

export default Header;
