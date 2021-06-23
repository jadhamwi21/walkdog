import React from "react";
import MobileChatTransitionWrapper from "./MobileChatTransitionWrapper.js";
import { connect } from "react-redux";
import { AnimatePresence } from "framer-motion";

export const InterfaceAsPropsENUMS = {
	CHAT: "chat",
	MESSAGES: "messages",
};
const MobileChatUI = ({
	MessagesPane,
	ChatPane,
	SelectedUser,
	IsDifferentRoute,
}) => {
	return (
		<AnimatePresence initial={false}>
			<div key={SelectedUser === ""}>
				<MessagesPane />
				{SelectedUser !== "" && IsDifferentRoute !== true && (
					<MobileChatTransitionWrapper>
						<ChatPane />
					</MobileChatTransitionWrapper>
				)}
			</div>
		</AnimatePresence>
	);
};
const mapStateToProps = (state) => ({
	SelectedUser: state.Conversations.selectedUser,
	IsDifferentRoute: state.Conversations.UserSelectedFromDifferentRoute,
});
export default connect(mapStateToProps)(MobileChatUI);
