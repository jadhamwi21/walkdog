import { ActionsType } from "../actions/ActionsType.js";
export const STATUSES = {
	LOADING: "loading",
	DONE: "done",
};
const initialState = {
	conversations: {},
	selectedUser: "",
	status: STATUSES.LOADING,
	isTyping: false,
	profilePictures: {},
	usersLastActiveState: {},
	Num_Of_Conversations: null,
	UserSelectedFromDifferentRoute: false,
};
export const ConversationsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionsType.LOAD_CONVERSATION:
			return {
				...state,
				conversations: {
					...state.conversations,
					...action.payload.conversationWithUser,
				},
			};
		case ActionsType.SET_IS_ROUTE_DIFFERENT:
			return {
				...state,
				UserSelectedFromDifferentRoute: action.payload.isDifferent,
			};
		case ActionsType.SET_SELECTED_USER:
			return { ...state, selectedUser: action.payload.newSelectedUser };
		case ActionsType.DONE_LOADING_CONVERSATIONS:
			return { ...state, status: STATUSES.DONE };
		case ActionsType.SELECT_USER_THAT_EXIST_FOR_CHAT:
			return {
				...state,
				selectedUser: action.payload.selectedUserByLoggedInUser,
				UserSelectedFromDifferentRoute: action.payload.isDifferentRoute,
			};
		case ActionsType.APPEND_MESSAGE:
			return {
				...state,
				conversations: {
					...state.conversations,
					[action.payload.selectedUserFullName]: {
						...state.conversations[action.payload.selectedUserFullName],
						...action.payload.newMessage,
					},
				},
			};
		case ActionsType.UPDATE_MESSAGE:
			return {
				...state,
				conversations: {
					...state.conversations,
					[action.payload.UserFullName]: action.payload.ConversationsTree,
				},
			};
		case ActionsType.SELECT_USER_THAT_NOT_EXIST_FOR_CHAT:
			return {
				...state,
				selectedUser: action.payload.SelectedUserFullName,
				UserSelectedFromDifferentRoute: action.payload.isDifferentRoute,
				conversations: {
					...state.conversations,
					[action.payload.SelectedUserFullName]: {},
				},
			};
		case ActionsType.IS_TYPING_ON:
			return { ...state, isTyping: true };
		case ActionsType.IS_TYPING_OFF:
			return { ...state, isTyping: false };
		case ActionsType.APPEND_PROFILE_PICTURE:
			return {
				...state,
				profilePictures: {
					...state.profilePictures,
					[action.payload.userFullName]: action.payload.profilepicturesource,
				},
			};
		case ActionsType.APPEND_LAST_ACTIVE:
			return {
				...state,
				usersLastActiveState: {
					...state.usersLastActiveState,
					[action.payload.userFullName]: {
						...state.usersLastActiveState[action.payload.userFullName],
						...action.payload.lastActive,
					},
				},
			};
		case ActionsType.APPEND_USER_STATUS:
			return {
				...state,
				usersLastActiveState: {
					...state.usersLastActiveState,
					[action.payload.userFullName]: {
						...state.usersLastActiveState[action.payload.userFullName],
						status: action.payload.user_status,
					},
				},
			};
		case ActionsType.RESET_CONVERSATIONS_STATE:
			return {
				conversations: {},
				selectedUser: "",
				status: STATUSES.LOADING,
				isTyping: false,
				profilePictures: {},
				usersLastActiveState: {},
				Num_Of_Conversations: null,
			};
		case ActionsType.STORE_NUMBER_OF_CONVERSATIONS:
			return { ...state, Num_Of_Conversations: action.payload.count };
		case ActionsType.UNSTORE_NUMBER_OF_CONVERSATIONS:
			return { ...state, Num_Of_Conversations: null };
		default:
			return state;
	}
};
