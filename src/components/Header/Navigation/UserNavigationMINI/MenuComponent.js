import { Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import ActionsCreator from "../../../../actions/ActionsCreator";
import ModifiedLink from "../../../../helpers/ModifiedLink";
import FirebaseUtilityInstance from "../../../../services/Firebase";
import Styles from "../../Header.module.css";
const MenuComponent = ({
	Logout,
	DoneLoggingOut,
	clearSelectedUserProperty,
	shouldOpen,
	toggleHandler,
}) => {
	const history = useHistory();
	return (
		<div
			className={Styles.MenuOuterDiv}
			style={{
				height: shouldOpen ? "auto" : "0px",
				visibility: shouldOpen ? "visible" : "hidden",
			}}
		>
			<Switch>
				<div className={Styles.MenuInnerDiv}>
					<Route path="/mainpage" exact>
						<Typography>
							<ModifiedLink
								to="/inbox"
								className={Styles.Link}
								additionalFunction={toggleHandler}
							>
								Messages
							</ModifiedLink>
						</Typography>
						<Typography>
							<ModifiedLink
								to="/myaccount"
								className={Styles.Link}
								additionalFunction={toggleHandler}
							>
								My Account
							</ModifiedLink>
						</Typography>
						<Typography>
							<ModifiedLink
								className={Styles.Link}
								additionalFunction={async () => {
									toggleHandler();
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
					</Route>
					<Route path="/home" exact>
						<Typography>
							<ModifiedLink
								to="/signup"
								className={Styles.Link}
								additionalFunction={() => {
									toggleHandler();
								}}
							>
								Sign Up
							</ModifiedLink>
						</Typography>
						<Typography>
							<ModifiedLink
								to="/signin"
								className={Styles.Link}
								additionalFunction={() => {
									toggleHandler();
								}}
							>
								Sign In
							</ModifiedLink>
						</Typography>
					</Route>

					<Route path="/inbox" exact>
						<Typography>
							<ModifiedLink
								className={Styles.Link}
								additionalFunction={async () => {
									toggleHandler();
									history.push("/mainpage");
									await new Promise((resolve) => setTimeout(resolve, 1000));
									clearSelectedUserProperty();
								}}
							>
								Back To Mainpage
							</ModifiedLink>
						</Typography>
					</Route>
				</div>
			</Switch>
		</div>
	);
};
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
export default connect(null, mapDispatchToProps)(MenuComponent);
