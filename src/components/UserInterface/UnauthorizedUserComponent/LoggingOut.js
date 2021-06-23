import React from "react";
import { connect } from "react-redux";
import Styles from "../UserInterface.module.css";
import { motion, AnimatePresence } from "framer-motion";
const LoggingOut = ({ Logging_Out_Status_Text, statusDivKey }) => {
	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				key={statusDivKey}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
			>
				{Logging_Out_Status_Text}
			</motion.div>
		</AnimatePresence>
	);
};
const mapStateToProps = (state) => ({
	Logging_Out_Status_Text: (() => {
		switch (state.Unauthenticated.logging_out.showMessage) {
			case true:
				return <div className={Styles.LogoutStatusText}>Logged Out</div>;
			case false:
				return <div className={Styles.LogoutStatusText}>Logging Out!!</div>;
		}
	})(),
	statusDivKey: state.Unauthenticated.logging_out.showMessage ? 1 : 2,
});
export default connect(mapStateToProps)(LoggingOut);
