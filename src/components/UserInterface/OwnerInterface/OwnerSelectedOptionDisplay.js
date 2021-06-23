import React from "react";
import Styles from "./OwnerInterface.module.css";
import NewPost from "./NewPost/NewPost.js";
import { Options_ENUMS } from "./OwnerInterface";
import EditPost from "./EditPost/EditPost";
import DeletePost from "./DeletePost/DeletePost";
import { AnimatePresence, motion } from "framer-motion";
import Empty from "../Empty";
const renderByOptionPassed = (option) => {
	if (option === Options_ENUMS.NEWPOST) {
		return <NewPost />;
	}
	if (option === Options_ENUMS.EDITPOST) {
		return <EditPost />;
	}
	if (option === Options_ENUMS.DELETEPOST) {
		return <DeletePost />;
	}
	if (option === Options_ENUMS.EMPTY) {
		return <Empty />;
	}
};
const OwnerSelectedOptionDisplay = ({ selectedOptionByOwner }) => {
	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				className={Styles.SelectedOptionDisplayContainer}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
				key={selectedOptionByOwner}
			>
				{renderByOptionPassed(selectedOptionByOwner)}
			</motion.div>
		</AnimatePresence>
	);
};

export default OwnerSelectedOptionDisplay;
