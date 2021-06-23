import React from "react";
import Styles from "../UserInterface.module.css";
import NotLoggedIn from "./NotLoggedIn";
import { connect } from "react-redux";
import { selectedDisplayForUnauthenticatedUsers_ENUMS } from "../../../reducers/UnauthenticatedReducer.js";
import LoggingOut from "./LoggingOut";
const UnauthenticatedUserComponent = ({ selectedDisplay }) => {
	return (
		<div className={Styles.NotLoggedInComponent}>
			<div className={Styles.NotLoggedInContainer}>{selectedDisplay}</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	selectedDisplay: (() => {
		switch (state.Unauthenticated.selected) {
			case selectedDisplayForUnauthenticatedUsers_ENUMS.NOT_LOGGED_IN:
				return <NotLoggedIn />;
			case selectedDisplayForUnauthenticatedUsers_ENUMS.LOGGING_OUT:
				return <LoggingOut />;
		}
	})(),
});
export default connect(mapStateToProps)(UnauthenticatedUserComponent);
