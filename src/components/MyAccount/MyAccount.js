import React from "react";
import { connect } from "react-redux";
import { isEmpty } from "../../helpers/Functions";
import NoUserLoggedIn from "./NoUserLoggedIn";
import UserAccount from "./UserAccount";
import Styles from "./MyAccount.module.css";
import ModifiedLink from "../../helpers/ModifiedLink";
import AnimatedComponentWrapper from "../../router/AnimatedComponentWrapper";
import ArrowRight from "../../assets/ArrowRight.png";
const MyAccount = ({ User }) => {
	return (
		<AnimatedComponentWrapper className={Styles.MyAccountFramework}>
			{isEmpty(User) ? <NoUserLoggedIn /> : <UserAccount UserAccount={User} />}
			{!isEmpty(User) && (
				<ModifiedLink className={Styles.BackToMainpageButton} to="/mainpage">
					<img src={ArrowRight} style={{ height: "100%", width: "100%" }} />
				</ModifiedLink>
			)}
		</AnimatedComponentWrapper>
	);
};
const mapStateToProps = (state) => ({
	User: { ...state.Borrower, ...state.Owner },
});
export default connect(mapStateToProps)(MyAccount);
