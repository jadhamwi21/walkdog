import React from "react";
import RecentMessagesList from "./RecentMessagesList";
import Styles from "./UserInbox.module.css";
const RecentMessagesPane = () => {
	return (
		<div className={Styles.RecentMessagesPane}>
			<div className={Styles.RecentMessagesTextDiv}>Recent Messages</div>
			<RecentMessagesList />
		</div>
	);
};
export default RecentMessagesPane;
