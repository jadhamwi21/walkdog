import React from "react";
import Styles from "../Homepage.module.css";
import { Typography } from "@material-ui/core";
export const Header = () => {
	return (
		<div>
			<header className={Styles.Header}>
				<Typography component="header" variant="h4">
					Getting Started
				</Typography>
				<Typography component="header" variant="h5" id="cards-reference">
					What Are You?
				</Typography>
			</header>
		</div>
	);
};

export default Header;
