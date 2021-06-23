import React, { useEffect, useRef } from "react";
import useScrollToTop from "../../hooks/useScrollToTop";
import ChatPane from "./ChatPane";
import InboxContainer from "./InboxContainer.js";
import RecentMessagesPane from "./RecentMessagesPane";
import { isEmpty } from "../../helpers/Functions";
import FirebaseUtilityInstance from "../../services/Firebase";
import { connect } from "react-redux";
import ActionsCreator from "../../actions/ActionsCreator";
import MobileChatUI from "./MobileChatUI.js";
import AnimatedComponentWrapper from "../../router/AnimatedComponentWrapper";
import { useMediaQuery } from "@material-ui/core";
const myVariant = {
	init: { opacity: 0 },
	in: { opacity: 1 },
	out: { translateX: "100vw" },
};
const UserInbox = ({
	User,
	DoneLoadingConversations,
	NumberOfConversations,
	ProfilePictures,
	LastActiveAndStatus,
	Conversations,
	IsDifferentRoute,
	setIsDifferentRoute,
}) => {
	useScrollToTop();
	useEffect(() => {
		document.body.style.overflowY = "hidden";
		return () => {
			document.body.style.overflowY = "auto";
		};
	}, []);
	useEffect(() => {
		if (isEmpty(User)) return;
		if (NumberOfConversations !== null) return;
		FirebaseUtilityInstance.AddConversationsChildListeners(User);
	}, []);
	const lastActiveAndStatusIsFetched = useRef(false);
	useEffect(() => {
		if (
			NumberOfConversations !== null &&
			NumberOfConversations === Object.entries(Conversations).length &&
			!lastActiveAndStatusIsFetched.current
		) {
			lastActiveAndStatusIsFetched.current = true;
			const AllConversationsUsersFullName = Object.keys(Conversations);
			console.log(AllConversationsUsersFullName);
			AllConversationsUsersFullName.forEach(async (Fullname) => {
				await FirebaseUtilityInstance.LastActiveListener(Fullname);
			});
		}
	}, [Conversations, NumberOfConversations]);
	const isLoaded = useRef(false);
	useEffect(() => {
		if (
			NumberOfConversations !== null &&
			NumberOfConversations === Object.entries(ProfilePictures).length &&
			NumberOfConversations === Object.entries(LastActiveAndStatus).length &&
			NumberOfConversations === Object.entries(Conversations).length &&
			!isLoaded.current
		) {
			DoneLoadingConversations();
			if (IsDifferentRoute) {
				setIsDifferentRoute(false);
			}
			isLoaded.current = true;
		}
	}, [
		NumberOfConversations,
		ProfilePictures,
		Conversations,
		LastActiveAndStatus,
	]);

	const isMatch = useMediaQuery("(max-width:764px)");
	return (
		<AnimatedComponentWrapper>
			<InboxContainer>
				{isMatch ? (
					<MobileChatUI MessagesPane={RecentMessagesPane} ChatPane={ChatPane} />
				) : (
					<>
						<RecentMessagesPane />
						<ChatPane />
					</>
				)}
			</InboxContainer>
		</AnimatedComponentWrapper>
	);
};
const mapStateToProps = (state) => ({
	User: { ...state.Owner, ...state.Borrower },
	Conversations: state.Conversations.conversations,
	NumberOfConversations: state.Conversations.Num_Of_Conversations,
	ProfilePictures: state.Conversations.profilePictures,
	LastActiveAndStatus: state.Conversations.usersLastActiveState,
	IsDifferentRoute: state.Conversations.UserSelectedFromDifferentRoute,
});
const mapDispatchToProps = (dispatch) => ({
	DoneLoadingConversations: () =>
		dispatch(ActionsCreator.doneLoadingConversations()),
	setIsDifferentRoute: (value) =>
		dispatch(ActionsCreator.storeIsRouteDifferent(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserInbox);
