import React from "react";
import ReactDOM from "react-dom";
import { Card, CardContent, Typography } from "@material-ui/core";
import Styles from "../Signup.module.css";
import ModifiedLink from "../../../helpers/ModifiedLink";
export const SuccessBox = () => {
	return ReactDOM.createPortal(
		<div className={Styles.SignupSuccessPopup}>
			<Card className={Styles.SignupSuccessBox}>
				<CardContent>
					<Typography
						variant="h4"
						color="primary"
						className={Styles.SignupSuccessContent}
					>
						Signed Up Successfully
						<ModifiedLink
							to="/signin"
							className={Styles.SignupSuccessSignInLink}
						>
							Sign In
						</ModifiedLink>
					</Typography>
				</CardContent>
			</Card>
		</div>,
		document.getElementById("portal")
	);
};

export default SuccessBox;
