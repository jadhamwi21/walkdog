import { ActionsType } from "./ActionsType.js";
import { history } from "../index.js";
import FirebaseUtilityInstance from "../services/Firebase.js";
import Message from "../helpers/Message.js";
import { store } from "../store/store.js";
import { isEmpty } from "../helpers/Functions.js";
export const ActionsCreator = {
	signupAsBorrower: () => ({ type: ActionsType.BORROWER_SIGNUP }),
	signupAsOwner: () => ({ type: ActionsType.OWNER_SIGNUP }),
	signupAsUnspecified: () => ({ type: ActionsType.UNSPECIFIED_SIGNUP }),
	borrowerLogin: (User) => ({
		type: ActionsType.BORROWER_LOGIN,
		payload: { user: User },
	}),
	borrowerLogout: () => ({ type: ActionsType.BORROWER_LOGOUT }),
	ownerLogin: (User) => ({
		type: ActionsType.OWNER_LOGIN,
		payload: { user: User },
	}),
	ownerLogout: () => ({ type: ActionsType.OWNER_LOGOUT }),
	animateIn: () => ({ type: ActionsType.ANIMATION_IN }),
	animateOut: () => ({ type: ActionsType.ANIMATION_OUT }),
	addPostToUser: (PostObject) => ({
		type: ActionsType.ADD_NEW_POST,
		payload: { newPost: { ...PostObject } },
	}),
	editPostToUser: (PostObject) => ({
		type: ActionsType.UPDATE_OLD_POST,
		payload: {
			editedPost: PostObject,
		},
	}),
	deletePostToUser: (PostID) => ({
		type: ActionsType.DELETE_POST,
		payload: {
			deletedPostID: PostID,
		},
	}),
	selectLoggingOut: () => ({
		type: ActionsType.SELECT_LOGGING_OUT,
	}),
	loggingOutDone: () => ({
		type: ActionsType.DONE_LOGGING_OUT,
	}),
	resetLoggingOut: () => ({
		type: ActionsType.RESET_LOGGING_OUT,
	}),
	updateHistory: (next) => (dispatch) => {
		const previous = history.location.pathname;
		dispatch({
			type: ActionsType.UPDATE_HISTORY,
			payload: {
				previous: previous,
				current: next,
			},
		});
	},
	initializeHistory: () => ({
		type: ActionsType.INIT_HISTORY,
	}),
	animateIn: () => ({
		type: ActionsType.ANIMATE_IN,
	}),
	animateOut: () => ({
		type: ActionsType.ANIMATE_OUT,
	}),
	pageTransition: (duration, to) => async (dispatch) => {
		const waitAnimationOut = async () => {
			return new Promise((resolve) => {
				setTimeout(resolve, duration);
			});
		};
		dispatch({ type: ActionsType.ANIMATE_OUT });
		await waitAnimationOut();
		dispatch({ type: ActionsType.ANIMATE_IN });
		history.push(to);
	},
	storePostDetails: (post) => ({
		type: ActionsType.STORE_POST_DETAILS,
		payload: { post: post },
	}),
	removeStoredPost: () => ({ type: ActionsType.REMOVE_STORED_POST }),
	loadConversation: (ConversationObject) => ({
		type: ActionsType.LOAD_CONVERSATION,
		payload: {
			conversationWithUser: ConversationObject,
		},
	}),
	doneLoadingConversations: () => ({
		type: ActionsType.DONE_LOADING_CONVERSATIONS,
	}),
	pushSample: (sampleMessage) => (dispatch) => {
		const ConstructedSample = new Message(
			sampleMessage.MessageContent,
			sampleMessage.SendBy
		);
		const oldSamples = store.getState().Samples.SamplesList;
		const newSamples = [...oldSamples];
		newSamples.push(ConstructedSample);
		dispatch({
			type: ActionsType.UPDATE_SAMPLES_LIST,
			payload: {
				newSamplesList: newSamples,
			},
		});
	},
	throwSample: () => (dispatch) => {
		const oldSamples = store.getState().Samples.SamplesList;
		const newSamples = [...oldSamples];
		newSamples.shift();
		dispatch({
			type: ActionsType.UPDATE_SAMPLES_LIST,
			payload: {
				newSamplesList: newSamples,
			},
		});
	},
	selectUserForChat: (UserFullName, Path) => (dispatch) => {
		const UserExists =
			store.getState().Conversations.conversations[UserFullName] !== undefined;
		if (UserExists) {
			dispatch({
				type: ActionsType.SELECT_USER_THAT_EXIST_FOR_CHAT,
				payload: {
					selectedUserByLoggedInUser: UserFullName,
					isDifferentRoute: Path !== "/inbox",
				},
			});
		} else {
			dispatch({
				type: ActionsType.SELECT_USER_THAT_NOT_EXIST_FOR_CHAT,
				payload: {
					SelectedUserFullName: UserFullName,
					isDifferentRoute: Path !== "/inbox",
				},
			});
		}
	},
	AppendMessage: (SelectedUserFullName, NewMessage) => ({
		type: ActionsType.APPEND_MESSAGE,
		payload: {
			selectedUserFullName: SelectedUserFullName,
			newMessage: NewMessage,
		},
	}),
	UpdateMessage:
		(messageKey, messageObject, SelectedUserName) => (dispatch) => {
			const ConversationsWithThisSelectedUser =
				store.getState().Conversations.conversations[SelectedUserName];
			ConversationsWithThisSelectedUser[messageKey] = messageObject;
			dispatch({
				type: ActionsType.UPDATE_MESSAGE,
				payload: {
					ConversationsTree: ConversationsWithThisSelectedUser,
					UserFullName: SelectedUserName,
				},
			});
		},
	isTypingOn: () => ({ type: ActionsType.IS_TYPING_ON }),
	isTypingOff: () => ({ type: ActionsType.IS_TYPING_OFF }),
	appendProfilePicture: (selectedUser, source) => ({
		type: ActionsType.APPEND_PROFILE_PICTURE,
		payload: {
			userFullName: selectedUser,
			profilepicturesource: source,
		},
	}),
	appendLastActive: (selectedUser, lastActiveObject) => ({
		type: ActionsType.APPEND_LAST_ACTIVE,
		payload: {
			userFullName: selectedUser,
			lastActive: lastActiveObject,
		},
	}),
	appendUserStatus: (selectedUser, status) => ({
		type: ActionsType.APPEND_USER_STATUS,
		payload: {
			userFullName: selectedUser,
			user_status: status,
		},
	}),
	resetConversationsState: () => ({
		type: ActionsType.RESET_CONVERSATIONS_STATE,
	}),
	storeNumberOfConversations: (convCount) => ({
		type: ActionsType.STORE_NUMBER_OF_CONVERSATIONS,
		payload: { count: convCount },
	}),
	unstoreNumberOfConversations: () => ({
		type: ActionsType.UNSTORE_NUMBER_OF_CONVERSATIONS,
	}),
	setSelectedUser: (value) => ({
		type: ActionsType.SET_SELECTED_USER,
		payload: { newSelectedUser: value },
	}),
	storeIsRouteDifferent: (value) => ({
		type: ActionsType.SET_IS_ROUTE_DIFFERENT,
		payload: { isDifferent: value },
	}),
	updatePassword: (NewPassword) => (dispatch) => {
		const ReduxState = store.getState();
		const { Owner } = ReduxState;
		if (!isEmpty(Owner)) {
			dispatch({
				type: ActionsType.UPDATE_OWNER_PASSWORD,
				payload: {
					updatedPassword: NewPassword,
				},
			});
		} else {
			dispatch({
				type: ActionsType.UPDATE_BORROWER_PASSWORD,
				payload: {
					updatedPassword: NewPassword,
				},
			});
		}
	},
	updateLoggedInUserAttribute: (Attribute, Value) => (dispatch) => {
		const ReduxState = store.getState();
		const { Owner } = ReduxState;
		if (!isEmpty(Owner)) {
			dispatch({
				type: ActionsType.UPDATE_OWNER_ATTRIBUTE,
				payload: {
					Attribute,
					Value,
				},
			});
		} else {
			dispatch({
				type: ActionsType.UPDATE_BORROWER_ATTRIBUTE,
				payload: {
					Attribute,
					Value,
				},
			});
		}
	},
	selectClickedLink: (clickedLink) => ({
		type: ActionsType.SELECT_CLICKED_FOOTER_LINK,
		payload: { link: clickedLink },
	}),
};
export default ActionsCreator;
