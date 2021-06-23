import React from "react";
import Styles from "./UserInbox.module.css";
const InboxContainer = ({ children }) => {
	return <div className={Styles.InboxContainer}>{children}</div>;
};

export default InboxContainer;
