import React from "react";
import { Typography } from "@material-ui/core";
import Styles from "../Signin.module.css";
const Header = () => {
	return (
		<Typography variant="h4" className={Styles.SignInHeader}>
			Sign In
		</Typography>
	);
};

export default Header;
