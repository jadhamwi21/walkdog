import React from "react";
import Styles from "../Homepage.module.css";
import { Typography } from "@material-ui/core";

export const Landing = () => {
	return (
		<section className={Styles.LandingPart}>
			<div className={Styles.LandingMessageContainer}>
				<Typography variant="h4" className={Styles.LandingMessageHeader}>
					Join Our Community !
				</Typography>
				<Typography className={Styles.LandingMessageContent}>
					Thousands of Borrowers And Owners Conntecting To Each Other By Walking
					Dogs.
				</Typography>
			</div>
		</section>
	);
};

export default Landing;
