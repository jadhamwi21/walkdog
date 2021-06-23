import { Button } from "@material-ui/core";
import React from "react";
import Styles from "../Signin.module.css";
export const SignInButton = ({ isSearching }) => {
	return (
		<Button className={Styles.SignInButton} type="submit">
			{isSearching === true ? "Signing In..." : "Sign In"}
		</Button>
	);
};

export default SignInButton;
