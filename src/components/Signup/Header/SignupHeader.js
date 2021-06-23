import React from "react";
import { Typography } from "@material-ui/core";
import { NewVisitor_Choice } from "../../../reducers/SignupReducer.js";
import Styles from "../Signup.module.css";
const computeTitleEnding = (type) => {
	if (type === NewVisitor_Choice.BORROWER) return "Borrower";

	if (type === NewVisitor_Choice.OWNER) return "Owner";

	if (type === NewVisitor_Choice.UNSCPECIFIED) return "Follows..";
};
export const SignupHeader = ({ type }) => {
	const TitleEnding = computeTitleEnding(type);
	return (
		<div>
			<Typography variant="h5" className={Styles.FormTitle}>
				Signing Up As {TitleEnding}
			</Typography>
		</div>
	);
};

export default SignupHeader;
