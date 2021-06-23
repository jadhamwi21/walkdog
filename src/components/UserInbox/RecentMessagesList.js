import React from "react";
import { connect } from "react-redux";
import Styles from "./UserInbox.module.css";
import { motion, AnimatePresence } from "framer-motion";
import IndividualChatComponent from "./IndividualChatComponent.js";
import ModifiedLink from "../../helpers/ModifiedLink";
import { isEmpty } from "../../helpers/Functions";
import { STATUSES } from "../../reducers/ConversationsReducer";
import MessagesLoader from "./MessagesLoader";
const RecentMessagesList = ({ Conversations, ConversationsStatus, User }) => {
	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				key={ConversationsStatus}
				initial={{ opacity: 1 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 1 }}
			>
				{ConversationsStatus === STATUSES.LOADING ? (
					Object.entries(User).length === 0 ? (
						<div className={Styles.PleaseSignInDiv}>
							<div>
								You're Not Logged In
								<br />
								<ModifiedLink to="/signin" className={Styles.SignInLink}>
									Sign In
								</ModifiedLink>
							</div>
						</div>
					) : (
						<div className={Styles.LoadingAndNoRecentMessagesDiv}>
							<MessagesLoader />
						</div>
					)
				) : (
					<div>
						{isEmpty(Conversations) ? (
							<div className={Styles.LoadingAndNoRecentMessagesDiv}>
								No Recent Messages
							</div>
						) : (
							<div className={Styles.RecentConversationsDiv}>
								{Object.entries(Conversations).map((IndividualChatUser) => (
									<IndividualChatComponent
										ChattedUser={IndividualChatUser}
										key={IndividualChatUser[0]}
									/>
								))}
							</div>
						)}
					</div>
				)}
			</motion.div>
		</AnimatePresence>
	);
};
const mapStateToProps = (state) => ({
	Conversations: state.Conversations.conversations,
	ConversationsStatus: state.Conversations.status,
	User: { ...state.Owner, ...state.Borrower },
});
export default connect(mapStateToProps)(RecentMessagesList);
