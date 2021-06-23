import React, { useEffect, useLayoutEffect } from "react";
import Styles from "./UserInterface.module.css";
import { connect, useDispatch } from "react-redux";
import { checkforLoggedInUser } from "../../helpers/Functions.js";
import FirebaseUtilityInstance from "../../services/Firebase";
import Interface from "./Interface.js";
import useScrollToTop from "../../hooks/useScrollToTop";
import { NewVisitor_Choice } from "../../reducers/SignupReducer";
import UnauthenticatedUserComponent from "./UnauthorizedUserComponent/UnauthenticatedUserComponent";
import { motion, AnimatePresence } from "framer-motion";
import useAutoSignIn from "../../hooks/useAutoSignIn";
import AnimatedComponentWrapper from "../../router/AnimatedComponentWrapper";
const UserInterface = ({ BorrowerState, OwnerState }) => {
	useScrollToTop();
	return (
		<AnimatedComponentWrapper>
			<div className={Styles.UserInterfaceContainer}>
				<AnimatePresence exitBeforeEnter>
					<motion.div
						key={checkforLoggedInUser(OwnerState, BorrowerState)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						style={{ height: "100%" }}
					>
						{checkforLoggedInUser(OwnerState, BorrowerState) ? (
							<Interface
								Type={
									Object.keys(OwnerState).length !== 0
										? NewVisitor_Choice.OWNER
										: NewVisitor_Choice.BORROWER
								}
							/>
						) : (
							<UnauthenticatedUserComponent />
						)}
					</motion.div>
				</AnimatePresence>
			</div>
		</AnimatedComponentWrapper>
	);
};
const mapStateToProps = (state) => ({
	BorrowerState: state.Borrower,
	OwnerState: state.Owner,
});

export default connect(mapStateToProps)(UserInterface);
