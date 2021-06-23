import React, { useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import CardComponent from "./CardComponent.js";
import Styles from "../Homepage.module.css";
import AOS from "aos";
import CardOnScrollWrapper from "./CardOnScrollWrapper.js";
const UsersType = {
	BORROWER: "Borrower",
	OWNER: "Owner",
};
export const CardsContainer = () => {
	useEffect(() => {
		AOS.init();
	}, []);
	return (
		<Grid
			container
			justify="space-around"
			alignItems="center"
			className={Styles.OwnerOrBorrowerContainer}
		>
			<CardOnScrollWrapper delay={200}>
				<Grid item component={Card} className={Styles.Card}>
					<CardComponent type={UsersType.BORROWER} />
				</Grid>
			</CardOnScrollWrapper>
			<CardOnScrollWrapper delay={400}>
				<Grid item component={Card} className={Styles.Card}>
					<CardComponent type={UsersType.OWNER} />
				</Grid>
			</CardOnScrollWrapper>
		</Grid>
	);
};

export default CardsContainer;
