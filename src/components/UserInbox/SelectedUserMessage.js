import React from "react";
import Styles from "./UserInbox.module.css";

export const SelectedUserMessage = ({ Message }) => {
	return (
		<div className={Styles.SelectedUserMessageContainer}>
			<div>{Message.MessageContent}</div>
		</div>
	);
};

export default SelectedUserMessage;
