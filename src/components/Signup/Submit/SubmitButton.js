import React, { useContext } from "react";
import { Button, Typography } from "@material-ui/core";
import Styles from "../Signup.module.css";
import ModifiedLink from "../../../helpers/ModifiedLink.js";
import { FormContext } from "../Signup.js";
export const SubmitButton = () => {
	const { Submit } = useContext(FormContext);
	return (
		<div className={Styles.SubmitButtonWrapper}>
			<Button className={Styles.SubmitButton} type="submit">
				{Submit ? "Signing Up" : "Sign Up"}
			</Button>
			<Typography className={Styles.AlreadyaMember}>
				Already A Member?{" "}
				<ModifiedLink to="/signin" style={{ color: "black" }}>
					Sign In
				</ModifiedLink>
			</Typography>
		</div>
	);
};

export default SubmitButton;
