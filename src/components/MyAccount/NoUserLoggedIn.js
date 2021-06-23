import React from "react";
import ModifiedLink from "../../helpers/ModifiedLink";
import Styles from "./MyAccount.module.css";
const NoUserLoggedIn = () => {
	return (
		<div className={Styles.NoUserLoggedInContainer}>
			<div>
				You're Not Logged In
				<br />
				<ModifiedLink to="/signin" style={{ color: "#2e34cf" }}>
					Sign In
				</ModifiedLink>
			</div>
		</div>
	);
};

export default NoUserLoggedIn;
