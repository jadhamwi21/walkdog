import { useMediaQuery } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { checkforLoggedInUser } from "../../../helpers/Functions";
import Styles from "../Header.module.css";
import DefaultNavigation from "./DefaultNavigation";
import UserNavigation from "./UserNavigation";
import UserNavigationMINI from "./UserNavigationMINI/UserNavigationMINI";
const Navigation = ({ isLoggedIn }) => {
	const isMatching = useMediaQuery("(max-width:764px)");
	const location = useLocation();
	console.log(location.pathname);
	return (
		<div className={Styles.NavigationBox}>
			{!isMatching ? (
				isLoggedIn ? (
					<UserNavigation />
				) : (
					<DefaultNavigation />
				)
			) : (
				((isLoggedIn && location.pathname === "/mainpage") ||
					(isLoggedIn && location.pathname === "/inbox") ||
					(!isLoggedIn && location.pathname === "/home")) && (
					<UserNavigationMINI />
				)
			)}
		</div>
	);
};
const mapStateToProps = (state) => ({
	isLoggedIn: checkforLoggedInUser(state.Owner, state.Borrower),
});
export default connect(mapStateToProps)(Navigation);
