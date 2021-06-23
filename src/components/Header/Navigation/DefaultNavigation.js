import React from "react";
import Styles from "../Header.module.css";
import ModifiedLink from "../../../helpers/ModifiedLink.js";
import { Typography } from "@material-ui/core";
import { Route } from "react-router-dom";
const DefaultNavigation = () => {
	return (
		<Route path="/home" exact>
			<div className={Styles.DefaultNavigation}>
				<Typography>
					<ModifiedLink className={Styles.Link} to="/signup">
						Sign Up
					</ModifiedLink>
				</Typography>
				<Typography>
					<ModifiedLink className={Styles.Link} to="/signin">
						Sign In
					</ModifiedLink>
				</Typography>
			</div>
		</Route>
	);
};

export default DefaultNavigation;
