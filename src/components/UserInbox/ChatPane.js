import React, { useEffect, useLayoutEffect, useRef } from "react";
import { connect } from "react-redux";
import { isThisNameTheSender } from "../../helpers/Functions";
import Styles from "./UserInbox.module.css";
import { SelectedUserMessage } from "./SelectedUserMessage.js";
import LoggedInUserMessage from "./LoggedInUserMessage";
import FirebaseUtilityInstance from "../../services/Firebase";
import useSendMessage from "../../hooks/useSendMessage";
import { convertFullNameToFirstNameLastNameObject } from "../../helpers/Functions.js";
import MessageSenderBox from "./MessageSenderBox";
import ChatHeader from "./ChatHeader.js";
import { AnimatePresence, motion } from "framer-motion";
import { STATUSES } from "../../reducers/ConversationsReducer";
const ChatPane = ({
	Conversations,
	SelectedUserFullName,
	User,
	SamplesList,
	ConversationsStatus,
	isDifferentRoute,
}) => {
	const Messages =
		SelectedUserFullName !== ""
			? Object.values(Conversations[SelectedUserFullName])
			: null;
	const { handleSubmit, FieldRef, LastPressedKey, handleKeyPressDown } =
		useSendMessage({
			LoggedInUser: User,
			SelectedUser: {
				...convertFullNameToFirstNameLastNameObject(SelectedUserFullName),
			},
		});
	const PrevSelectedUserFullName = useRef();
	const MessagesContainerRef = useRef();
	useLayoutEffect(() => {
		MessagesContainerRef.current.scrollTop =
			MessagesContainerRef.current.scrollHeight;
	}, [Conversations, SelectedUserFullName, SamplesList]);
	useEffect(() => {
		if (
			SelectedUserFullName !== "" &&
			Object.entries(Conversations[SelectedUserFullName]).length !== 0 &&
			isDifferentRoute === false
		) {
			FirebaseUtilityInstance.MarkSelectedUserMessagesAsRead(
				User,
				SelectedUserFullName
			);
		}
	}, [SelectedUserFullName, Conversations[SelectedUserFullName]]);
	const isMounted = useRef(false);
	useEffect(() => {
		if (!isMounted.current) {
			isMounted.current = true;
			return;
		}
		if (LastPressedKey === "Enter") {
			FirebaseUtilityInstance.IsTypingToFalse(User, SelectedUserFullName);
			return;
		}
		FirebaseUtilityInstance.IsTypingToTrue(User, SelectedUserFullName);
		const clearTimeoutToken = setTimeout(() => {
			FirebaseUtilityInstance.IsTypingToFalse(User, SelectedUserFullName);
		}, 700);

		return () => {
			clearTimeout(clearTimeoutToken);
		};
	}, [LastPressedKey]);
	useEffect(() => {
		if (SelectedUserFullName !== "") {
			PrevSelectedUserFullName.current = SelectedUserFullName;
			FirebaseUtilityInstance.ListenForTypingChanges(
				User,
				SelectedUserFullName
			);
		}
		return () => {
			if (PrevSelectedUserFullName.current === undefined) return;
			FirebaseUtilityInstance.RemoveTypingListeners(
				User,
				PrevSelectedUserFullName.current
			);
		};
	}, [SelectedUserFullName]);
	return (
		<div className={Styles.ChatPane}>
			<ChatHeader SelectedUser={SelectedUserFullName} />
			<AnimatePresence exitBeforeEnter>
				<motion.div
					className={Styles.ChatMessagesContainer}
					ref={MessagesContainerRef}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					key={SelectedUserFullName}
					onAnimationStart={() =>
						(MessagesContainerRef.current.scrollTop =
							MessagesContainerRef.current.scrollHeight)
					}
				>
					{Messages !== null
						? Messages.map((Message, index) => {
								if (isThisNameTheSender(SelectedUserFullName, Message)) {
									return <SelectedUserMessage Message={Message} key={index} />;
								} else {
									return <LoggedInUserMessage Message={Message} key={index} />;
								}
						  })
						: Object.entries(User).length !== 0 && (
								<div className={Styles.SelectUserOnLeftPaneDiv}>
									{ConversationsStatus === STATUSES.LOADING
										? "Loading Conversations Please Wait Patiently :)"
										: "Select User On Left Pane And Start Chatting"}
								</div>
						  )}
					{SamplesList.length !== 0 &&
						SamplesList.map((SampleMessage, index) => (
							<LoggedInUserMessage Message={SampleMessage} sample key={index} />
						))}
				</motion.div>
			</AnimatePresence>
			{SelectedUserFullName && ConversationsStatus === STATUSES.DONE && (
				<MessageSenderBox
					FieldRef={FieldRef}
					handleSubmit={handleSubmit}
					handleKeyPressDown={handleKeyPressDown}
				/>
			)}
		</div>
	);
};
const mapStateToProps = (state) => ({
	SelectedUserFullName: state.Conversations.selectedUser,
	Conversations: state.Conversations.conversations,
	User: { ...state.Borrower, ...state.Owner },
	SamplesList: state.Samples.SamplesList,
	ConversationsStatus: state.Conversations.status,
	isDifferentRoute: state.Conversations.UserSelectedFromDifferentRoute,
});
export default connect(mapStateToProps)(ChatPane);
