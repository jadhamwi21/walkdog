import React from "react";
import Styles from "../UserInterface.module.css";
import { Typography } from "@material-ui/core";
import ModifiedLink from "../../../helpers/ModifiedLink";
const NotLoggedIn = () => {
	return (
		<>
			<Typography variant="h4">Not Signed In</Typography>
			<ModifiedLink to="/signin" className={Styles.Link}>
				Sign In
			</ModifiedLink>
		</>
	);
};

export default NotLoggedIn;
