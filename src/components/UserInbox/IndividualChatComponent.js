import React from "react";
import LineEllipsis from "react-lines-ellipsis";
import Styles from "./UserInbox.module.css";
import ActionsCreator from "../../actions/ActionsCreator";
import { connect } from "react-redux";
import { useHistory } from "react-router";
const Entry = {
	FullName: 0,
	Messages: 1,
};

const IndividualChatComponent = ({
	ChattedUser,
	User,
	SamplesList,
	SelectedUser,
	SelectThisUser,
	getProfilePicture,
}) => {
	const ArrayOfMessagesObject = Object.values(ChattedUser[Entry.Messages]);
	const MessagedUserFullName = ChattedUser[Entry.FullName];
	const MessagePreview =
		ArrayOfMessagesObject.length === 0
			? ""
			: ArrayOfMessagesObject[ArrayOfMessagesObject.length - 1];
	const getMessageText = () => {
		if (MessagePreview === "") return "";
		else if (
			SamplesList.length !== 0 &&
			SelectedUser === MessagedUserFullName
		) {
			return SamplesList[SamplesList.length - 1].MessageContent;
		} else {
			return MessagePreview.MessageContent;
		}
	};
	const history = useHistory();
	const ConversationSelector = () => {
		SelectThisUser(MessagedUserFullName, history.location.pathname);
	};

	return (
		<div
			className={Styles.ChatIndividualComponentContainer}
			onClick={ConversationSelector}
		>
			<div className={Styles.UserAvatarWrapper}>
				<div className={Styles.UserAvatar}>
					<img src={getProfilePicture(MessagedUserFullName)} />
				</div>
			</div>
			<div className={Styles.UserNameAndMessagePreviewWrapper}>
				<div className={Styles.UserName}>{MessagedUserFullName}</div>
				<div className={Styles.MessagePreview}>
					<div className={Styles.IsReadWrapper}>
						<div>
							{MessagePreview !== "" &&
								!MessagePreview.isRead &&
								MessagePreview.SendBy.FirstName +
									" " +
									MessagePreview.SendBy.LastName !==
									User.FirstName + " " + User.LastName && (
									<div className={Styles.IsRead} />
								)}
						</div>
					</div>
					<div className={Styles.MessageContent}>
						<LineEllipsis text={getMessageText()} maxLine="3" />
					</div>
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	User: { ...state.Owner, ...state.Borrower },
	SamplesList: state.Samples.SamplesList,
	SelectedUser: state.Conversations.selectedUser,
	getProfilePicture: (UserFullName) =>
		state.Conversations.profilePictures[UserFullName],
});
const mapDispatchToProps = (dispatch) => ({
	SelectThisUser: (User, Path) =>
		dispatch(ActionsCreator.selectUserForChat(User, Path)),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(IndividualChatComponent);
