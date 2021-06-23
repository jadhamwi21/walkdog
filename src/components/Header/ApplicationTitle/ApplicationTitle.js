import React from "react";
import { Typography } from "@material-ui/core";
import DogLogo from "../../../assets/DogLogo.png";
import Styles from "../Header.module.css";
import ModifiedLink from "../../../helpers/ModifiedLink.js";
import { checkforLoggedInUser } from "../../../helpers/Functions.js";
import { connect } from "react-redux";

const ApplicationTitle = ({ BorrowerState, OwnerState, disabled }) => {
	return (
		<div className={Styles.ApplicationTitleBox}>
			<ModifiedLink
				className={Styles.Link}
				to="/home"
				disabled={
					checkforLoggedInUser(BorrowerState, OwnerState) || disabled === true
				}
			>
				<img src={DogLogo} className={Styles.Logo} />
				<Typography variant="h5" className={Styles.WalkDogHeader}>
					Walk Dog
				</Typography>
			</ModifiedLink>
		</div>
	);
};
const mapStateToProps = (state) => ({
	BorrowerState: state.Borrower,
	OwnerState: state.Owner,
});
export default connect(mapStateToProps)(ApplicationTitle);
