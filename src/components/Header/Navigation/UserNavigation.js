import React from "react";
import Styles from "../Header.module.css";
import { FirebaseUtilityInstance } from "../../../services/Firebase.js";
import { ActionsCreator } from "../../../actions/ActionsCreator.js";
import { Typography } from "@material-ui/core";
import { Route } from "react-router-dom";
import ModifiedLink from "../../../helpers/ModifiedLink.js";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { checkforLoggedInUser } from "../../../helpers/Functions.js";
import store from "../../../store/store";
const UserNavigation = ({
	Logout,
	DoneLoggingOut,
	BorrowerState,
	OwnerState,
	clearSelectedUserProperty,
}) => {
	return (
		<Switch>
			<Route path="/mainpage" exact>
				{checkforLoggedInUser(OwnerState, BorrowerState) ? (
					<div className={Styles.UserNavigation}>
						<Typography>
							<ModifiedLink to="/inbox" className={Styles.Link}>
								Messages
							</ModifiedLink>
						</Typography>
						<Typography>
							<ModifiedLink to="/myaccount" className={Styles.Link}>
								My Account
							</ModifiedLink>
						</Typography>
						<Typography>
							<ModifiedLink
								className={Styles.Link}
								additionalFunction={async () => {
									Logout();
									await new Promise((resolve) => setTimeout(resolve, 2000));
									DoneLoggingOut();
									await new Promise((resolve) => setTimeout(resolve, 2000));
								}}
								to="/signin"
							>
								Logout
							</ModifiedLink>
						</Typography>
					</div>
				) : null}
			</Route>
			<Route path="/inbox" exact>
				<Typography>
					<ModifiedLink
						to="/mainpage"
						className={Styles.Link}
						additionalFunction={() => {
							clearSelectedUserProperty();
						}}
					>
						Back To Mainpage
					</ModifiedLink>
				</Typography>
			</Route>
		</Switch>
	);
};
const mapStateToProps = (state) => ({
	BorrowerState: state.Borrower,
	OwnerState: state.Owner,
});
const mapDispatchToProps = (dispatch) => ({
	Logout: () => {
		FirebaseUtilityInstance.SignOutUser();
		dispatch(ActionsCreator.resetConversationsState());
		dispatch(ActionsCreator.ownerLogout());
		dispatch(ActionsCreator.borrowerLogout());
	},
	DoneLoggingOut: () => {
		dispatch(ActionsCreator.loggingOutDone());
	},
	clearSelectedUserProperty: () => {
		dispatch(ActionsCreator.setSelectedUser(""));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNavigation);
