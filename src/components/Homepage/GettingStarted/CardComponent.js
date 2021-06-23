import React from "react";
import { Button, CardContent, Typography } from "@material-ui/core";
import Styles from "../Homepage.module.css";
import { connect } from "react-redux";
import ModifiedLink from "../../../helpers/ModifiedLink.js";
import { selectCardsFactory } from "../../../helpers/Functions.js";
const CardComponent = ({ type, dispatcher }) => {
	const { Image, Title, Content, Action } = selectCardsFactory(type);
	return (
		<>
			<img src={Image} className={Styles.CardImage} loading="lazy" />
			<CardContent style={{ paddingTop: "0px", paddingBottom: "0px" }}>
				<Typography className={Styles.CardTitle} variant="h5">
					{Title}
				</Typography>
				<Typography className={Styles.CardContent}>{Content}</Typography>
			</CardContent>
			<ModifiedLink
				className={Styles.CardSignupButton}
				additionalFunction={() => dispatcher(Action())}
				to="/signup"
				component={Button}
			>
				Sign up
			</ModifiedLink>
		</>
	);
};
const mapDispatchToProps = (dispatch) => ({
	dispatcher: dispatch,
});
export default connect(null, mapDispatchToProps)(CardComponent);
